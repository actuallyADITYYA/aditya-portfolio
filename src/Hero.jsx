import { useEffect, useRef } from 'react';

const WIRES = 5;
const TOKENS = [['not a', 'X'], ['rand()', 'H'], ['a ^ b', 'CX'], ['a and b', 'CCX'], ['print(a)', 'M'], ['swap', 'SW'], ['if a:', 'CX'], ['!flag', 'X']];

const newItem = (x) => {
  const [tok, gate] = TOKENS[Math.floor(Math.random() * TOKENS.length)];
  let wire = Math.floor(Math.random() * WIRES);
  if (gate === 'CCX') wire = Math.min(wire, WIRES - 3);
  if (gate === 'CX' || gate === 'SW') wire = Math.min(wire, WIRES - 2);
  return { x, wire, tok, gate, speed: 55 + Math.random() * 45 };
};

/* Code morphing into a live quantum circuit */
function startHero(hero, canvas) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const css = getComputedStyle(document.documentElement);
  const color = (name) => css.getPropertyValue(name).trim();
  const g = canvas.getContext('2d');

  const ACCENT = color('--accent');
  const PINK = color('--pink');
  const PLUM = color('--plum');
  const TEXT = color('--on-dark');

  let W = 0, H = 0, items = [], raf = 0, last = 0, spawnT = 0, visible = true;
  let ptr = { x: -9999, y: -9999 };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!items.length) items = Array.from({ length: Math.round(W / 130) }, () => newItem(Math.random() * W));
    draw(performance.now());
  };

  function draw(now) {
    const t = now / 1000;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    g.clearRect(0, 0, W, H);

    // On narrow screens keep the wires in the top half, clear of the name.
    const top = Math.max(56, H * 0.1);
    const gap = Math.max(32, (H * (W < 720 ? 0.3 : 0.36)) / (WIRES - 1));
    const wy = (i, x) => {
      const base = top + i * gap;
      const dx = x - ptr.x, dy = base - ptr.y;
      const amp = Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150)) * 26;
      return base + amp * Math.sin(x * 0.05 - t * 7 + i * 1.3);
    };

    g.lineWidth = 1.5;
    g.textBaseline = 'middle';
    for (let i = 0; i < WIRES; i++) {
      g.strokeStyle = 'rgba(205,191,232,0.45)';
      g.beginPath();
      for (let x = 40; x <= W; x += 6) x === 40 ? g.moveTo(x, wy(i, x)) : g.lineTo(x, wy(i, x));
      g.stroke();
      g.fillStyle = 'rgba(205,191,232,0.8)';
      g.font = '500 13px "IBM Plex Mono", monospace';
      g.fillText('|0⟩', 6, top + i * gap);
    }

    const box = (x, y, label, a, fill) => {
      g.globalAlpha = a; g.fillStyle = fill; g.beginPath();
      g.roundRect ? g.roundRect(x - 15, y - 15, 30, 30, 6) : g.rect(x - 15, y - 15, 30, 30);
      g.fill();
      g.fillStyle = PLUM; g.font = '600 14px "IBM Plex Mono", monospace'; g.textAlign = 'center';
      g.fillText(label, x, y + 1); g.textAlign = 'left';
    };
    const dot = (x, y, a) => { g.globalAlpha = a; g.fillStyle = ACCENT; g.beginPath(); g.arc(x, y, 5.5, 0, Math.PI * 2); g.fill(); };
    const target = (x, y, a) => {
      g.globalAlpha = a; g.fillStyle = PLUM; g.strokeStyle = ACCENT; g.lineWidth = 2;
      g.beginPath(); g.arc(x, y, 12, 0, Math.PI * 2); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(x - 12, y); g.lineTo(x + 12, y); g.moveTo(x, y - 12); g.lineTo(x, y + 12); g.stroke();
    };
    const link = (x, y1, y2, a) => { g.globalAlpha = a; g.strokeStyle = ACCENT; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y1); g.lineTo(x, y2); g.stroke(); };
    const cross = (x, y, a) => { g.globalAlpha = a; g.strokeStyle = PINK; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x - 8, y - 8); g.lineTo(x + 8, y + 8); g.moveTo(x + 8, y - 8); g.lineTo(x - 8, y + 8); g.stroke(); };

    spawnT += dt;
    if (spawnT > 0.85) { spawnT = 0; items.push(newItem(-60)); }

    const zoneA = W * 0.24, zoneB = W * 0.36;
    items = items.filter((it) => {
      it.x += it.speed * dt;
      if (it.x > W + 60) return false;
      const m = Math.max(0, Math.min(1, (it.x - zoneA) / (zoneB - zoneA)));
      const x = it.x, y0 = wy(it.wire, x);
      if (m < 1) {
        g.globalAlpha = 1 - m; g.fillStyle = TEXT; g.textAlign = 'center';
        g.font = '500 15px "IBM Plex Mono", monospace';
        g.fillText(it.tok, x, y0 - 16 - m * 10); g.textAlign = 'left';
      }
      if (m > 0) {
        if (it.gate === 'X' || it.gate === 'M') box(x, y0, it.gate, m, ACCENT);
        else if (it.gate === 'H') box(x, y0, 'H', m, PINK);
        else if (it.gate === 'CX') { const y1 = wy(it.wire + 1, x); link(x, y0, y1, m); dot(x, y0, m); target(x, y1, m); }
        else if (it.gate === 'CCX') { const y1 = wy(it.wire + 1, x), y2 = wy(it.wire + 2, x); link(x, y0, y2, m); dot(x, y0, m); dot(x, y1, m); target(x, y2, m); }
        else if (it.gate === 'SW') { const y1 = wy(it.wire + 1, x); link(x, y0, y1, m); cross(x, y0, m); cross(x, y1, m); }
      }
      return true;
    }).slice(-40);
    g.globalAlpha = 1;
  }

  const loop = (now) => { draw(now); raf = requestAnimationFrame(loop); };
  const play = () => { if (!raf && visible && !reducedMotion.matches) { last = 0; raf = requestAnimationFrame(loop); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  // With reduced motion, draw single frames only in response to the visitor.
  const redraw = () => { if (reducedMotion.matches) draw(performance.now()); };

  const ac = new AbortController();
  const opts = { passive: true, signal: ac.signal };
  const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  hero.addEventListener('pointermove', (e) => { ptr = local(e); redraw(); }, opts);
  hero.addEventListener('pointerleave', () => { ptr = { x: -9999, y: -9999 }; redraw(); }, opts);
  hero.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a')) return;
    const p = local(e);
    for (let i = 0; i < 3; i++) items.push(newItem(Math.max(-40, p.x - 40 - i * 70)));
    redraw();
  }, opts);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? play() : stop(); });
  io.observe(hero);
  reducedMotion.addEventListener('change', () => (reducedMotion.matches ? stop() : play()), { signal: ac.signal });
  play();

  return () => { stop(); ac.abort(); ro.disconnect(); io.disconnect(); };
}

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => startHero(heroRef.current, canvasRef.current), []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <canvas className="hero__canvas" aria-hidden="true" ref={canvasRef}></canvas>
      <div className="hero__content">
        <p className="hero__hint">Move across the wires. Tap or click to feed in more code.</p>
        <h1 className="hero__name"><span>Aditya</span> <span>Prakash</span></h1>
        <div className="hero__foot">
          <p className="hero__intro">Full-stack and mobile developer in London. I ship apps in Flutter and React, and I built a transformer that translates ordinary code into quantum circuits.</p>
          <div className="btn-row">
            <a className="btn btn--solid" href="#work">See my work</a>
            <a className="btn btn--ghost" href="mailto:actually.adityya@gmail.com">Email me</a>
          </div>
        </div>
      </div>
    </header>
  );
}
