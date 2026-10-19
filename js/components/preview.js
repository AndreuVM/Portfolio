/**
 * Tarjeta de previsualización flotante con inercia para proyectos
 * Soporta miniaturas de capturas (screenshots) de landing pages y badges dinámicos
 */

export function initPreview(previewSelector = '#pv', containerSelector = '#out') {
  const pv = document.querySelector(previewSelector);
  const container = document.querySelector(containerSelector);
  if (!pv || !container) return;

  let px = 0, py = 0, tx = 0, ty = 0, isShowing = false;

  window.addEventListener('pointermove', e => {
    const cardW = 300;
    const cardH = 340;
    const maxX = window.innerWidth - cardW - 16;
    const maxY = window.innerHeight - cardH - 16;
    tx = (e.clientX + 28 > maxX) ? e.clientX - cardW - 16 : e.clientX + 28;
    ty = Math.max(16, Math.min(maxY, e.clientY - 160));
  });

  container.addEventListener('mouseover', e => {
    const row = e.target.closest('.pj');
    if (row) {
      const hasImg = Boolean(row.dataset.img);
      const imgPos = row.dataset.imgPos || 'top center';
      const imgHtml = hasImg ? `
        <div class="pv-shot">
          <div class="pv-bar">
            <span class="pv-dots"><i></i><i></i><i></i></span>
            <span class="pv-url">${row.dataset.demo ? row.dataset.demo.replace(/^https?:\/\//, '') : 'preview'}</span>
          </div>
          <img src="${row.dataset.img}" alt="${row.dataset.code}" class="pv-img" style="object-position:${imgPos}" />
        </div>
      ` : '';
      const badgeHtml = row.dataset.badge
        ? `<div class="pv-badge">${row.dataset.badge}</div>`
        : (row.dataset.demo ? `<div class="pv-badge">● DEMO DISPONIBLE ↗</div>` : '');

      pv.classList.toggle('has-img', hasImg);
      pv.style.background = `linear-gradient(135deg, ${row.dataset.a}, ${row.dataset.b})`;
      pv.innerHTML = `
        ${imgHtml}
        <div class="pv-info">
          <div class="pv-title">${row.dataset.code}</div>
          <div class="pv-tag">${row.dataset.tag}</div>
          <div class="pv-desc">${row.dataset.desc}</div>
          ${badgeHtml}
        </div>
      `;
      pv.classList.add('on');
      isShowing = true;
    }
  });

  container.addEventListener('mouseout', e => {
    if (e.target.closest('.pj')) {
      pv.classList.remove('on');
      isShowing = false;
    }
  });

  function animatePreview() {
    px += (tx - px) * 0.14;
    py += (ty - py) * 0.14;
    pv.style.transform = `translate(${px}px, ${py}px) scale(${isShowing ? 1 : 0.85}) rotate(${(tx - px) * 0.12}deg)`;
    requestAnimationFrame(animatePreview);
  }

  animatePreview();
}
