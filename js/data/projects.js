/**
 * Proyectos destacados con métricas reales y soporte bilingüe
 */

export const PROJECTS = [
  {
    id: 1,
    slug: 'praxeon',
    name: {
      es: 'PRAXEON: Runtime de Supervisión y Seguridad para Agentes IA',
      en: 'PRAXEON: Runtime Supervision & Security for AI Agents'
    },
    tag: 'Python · Docker · MCP · HMAC · FastAPI',
    gradA: '#10ac84',
    gradB: '#01a3a4',
    plateCode: 'P-001 // SEC-RUNTIME',
    tests: '293 tests passing',
    latency: 'p50 ~ 0.22 ms',
    desc: {
      es: 'Middleware determinista que desacopla propuestas estocásticas de LLMs de la ejecución física mediante capacidades efímeras HMAC-SHA256 y almacén durable anti-replay.\nImplementa sandboxing multicapa (contenedores OCI --read-only y jail local anti-traversal/SSRF), servidor nativo MCP y suite de benchmarks reproducibles.',
      en: 'Deterministic middleware decoupling stochastic LLM proposals from physical execution via time-bounded HMAC-SHA256 capabilities and durable anti-replay nonce storage.\nImplements multi-tier sandboxing (OCI containers with --read-only and local jail mitigating symlink traversal/SSRF), native MCP server, and empirical benchmarks.'
    },
    stack: 'Python 3.12, Docker, Model Context Protocol (MCP), HMAC-SHA256, FastAPI, Pytest',
    repo: 'https://github.com/AndreuVM/praxeon',
    demo: 'https://andreuvm.github.io/praxeon/',
    image: 'assets/praxeon-preview.png',
    imagePosition: 'top center'
  },
  {
    id: 2,
    slug: 'marq',
    aliases: ['marq-pm'],
    name: {
      es: 'MarQ PM: Plataforma de Gestión de Proyectos Humano-IA',
      en: 'MarQ PM: Human-AI Collaborative Project Management Platform'
    },
    tag: 'TypeScript · React · MCP · Node/Express · SQLite · PWA',
    gradA: '#1e293b',
    gradB: '#0f766e',
    plateCode: 'P-002 // COLLAB-AI-PM',
    tests: 'Sprint 1-4 & E2E suites passing',
    latency: 'WebSocket / Real-Time Sync',
    desc: {
      es: 'Plataforma integral de gestión de proyectos diseñada para colaboración fluida humano-IA con servidor nativo Model Context Protocol (MCP).\nAislamiento físico multi-tenant con SQLite dedicado por cuenta (Database-per-Account), sincronización bidireccional en tiempo real con WebSockets, y Progressive Web App reactiva con tablero Kanban.',
      en: 'Comprehensive project management platform designed for seamless human-AI collaboration featuring native Model Context Protocol (MCP) server integration.\nPhysical multi-tenant isolation via dedicated SQLite per account (Database-per-Account), bidirectional real-time synchronization over WebSockets, and reactive PWA with Kanban drag-and-drop.'
    },
    stack: 'TypeScript, React, Vite, Node.js, Express, Model Context Protocol (MCP), SQLite, WebSockets, TailwindCSS, PWA',
    repo: null,
    demo: 'https://www.marqpm.com/',
    image: 'assets/marq-preview.png',
    imagePosition: 'top center'
  },
  {
    id: 3,
    slug: 'unix-shell-vfs',
    name: {
      es: 'Shell Unix Personalizada & Simulador de Sistema de Archivos',
      en: 'Custom Unix Shell & Virtual File System Simulator'
    },
    tag: 'C/C++ · Linux Systems · POSIX · Valgrind',
    gradA: '#ee5253',
    gradB: '#ff9f43',
    plateCode: 'P-003 // KERNEL-VFS',
    tests: 'Zero-leak Valgrind verified',
    latency: 'Sub-millisecond execution',
    desc: {
      es: 'Shell tipo Unix construida desde cero con gestión de ciclo de vida de procesos (fork, exec, signals) y memoria zero-leak validada exhaustivamente con Valgrind.\nSimulador de file system virtual con asignación por bloques en disco, tabla de inodos, resolución recursiva de rutas y permisos POSIX multinivel.',
      en: 'Unix-like shell built from scratch featuring custom process lifecycle management (fork, exec, signals) and zero-leak memory verified with Valgrind.\nVirtual file system simulator with block-based disk allocation, inode pointers, recursive path resolution, and multi-tier POSIX permission validations.'
    },
    stack: 'C, C++, Linux Systems Programming, POSIX API, GDB, Valgrind, Make',
    repo: 'https://github.com/AndreuVM',
    demo: null
  },
  {
    id: 4,
    slug: 'trie-word-engine',
    name: {
      es: 'Motor de Palabras y Diccionario de Alto Rendimiento',
      en: 'High-Performance Trie-Based Dictionary & Word Engine'
    },
    tag: 'Java · Android SDK · Estructuras de Datos · Regex',
    gradA: '#5f27cd',
    gradB: '#341f97',
    plateCode: 'P-004 // ALGO-TRIE',
    tests: 'Benchmark O(L) lookups',
    latency: 'Latency < 1 ms',
    desc: {
      es: 'Estructura en árbol de prefijos (Trie) optimizada para búsquedas de diccionario en O(L) sobre decenas de miles de palabras en memoria.\nMódulo de coincidencia de patrones con compilación dinámica de Regex para validación y filtrado de anagramas con latencia submilisegundo.',
      en: 'Optimized prefix tree (Trie) data structure to perform O(L) dictionary lookups across tens of thousands of words in memory.\nHigh-throughput pattern matching module utilizing dynamic Regex compilation to validate anagram permutations with sub-millisecond execution latency.'
    },
    stack: 'Java, Android SDK, Estructuras de Datos Avanzadas (Trie), Dynamic Regex, JUnit',
    repo: 'https://github.com/AndreuVM',
    demo: null
  },
  {
    id: 5,
    slug: 'capacity-queue-engine',
    name: {
      es: 'Motor Inteligente de Optimización de Capacidad y Colas',
      en: 'Smart Restaurant Capacity & Queue Optimization Engine'
    },
    tag: 'Python · FastAPI · Scikit-Learn · Docker · SQL',
    gradA: '#2e86de',
    gradB: '#0abde3',
    plateCode: 'P-005 // ML-OPT-QUEUE',
    tests: '-28% tiempos de espera / wait times',
    latency: 'Async I/O concurrente',
    desc: {
      es: 'Microservicio asíncrono con modelo de regresión de Machine Learning para predecir rotación de mesas y asignación dinámica de capacidad, reduciendo esperas en un 28%.\nServicios contenedorizados con Docker y APIs REST de alta concurrencia con validación de esquemas y telemetría JSON estructurada.',
      en: 'Asynchronous backend service with ML regression predicting table turn-times to optimize seat allocation, reducing customer wait times by 28%.\nContainerized services with Docker and high-concurrency REST APIs with automated schema validation and structured JSON telemetry.'
    },
    stack: 'Python, FastAPI, Scikit-Learn, Docker, PostgreSQL / SQL, Pydantic, Asynchronous I/O',
    repo: 'https://github.com/AndreuVM',
    demo: null
  }
];
