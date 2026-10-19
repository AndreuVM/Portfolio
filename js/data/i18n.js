/**
 * Textos bilingües y constantes para la interfaz de línea de comandos (CLI)
 */

import { cl, esc } from '../utils.js';

// Botones de acceso rápido disponibles en el banner
export const CLI_BUTTONS = [
  'help', 'about', 'skills', 'projects', 'neofetch', 'cv', 'hire', 'contact'
];

// Comandos canónicos para autocompletado y sugerencias (oculta los easter eggs)
export const CANONICAL_CMDS = [
  'help', 'about', 'skills', 'projects', 'open', 'neofetch', 
  'cv', 'hire', 'education', 'experience', 'contact', 'lang', 'theme', 'clear'
];

// Diccionarios bilingües: contenido localizado, comandos siempre canónicos
export const I18N = {
  es: {
    pageTitle: 'Andreu Marquès Goyes — Ingeniero Backend y de Sistemas | Portfolio',
    metaDesc: 'Portfolio interactivo de Andreu Marquès Goyes. Ingeniero Backend y de Sistemas especializado en APIs de alta concurrencia, sandboxing de agentes IA, arquitectura de datos y bajo nivel.',
    srTitle: 'Andreu Marquès Goyes — Ingeniero Backend y de Sistemas',
    srDesc: 'Especialista en APIs de alta concurrencia, sandboxing seguro de agentes IA, arquitectura de datos y programación de sistemas en Linux y C/C++.',
    srNav: ['Sobre mí', 'Proyectos', 'Habilidades', 'Contacto'],
    promptUser: 'visitante@andreu',
    inputPlaceholder: 'Escribe un comando (ej: help, projects, about)...',
    inputAria: 'Línea de comandos',
    status: 'disponible',
    statusTitle: 'Disponible para incorporación presencial o remota',
    topTitle: 'andreu.marques — portfolio v1.2',
    bannerSub: 'Ingeniero Backend / Sistemas · <span class="hl-k">APIs Concurrentes</span>, <span class="hl-k">Sandboxing IA</span> & <span class="hl-k">Arquitectura de Datos</span>',
    welcomeLine1: 'Bienvenido/a. Estás explorando el portfolio de <span class="h-name">Andreu Marquès Goyes</span>.',
    welcomeLine2: 'Terminal interactiva <span class="hl-k">[CLI]</span>. Escribe <span class="hl-u">' + cl('help') + '</span> o pulsa un botón para explorar.',
    nextSug: '→ sugerido: ',
    helpHeader: 'comandos disponibles',
    helpRows: [
      ['about', 'perfil técnico y filosofía de ingeniería'],
      ['skills', 'tecnologías, sistemas, backend e IA'],
      ['projects', 'proyectos destacados con métricas reales'],
      ['open <n>', 'ficha técnica detallada del proyecto (1-5)'],
      ['neofetch', 'resumen rápido estilo sistema Unix'],
      ['cv', 'ver y descargar currículum en PDF (ES / EN)'],
      ['hire', 'disponibilidad, modalidades y propuesta de valor'],
      ['education', 'fundamentos universitarios DAM y UIB'],
      ['experience', 'trayectoria profesional y freelance'],
      ['contact', 'email, teléfono, GitHub y LinkedIn'],
      ['lang [es|en]', 'cambiar el idioma del portfolio'],
      ['theme', 'alternar modo claro y oscuro'],
      ['clear', 'limpiar la pantalla de la terminal']
    ],
    helpHint: 'Tab autocompleta · ↑ ↓ historial · Pulsa sobre cualquier comando para ejecutarlo.',
    about: [
      '<span class="h">about.txt // Andreu Marquès Goyes</span>',
      'Ingeniero de <span class="hl-u">Backend y Sistemas</span> con base sólida en Ciencias de la Computación.',
      'Me especializo en diseñar software donde el rendimiento, la fiabilidad y la seguridad no son negociables:',
      '',
      '• <span class="hl-k">Sandboxing & Supervisión IA:</span> Runtime determinista desacoplando propuestas estocásticas mediante HMAC-SHA256, jail OCI y servidores nativos MCP.',
      '• <span class="hl-k">Programación de Sistemas:</span> Llamadas al sistema POSIX, concurrencia multihilo, ciclo de vida de procesos y memoria zero-leak auditada en Valgrind.',
      '• <span class="hl-k">Arquitectura Backend:</span> APIs RESTful asíncronas de alta concurrencia, microservicios, optimización de queries e integridad ACID.',
      '',
      'Resido en Palma de Mallorca (España) y estoy <span class="h-name">disponible para incorporación presencial o remota</span>.',
      '',
      '<span class="m">→ siguientes pasos:</span> ' + cl('projects') + ' · ' + cl('skills') + ' · ' + cl('cv') + ' · ' + cl('hire')
    ],
    skillsHeader: 'habilidades técnicas',
    skillGroups: [
      {
        title: 'LENGUAJES DE PROGRAMACIÓN',
        items: [['C', 8], ['C++', 8], ['Python', 9], ['Java', 8], ['SQL', 8], ['Bash / Shell', 8], ['Dart / Flutter', 7], ['Ensamblador 68k', 6]]
      },
      {
        title: 'SISTEMAS, KERNEL & OBSERVABILIDAD',
        items: [['Linux / POSIX', 9], ['Gestión Memoria', 9], ['Procesos & Señales', 8], ['Docker / OCI', 8], ['Valgrind / Debug', 8], ['Telemetría & Logs', 8]]
      },
      {
        title: 'BACKEND, CONCURRENCIA & CLOUD',
        items: [['FastAPI', 9], ['E/S Asíncrona', 9], ['Concurrencia / Hilos', 8], ['APIs RESTful', 9], ['Microservicios', 8], ['Spring Boot', 7]]
      },
      {
        title: 'BASES DE DATOS & ALMACENAMIENTO',
        items: [['PostgreSQL', 8], ['Diseño ACID', 8], ['Optimiz. Queries', 8], ['Indexación B-Trees', 8], ['Oracle / MySQL', 7]]
      },
      {
        title: 'IA APLICADA, SANDBOXING & TOOLING',
        items: [['Servidores MCP', 9], ['Flujos Agénticos', 9], ['HMAC Sandboxing', 9], ['LLM Tooling', 8]]
      }
    ],
    projectsHeader: 'proyectos técnicos destacados',
    projectsFooter: '<span class="m">→ escribe </span>' + cl('open 1', 'open &lt;1-5&gt;') + '<span class="m"> o haz clic en cualquier fila para abrir la ficha técnica.</span>',
    openUsageError: '<span class="e">uso: open &lt;1-5&gt;</span>  (ej: ' + cl('open 1') + ' o mira ' + cl('projects') + ')',
    openStackLabel: 'stack tecnológico:',
    openMetricsLabel: 'métricas & validación:',
    openLinksLabel: 'enlaces:',
    cvTitle: 'currículum vitae // descargas oficiales',
    cvPrompt: [
      'Currículum actualizado disponible en dos idiomas con métricas y trayectoria detallada:',
      '',
      '  [1] ' + '<a class="c" href="CV_Andreu_Marques_Goyes_ES.pdf" target="_blank" download>CV_Andreu_Marques_Goyes_ES.pdf ↗ (Español)</a>',
      '  [2] ' + '<a class="c" href="CV_Andreu_Marques_Goyes_EN.pdf" target="_blank" download>CV_Andreu_Marques_Goyes_EN.pdf ↗ (English)</a>',
      '',
      '<span class="m">Tip: Escribe </span>' + cl('cv es') + '<span class="m"> o </span>' + cl('cv en') + '<span class="m"> para abrir el documento directamente en una nueva pestaña.</span>'
    ],
    hireTitle: 'disponibilidad & propuesta de valor // contratación',
    hireContent: [
      '<b>Estado actual:</b> <span class="h">Disponible para incorporación inmediata</span>',
      '<b>Modalidades:</b> Presencial en <span class="hl-u">Palma de Mallorca</span> · Híbrido · Remoto completo',
      '<b>Roles idóneos:</b> <span class="hl-k">Backend Software Engineer</span> · <span class="hl-k">Systems Engineer</span> · <span class="hl-k">AI Infrastructure / Tooling Developer</span>',
      '',
      '<b>¿Por qué trabajar conmigo?</b>',
      '• <b class="hl-k">Criterio de ingeniería real:</b> Entiendo lo que ocurre bajo la abstracción (ciclo de reloj, llamadas al sistema, gestión de memoria y red).',
      '• <b class="hl-k">Seguridad y determinismo:</b> Diseñé PRAXEON para resolver el problema del sandboxing estocástico en agentes de IA con capacidades criptográficas HMAC-SHA256.',
      '• <b class="hl-k">Código limpio y verificado:</b> Cobertura de tests estricta (Pytest, Valgrind zero-leak, benchmarks empíricos p50 ~0.22ms).',
      '',
      '<span class="m">→ Contacto directo:</span> ' + cl('contact') + ' · o escribe a <a class="c" href="mailto:andreuvaleria25@gmail.com">andreuvaleria25@gmail.com</a>'
    ],
    educationTitle: 'educación & fundamentos en computación',
    educationContent: [
      '<b>Universidad Alfonso X el Sabio (UAX)</b> [2025 – Presente]',
      '<span class="hl-k">Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)</span> · Madrid / Remoto',
      'Especialización en arquitectura backend empresarial, bases de datos relacionales, concurrencia y pipelines de IA.',
      '',
      '<b>Universitat de les Illes Balears (UIB)</b> [2020 – 2024]',
      '<span class="hl-k">Grado en Ingeniería Informática</span> (96 ECTS superados – Fundamentos de Computación)',
      'Formación rigurosa: Algoritmia y Estructuras de Datos I y II (Notables), Programación I (<span class="hl-u">Sobresaliente 9,2</span>), Sistemas Operativos I, Estructura de Computadores I y II, Ingeniería del Software, Matemáticas (Cálculo, Álgebra, Estadística).'
    ],
    experienceTitle: 'experiencia técnica y trayectoria',
    experienceContent: [
      '<b>Desarrollador de Software Independiente & Backend</b> [2020 – Presente]',
      'Palma de Mallorca, España · <span class="hl-k">Freelance</span>',
      '• Diseño y despliegue de soluciones de software y web a medida para clientes.',
      '• Arquitecturas modulares, integraciones de bases de datos, APIs y control de versiones con Git.',
      '',
      '<b>Revomon</b> [Jun 2022 – Feb 2023]',
      '<span class="hl-k">Technical Artist 3D y Optimización de Assets</span> · Remoto',
      '• Optimización de recursos digitales bajo restricciones estrictas de rendimiento y memoria en tiempo real.',
      '• Desarrollo de scripts de automatización para pipelines técnicos de producción.'
    ],
    contactTitle: 'contacto & perfiles profesionales',
    contactContent: [
      'email     <a class="c" href="mailto:andreuvaleria25@gmail.com">andreuvaleria25@gmail.com</a>',
      'tel       <a class="c" href="tel:+34640142281">+34 640 142 281</a>',
      'github    <a class="c" href="https://github.com/AndreuVM" target="_blank" rel="noopener">github.com/AndreuVM ↗</a>',
      'linkedin  <a class="c" href="https://linkedin.com/in/andreuvm" target="_blank" rel="noopener">linkedin.com/in/andreuvm ↗</a>',
      'ubicación Palma de Mallorca, España (<span class="hl-k">Presencial / Remoto</span>)',
      '',
      '<span class="m">Respondo habitualmente en menos de 24 horas.</span>'
    ],
    neofetchTitle: 'andreu@systems',
    neofetchFields: [
      ['host', 'Andreu Marquès Goyes'],
      ['rol', 'Ingeniero Backend / Sistemas'],
      ['especialidad', 'APIs Concurrencia · Sandboxing IA · POSIX'],
      ['lenguajes', 'C/C++ · Python · Java · SQL · Bash'],
      ['sistemas', 'Linux / Unix Internals · Docker · OCI'],
      ['uptime', '5+ años construyendo software'],
      ['formacion', 'UIB (Ing. Informática) + UAX (DAM)'],
      ['ubicacion', 'Palma de Mallorca, España'],
      ['estado', '<span class="h">Disponible 2026</span>']
    ],
    notFound: c => `<span class="e">${esc(c)}: comando no encontrado.</span>`,
    didYouMean: s => `  ¿Quisiste decir ${cl(s)}?`,
    tryHelp: `  Prueba con ${cl('help')}.`
  },
  en: {
    pageTitle: 'Andreu Marquès Goyes — Backend & Systems Engineer | Portfolio',
    metaDesc: 'Interactive CLI portfolio of Andreu Marquès Goyes. Backend & Systems Engineer specialized in high-concurrency APIs, AI agent sandboxing, data architecture, and low-level systems.',
    srTitle: 'Andreu Marquès Goyes — Backend & Systems Engineer',
    srDesc: 'Specialized in high-concurrency APIs, secure AI agent sandboxing, data architecture, and Linux/C/C++ systems programming.',
    srNav: ['About', 'Projects', 'Skills', 'Contact'],
    promptUser: 'visitor@andreu',
    inputPlaceholder: 'Type a command (e.g.: help, projects, about)...',
    inputAria: 'Terminal command input',
    status: 'available',
    statusTitle: 'Available for on-site or remote roles',
    topTitle: 'andreu.marques — portfolio v1.2',
    bannerSub: 'Backend / Systems Engineer · <span class="hl-k">High-Concurrency APIs</span>, <span class="hl-k">AI Sandboxing</span> & <span class="hl-k">Data Architecture</span>',
    welcomeLine1: 'Welcome. You are exploring the portfolio of <span class="h-name">Andreu Marquès Goyes</span>.',
    welcomeLine2: 'Interactive terminal <span class="hl-k">[CLI]</span>. Type <span class="hl-u">' + cl('help') + '</span> or click any button to explore.',
    nextSug: '→ suggested: ',
    helpHeader: 'available commands',
    helpRows: [
      ['about', 'technical background and engineering philosophy'],
      ['skills', 'core technologies, low-level systems, backend & AI'],
      ['projects', 'featured technical projects with real-world metrics'],
      ['open <n>', 'detailed engineering sheet of project (1-5)'],
      ['neofetch', 'quick Unix-like system summary card'],
      ['cv', 'view and download official resume in PDF (EN / ES)'],
      ['hire', 'availability, employment models & value proposition'],
      ['education', 'academic foundations in CS at UIB & UAX'],
      ['experience', 'professional career & freelance software engineering'],
      ['contact', 'email, phone, GitHub and LinkedIn profiles'],
      ['lang [en|es]', 'toggle portfolio language'],
      ['theme', 'toggle light / dark theme'],
      ['clear', 'clear terminal screen']
    ],
    helpHint: 'Tab auto-completes · ↑ ↓ command history · Click any command to execute it.',
    about: [
      '<span class="h">about.txt // Andreu Marquès Goyes</span>',
      'Backend and Systems Engineer with a solid foundation in Computer Science.',
      'I specialize in building software where performance, reliability, and security are non-negotiable:',
      '',
      '• <span class="hl-k">AI Execution Sandboxing & Supervision:</span> Deterministic runtime decoupling stochastic proposals via HMAC-SHA256, OCI jails, and native MCP servers.',
      '• <span class="hl-k">Linux Systems Programming:</span> POSIX syscalls, multithreading, process lifecycle, zero-leak memory audited with Valgrind.',
      '• <span class="hl-k">High-Concurrency Backend Architecture:</span> Asynchronous RESTful APIs, microservices, query tuning, and ACID transactional integrity.',
      '',
      'Based in Palma de Mallorca, Spain. <span class="h-name">Available for on-site, hybrid, or remote roles worldwide</span>.',
      '',
      '<span class="m">→ next steps:</span> ' + cl('projects') + ' · ' + cl('skills') + ' · ' + cl('cv') + ' · ' + cl('hire')
    ],
    skillsHeader: 'technical skills & toolchain',
    skillGroups: [
      {
        title: 'PROGRAMMING LANGUAGES',
        items: [['C', 8], ['C++', 8], ['Python', 9], ['Java', 8], ['SQL', 8], ['Bash / Shell', 8], ['Dart / Flutter', 7], ['68k Assembly', 6]]
      },
      {
        title: 'SYSTEMS, KERNEL & OBSERVABILITY',
        items: [['Linux / POSIX', 9], ['Memory Mgmt', 9], ['Process & Signals', 8], ['Docker / OCI', 8], ['Valgrind / Debug', 8], ['Telemetry & Logs', 8]]
      },
      {
        title: 'BACK-END, CONCURRENCY & CLOUD',
        items: [['FastAPI', 9], ['Async I/O', 9], ['Multithreading', 8], ['RESTful APIs', 9], ['Microservices', 8], ['Spring Boot', 7]]
      },
      {
        title: 'DATABASES & STORAGE',
        items: [['PostgreSQL', 8], ['ACID Design', 8], ['Query Tuning', 8], ['B-Trees Indexing', 8], ['Oracle / MySQL', 7]]
      },
      {
        title: 'AI TOOLING & AGENTIC SANDBOXING',
        items: [['MCP Servers', 9], ['Agentic Flows', 9], ['HMAC Sandboxing', 9], ['LLM Tooling', 8]]
      }
    ],
    projectsHeader: 'featured technical projects',
    projectsFooter: '<span class="m">→ type </span>' + cl('open 1', 'open &lt;1-5&gt;') + '<span class="m"> or click any row to open the full technical sheet.</span>',
    openUsageError: '<span class="e">usage: open &lt;1-5&gt;</span>  (e.g.: ' + cl('open 1') + ' or inspect ' + cl('projects') + ')',
    openStackLabel: 'tech stack:',
    openMetricsLabel: 'metrics & benchmarks:',
    openLinksLabel: 'links:',
    cvTitle: 'curriculum vitae // official resume downloads',
    cvPrompt: [
      'Official resumes available in both English and Spanish with complete career benchmarks:',
      '',
      '  [1] ' + '<a class="c" href="CV_Andreu_Marques_Goyes_EN.pdf" target="_blank" download>CV_Andreu_Marques_Goyes_EN.pdf ↗ (English)</a>',
      '  [2] ' + '<a class="c" href="CV_Andreu_Marques_Goyes_ES.pdf" target="_blank" download>CV_Andreu_Marques_Goyes_ES.pdf ↗ (Español)</a>',
      '',
      '<span class="m">Tip: Run </span>' + cl('cv en') + '<span class="m"> or </span>' + cl('cv es') + '<span class="m"> to open the PDF directly in a new tab.</span>'
    ],
    hireTitle: 'availability & value proposition // hiring',
    hireContent: [
      '<b>Current Status:</b> <span class="h">Immediately available for hire</span>',
      '<b>Work Models:</b> On-site in <span class="hl-u">Palma de Mallorca</span> · Hybrid · Full Remote Worldwide',
      '<b>Ideal Roles:</b> <span class="hl-k">Backend Software Engineer</span> · <span class="hl-k">Systems Engineer</span> · <span class="hl-k">AI Infrastructure / Tooling Developer</span>',
      '',
      '<b>Why work with me?</b>',
      '• <b class="hl-k">Under-the-hood engineering:</b> Solid grounding in CS internals (clock cycles, memory allocation, syscalls, networking).',
      '• <b class="hl-k">Deterministic security:</b> Engineered PRAXEON to solve stochastic LLM execution risk using time-bounded HMAC capabilities.',
      '• <b class="hl-k">Robust, tested code:</b> Strict test discipline (Pytest suites, Valgrind zero-leak audits, empirical benchmarks p50 ~0.22ms).',
      '',
      '<span class="m">→ Direct contact:</span> ' + cl('contact') + ' · or email me at <a class="c" href="mailto:andreuvaleria25@gmail.com">andreuvaleria25@gmail.com</a>'
    ],
    educationTitle: 'academic foundations in computer science',
    educationContent: [
      '<b>Universidad Alfonso X el Sabio (UAX)</b> [2025 – Present]',
      '<span class="hl-k">Higher Vocational Degree in Multiplatform Application Development (DAM)</span> · Madrid / Remote',
      'Specialized in enterprise backend architectures, relational databases, concurrent programming, and AI pipelines.',
      '',
      '<b>Universitat de les Illes Balears (UIB)</b> [2020 – 2024]',
      '<span class="hl-k">B.S. in Computer Engineering</span> (96 ECTS Completed – Computer Science Foundations)',
      'Rigorous academic coursework: Algorithms & Data Structures I and II (Notable/Honors), Computer Programming I (<span class="hl-u">Grade: 9.2/10</span>), Operating Systems I, Computer Architecture I & II, Software Engineering, Applied Mathematics (Calculus, Linear Algebra, Statistics).'
    ],
    experienceTitle: 'professional trajectory & experience',
    experienceContent: [
      '<b>Independent Software & Backend Developer</b> [2020 – Present]',
      'Palma de Mallorca, Spain · <span class="hl-k">Freelance</span>',
      '• Engineered and deployed bespoke software and web solutions for independent clients.',
      '• Modular system architectures, database integrations, RESTful APIs, and Git version control.',
      '',
      '<b>Revomon</b> [Jun 2022 – Feb 2023]',
      '<span class="hl-k">Freelance 3D Technical Artist & Asset Optimization</span> · Remote',
      '• Optimized 3D digital assets under strict real-time memory and polygon budgets.',
      '• Developed automated validation scripts for technical production pipelines.'
    ],
    contactTitle: 'contact & professional profiles',
    contactContent: [
      'email     <a class="c" href="mailto:andreuvaleria25@gmail.com">andreuvaleria25@gmail.com</a>',
      'phone     <a class="c" href="tel:+34640142281">+34 640 142 281</a>',
      'github    <a class="c" href="https://github.com/AndreuVM" target="_blank" rel="noopener">github.com/AndreuVM ↗</a>',
      'linkedin  <a class="c" href="https://linkedin.com/in/andreuvm" target="_blank" rel="noopener">linkedin.com/in/andreuvm ↗</a>',
      'location  Palma de Mallorca, Spain (<span class="hl-k">Available for On-site or Remote</span>)',
      '',
      '<span class="m">Typically responding within 24 hours.</span>'
    ],
    neofetchTitle: 'andreu@systems',
    neofetchFields: [
      ['host', 'Andreu Marquès Goyes'],
      ['role', 'Backend / Systems Engineer'],
      ['focus', 'High Concurrency · AI Sandboxing · POSIX'],
      ['languages', 'C/C++ · Python · Java · SQL · Bash'],
      ['systems', 'Linux / Unix Internals · Docker · OCI'],
      ['uptime', '5+ years building software'],
      ['education', 'UIB (CS Foundations) + UAX (DAM)'],
      ['location', 'Palma de Mallorca, Spain'],
      ['status', '<span class="h">Available 2026</span>']
    ],
    notFound: c => `<span class="e">${esc(c)}: command not found.</span>`,
    didYouMean: s => `  Did you mean ${cl(s)}?`,
    tryHelp: `  Try ${cl('help')}.`
  }
};
