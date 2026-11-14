// Shared motion for the notebook: things drawing in, cards tilting, notes you can drag.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Measure every pen stroke so it can be drawn from start to finish.
document.querySelectorAll<SVGGeometryElement>('.draw').forEach((el) => {
  if (typeof el.getTotalLength !== 'function') return;
  const len = Math.ceil(el.getTotalLength()) + 2;
  el.style.setProperty('--len', String(len));
});

// 2. Reveal on scroll. `data-in` items fade up; `data-watch` containers set off everything inside them.
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.dispatchEvent(new CustomEvent('notebook:in'));
      io.unobserve(e.target);
    }),
  { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-in], [data-watch], .draw[data-self], .mark[data-self]').forEach((el) => io.observe(el));

// 3. Cards lean towards the pointer, like picking up a piece of paper.
if (!reduce && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const max = Number(card.dataset.tilt || 6);
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--tx', `${(-y * max).toFixed(2)}deg`);
      card.style.setProperty('--ty', `${(x * max).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tx', '0deg');
      card.style.setProperty('--ty', '0deg');
    });
  });
}

// 4. Notes you can pick up and move around their section.
document.querySelectorAll<HTMLElement>('[data-drag]').forEach((note) => {
  let start: { x: number; y: number; ox: number; oy: number } | null = null;
  let ox = 0;
  let oy = 0;
  note.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    start = { x: e.clientX, y: e.clientY, ox, oy };
    note.setPointerCapture(e.pointerId);
    note.classList.add('is-held');
  });
  note.addEventListener('pointermove', (e) => {
    if (!start) return;
    ox = start.ox + e.clientX - start.x;
    oy = start.oy + e.clientY - start.y;
    note.style.translate = `${ox}px ${oy}px`;
  });
  const drop = () => {
    if (!start) return;
    start = null;
    note.classList.remove('is-held');
    note.style.setProperty('--rot', `${(Math.random() * 10 - 5).toFixed(1)}deg`);
  };
  note.addEventListener('pointerup', drop);
  note.addEventListener('pointercancel', drop);
});

// 5. Copy-email buttons.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
  const label = button.querySelector<HTMLElement>('[data-copy-label]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  const idle = label?.textContent ?? '';
  let timer = 0;
  button.addEventListener('click', async () => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? '');
    } catch {
      ok = false;
    }
    button.classList.toggle('is-done', ok);
    if (label) label.textContent = ok ? 'Copied!' : 'Select the address to copy';
    if (status) status.textContent = ok ? 'Email address copied' : 'Could not copy the email address';
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      button.classList.remove('is-done');
      if (label) label.textContent = idle;
      if (status) status.textContent = '';
    }, 2200);
  });
});
