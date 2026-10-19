/**
 * Catálogo de comandos canónicos CLI
 * help, about, skills, projects, open, cv, hire, education, experience, contact, neofetch, lang, theme, clear
 */

import { cl, esc, pad } from '../utils.js';
import { PROJECTS } from '../data/projects.js';
import { I18N } from '../data/i18n.js';

export function createCanonicalCommands(context) {
  const cmds = {
    help: () => {
      const curLang = context.getLang();
      const dict = I18N[curLang];
      return [
        `<span class="h">${dict.helpHeader}</span>`,
        ...dict.helpRows.map(([c, desc]) => {
          const baseCmd = c.split(' ')[0];
          return '  ' + cl(baseCmd, c) + ' '.repeat(Math.max(1, 14 - c.length)) + '<span class="m">' + desc + '</span>';
        }),
        '',
        `<span class="m">${dict.helpHint}</span>`
      ];
    },

    about: () => {
      const curLang = context.getLang();
      return I18N[curLang].about;
    },

    skills: () => {
      const curLang = context.getLang();
      const dict = I18N[curLang];
      const lines = [`<span class="h">${dict.skillsHeader}</span>`];
      for (const group of dict.skillGroups) {
        lines.push('');
        lines.push(`<span class="hl-k">┌── ${group.title}</span>`);
        for (const [k, v] of group.items) {
          const bar = `<span class="bar-fill">${'█'.repeat(v)}</span>` + '<span class="m">' + '░'.repeat(10 - v) + '</span>';
          lines.push(`│   ${pad(k, 22)} ${bar}  <span class="hl-k">${v}</span>/10`);
        }
        lines.push('<span class="m">└──</span>');
      }
      lines.push('');
      lines.push(`<span class="m">${curLang === 'es' ? 'Autoevaluación rigurosa basada en proyectos en producción y sistemas reales.' : 'Rigorous self-assessment based on production code and real systems.'}</span>`);
      lines.push(`<span class="m">${dict.nextSug}</span>` + cl('projects') + ' · ' + cl('cv') + ' · ' + cl('hire'));
      return lines;
    },

    projects: () => {
      const curLang = context.getLang();
      const dict = I18N[curLang];
      const lines = [`<span class="h">${dict.projectsHeader}</span>`, ''];
      for (const p of PROJECTS) {
        const pName = p.name[curLang];
        const hasLanding = p.slug === 'praxeon' || p.slug === 'marq';
        const badgeText = p.demo
          ? (hasLanding
              ? (curLang === 'es' ? '● LANDING PAGE DISPONIBLE ↗' : '● LANDING PAGE AVAILABLE ↗')
              : (curLang === 'es' ? '● DEMO EN VIVO DISPONIBLE ↗' : '● LIVE DEMO AVAILABLE ↗'))
          : '';
        lines.push(
          `<a class="pj" data-c="open ${p.id}" data-a="${p.gradA}" data-b="${p.gradB}" data-code="${p.plateCode}" data-title="${esc(pName)}" data-tag="${esc(p.tag)}" data-desc="${esc(p.desc[curLang].split('\n')[0])}"${p.image ? ` data-img="${p.image}"` : ''}${p.imagePosition ? ` data-img-pos="${p.imagePosition}"` : ''}${p.demo ? ` data-demo="${p.demo}"` : ''}${badgeText ? ` data-badge="${badgeText}"` : ''}>` +
          `  <span class="m">[${p.id}]</span> <b class="hl-k">${pad(p.slug, 22)}</b>` +
          `<span class="m">${p.tag}</span>` +
          `</a>`
        );
      }
      lines.push('');
      lines.push(dict.projectsFooter);
      return lines;
    },

    open: (args = []) => {
      const curLang = context.getLang();
      const dict = I18N[curLang];
      const arg = (args[0] || '').toLowerCase();
      const p = PROJECTS.find(x => x.id == arg || x.slug == arg || (x.aliases && x.aliases.includes(arg)));
      if (!p) {
        return [dict.openUsageError];
      }
      const nextId = (p.id % PROJECTS.length) + 1;
      const pName = p.name[curLang];
      const descLines = p.desc[curLang].split('\n');

      let plateHtml;
      if (p.image) {
        const hasLanding = p.slug === 'praxeon' || p.slug === 'marq';
        const browserTitle = curLang === 'es'
          ? (hasLanding ? 'Abrir landing page en nueva pestaña' : 'Abrir demo en vivo en nueva pestaña')
          : (hasLanding ? 'Open landing page in new tab' : 'Open live demo in new tab');
        const overlayText = curLang === 'es'
          ? (hasLanding ? 'Visitar Landing Page ↗' : 'Visitar Demo en Vivo ↗')
          : (hasLanding ? 'Visit Landing Page ↗' : 'Visit Live Demo ↗');
        const targetUrl = p.demo || p.repo;
        const displayUrl = p.demo ? p.demo.replace(/^https?:\/\//, '') : (p.repo ? p.repo.replace(/^https?:\/\//, '') : p.slug);

        plateHtml = 
          `<div class="plate plate-rich" style="background:linear-gradient(135deg, ${p.gradA}, ${p.gradB});">` +
          `  <a class="plate-browser" href="${targetUrl}" target="_blank" rel="noopener" title="${browserTitle}">` +
          `    <div class="plate-browser-bar">` +
          `      <span class="plate-dots"><i></i><i></i><i></i></span>` +
          `      <span class="plate-url">${displayUrl}</span>` +
          `      <span class="plate-link-hint">${curLang === 'es' ? 'Visitar ↗' : 'Visit ↗'}</span>` +
          `    </div>` +
          `    <div class="plate-img-wrap">` +
          `      <img src="${p.image}" alt="${p.slug} preview" class="plate-img" style="object-position:${p.imagePosition || 'top center'}" />` +
          `      <div class="plate-overlay"><span>${overlayText}</span></div>` +
          `    </div>` +
          `  </a>` +
          `  <div class="plate-meta">` +
          `    <span class="plate-code">${p.slug}</span>` +
          `    <span class="plate-sub">${p.tag}</span>` +
          `  </div>` +
          `</div>`;
      } else {
        plateHtml =
          `<div class="plate" style="background:linear-gradient(135deg, ${p.gradA}, ${p.gradB});">` +
          `  <span class="plate-code">${p.slug}</span>` +
          `  <span class="plate-sub">${p.tag}</span>` +
          `</div>`;
      }

      const lines = [
        `<span class="h">${p.plateCode} // ${pName}</span>`,
        plateHtml,
        ...descLines,
        '',
        `<span class="m">${dict.openStackLabel}</span> ${p.stack}`,
        `<span class="m">${dict.openMetricsLabel}</span> <span class="hl-k">${p.tests}</span> · <span class="hl-k">${p.latency}</span>`
      ];

      const links = [];
      if (p.repo) {
        links.push(`<a class="c" href="${p.repo}" target="_blank" rel="noopener">GitHub Repo ↗</a>`);
      }
      if (p.demo) {
        const hasLanding = p.slug === 'praxeon' || p.slug === 'marq';
        const demoLabel = hasLanding
          ? 'Landing Page ↗'
          : (curLang === 'es' ? 'Demo en Vivo ↗' : 'Live Demo ↗');
        links.push(`<a class="c" href="${p.demo}" target="_blank" rel="noopener">${demoLabel}</a>`);
      }
      if (links.length > 0) {
        lines.push(`<span class="m">${dict.openLinksLabel}</span> ${links.join('   ')}`);
      }
      lines.push('');
      lines.push(`<span class="m">${dict.nextSug}</span>` + cl('open ' + nextId, `open ${nextId}`) + ' · ' + cl('projects') + ' · ' + cl('hire'));
      return lines;
    },

    cv: (args = []) => {
      const arg = (args[0] || '').toLowerCase();
      if (arg === 'es') {
        window.open('CV_Andreu_Marques_Goyes_ES.pdf', '_blank');
        return ['<span class="m">Abriendo CV_Andreu_Marques_Goyes_ES.pdf en nueva pestaña...</span>'];
      }
      if (arg === 'en') {
        window.open('CV_Andreu_Marques_Goyes_EN.pdf', '_blank');
        return ['<span class="m">Opening CV_Andreu_Marques_Goyes_EN.pdf in new tab...</span>'];
      }
      const dict = I18N[context.getLang()];
      return [
        `<span class="h">${dict.cvTitle}</span>`,
        ...dict.cvPrompt
      ];
    },

    hire: () => {
      const dict = I18N[context.getLang()];
      return [
        `<span class="h">${dict.hireTitle}</span>`,
        ...dict.hireContent
      ];
    },

    education: () => {
      const dict = I18N[context.getLang()];
      return [
        `<span class="h">${dict.educationTitle}</span>`,
        ...dict.educationContent,
        '',
        `<span class="m">${dict.nextSug}</span>` + cl('skills') + ' · ' + cl('projects') + ' · ' + cl('cv')
      ];
    },

    experience: () => {
      const dict = I18N[context.getLang()];
      return [
        `<span class="h">${dict.experienceTitle}</span>`,
        ...dict.experienceContent,
        '',
        `<span class="m">${dict.nextSug}</span>` + cl('projects') + ' · ' + cl('hire')
      ];
    },

    contact: () => {
      const dict = I18N[context.getLang()];
      return [
        `<span class="h">${dict.contactTitle}</span>`,
        ...dict.contactContent
      ];
    },

    neofetch: () => {
      const curLang = context.getLang();
      const dict = I18N[curLang];
      const ascii = [
        '    <span class="hl-k">.---.</span>    ',
        '   <span class="hl-k">/     \\</span>   ',
        '  <span class="hl-k">| () () |</span>  ',
        '   <span class="hl-k">\\  _  /</span>   ',
        '    <span class="hl-k">`---`</span>    ',
        '   <span class="hl-k">POSIX / C</span> ',
        '   <span class="hl-k">64-bit OS</span> '
      ];

      const lines = [
        `<span class="h">${dict.neofetchTitle}</span>`,
        '--------------------------------------------------'
      ];

      dict.neofetchFields.forEach(([key, val], idx) => {
        const art = ascii[idx] || '             ';
        lines.push(`${art}  <b>${pad(key, 13)}</b> ${val}`);
      });
      lines.push('');
      lines.push(`<span class="m">${dict.nextSug}</span>` + cl('projects') + ' · ' + cl('skills') + ' · ' + cl('hire'));
      return lines;
    },

    lang: (args = []) => {
      const curLang = context.getLang();
      const target = (args[0] || '').toLowerCase();
      const next = (target === 'es' || target === 'en') ? target : (curLang === 'es' ? 'en' : 'es');
      context.setLanguage(next, true);
      return [];
    },

    theme: () => {
      const R = document.documentElement;
      const isDark = R.dataset.theme === 'dark' || 
        (!R.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const nextTheme = isDark ? 'light' : 'dark';
      R.dataset.theme = nextTheme;
      localStorage.setItem('portfolio_theme', nextTheme);
      const curLang = context.getLang();
      return [`<span class="m">${curLang === 'es' ? 'Tema configurado a:' : 'Theme set to:'} <b>${nextTheme.toUpperCase()}</b></span>`];
    },

    clear: () => {
      context.clear();
      return [];
    }
  };

  // Alias de respaldo para comandos en español
  cmds.ayuda = () => cmds.help();
  cmds['sobre-mi'] = cmds.sobremi = () => cmds.about();
  cmds.habilidades = () => cmds.skills();
  cmds.proyectos = args => cmds.projects(args);
  cmds.abrir = args => cmds.open(args);
  cmds.contratar = () => cmds.hire();
  cmds['sudo hire-me'] = () => cmds.hire();
  cmds['hire-me'] = () => cmds.hire();
  cmds.contacto = () => cmds.contact();
  cmds.formacion = cmds.educacion = () => cmds.education();
  cmds.experiencia = () => cmds.experience();
  cmds.idioma = args => cmds.lang(args);
  cmds.tema = () => cmds.theme();
  cmds.limpiar = cmds.cls = () => cmds.clear();

  // Accesos directos a proyectos destacados
  cmds.praxeon = () => cmds.open(['1']);
  cmds.marq = () => cmds.open(['2']);
  cmds['marq-pm'] = () => cmds.open(['2']);

  return cmds;
}
