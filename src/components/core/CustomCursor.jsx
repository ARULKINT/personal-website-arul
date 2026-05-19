import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return undefined;

    document.documentElement.classList.add('cursor-hide');

    const state = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: state.x, y: state.y };
    const dot = { x: state.x, y: state.y };
    let raf;
    let particles = [];

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      // Spawn a trail particle
      if (particles.length < 60 && Math.random() < 0.85) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: 1,
          hue: Math.random() > 0.5 ? 190 : 295,
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const canvas = trailRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ring.x += (state.x - ring.x) * 0.18;
      ring.y += (state.y - ring.y) * 0.18;
      dot.x += (state.x - dot.x) * 0.42;
      dot.y += (state.y - dot.y) * 0.42;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life * 0.7})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
        ctx.shadowBlur = 12;
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-hide');
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailRef}
        className="pointer-events-none fixed inset-0 z-[95]"
        style={{ width: '100vw', height: '100vh' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[96] h-9 w-9 rounded-full mix-blend-screen"
        style={{
          border: '1.5px solid rgba(0,245,255,0.85)',
          boxShadow: '0 0 14px rgba(0,245,255,0.6), inset 0 0 10px rgba(122,92,255,0.5)',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[97] h-1.5 w-1.5 rounded-full"
        style={{ background: '#fff', boxShadow: '0 0 8px #fff, 0 0 14px #00f5ff' }}
      />
    </>
  );
}
