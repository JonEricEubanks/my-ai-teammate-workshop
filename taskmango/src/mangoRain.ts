/**
 * 🥭 MANGO RAIN — the certified-tech-lead easter egg.
 * Complete every task in the list and the skies open.
 * (No tests for this file. Some joy is beyond measurement.)
 */

const MANGO_COUNT = 60;
const DURATION_MS = 7000;
const FRUITS = ['🥭', '🥭', '🥭', '🍋', '🍊', '🥭']; // mostly mangoes, occasional citrus

export function maybeCelebrate(tasks: { done: boolean }[]): void {
  if (tasks.length === 0 || !tasks.every((t) => t.done)) return;
  if (sessionStorage.getItem('mango-rain-fired')) return;
  sessionStorage.setItem('mango-rain-fired', 'true');
  mangoRain();
}

function mangoRain(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  Object.assign(container.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '9999',
    overflow: 'hidden',
  });
  document.body.appendChild(container);

  // banner
  const banner = document.createElement('div');
  banner.textContent = '🏆 All tasks complete. Certified Tech Lead energy.';
  Object.assign(banner.style, {
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translateX(-50%) scale(0.8)',
    background: 'linear-gradient(90deg,#ff9f1c,#ff7b1c)',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    padding: '0.7em 1.4em',
    borderRadius: '999px',
    boxShadow: '0 8px 30px rgba(255,123,28,.5)',
    opacity: '0',
    transition: 'opacity .4s ease, transform .5s cubic-bezier(.22,1.4,.36,1)',
    whiteSpace: 'nowrap',
  });
  container.appendChild(banner);
  requestAnimationFrame(() => {
    banner.style.opacity = '1';
    banner.style.transform = 'translateX(-50%) scale(1)';
  });

  for (let i = 0; i < MANGO_COUNT; i++) {
    const m = document.createElement('div');
    m.textContent = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    const size = 16 + Math.random() * 30;
    const fall = 1.8 + Math.random() * 2.4;
    Object.assign(m.style, {
      position: 'absolute',
      top: '-70px',
      left: `${Math.random() * 100}%`,
      fontSize: `${size}px`,
      filter: `blur(${Math.random() < 0.2 ? 1 : 0}px)`,
      transform: `rotate(${Math.random() * 360}deg)`,
      transition: `transform ${fall}s linear, top ${fall}s cubic-bezier(.5,0,.75,.5)`,
    });
    container.appendChild(m);

    const drift = (Math.random() - 0.5) * 260;
    const spin = 360 + Math.random() * 900;
    setTimeout(() => {
      m.style.top = '112vh';
      m.style.transform = `rotate(${spin}deg) translateX(${drift}px)`;
    }, 30 + Math.random() * 800);
  }

  setTimeout(() => {
    banner.style.opacity = '0';
    setTimeout(() => container.remove(), 600);
  }, DURATION_MS);
}
