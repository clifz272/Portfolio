(() => {
  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('#starfield');
  const button = document.querySelector('.motion-control');
  const label = button.querySelector('span');
  const icon = button.querySelector('img');
  const context = canvas.getContext('2d', { alpha: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!context) { button.hidden = true; document.documentElement.dataset.sky = 'idle'; return; }
  let paused = false;
  try { paused = localStorage.getItem('clifton-motion-paused') === 'true'; } catch {}
  let visible = true;
  let frame = 0;
  let lastPaint = 0;
  let elapsed = 0;
  let width = 0;
  let height = 0;
  let stars = [];
  let meteor = null;
  let nextMeteorAt = 2.2;
  let tint = '192,210,255';
  let seed = 8912;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const inactive = () => paused || reducedMotion.matches || !visible || document.hidden;
  function paint() {
    context.clearRect(0, 0, width, height);
    for (const star of stars) {
      const drift = reducedMotion.matches ? 0 : elapsed * star.speed;
      const x = (star.x * width + drift) % width;
      const y = star.y * height;
      const twinkle = reducedMotion.matches ? 1 : .8 + .2 * Math.sin(elapsed * .5 + star.phase);
      context.fillStyle = `rgba(${tint},${star.opacity * twinkle})`;
      context.beginPath(); context.arc(x, y, star.radius, 0, Math.PI * 2); context.fill();
    }
    if (meteor && !reducedMotion.matches) {
      const progress = Math.min((elapsed - meteor.startedAt) / 1.35, 1);
      const opacity = Math.sin(progress * Math.PI) * .65;
      const x = meteor.x + meteor.distance * progress;
      const y = meteor.y + meteor.distance * progress * .46;
      const gradient = context.createLinearGradient(x - meteor.tail, y - meteor.tail * .46, x, y);
      gradient.addColorStop(0, `rgba(${tint},0)`);
      gradient.addColorStop(1, `rgba(${tint},${opacity})`);
      context.strokeStyle = gradient; context.lineWidth = 1.2;
      context.beginPath(); context.moveTo(x - meteor.tail, y - meteor.tail * .46); context.lineTo(x, y); context.stroke();
      context.fillStyle = `rgba(${tint},${opacity})`;
      context.beginPath(); context.arc(x, y, 1.5, 0, Math.PI * 2); context.fill();
    }
  }
  function animate(time) {
    if (inactive()) { frame = 0; return; }
    const interval = width < 768 ? 1000 / 24 : 1000 / 30;
    if (time - lastPaint >= interval) {
      elapsed += Math.min(time - lastPaint, 100) / 1000;
      lastPaint = time;
      if (elapsed >= nextMeteorAt) {
        meteor = {startedAt:elapsed,x:width * (.45 + random() * .25),y:height * (.08 + random() * .16),distance:Math.min(width * .45,250),tail:width < 768 ? 42 : 74};
        nextMeteorAt = elapsed + 8 + random() * 6;
      }
      if (meteor && elapsed - meteor.startedAt > 1.35) meteor = null;
      paint();
    }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    const stopped = paused || reducedMotion.matches;
    document.documentElement.dataset.motion = stopped ? 'paused' : 'playing';
    document.documentElement.dataset.sky = inactive() ? 'idle' : 'active';
    button.disabled = reducedMotion.matches;
    button.setAttribute('aria-pressed', String(stopped));
    label.textContent = reducedMotion.matches ? 'Motion off' : paused ? 'Resume motion' : 'Pause motion';
    icon.src = paused ? 'assets/icons/player-play.svg' : 'assets/icons/player-pause.svg';
    if (inactive()) { cancelAnimationFrame(frame); frame = 0; paint(); }
    else if (!frame) { lastPaint = performance.now(); frame = requestAnimationFrame(animate); }
  }
  function resize() {
    const box = hero.getBoundingClientRect();
    width = Math.max(box.width, 1); height = Math.max(box.height, 1);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    meteor = null;
    seed = 8912;
    const count = width < 768 ? 48 : 125;
    stars = Array.from({length:count}, () => ({x:random(),y:random(),radius:.4 + random()*.8,opacity:.2 + random()*.45,speed:.15 + random()*.55,phase:random()*Math.PI*2}));
    tint = getComputedStyle(document.documentElement).getPropertyValue('--star').trim();
    paint(); sync();
  }
  button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('clifton-motion-paused', String(paused)); } catch {}
    sync();
  });
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; sync();
  }, { threshold:0 }).observe(hero);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize, {passive:true});
  new MutationObserver(() => { tint = getComputedStyle(document.documentElement).getPropertyValue('--star').trim(); paint(); }).observe(document.documentElement, {attributes:true,attributeFilter:['data-theme']});
  resize();
})();
