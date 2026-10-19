/**
 * Huevos de pascua y utilidades Unix / Windows (ocultos de la ayuda oficial)
 */

import { cl, esc } from '../utils.js';

export function createEasterEggCommands(context, canonical) {
  const easterEggs = {
    pwd: () => {
      const curLang = context.getLang();
      return [
        '/home/andreu/portfolio',
        `<span class="m">${curLang === 'es' 
          ? '(En la vida real: Palma de Mallorca, España · a un git push de cualquier lugar)' 
          : '(In physical reality: Palma de Mallorca, Spain · one git push away from anywhere)'}</span>`
      ];
    },

    cd: (args = []) => {
      const curLang = context.getLang();
      const target = (args[0] || '').toLowerCase();
      if (!target || target === '~') {
        return [`<span class="m">${curLang === 'es' ? 'Ya estás en tu directorio de inicio: /home/andreu' : 'Already at home directory: /home/andreu'}</span>`];
      }
      if (target.includes('/dev/null')) {
        return [`<span class="m">${curLang === 'es' ? 'Redirigiendo a /dev/null... Espera, este portfolio se construyó con almacenamiento persistente; aquí nada se descarta.' : 'Redirecting to /dev/null... Wait, this portfolio was built with persistent storage; nothing gets discarded here.'}</span>`];
      }
      if (target.includes('..') || target.startsWith('/') || target === '../') {
        return [
          `<span class="e">${curLang === 'es' ? 'cd: permiso denegado (0700).' : 'cd: permission denied (0700).'}</span>`,
          `<span class="m">${curLang === 'es' ? 'No se puede escapar del portfolio tan fácilmente sin explorar los proyectos primero. Prueba con ' : "You can't escape the portfolio that easily without checking out the projects first. Try "}</span>` + cl('projects')
        ];
      }
      return [
        `<span class="e">cd: ${esc(args.join(' '))}: ${curLang === 'es' ? 'No existe el directorio o está restringido por sandbox.' : 'Directory does not exist or is restricted by sandbox.'}</span>`
      ];
    },

    ls: () => [
      'about.txt      skills.txt      projects/       cv_es.pdf',
      'education.txt  experience.txt  contact.txt     cv_en.pdf'
    ],

    tree: () => {
      const curLang = context.getLang();
      return [
        '.',
        '├── about.txt',
        '├── skills.txt',
        '├── cv/',
        '│   ├── CV_Andreu_Marques_Goyes_ES.pdf',
        '│   └── CV_Andreu_Marques_Goyes_EN.pdf',
        '├── projects/',
        '│   ├── 01_praxeon/',
        '│   ├── 02_marq_pm/',
        '│   ├── 03_unix_shell_vfs/',
        '│   ├── 04_trie_word_engine/',
        '│   └── 05_restaurant_ml_queue/',
        '├── education.txt',
        '├── experience.txt',
        '└── contact.txt',
        '',
        `<span class="m">${curLang === 'es' ? '3 directorios, 8 archivos (prueba con ' + cl('projects') + ' o ' + cl('cat about.txt') + ')' : '3 directories, 8 files (try ' + cl('projects') + ' or ' + cl('cat about.txt') + ')'}</span>`
      ];
    },

    cat: (args = []) => {
      const curLang = context.getLang();
      const file = (args[0] || '').toLowerCase();
      if (!file) {
        return [`<span class="m">${curLang === 'es' ? 'uso: cat <archivo> (ej: cat about.txt, cat skills.txt)' : 'usage: cat <file> (e.g.: cat about.txt, cat skills.txt)'}</span>`];
      }
      if (/about|sobre/.test(file)) return canonical.about();
      if (/skill|habil/.test(file)) return canonical.skills();
      if (/project|proyec/.test(file)) return canonical.projects();
      if (/contact/.test(file)) return canonical.contact();
      if (/cv/.test(file)) return canonical.cv();
      if (/edu|form/.test(file)) return canonical.education();
      if (/exp/.test(file)) return canonical.experience();
      if (file.includes('passwd') || file.includes('shadow')) {
        return [
          `<span class="e">cat: ${esc(file)}: ${curLang === 'es' ? 'Permiso denegado (403).' : 'Permission denied (403).'}</span>`,
          `<span class="m">${curLang === 'es' 
            ? 'Buen intento, ethical hacker. Las credenciales están protegidas con HMAC-SHA256 en PRAXEON.' 
            : 'Nice try, ethical hacker. Credentials are HMAC-SHA256 protected in PRAXEON.'}</span>`
        ];
      }
      return [`<span class="e">cat: ${esc(file)}: ${curLang === 'es' ? 'no existe el archivo o directorio' : 'no such file or directory'}</span>`];
    },

    touch: (args = []) => {
      const curLang = context.getLang();
      return [
        `<span class="m">${curLang === 'es' 
          ? `touch: Creando ${esc(args.join(' ') || 'archivo')}... Tocar el sistema sin previo handshake no es de ingenieros de sistemas educados ;)` 
          : `touch: Creating ${esc(args.join(' ') || 'file')}... Touching the system without prior handshake isn't very polite systems behavior ;)`}</span>`
      ];
    },

    top: () => {
      const curLang = context.getLang();
      return [
        'top - ' + new Date().toLocaleTimeString(curLang === 'es' ? 'es-ES' : 'en-US') + ' up 5 years, 1 user, load average: 0.12, 0.08, 0.04',
        'Tasks: 3 total, 1 running, 2 sleeping, 0 stopped, 0 zombie',
        '%Cpu(s): 99.8 us,  0.2 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si',
        `MiB Mem : 32768.0 total, 16384.0 free, 16384.0 used (${curLang === 'es' ? 'Valgrind: 0 fugas' : 'Valgrind: 0 leaks'})`,
        '',
        '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
        ' 1337 andreu    20   0  524288  65536  32768 R  99.8   0.2  1420:12 andreu --mode=building-systems',
        '   42 root      20   0  131072  24576  16384 S   0.2   0.1   420:00 praxeon-daemon --sandbox=strict',
        '    1 system    20   0   16384   4096   2048 S   0.0   0.0    12:34 /sbin/init [Curiosity]'
      ];
    },

    ps: () => {
      const curLang = context.getLang();
      return [
        'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
        'andreu    1337 99.2  0.2 524288 65536 pts/0    R+   00:00  14:20 andreu-engine --focus-mode',
        'praxeon     42  0.2  0.1 131072 24576 ?        Ssl  00:00   4:20 praxeon --mcp-server --sandbox=oci',
        'root         1  0.0  0.0  16384  4096 ?        Ss   00:00   0:12 /sbin/init (sys_engineering)',
        `<span class="m">${curLang === 'es' ? 'Todos los procesos supervisados sin fugas de memoria (0 leaks).' : 'All processes monitored with zero memory leaks (0 leaks).'}</span>`
      ];
    },

    chmod: (args = []) => {
      const curLang = context.getLang();
      const raw = args.join(' ');
      if (raw.includes('777')) {
        return [
          `<span class="e">${curLang === 'es' ? 'chmod 777: ¡Violación de seguridad interceptada por PRAXEON!' : 'chmod 777: Security violation intercepted by PRAXEON!'}</span>`,
          `<span class="m">${curLang === 'es' ? 'En este portfolio respetamos estrictamente el Principio de Mínimo Privilegio (PoLP). Prueba con 0644 o 0755.' : 'In this portfolio we strictly enforce the Principle of Least Privilege (PoLP). Try 0644 or 0755.'}</span>`
        ];
      }
      return [
        `<span class="m">${curLang === 'es' ? 'Permisos actualizados para: ' : 'Permissions updated for: '}<b>${esc(raw || 'archivo')}</b>. ${curLang === 'es' ? '(Sandbox verificado)' : '(Sandbox verified)'}</span>`
      ];
    },

    grep: (args = []) => {
      const curLang = context.getLang();
      const pattern = args.join(' ');
      if (!pattern) {
        return [
          `<span class="m">${curLang === 'es' ? 'uso: grep <patrón> (ej: grep bugs, grep clean-code)' : 'usage: grep <pattern> (e.g.: grep bugs, grep clean-code)'}</span>`
        ];
      }
      return [
        `<span class="m">${curLang === 'es' 
          ? `grep: buscando "${esc(pattern)}" en el codebase... 0 bugs, 293 tests pasando, 100% determinismo.` 
          : `grep: searching "${esc(pattern)}" across codebase... 0 bugs, 293 tests passing, 100% determinism.`}</span>`
      ];
    },

    kill: (args = []) => {
      const curLang = context.getLang();
      const sig = args.join(' ') || '-9';
      return [
        `<span class="e">SIGKILL (${esc(sig)}) ${curLang === 'es' ? 'enviado.' : 'dispatched.'}</span>`,
        `<span class="m">${curLang === 'es' 
          ? 'El proceso ignoró la señal: las buenas arquitecturas son resilientes, se supervisan a sí mismas y se recuperan automáticamente.' 
          : 'The process ignored the signal: robust architectures are resilient, self-healing, and recover automatically.'}</span>`
      ];
    },

    ping: (args = []) => {
      const curLang = context.getLang();
      const target = esc(args[0] || 'andreu.dev');
      return [
        `PING ${target} (127.0.0.1) 56(84) bytes of data.`,
        `64 bytes from ${target} (127.0.0.1): icmp_seq=1 ttl=64 time=0.21 ms`,
        `64 bytes from ${target} (127.0.0.1): icmp_seq=2 ttl=64 time=0.22 ms`,
        `64 bytes from ${target} (127.0.0.1): icmp_seq=3 ttl=64 time=0.20 ms`,
        `--- ${target} ping statistics ---`,
        `3 packets transmitted, 3 received, 0% packet loss, time 2002ms`,
        'rtt min/avg/max/mdev = 0.201/0.212/0.224/0.009 ms (p50 PRAXEON baseline)',
        `<span class="m">${curLang === 'es' ? 'Conexión ultrarrápida y estable con Palma de Mallorca.' : 'Ultra-fast and stable connection to Palma de Mallorca.'}</span>`
      ];
    },

    curl: () => {
      const curLang = context.getLang();
      return [
        'HTTP/2 200 OK',
        'server: AndreuEngine/1.0 (Linux/x86_64)',
        'content-type: application/high-performance-code; charset=utf-8',
        'x-runtime-latency: 0.22ms',
        'x-memory-leaks: 0 (Valgrind verified)',
        'x-sandboxing: PRAXEON (HMAC-SHA256)',
        'cache-control: max-age=31536000, immutable',
        `<span class="m">${curLang === 'es' ? 'Recurso obtenido con éxito.' : 'Resource successfully fetched.'}</span>`
      ];
    },

    man: (args = []) => {
      const curLang = context.getLang();
      const page = (args[0] || 'andreu').toLowerCase();
      if (page === 'andreu') {
        return curLang === 'es' ? [
          'ANDREU(1)                   Manual del Desarrollador                   ANDREU(1)',
          '',
          '<span class="h">NOMBRE</span>',
          '    andreu - Ingeniero Backend y de Sistemas (Palma de Mallorca)',
          '',
          '<span class="h">SINOPSIS</span>',
          '    <b>andreu</b> [--hire] [--remote] [--systems] [--fastapi] [--cpp] [--coffee]',
          '',
          '<span class="h">DESCRIPCIÓN</span>',
          '    Diseña software donde el rendimiento, la concurrencia y la seguridad no',
          '    son negociables. Especialista en sandboxing determinista (PRAXEON),',
          '    APIs RESTful de baja latencia y programación a nivel de kernel/POSIX.',
          '',
          '<span class="h">OPCIONES</span>',
          '    <b>--hire</b>      Muestra disponibilidad inmediata para contratación.',
          '    <b>--remote</b>    Compatible con trabajo remoto internacional o presencial.',
          '',
          '<span class="h">BUGS</span>',
          '    0 conocidos tras compilar exhaustivamente con -Wall -Wextra -Werror.'
        ] : [
          'ANDREU(1)                   Developer\'s Manual                   ANDREU(1)',
          '',
          '<span class="h">NAME</span>',
          '    andreu - Backend & Systems Software Engineer (Palma de Mallorca)',
          '',
          '<span class="h">SYNOPSIS</span>',
          '    <b>andreu</b> [--hire] [--remote] [--systems] [--fastapi] [--cpp] [--coffee]',
          '',
          '<span class="h">DESCRIPTION</span>',
          '    Builds software where performance, concurrency, and security are',
          '    non-negotiable. Specializes in deterministic sandboxing (PRAXEON),',
          '    low-latency RESTful APIs, and kernel/POSIX systems programming.',
          '',
          '<span class="h">OPTIONS</span>',
          '    <b>--hire</b>      Display immediate availability for hire.',
          '    <b>--remote</b>    Compatible with worldwide remote or on-site roles.',
          '',
          '<span class="h">BUGS</span>',
          '    0 known bugs after compiling strictly with -Wall -Wextra -Werror.'
        ];
      }
      return [`man: ${esc(page)}: ${curLang === 'es' ? 'No hay entrada de manual para este comando. Prueba con ' : 'No manual entry for this command. Try '} ` + cl('help')];
    },

    vim: () => {
      const curLang = context.getLang();
      return [
        `<span class="h-name">${curLang === 'es' ? '¿Cómo salir de Vim?' : 'How do I exit Vim?'}</span>`,
        curLang === 'es'
          ? 'La leyenda de Stack Overflow dice que nadie sale vivo de :wq...'
          : 'Stack Overflow legend says no one ever truly exits :wq...',
        curLang === 'es'
          ? 'Por suerte para ti, esto es un navegador web.'
          : 'Lucky for you, this is a modern web browser.',
        `<span class="m">${curLang === 'es' ? 'Para recuperar el control de tu pantalla, escribe ' : 'To regain control of your screen, simply type '}</span>` + cl('clear') + `<span class="m">.</span>`
      ];
    },

    nano: () => {
      const curLang = context.getLang();
      return [
        `<span class="m">${curLang === 'es' 
          ? '¿Nano / Emacs? Por aquí preferimos NeoVim, makefiles limpios y llamadas POSIX directas.' 
          : 'Nano / Emacs? Around here we lean towards NeoVim, clean makefiles, and direct POSIX syscalls.'}</span>`,
        `<span class="m">${curLang === 'es' 
          ? 'Pero respetamos cualquier editor que no meta telemetría secreta.' 
          : "Though we respect any editor that doesn't inject secret telemetry."}</span>`
      ];
    },

    git: (args = []) => {
      const curLang = context.getLang();
      const sub = (args[0] || '').toLowerCase();
      const rest = args.slice(1).join(' ').toLowerCase();
      if (sub === 'status') {
        return [
          'On branch main',
          "Your branch is up to date with 'origin/production'.",
          `nothing to commit, working tree clean (${curLang === 'es' ? '0 fugas, 293 tests pasando' : '0 leaks, 293 tests passing'})`
        ];
      }
      if (sub === 'push') {
        if (rest.includes('--force') || rest.includes('-f')) {
          return [
            `<span class="e">${curLang === 'es' ? '¡¿Force push a main en producción?!' : 'Force push to main in production?!'}</span>`,
            `<span class="m">${curLang === 'es' 
              ? 'PRAXEON ha rechazado el webhook criptográfico. Abre una rama y crea un Pull Request como un ingeniero de verdad ;)' 
              : 'PRAXEON cryptographic webhook rejected the payload. Branch off and submit a proper Pull Request like a real engineer ;)'}</span>`
          ];
        }
        return [
          'Enumerating objects: 12, done.',
          'Counting objects: 100% (12/12), done.',
          'Writing objects: 100% (12/12), 4.21 KiB | 4.21 MiB/s, done.',
          'To github.com:AndreuVM/portfolio.git',
          '   9f3c2a1..e811b03  main -> main'
        ];
      }
      if (sub === 'commit') {
        return [
          '[main 9f3c2a1] feat(systems): implement zero-leak memory and deterministic sandboxing',
          ' 4 files changed, 293 insertions(+), 0 deletions(-)'
        ];
      }
      if (sub === 'log') {
        return [
          '<span style="color:#f2e24a">commit 9f3c2a1d48e7f92</span> (HEAD -> main, origin/main)',
          'Author: Andreu Marquès Goyes &lt;andreuvaleria25@gmail.com&gt;',
          'Date:   2026-10-10 19:46:00 +0200',
          '',
          '    feat(runtime): decouple LLM stochastic proposals via HMAC capabilities',
          '',
          '<span style="color:#f2e24a">commit 4a2b1c8e7d9f032</span>',
          'Author: Andreu Marquès Goyes &lt;andreuvaleria25@gmail.com&gt;',
          'Date:   2026-10-09 14:15:22 +0200',
          '',
          '    feat(systems): build zero-leak unix shell and vfs inode simulator'
        ];
      }
      return [
        'git version 2.45.0.sys',
        `<span class="m">${curLang === 'es' ? 'Subcomandos compatibles: git status, git log, git push, git commit' : 'Supported subcommands: git status, git log, git push, git commit'}</span>`
      ];
    },

    history: () => {
      const curLang = context.getLang();
      const hist = context.getHistory();
      if (!hist.length) {
        return [`<span class="m">${curLang === 'es' ? 'Historial vacío en esta sesión.' : 'Empty history in this session.'}</span>`];
      }
      return hist.map((item, idx) => `  ${String(idx + 1).padStart(3, ' ')}  ${esc(item)}`);
    },

    forkbomb: () => {
      const curLang = context.getLang();
      return [
        `<span class="e">${curLang === 'es' ? 'ALERTA: Intento de Fork Bomb detectado (:(){ :|:& };:)' : 'ALERT: Fork Bomb attempt detected (:(){ :|:& };:)'}</span>`,
        `<span class="m">${curLang === 'es' 
          ? 'Los límites de cgroups (pids.max=64) y el supervisor de procesos PRAXEON han interceptado la bifurcación exponencial.' 
          : 'cgroups limits (pids.max=64) and the PRAXEON process supervisor intercepted the exponential fork.'}</span>`,
        `<span class="m">${curLang === 'es' ? 'El sistema se mantiene frío y estable a 0.22ms.' : 'System remains cool, responsive, and stable at 0.22ms.'}</span>`
      ];
    },

    dir: () => {
      const curLang = context.getLang();
      return curLang === 'es' ? [
        ' El volumen de la unidad C es ANDREU_SYSTEMS',
        ' El número de serie del volumen es 2026-UIB-UAX',
        '',
        ' Directorio de C:\\Users\\andreu\\portfolio',
        '',
        '11/10/2026  01:50    &lt;DIR&gt;          .',
        '11/10/2026  01:50    &lt;DIR&gt;          ..',
        '11/10/2026  01:50         102.136   CV_Andreu_Marques_Goyes_ES.pdf',
        '11/10/2026  01:50         101.024   CV_Andreu_Marques_Goyes_EN.pdf',
        '11/10/2026  01:50    &lt;DIR&gt;          praxeon',
        '11/10/2026  01:50    &lt;DIR&gt;          marq-pm',
        '11/10/2026  01:50    &lt;DIR&gt;          unix-shell-vfs',
        '11/10/2026  01:50    &lt;DIR&gt;          trie-engine',
        '11/10/2026  01:50    &lt;DIR&gt;          restaurant-ml-queue',
        '               2 archivos        203.160 bytes',
        '               7 carpetas    982.144.000 bytes libres',
        '<span class="m">(Guiño a Windows. Puedes escribir ' + cl('projects') + ' o ' + cl('cv') + ' para abrirlos).</span>'
      ] : [
        ' Volume in drive C is ANDREU_SYSTEMS',
        ' Volume Serial Number is 2026-UIB-UAX',
        '',
        ' Directory of C:\\Users\\andreu\\portfolio',
        '',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          .',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          ..',
        '10/11/2026  01:50 AM         102,136   CV_Andreu_Marques_Goyes_ES.pdf',
        '10/11/2026  01:50 AM         101,024   CV_Andreu_Marques_Goyes_EN.pdf',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          praxeon',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          marq-pm',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          unix-shell-vfs',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          trie-engine',
        '10/11/2026  01:50 AM    &lt;DIR&gt;          restaurant-ml-queue',
        '               2 File(s)        203,160 bytes',
        '               7 Dir(s)     982,144,000 bytes free',
        '<span class="m">(Windows homage. You can type ' + cl('projects') + ' or ' + cl('cv') + ' to explore).</span>'
      ];
    },

    ipconfig: () => {
      const curLang = context.getLang();
      return curLang === 'es' ? [
        'Configuración IP de Windows / Adaptador Ethernet AndreuNet:',
        '   Sufijo DNS específico para la conexión. . : mallorca.local',
        '   Dirección IPv4. . . . . . . . . . . . . . : 127.0.0.1 (No hay lugar como localhost)',
        '   Máscara de subred . . . . . . . . . . . . : 255.255.255.0',
        '   Puerta de enlace predeterminada . . . . . : 192.168.1.1 (Palma de Mallorca, ES)',
        '   Estado del enlace . . . . . . . . . . . . : Listo para teletrabajo o presencial'
      ] : [
        'Windows IP Configuration / Ethernet adapter AndreuNet:',
        '   Connection-specific DNS Suffix  . . . . . : mallorca.local',
        '   IPv4 Address. . . . . . . . . . . . . . . : 127.0.0.1 (No place like localhost)',
        '   Subnet Mask . . . . . . . . . . . . . . . : 255.255.255.0',
        '   Default Gateway . . . . . . . . . . . . . : 192.168.1.1 (Palma de Mallorca, ES)',
        '   Link Status . . . . . . . . . . . . . . . : Ready for remote worldwide or on-site'
      ];
    },

    systeminfo: () => {
      const curLang = context.getLang();
      return curLang === 'es' ? [
        'Nombre de host:            ANDREU-RIG',
        'Nombre del SO:             Linux Hardened POSIX Kernel / Arch 6.10',
        'Fabricante del SO:         Andreu Marquès Goyes',
        'Configuración del SO:      Estación de trabajo de ingeniería de sistemas',
        'Tipo de compilación:       Release (-O3 -march=native -Wall -Wextra)',
        'Procesador(es):            1 procesador(es) instalado(s). [x86_64 High Concurrency]',
        'Memoria física total:      32.768 MB (Zero memory leaks auditada con Valgrind)',
        'Ubicación:                 Palma de Mallorca, España',
        'Revisiones (Hotfixes):     [Python 3.12, C++20, Docker OCI, FastAPI, MCP, Java]'
      ] : [
        'Host Name:                 ANDREU-RIG',
        'OS Name:                   Linux Hardened POSIX Kernel / Arch 6.10',
        'OS Manufacturer:           Andreu Marquès Goyes',
        'OS Configuration:          Systems Engineering Workstation',
        'Build Type:                Release (-O3 -march=native -Wall -Wextra)',
        'Processor(s):              1 Processor(s) Installed. [x86_64 High Concurrency]',
        'Total Physical Memory:     32,768 MB (Zero memory leaks Valgrind audited)',
        'Location:                  Palma de Mallorca, Spain',
        'Hotfix(es):                [Python 3.12, C++20, Docker OCI, FastAPI, MCP, Java]'
      ];
    },

    echo: (args = []) => {
      const curLang = context.getLang();
      const raw = args.join(' ');
      if (raw === '$PATH' || raw === '%PATH%') {
        return ['/usr/local/bin:/usr/bin/andreu:/opt/praxeon/bin:/dev/mallorca:/home/andreu/.cargo/bin'];
      }
      if (!raw) {
        return [curLang === 'es' ? 'ECHO está activado.' : 'ECHO is on.'];
      }
      return [esc(raw)];
    },

    tasklist: () => {
      const curLang = context.getLang();
      return [
        'Nombre de imagen               PID Nombre de sesión Núm. ses. Uso de memoria',
        '========================= ======== ================ =========== =============',
        'System Idle Process              0 Services                   0          8 KB',
        'System                           4 Services                   0        124 KB',
        'andreu_systems.exe            1337 Console                    1     64.212 KB',
        'praxeon_mcp.exe                420 Console                    1     24.150 KB',
        'svchost.exe                   4096 Services                   0    999.999 KB',
        'valgrind_auditor.exe          2026 Console                    1      4.096 KB',
        `<span class="m">${curLang === 'es' 
          ? 'svchost.exe consumiendo memoria como manda la tradición de Windows.' 
          : 'svchost.exe hogging RAM as per Windows tradition.'}</span>`
      ];
    },

    sl: () => {
      const curLang = context.getLang();
      return [
        '                      (  ) (@@) ( )  (@)  ()    @@    O',
        '                   (@@@)',
        '               (    )',
        '            (@@@@)',
        '          (   )',
        '       ++      +------',
        '       ||  .--"|',
        '     /===/     |',
        '    |===|      |           <span style="color:#f2e24a">(Steam Locomotive)</span>',
        `     \\===\\     |       Choo Choo! ${curLang === 'es' ? '¿Buscabas ls?' : 'Looking for ls?'}`,
        '      |===\\____|',
        '      (o)(o)  (o)(o)',
        `<span class="m">${curLang === 'es' ? 'El clásico error al teclear "ls" en Unix. Aquí tienes tu tren.' : 'The classic typo for "ls" in Unix. Here is your train.'}</span>`
      ];
    },

    cowsay: (args = []) => {
      const curLang = context.getLang();
      const text = args.join(' ') || (curLang === 'es' 
        ? 'Clean architecture, zero memory leaks y compilers felices.' 
        : 'Clean architecture, zero memory leaks, and happy compilers.');
      const line = '-'.repeat(text.length + 2);
      return [
        ` ${line}`,
        `&lt; ${esc(text)} &gt;`,
        ` ${line}`,
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||'
      ];
    },

    make: (args = []) => {
      const curLang = context.getLang();
      const str = args.join(' ').toLowerCase();
      if (str.includes('me a sandwich') || str.includes('sandwich')) {
        return [
          `<span class="e">${curLang === 'es' ? '¿Qué? Hazlo tú mismo. No eres root.' : 'What? Make it yourself. You are not root.'}</span>`,
          `<span class="m">${curLang === 'es' ? "(Prueba con '" + cl('sudo make me a sandwich') + "')" : "(Try '" + cl('sudo make me a sandwich') + "')"}</span>`
        ];
      }
      return [
        `<span class="m">${curLang === 'es' 
          ? 'make: *** No se especificó ningún objetivo y no se encontró ningún makefile. Alto.' 
          : 'make: *** No targets specified and no makefile found.  Stop.'}</span>`
      ];
    },

    beer: () => {
      const curLang = context.getLang();
      return [
        '    .~~~~.',
        '   i====i_',
        '   |    |_)   [ Cerveza artesana // Palma de Mallorca ]',
        '   |    |     Despliegue a producción sin errores 500.',
        '   `-==-\'',
        `<span class="m">${curLang === 'es' 
          ? '¡Salud! Una cerveza bien fresca para celebrar un despliegue exitoso a producción.' 
          : 'Cheers! A cold beer to celebrate a zero-error production deployment.'}</span>`
      ];
    },

    doom: () => {
      const curLang = context.getLang();
      return [
        '<span class="hl-u">DOOM (1993) // WebAssembly Port</span>',
        'Compiling ID Tech 1 engine into WebAssembly...',
        '[████████████████████] 100% OK',
        `<span class="m">${curLang === 'es' 
          ? 'Broma :) Pero PRAXEON y la shell POSIX de Andreu ejecutan con la misma adrenalina y cero lag.' 
          : "Just kidding :) But PRAXEON and Andreu's POSIX shell run with the same adrenaline and zero lag."}</span>`
      ];
    },

    fortune: () => {
      const curLang = context.getLang();
      const quotes = curLang === 'es' ? [
        ['Linus Torvalds', 'Hablar es barato. Enséñame el código.'],
        ['Edsger W. Dijkstra', 'Si depurar es el proceso de quitar fallos, programar debe ser el proceso de meterlos.'],
        ['Brian Kernighan', 'Depurar es el doble de difícil que escribir el código en primer lugar.'],
        ['Rob Pike', 'La simplicidad es requisito previo para la fiabilidad.'],
        ['Donald Knuth', 'La optimización prematura es la raíz de todos los males.'],
        ['Ken Thompson', 'No puedes confiar en código que no hayas creado totalmente tú mismo.'],
        ['Filosofía Unix', 'Haz una sola cosa y hazla bien.'],
        ['Bjarne Stroustrup', 'En C++ es más difícil dispararte en el pie, pero cuando lo haces, te vuelas la pierna entera.']
      ] : [
        ['Linus Torvalds', 'Talk is cheap. Show me the code.'],
        ['Edsger W. Dijkstra', 'If debugging is the process of removing bugs, then programming must be the process of putting them in.'],
        ['Brian Kernighan', 'Debugging is twice as hard as writing the code in the first place.'],
        ['Rob Pike', 'Simplicity is prerequisite for reliability.'],
        ['Donald Knuth', 'Premature optimization is the root of all evil.'],
        ['Ken Thompson', "You can't trust code that you did not totally create yourself."],
        ['Unix Philosophy', 'Do one thing and do it well.'],
        ['Bjarne Stroustrup', 'In C++, it is harder to shoot yourself in the foot, but when you do, it blows your whole leg off.']
      ];
      const [author, text] = quotes[Math.floor(Math.random() * quotes.length)];
      return [
        `"${text}"`,
        `<span class="m">        — ${author}</span>`
      ];
    },

    whoami: () => {
      const curLang = context.getLang();
      return [
        curLang === 'es'
          ? 'visitante. Con buen ojo técnico y curiosidad por el buen código.'
          : 'visitor. With an eye for solid engineering and systems craft.'
      ];
    },

    sudo: (args = []) => {
      const curLang = context.getLang();
      const full = args.join(' ').toLowerCase();
      if (full.includes('hire')) {
        return canonical.hire();
      }
      if (full.includes('sandwich')) {
        return [
          ' [==============================]  <span class="m">(Pan tostado)</span>',
          ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  <span style="color:#2ed573">(Lechuga fresca)</span>',
          ' ================================  <span style="color:#f2e24a">(Tomate & Queso derretido)</span>',
          ' ################################  <span style="color:#ee5253">(Filete jugoso)</span>',
          ' [==============================]  <span class="m">(Pan tostado)</span>',
          '',
          `<span class="h-name">Okay.</span> ${curLang === 'es' ? 'Aquí tienes tu sandwich recién compilado con privilegios de superusuario.' : 'Here is your fresh sandwich compiled with superuser privileges.'}`
        ];
      }
      return [
        curLang === 'es'
          ? '<span class="e">visitante no está en el archivo sudoers. Este incidente será reportado… a nadie.</span> (¿Buscabas ' + cl('sudo hire-me') + '?)'
          : '<span class="e">visitor is not in the sudoers file. This incident will be reported… to no one.</span> (Looking for ' + cl('sudo hire-me') + '?)'
      ];
    },

    coffee: () => {
      const curLang = context.getLang();
      return [
        '      ( (',
        '       ) )',
        '    ........',
        '    |      |]',
        '    \\      /',
        '     `----\'',
        `<span class="m">${curLang === 'es' ? 'Espresso doble inyectado en el runtime. Latencia p50 reducida a 0.05ms.' : 'Double espresso injected into runtime. p50 latency down to 0.05ms.'}</span>`
      ];
    },

    matrix: () => {
      const curLang = context.getLang();
      return [
        '<span style="color:#2ed573">01010000 01010010 01000001 01011000 01000101 01001111 01001110</span>',
        '<span style="color:#2ed573">Deterministic Sandboxing // Kernel POSIX // Memory Zero-Leak</span>',
        `<span class="m">${curLang === 'es' ? 'La realidad no es una ilusión cuando compila sin warnings con -Wall -Wextra -Werror.' : 'Reality is no illusion when it compiles warning-free with -Wall -Wextra -Werror.'}</span>`
      ];
    },

    rm: () => {
      const curLang = context.getLang();
      return [`<span class="e">${curLang === 'es' ? 'rm: operación denegada por el sandbox de seguridad PRAXEON.' : 'rm: operation denied by PRAXEON security sandbox.'}</span>`];
    },

    date: () => {
      const curLang = context.getLang();
      return [new Date().toLocaleString(curLang === 'es' ? 'es-ES' : 'en-US')];
    },

    hola: () => ['Hola. Escribe ' + cl('help') + ' para ver los comandos.'],
    hello: () => ['Hello! Type ' + cl('help') + ' to see all available commands.'],
    hi: () => ['Hello! Type ' + cl('help') + ' to see all available commands.']
  };

  // Alias adicionales
  easterEggs.htop = () => easterEggs.top();
  easterEggs.ifconfig = () => easterEggs.ipconfig();
  easterEggs.vi = easterEggs.nvim = () => easterEggs.vim();
  easterEggs.emacs = () => easterEggs.nano();
  easterEggs.wget = () => easterEggs.curl();
  easterEggs.cerveza = () => easterEggs.beer();
  easterEggs[':(){ :|:& };:'] = () => easterEggs.forkbomb();

  return easterEggs;
}
