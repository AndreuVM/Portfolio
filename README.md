# Andreu Marquès Goyes — Personal Portfolio (Interactive CLI)

> **Backend & Systems Engineer**  
> Palma de Mallorca, España · Especializado en APIs de alta concurrencia, sandboxing para agentes IA, arquitectura de datos y bajo nivel (C/C++, Linux, Python).

[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES_Modules-f7df1e?logo=javascript&logoColor=black)](#arquitectura-modular)
[![HTML5 / CSS3](https://img.shields.io/badge/Frontend-Semantic_HTML5_%26_CSS3-e34f26?logo=html5&logoColor=white)](#filosofía-de-diseño)
[![Zero Build](https://img.shields.io/badge/Dependencies-0_External_Libraries-brightgreen)](#filosofía-de-diseño)
[![License](https://img.shields.io/badge/License-MIT-blue)](#licencia)

---

## 📑 Tabla de Contenidos

- [Filosofía y Enfoque](#-filosofía-y-enfoque)
- [Características Principales](#-características-principales)
- [Arquitectura Modular](#-arquitectura-modular)
- [Proyectos Destacados](#-proyectos-destacados)
- [Catálogo de Comandos](#-catálogo-de-comandos)
  - [Comandos Canónicos](#comandos-canónicos-públicos)
  - [Huevos de Pascua Ocultos (Easter Eggs)](#huevos-de-pascua-ocultos-easter-eggs)
- [Despliegue y Ejecución Local](#-despliegue-y-ejecución-local)
- [Contacto y Enlaces](#-contacto-y-enlaces)

---

## 💡 Filosofía y Enfoque

Este portfolio ha sido diseñado bajo los principios de la **ingeniería de software limpia y artesanal**:

1. **Cero Dependencias (Zero Frameworks, Zero Bundlers)**: No requiere `npm install`, Webpack, Vite ni Babel. Ejecuta de forma nativa en cualquier navegador web moderno mediante **ES Modules** estándar (`<script type="module">`).
2. **Estética Editorial & Terminal UNIX**: Inspirado en el diseño suizo sobre papel hueso (`#ece7dc`), tinta (`#1a1914`) y detalles en resaltador amarillo (`#f2e24a`), combinado con la inmediatez y potencia de una consola de comandos POSIX.
3. **Respeto a la Accesibilidad (WCAG 2.1 AA) y SEO**:
   - Árbol semántico completo y accesible para lectores de pantalla (`.sr-only`, `aria-live`).
   - Esquema JSON-LD estructurado de `schema.org/Person`.
   - Etiquetas Open Graph y Twitter Cards integradas.
   - Alternativa `<noscript>` completamente funcional para robots de indexación y entornos sin JavaScript.

---

## ✨ Características Principales

- **Consola Interactiva Completa**:
  - Autocompletado con tecla `Tab`.
  - Historial de comandos navegable con las flechas `↑` y `↓`.
  - Atajo rápido `Ctrl + L` para limpiar la salida de la terminal.
  - Enlaces de comandos clicables directamente en la pantalla (`[data-c]`).
  - El comando `clear` mantiene permanentemente el banner de bienvenida y la identidad del autor en pantalla, limpiando únicamente el historial de ejecuciones.
- **Soporte Bilingüe en Caliente (Español / English)**:
  - Selector segmentado en la cabecera fija y comando `lang [es|en]`.
  - Los comandos CLI se mantienen canónicos y universales (`help`, `projects`, `skills`, etc.) en ambos idiomas, evitando confusiones o rotura de atajos.
- **Aceleración Reactiva de Partículas (Wave Engine)**:
  - Lienzo `<canvas>` con partículas dinámicas interactuando con el cursor mediante repulsión elástica.
  - Al presionar `Enter` en cualquier comando, la banda acelera súbitamente su velocidad (`triggerBandBoost`) para dar respuesta táctil al input del usuario, desacelerando suavemente a velocidad normal en 2.5 a 3 segundos.
- **Previsualización Flotante de Proyectos (Inertial Preview Card)**:
  - Al pasar el cursor sobre cualquier proyecto (`.pj`), emerge una tarjeta flotante con degradados CSS únicos y física inercial de resorte que sigue al puntero.
- **Modos Claro y Oscuro**:
  - Detección automática de la preferencia del sistema operativo (`prefers-color-scheme`).
  - Comando `theme` y botón en la barra superior con persistencia en `localStorage`.

---

## 🏗 Arquitectura Modular

El proyecto se estructura bajo el patrón de **separación estricta de responsabilidades**:

```text
portfolio/
├── index.html                     # Esqueleto semántico, cabecera fija, SEO y JSON-LD
├── CV_Andreu_Marques_Goyes_ES.pdf # Currículum en PDF (Español)
├── CV_Andreu_Marques_Goyes_EN.pdf # Official Resume en PDF (English)
├── css/
│   ├── variables.css              # Variables de diseño, fuentes, tokens de color y temas
│   └── terminal.css               # Estilos de terminal, sugerencias, cabecera y canvas
└── js/
    ├── utils.js                   # Funciones puras de utilidad: esc(), cl(), pad(), sleep()
    ├── main.js                    # Inicialización (bootstrap, reloj en vivo, botones top)
    ├── terminal.js                # Motor de la CLI (historial, I/O, despacho y autocompletado)
    ├── data/
    │   ├── projects.js            # Base de datos de proyectos, stacks y métricas
    │   └── i18n.js                # Diccionarios bilingües y comandos canónicos
    ├── commands/
    │   ├── canonical.js           # Catálogo de comandos públicos y alias localizados
    │   └── easterEggs.js          # Huevos de pascua y utilidades Bash/Windows/memes
    └── components/
        ├── particles.js           # Motor de ondas de partículas con aceleración reactiva
        └── preview.js             # Tarjeta de previsualización flotante con inercia
```

---

## 🚀 Proyectos Destacados

Los datos de los proyectos se definen en [`js/data/projects.js`](file:///C:/Users/adria/orca/projects/portfolio/js/data/projects.js):

| ID | Proyecto | Stack Tecnológico | Métricas y Enfoque |
|:--:|:---|:---|:---|
| **1** | **PRAXEON** | Python 3.12, Docker, MCP, HMAC-SHA256, FastAPI, Pytest | *p50 ~ 0.22 ms · 293 tests passing*<br>Runtime determinista desacoplando propuestas estocásticas de LLMs mediante capacidades criptográficas y sandboxing OCI multicapa.<br>[Landing Page](https://andreuvm.github.io/praxeon/) · [GitHub Repo](https://github.com/AndreuVM/praxeon) |
| **2** | **MarQ PM** | TypeScript, React, Node.js, Express, MCP, SQLite, PWA | *Sprint 1-4 suites · WebSockets*<br>Plataforma de gestión de proyectos con colaboración nativa humano-IA, aislamiento multi-tenant por base de datos SQLite y servidor MCP.<br>[Landing Page](https://www.marqpm.com/) *(Repo Privado)* |
| **3** | **Unix Shell & VFS Simulator** | C, C++, POSIX API, GDB, Valgrind, Make | *Zero-leak Valgrind verificado · Sub-ms execution*<br>Shell tipo Unix desde cero con control de ciclo de vida de procesos y simulador de sistema de archivos virtual con tabla de inodos. |
| **4** | **Trie-Based Word Engine** | Java, Android SDK, Trie, Dynamic Regex, JUnit | *Búsquedas en O(L) · Latencia < 1 ms*<br>Estructura de prefijos Trie sobre decenas de miles de palabras en memoria y motor dinámico de anagramas. |
| **5** | **Capacity & Queue Engine** | Python, FastAPI, Scikit-Learn, Docker, SQL | *-28% tiempos de espera · E/S Asíncrona*<br>Microservicio asíncrono con regresión ML para predicción de rotación de mesas y asignación dinámica de capacidad en restauración. |

---

## ⌨ Catálogo de Comandos

### Comandos Canónicos (Públicos)

Estos comandos son visibles en la ayuda oficial (`help`), cuentan con autocompletado con `Tab` y sugerencias contextuales:

| Comando | Descripción |
|:---|:---|
| `help` | Muestra la lista de comandos disponibles y consejos de navegación. |
| `about` | Perfil técnico, filosofía de ingeniería y especialidades. |
| `skills` | Gráfico de barras ASCII con habilidades (Lenguajes, Kernel, Backend, DB, IA). |
| `projects` | Listado interactivo de proyectos técnicos destacados. |
| `open <1-5>` | Ficha técnica detallada, arquitectura, métricas y enlaces a GitHub o demos de un proyecto. |
| `neofetch` | Resumen del sistema estilo Unix con arte ASCII y ficha de capacidades. |
| `cv [es\|en]` | Visualización y descarga de currículums oficiales en PDF (Español / Inglés). |
| `hire` | Disponibilidad inmediata, modalidades de trabajo (remoto/presencial) y valor técnico. |
| `education` | Trayectoria académica formal en computación (DAM en UAX y Grado en UIB). |
| `experience` | Trayectoria profesional como desarrollador independiente y proyectos técnicos. |
| `contact` | Canales oficiales de contacto (email, teléfono, GitHub, LinkedIn). |
| `lang [es\|en]` | Alterna el idioma entre Español e Inglés en tiempo real sin recargar la página. |
| `theme` | Cambia entre el tema claro (editorial) y oscuro (cyberpunk/terminal). |
| `clear` | Limpia la pantalla de la terminal respetando el banner de bienvenida superior. |

### Huevos de Pascua Ocultos (Easter Eggs)

Para los usuarios y reclutadores más curiosos, la terminal implementa más de **30 comandos ocultos** con respuestas ingeniosas:

- **Utilidades Unix**: `pwd`, `ls`, `tree`, `cat <archivo>`, `touch <archivo>`, `top` / `htop`, `ps`, `chmod <permisos>`, `grep <patrón>`, `kill <señal>`, `ping <host>`, `curl` / `wget`, `man <cmd>`, `vim` / `vi` / `nvim`, `nano` / `emacs`.
- **Control de Versiones**: `git status`, `git log`, `git push` (intercepta `--force`), `git commit`.
- **Comandos de Windows**: `dir`, `ipconfig` / `ifconfig`, `systeminfo`, `tasklist`, `echo <texto>`.
- **Cultura Hacker & Memes**:
  - `sudo make me a sandwich` (el clásico meme de XKCD con renderizado en color).
  - `sudo hire-me` (acceso directo al expediente de contratación).
  - `:(){ :|:& };:` o `forkbomb` (interceptado con seguridad por cgroups de PRAXEON).
  - `sl` (locomotora ASCII en caso de equivocarse al escribir `ls`).
  - `cowsay <mensaje>` (vaca ASCII con aforismos de arquitectura limpia).
  - `doom` (guiño a WebAssembly y compilación retro).
  - `fortune` (citas célebres de Dijkstra, Torvalds, Stroustrup, Knuth, Kernighan y Pike).
  - `beer` / `cerveza` (jarra artesana celebrando un despliegue sin errores 500).
  - `coffee` (inyección de espresso doble reduciendo latencia p50).
  - `matrix` (flujo binario y determinismo).
  - `rm` (operación denegada por sandbox de mínimos privilegios).
  - `whoami`, `date`, `history`, `hola`, `hello`, `hi`.

---

## 💻 Despliegue y Ejecución Local

Dado que utiliza módulos ES nativos del navegador, para probar el proyecto de forma local basta con servir la carpeta mediante cualquier servidor estático:

### Opción 1: Python (recomendada)
```bash
# Python 3
python -m http.server 8000
```
Luego abre tu navegador en `http://localhost:8000`.

### Opción 2: Node.js (npx serve)
```bash
npx serve .
```

### Opción 3: VS Code / Cursor Live Server
Haz clic derecho en `index.html` y selecciona **Open with Live Server**.

### Despliegue en Producción
Compatible de forma inmediata con:
- **GitHub Pages** (directamente desde la rama `main` o `master`).
- **Cloudflare Pages**, **Vercel** o **Netlify** (sin necesidad de pasos de build o `dist`).

---

## 📬 Contacto y Enlaces

- **Autor**: Andreu Marquès Goyes
- **Email**: [andreuvaleria25@gmail.com](mailto:andreuvaleria25@gmail.com)
- **Teléfono**: [+34 640 142 281](tel:+34640142281)
- **GitHub**: [github.com/AndreuVM](https://github.com/AndreuVM)
- **LinkedIn**: [linkedin.com/in/andreuvm](https://linkedin.com/in/andreuvm)
- **Ubicación**: Palma de Mallorca, España (disponible para trabajo presencial o remoto internacional)

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE). Puedes utilizar el diseño y la estructura como inspiración para tu propio portfolio personal.
