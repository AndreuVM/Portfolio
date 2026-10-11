/**
 * Funciones de utilidad para la interfaz terminal CLI
 */

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const esc = s => String(s).replace(/[&<>]/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}[c]));

export const cl = (c, t) => `<a class="c" data-c="${c}">${t || c}</a>`;

export const pad = (s, n) => s + ' '.repeat(Math.max(1, n - s.length));
