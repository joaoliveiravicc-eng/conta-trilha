import { $ } from '../dom.js';

export function confetti(){
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = $('#confetti'), ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1;
  const W = cv.width = innerWidth * dpr, H = cv.height = innerHeight * dpr; cv.style.display = 'block';
  const cols = ['#1E8A4C','#E0B750','#1C3D5A','#B3432B','#1F6F78','#6B4C8A','#9A6234'];
  const P = Array.from({length:160}, () => ({ x:W / 2 + (Math.random() - .5) * W * .3, y:H * .35, vx:(Math.random() - .5) * W * .02, vy:-Math.random() * H * .022 - H * .006, s:(5 + Math.random() * 6) * dpr, r:Math.random() * 6, vr:(Math.random() - .5) * .3, c:cols[Math.random() * cols.length | 0] }));
  const t0 = performance.now();
  (function f(t){
    ctx.clearRect(0, 0, W, H);
    P.forEach(p => { p.vy += H * 0.0006; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .66); ctx.restore(); });
    if (t - t0 < 2300) requestAnimationFrame(f); else { ctx.clearRect(0, 0, W, H); cv.style.display = 'none'; }
  })(t0);
}
export function confettiSmall(){ if (typeof confetti === 'function') confetti(); }
