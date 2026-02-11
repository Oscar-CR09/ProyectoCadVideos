# 🚀 Portafolio Profesional: Ingeniería & Desarrollo Web

![Estado](https://img.shields.io/badge/Estado-Sitio_Estático_v1.0-blue)
![Tecnología](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_JS-orange)
![Compatibilidad](https://img.shields.io/badge/Cross--Browser-Modernizr_Support-success)

> **Donde la precisión del CAD se encuentra con la lógica del Desarrollo Web.**

Este repositorio aloja el código fuente de mi plataforma profesional personal. Actualmente desplegado como un sitio estático de alto rendimiento, este proyecto sirve como punto central para exhibir mis proyectos de **Diseño Industrial (CAD/CAM)** y mi evolución hacia el **Desarrollo Full Stack**.

## 🛠️ Stack Tecnológico Actual

El proyecto está construido sobre una arquitectura **vanilla (sin frameworks)** para garantizar la máxima velocidad de carga y un control total sobre el DOM:

* **Estructura:** HTML5 Semántico.
* **Estilos:** CSS3 nativo con `normalize.css` para asegurar consistencia visual entre navegadores (Cross-browser consistency).
* **Lógica & Interactividad:** JavaScript (ES6+).
* **Compatibilidad:** Implementación de `modernizr.js` para la detección de características y soporte en navegadores legacy.

## 📂 Arquitectura de Archivos

La estructura del proyecto sigue una organización modular para facilitar la escalabilidad futura hacia un entorno de aplicación web:

```text
PROYECTOCADVIDEOS/
├── css/
│   ├── normalize.css    # Reset de estilos estándar
│   └── style.css        # Hoja de estilos principal y diseño responsivo
├── imagenes/            # Recursos gráficos, renders CAD y assets
├── js/
│   ├── modernizr.js     # Librería para detección de features HTML5/CSS3
│   └── script.js        # Lógica principal del frontend
├── web/                 # Módulos de contenido
│   ├── contacto.html    # Formulario de contacto
│   ├── cursos.html      # Recursos educativos y tutoriales
│   ├── fullstack.html   # Portafolio de desarrollo de software
│   └── nosotros.html    # Perfil profesional y trayectoria
└── index.html           # Landing page / Punto de entrada

🗺️ Roadmap de Evolución (Backend Migration)
Este repositorio es un proyecto vivo. Aunque la versión actual v1.0 es estática, el objetivo es refactorizar la arquitectura para convertirla en una Web App Dinámica (Blog Engine).

[x] Fase 1 (Completada): Estructura base, diseño responsivo y optimización de assets.

[ ] Fase 2 (En Progreso): Refactorización de componentes repetitivos mediante JavaScript.

[ ] Fase 3 (Futuro): Integración de Backend (Java/Python) para gestión de base de datos.

[ ] Fase 4 (Futuro): Implementación de un CMS propio para la publicación de artículos técnicos y tutoriales CAD.

🚀 Instalación y Despliegue Local
Para visualizar este proyecto en tu máquina local:

Clona el repositorio:

Bash
git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
Abre el archivo index.html en tu navegador de preferencia.

O utiliza una extensión como Live Server en VS Code para simular un servidor local.