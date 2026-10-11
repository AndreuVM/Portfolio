/**
 * Banda animada de partículas con interacción de cursor y aceleración reactiva
 */

let speedBoost = 1.0;

/**
 * Dispara un impulso temporal de velocidad sobre la animación de la banda
 */
export function triggerBandBoost() {
  speedBoost = Math.min(5.5, speedBoost > 1.2 ? speedBoost + 2.5 : 4.5);
}

/**
 * Inicializa el canvas de partículas
 */
export function initParticles(canvasSelector = '#band') {
  const cv = document.querySelector(canvasSelector);
  if (!cv) return;

  const ctx = cv.getContext('2d'),
        RM = matchMedia('(prefers-reduced-motion: reduce)').matches,
        ROWS = 9,
        R = document.documentElement;

  let W, H, P = [], span = 0, mx = -999, my = -999, hl = '#f2e24a', n = 0, vTime = 0;

  function resize() {
    const r = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = cv.clientHeight || 190;
    cv.width = W * r;
    cv.height = H * r;
    ctx.setTransform(r, 0, 0, r, 0, 0);
    P = [];
    const gap = W < 720 ? 13 : 11,
          cols = Math.ceil(W / gap) + 4;
    span = cols * gap;

    for (let j = 0; j < ROWS; j++) {
      const k = (j + 0.5) / ROWS;
      for (let c = 0; c < cols; c++) {
        P.push({
          x: c * gap + (j % 2) * gap / 2 + (Math.random() - 0.5) * 3,
          j,
          y0: H * 0.2 + k * H * 0.6 + (Math.random() - 0.5) * 4,
          s: 2 + Math.random() * 3 + (1 - Math.abs(k - 0.5) * 2) * 2,
          ox: 0,
          oy: 0,
          sp: 0.14 + j * 0.03 + Math.random() * 0.06,
          pa: (Math.random() - 0.5) * 0.9,
          am: 0.7 + Math.random() * 0.6
        });
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('pointermove', e => {
    const rect = cv.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  });

  window.addEventListener('pointerup', e => {
    if (e.pointerType === 'touch') {
      mx = my = -999;
    }
  });

  document.addEventListener('mouseleave', () => {
    mx = my = -999;
  });

  function animateParticles() {
    n++;
    if (n % 40 === 1) {
      hl = getComputedStyle(R).getPropertyValue('--hl').trim() || hl;
    }

    // Suave desaceleración exponencial hacia la velocidad normal (~2.5 a 3s)
    if (speedBoost > 1.001) {
      speedBoost = 1.0 + (speedBoost - 1.0) * 0.972;
    } else {
      speedBoost = 1.0;
    }
    vTime += (1 / 60) * speedBoost;
    const t = vTime,
          RR = 115;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = hl;

    for (const p of P) {
      if (!RM) {
        p.x -= p.sp * speedBoost;
        if (p.x < -20) p.x += span;
      }
      const ph = p.x * 0.011 + t * 0.6 + p.j * 0.25 + p.pa,
            env = 0.35 + 0.9 * (0.5 + 0.5 * Math.sin(p.x * 0.0027 + t * 0.19 + Math.sin(p.x * 0.0011 - t * 0.07) * 2)),
            dens = 0.5 + 0.5 * Math.sin(p.x * 0.0045 - t * 0.14 + Math.sin(p.x * 0.0016 + t * 0.05) * 1.8),
            sw = Math.exp(-((p.x - (W + 300 - (t * 70) % (W + 600))) ** 2) / 28800),
            y = p.y0 + (Math.sin(ph) * H * 0.12 + Math.sin(p.x * 0.004 - t * 0.33 + p.pa) * H * 0.1 + Math.sin(p.x * 0.019 - t * 0.5) * H * 0.03) * env * p.am - sw * H * 0.22;

      const dx = p.x - mx,
            dy = y - my,
            d = Math.hypot(dx, dy);
      let tx = 0, ty = 0;
      if (d < RR && d > 0.01) {
        const q = 1 - d / RR,
              m = q * q * 75;
        tx = dx / d * m;
        ty = dy / d * m;
      }
      p.ox += (tx - p.ox) * 0.12;
      p.oy += (ty - p.oy) * 0.12;

      const edge = 1 - Math.abs((y - H / 2) / (H / 2));
      const boostAlphaBonus = (speedBoost - 1.0) * 0.08;
      ctx.globalAlpha = Math.max(0.08, Math.min(1.0, (0.25 + edge * 0.65) * (0.3 + 0.7 * dens) + boostAlphaBonus));
      ctx.save();
      ctx.translate(p.x + p.ox, y + p.oy);
      ctx.rotate(Math.sin(ph) * 0.5);
      const s = p.s * (0.55 + 0.65 * dens);
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    }
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}
