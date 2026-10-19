# Activar el contacto

El sitio conserva sus páginas estáticas. El formulario necesita un hosting con PHP 8+ y PDO_SQLite; GitHub Pages y Live Server no ejecutan el receptor.

1. Crea una carpeta privada, persistente, fuera de la raíz pública del sitio. Concede acceso solo al usuario que ejecuta PHP.
2. Configura en el servidor CONTACT_STORAGE_DIR con la ruta absoluta de esa carpeta. El receptor rechaza carpetas dentro de la raíz pública y no confirma envíos cuando falta la configuración.
3. Para recibir avisos, configura CONTACT_NOTIFY_TO (tu correo privado) y CONTACT_MAIL_FROM (una dirección de tu dominio). Configura el transporte de correo de PHP en el hosting. Estas variables se definen en el servidor, nunca en JavaScript, HTML ni en archivos públicos.
4. Publica el sitio en HTTPS. Envía una consulta de prueba, confirma su registro en contact.sqlite y comprueba la recepción del aviso. Prueba también correo inválido, consentimiento sin marcar, fallo de red y límite de cinco consultas por IP por hora.

Las consultas quedan en la tabla inquiries de contact.sqlite. Puedes consultarlas con un visor SQLite mediante acceso privado al servidor. No existe panel público ni cuentas con contraseña: el registro es una solicitud de contacto. Respalda la base, limita su acceso y elimina los datos cuando ya no sean necesarios o se solicite. La notificación por correo es opcional; si falla, el mensaje sigue en la base. El sitio no guarda datos del visitante en localStorage.

Para desarrollo local, con PHP instalado y una carpeta privada ya creada, define CONTACT_STORAGE_DIR en tu entorno y ejecuta `php -S localhost:8000 -t .` desde el proyecto.

No se pudo verificar el contenido del video de referencia desde el entorno. Se enlazó el video proporcionado en la portada, sin reproducción automática.
