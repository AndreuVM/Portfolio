/**
 * Punto de entrada principal (ES Modules) para el portfolio CLI
 * Andreu Marquès Goyes
 */

import { createTerminalEngine } from './terminal.js';
import { initParticles } from './components/particles.js';
import { initPreview } from './components/preview.js';

async function bootstrap() {
  const root = document.documentElement;

  // Restaurar preferencia de tema si existía
  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  // Inicializar componentes visuales
  initParticles('#band');
  initPreview('#pv', '#out');

  // Inicializar motor CLI
  const terminal = createTerminalEngine();
  terminal.bindEvents();

  // Botones de selección de idioma en barra superior
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      terminal.setLanguage(btn.dataset.lang, true);
    });
  });

  // Botón de alternancia de tema
  const themeBtn = document.querySelector('#btn-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      terminal.canonicalCmds.theme();
      terminal.focusInput();
    });
  }

  // Reloj en tiempo real
  const clk = document.querySelector('#clk');
  function updateClock() {
    if (clk) {
      const isEs = terminal.getCurLang() === 'es';
      clk.textContent = new Date().toLocaleTimeString(isEs ? 'es-ES' : 'en-US');
    }
    setTimeout(updateClock, 1000);
  }
  updateClock();

  // Secuencia de arranque inicial
  terminal.updateUiLang();
  await terminal.renderWelcomeScreen(true);
  terminal.focusInput();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
