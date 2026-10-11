/**
 * Tarjeta de previsualización flotante con inercia para proyectos
 */

export function initPreview(previewSelector = '#pv', containerSelector = '#out') {
  const pv = document.querySelector(previewSelector);
  const container = document.querySelector(containerSelector);
  if (!pv || !container) return;

  let px = 0, py = 0, tx = 0, ty = 0, isShowing = false;

  window.addEventListener('pointermove', e => {
    tx = e.clientX + 28;
    ty = e.clientY - 160;
  });

  container.addEventListener('mouseover', e => {
    const row = e.target.closest('.pj');
    if (row) {
      pv.style.background = `linear-gradient(135deg, ${row.dataset.a}, ${row.dataset.b})`;
      pv.innerHTML = `
        <div class="pv-title">${row.dataset.code}</div>
        <div class="pv-tag">${row.dataset.tag}</div>
        <div class="pv-desc">${row.dataset.desc}</div>
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
