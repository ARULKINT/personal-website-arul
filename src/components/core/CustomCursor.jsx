import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const state = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    let raf;
    let particles = [];

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      if (particles.length < 55 && Math.random() < 0.8) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          life: 1,
          hue: Math.random() > 0.5 ? 190 : 295,
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const canvas = trailRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const tick = () => {
      ring.x += (state.x - ring.x) * 0.16;
      ring.y += (state.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 18}px,${ring.y - 18}px,0)`;
      }

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      particles = particles.filter((p) => p.life > 0.02);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.028;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${p.life * 0.65})`;
        ctx.shadowColor = `hsla(${p.hue},100%,65%,${p.life})`;
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Particle trail canvas — purely decorative, native cursor stays visible */}
      <canvas
        ref={trailRef}
        className="pointer-events-none fixed inset-0 z-[95]"
        style={{ width: '100vw', height: '100vh' }}
      />
      {/* Glowing ring that lags behind the cursor for a depth effect */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[96] h-9 w-9 rounded-full"
        style={{
          border: '1.5px solid rgba(0,245,255,0.7)',
          boxShadow: '0 0 12px rgba(0,245,255,0.5), inset 0 0 8px rgba(122,92,255,0.4)',
          transform: 'translate3d(-200px,-200px,0)',
        }}
      />
    </>
  );
}
