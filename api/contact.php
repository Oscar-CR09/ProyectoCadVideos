<?php
// Requiere PHP 8+, PDO_SQLite y un directorio privado fuera de la raíz pública.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $code, array $data): never {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Método no permitido.']);
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) respond(413, ['ok'=>false,'error'=>'El mensaje es demasiado grande.']);
function field(string $key): string { return is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : ''; }
$name=field('name'); $email=field('email'); $topic=field('topic'); $message=field('message');
$topics=['Diseño CAD','Cursos y aprendizaje','Desarrollo web o aplicaciones','Otra consulta'];
if (field('website') !== '') respond(422, ['ok'=>false,'error'=>'No se pudo procesar la consulta.']);
if (strlen($name)<2 || strlen($name)>400 || strlen($email)>254 || !filter_var($email,FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/',$email) || !in_array($topic,$topics,true) || strlen($message)<10 || strlen($message)>12000 || field('consent')!=='yes') {
    respond(422, ['ok'=>false,'error'=>'Revisa tu nombre, correo, tema, mensaje y consentimiento.']);
}
try {
    $dir=realpath(getenv('CONTACT_STORAGE_DIR') ?: '');
    $public=realpath($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__));
    if (!$dir || !$public || !is_dir($dir) || !is_writable($dir)) throw new RuntimeException('Configura CONTACT_STORAGE_DIR.');
    $normalize=static fn(string $path): string => strtolower(str_replace('\\','/',$path));
    $privatePath=$normalize($dir).'/'; $publicPath=$normalize($public).'/';
    if (str_starts_with($privatePath,$publicPath)) throw new RuntimeException('El almacenamiento debe estar fuera de la raíz pública.');
    $db=new PDO('sqlite:'.$dir.'/contact.sqlite',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
    $db->exec('PRAGMA busy_timeout=5000');
    $db->exec('CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY, created_at INTEGER NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, topic TEXT NOT NULL, message TEXT NOT NULL, consent TEXT NOT NULL, source_hash TEXT NOT NULL)');
    $db->exec('BEGIN IMMEDIATE');
    $source=hash('sha256',($_SERVER['REMOTE_ADDR'] ?? '').date('Y-m-d'));
    $check=$db->prepare('SELECT COUNT(*) FROM inquiries WHERE source_hash=? AND created_at>?');$check->execute([$source,time()-3600]);
    if ((int)$check->fetchColumn()>=5) {$db->exec('ROLLBACK');respond(429,['ok'=>false,'error'=>'Has enviado varias consultas. Inténtalo en una hora.']);}
    $insert=$db->prepare('INSERT INTO inquiries (created_at,name,email,topic,message,consent,source_hash) VALUES (?,?,?,?,?,?,?)');
    $insert->execute([time(),$name,$email,$topic,$message,'Contacto v1: autorización para responder',$source]);
    $db->exec('COMMIT');
    // La consulta permanece guardada aunque falle la notificación.
    $to=getenv('CONTACT_NOTIFY_TO') ?: ''; $from=getenv('CONTACT_MAIL_FROM') ?: '';
    if (filter_var($to,FILTER_VALIDATE_EMAIL) && filter_var($from,FILTER_VALIDATE_EMAIL) && !preg_match('/[\r\n]/',$to.$from)) {
        $sent=@mail($to,'Nueva consulta del sitio',"Nombre: $name\nCorreo: $email\nTema: $topic\n\n$message",['From'=>$from,'Reply-To'=>$email,'Content-Type'=>'text/plain; charset=UTF-8']);
        if (!$sent) error_log('Contacto: consulta guardada; notificación no enviada.');
    }
    respond(201,['ok'=>true]);
} catch (Throwable $error) {
    error_log('Contacto: '.$error->getMessage());
    respond(503,['ok'=>false,'error'=>'El servicio de contacto no está disponible. Inténtalo más tarde.']);
}
