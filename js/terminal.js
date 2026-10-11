/**
 * Motor central de la terminal CLI (I/O, historial, autocompletado y despacho de comandos)
 */

import { sleep, esc, cl } from './utils.js';
import { I18N, CLI_BUTTONS, CANONICAL_CMDS } from './data/i18n.js';
import { createCanonicalCommands } from './commands/canonical.js';
import { createEasterEggCommands } from './commands/easterEggs.js';
import { triggerBandBoost } from './components/particles.js';

export function createTerminalEngine() {
  const $ = s => document.querySelector(s);
  const welcome = $('#welcome');
  const out = $('#out');
  const inp = $('#in');

  // Estado del idioma (persistido o detectado automáticamente)
  let curLang = localStorage.getItem('portfolio_lang') || 
    ((navigator.language && navigator.language.startsWith('en')) ? 'en' : 'es');

  let lastExecutedCmd = null;
  const hist = [];
  let hi = 0;
  let skip = false;
  let busy = false;

  // Contexto inyectado a los comandos
  const context = {
    getLang: () => curLang,
    setLanguage: (lang, rerun = true) => setLanguage(lang, rerun),
    clear: () => {
      out.innerHTML = '';
      lastExecutedCmd = null;
    },
    getHistory: () => hist
  };

  const canonicalCmds = createCanonicalCommands(context);
  const easterEggCmds = createEasterEggCommands(context, canonicalCmds);
  const ALL_COMMANDS = { ...canonicalCmds, ...easterEggCmds };

  // Imprimir líneas en la terminal con efecto de teletipo opcional
  async function print(lines, d = 22) {
    busy = true;
    for (const x of lines) {
      const e = document.createElement('div');
      e.className = 'l';
      e.innerHTML = x;
      out.appendChild(e);
      inp.scrollIntoView({ block: 'end' });
      if (!skip && d) await sleep(d);
    }
    busy = false;
    skip = false;
  }

  // Actualizar interfaz, accesibilidad y botones de sugerencias
  function updateUiLang() {
    const dict = I18N[curLang];
    document.documentElement.lang = curLang;
    localStorage.setItem('portfolio_lang', curLang);

    // Metadatos y Accesibilidad
    document.title = dict.pageTitle;
    const metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict.metaDesc);

    $('#sr-title').textContent = dict.srTitle;
    $('#sr-desc').textContent = dict.srDesc;
    $('#sr-nav-about').textContent = dict.srNav[0];
    $('#sr-nav-projects').textContent = dict.srNav[1];
    $('#sr-nav-skills').textContent = dict.srNav[2];
    $('#sr-nav-contact').textContent = dict.srNav[3];

    // Barra superior fija
    $('#top-title').textContent = dict.topTitle;
    $('#top-status').textContent = dict.status;
    $('#top-status').parentElement.setAttribute('title', dict.statusTitle);

    // Botones de selección de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === curLang);
    });

    // Prompt e Input
    $('#prompt-user').textContent = dict.promptUser;
    inp.placeholder = dict.inputPlaceholder;
    inp.setAttribute('aria-label', dict.inputAria);

    // Botones de sugerencias rápidas: siempre con comandos canónicos
    const sug = $('#sug');
    sug.innerHTML = '';
    CLI_BUTTONS.forEach(cmd => {
      const btn = document.createElement('button');
      btn.textContent = cmd;
      btn.dataset.c = cmd;
      sug.appendChild(btn);
    });
  }

  // Renderizar la pantalla de bienvenida y el banner permanente en #welcome
  async function renderWelcomeScreen(animateBoot = false) {
    welcome.innerHTML = '';
    if (animateBoot) {
      const b = document.createElement('div');
      b.className = 'l m';
      welcome.appendChild(b);
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        b.textContent = (curLang === 'es' ? 'cargando perfil  [' : 'loading profile  [') + 
          '█'.repeat(i) + '░'.repeat(steps - i) + '] ' + (i * 5) + '%';
        await sleep(24);
      }
      await sleep(80);
      b.textContent = (curLang === 'es' ? 'cargando perfil  [' : 'loading profile  [') + '█'.repeat(steps) + '] ok';
    }

    const dict = I18N[curLang];
    const bn = document.createElement('div');
    bn.className = 'ban';
    bn.innerHTML = 'andreu.marques';
    welcome.appendChild(bn);

    const welcomeLines = [
      `<span class="m">${dict.bannerSub}</span>`,
      '',
      dict.welcomeLine1,
      dict.welcomeLine2,
      `<span class="m">${dict.nextSug}</span>` + 
        cl('about') + ' · ' + cl('projects') + ' · ' + cl('skills') + ' · ' + cl('cv') + ' · ' + cl('hire'),
      ''
    ];

    if (animateBoot) {
      busy = true;
      for (const x of welcomeLines) {
        const e = document.createElement('div');
        e.className = 'l';
        e.innerHTML = x;
        welcome.appendChild(e);
        inp.scrollIntoView({ block: 'end' });
        if (!skip) await sleep(28);
      }
      busy = false;
      skip = false;
    } else {
      for (const line of welcomeLines) {
        const e = document.createElement('div');
        e.className = 'l';
        e.innerHTML = line;
        welcome.appendChild(e);
      }
    }
    inp.scrollIntoView({ block: 'end' });
  }

  // Cambio de idioma global en caliente
  async function setLanguage(newLang, rerunLast = true) {
    if (newLang !== 'es' && newLang !== 'en') return;
    skip = true;
    curLang = newLang;
    updateUiLang();

    // Actualizar pantalla de bienvenida permanente en el nuevo idioma
    await renderWelcomeScreen(false);

    // Si había un comando de contenido previamente abierto por el usuario, re-ejecutarlo en el nuevo idioma
    if (rerunLast && lastExecutedCmd) {
      const prevBase = lastExecutedCmd.trim().split(/\s+/)[0].toLowerCase();
      if (!['clear', 'limpiar', 'cls', 'lang', 'idioma', 'theme', 'tema', 'help', 'ayuda'].includes(prevBase)) {
        out.innerHTML = '';
        await run(lastExecutedCmd, false);
      } else {
        out.innerHTML = '';
      }
    } else {
      out.innerHTML = '';
    }

    inp.focus({ preventScroll: true });
  }

  // Ejecución de comandos CLI
  async function run(raw, trackLast = true) {
    const v = raw.trim();
    if (!v) return;
    triggerBandBoost();

    const dict = I18N[curLang];
    const e = document.createElement('div');
    e.className = 'l';
    e.innerHTML = `<span class="p"><b>${dict.promptUser}</b><span class="m">:~$</span></span> ${esc(v)}`;
    out.appendChild(e);

    hist.push(v);
    hi = hist.length;

    const [cmd, ...args] = v.split(/\s+/);
    const k = cmd.toLowerCase();
    const trimmed = v.toLowerCase();

    if (trackLast && !['help', 'ayuda', 'clear', 'limpiar', 'cls', 'theme', 'tema', 'lang', 'idioma'].includes(k)) {
      lastExecutedCmd = v;
    }
    let lines;

    if (v.includes(':(){') || trimmed === 'forkbomb' || trimmed === ':(){ :|:& };:') {
      lines = ALL_COMMANDS.forkbomb();
    } else if (trimmed === 'sudo hire-me' || trimmed === 'sudo hire') {
      lines = ALL_COMMANDS.hire();
    } else if (trimmed.startsWith('sudo make me a sandwich') || trimmed === 'sudo make sandwich') {
      lines = ALL_COMMANDS.sudo(['make', 'me', 'a', 'sandwich']);
    } else if (trimmed === 'make me a sandwich' || trimmed === 'make sandwich') {
      lines = ALL_COMMANDS.make(['me', 'a', 'sandwich']);
    } else if (ALL_COMMANDS[k]) {
      lines = ALL_COMMANDS[k](args);
    } else {
      const suggestion = CANONICAL_CMDS.find(n => n.startsWith(k));
      lines = [
        dict.notFound(cmd) + 
        (suggestion ? dict.didYouMean(suggestion) : dict.tryHelp)
      ];
    }

    await print(lines);
  }

  // Inicializar manejadores de eventos
  function bindEvents() {
    inp.addEventListener('keydown', e => {
      if (busy) skip = true;
      if (e.key === 'Enter') {
        const val = inp.value;
        inp.value = '';
        run(val);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const curr = inp.value.trim().toLowerCase();
        const matches = CANONICAL_CMDS.filter(n => n.startsWith(curr));
        if (curr && matches.length === 1) {
          inp.value = matches[0] + ' ';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hi > 0) inp.value = hist[--hi];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (hi < hist.length - 1) inp.value = hist[++hi];
        else { hi = hist.length; inp.value = ''; }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        canonicalCmds.clear();
      }
    });

    // Clics globales delegados (enlaces [data-c] y autofocus de terminal)
    document.addEventListener('click', e => {
      const targetCmd = e.target.closest('[data-c]');
      if (targetCmd) {
        run(targetCmd.dataset.c);
        inp.focus();
        return;
      }
      if (!e.target.closest('a, button, input')) {
        inp.focus();
      }
    });
  }

  return {
    get curLang() { return curLang; },
    getCurLang: () => curLang,
    run,
    setLanguage,
    updateUiLang,
    renderWelcomeScreen,
    bindEvents,
    canonicalCmds,
    focusInput: () => inp.focus({ preventScroll: true })
  };
}
