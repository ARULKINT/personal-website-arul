import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/55">
          ✦ designed and developed by{' '}
          <span className="text-neon-gradient font-display tracking-normal">Arul</span> ✦
        </div>
        <div className="mt-2 text-[11px] text-white/35">© {year} · arul.universe // all signals reserved</div>
      </div>
    </footer>
  );
}
