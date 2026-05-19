import React from 'react';
import { motion } from 'framer-motion';

export default function HoloAvatar({ size = 260, label = 'A' }) {
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 90deg, #00f5ff, #7a5cff, #ff2bd6, #00f5ff)',
          filter: 'blur(2px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[6px] rounded-full bg-bg-deep" />
      <motion.div
        className="absolute inset-[10px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(0,245,255,0.35), transparent 55%), radial-gradient(circle at 75% 80%, rgba(255,43,214,0.35), transparent 55%), #0a0f1f',
          boxShadow: 'inset 0 0 60px rgba(122,92,255,0.45)',
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div
        className="absolute inset-[10px] rounded-full overflow-hidden"
        style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
      >
        <div
          className="absolute inset-0 animate-scanline"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,245,255,0.18) 50%, transparent)',
          }}
        />
      </div>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-[10px] rounded-full opacity-70"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ha-grid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#ha-grid)" />
        <g stroke="rgba(0,245,255,0.35)" strokeWidth="0.4" fill="none">
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="42" />
          <line x1="50" y1="6" x2="50" y2="94" />
          <line x1="6" y1="50" x2="94" y2="50" />
        </g>
      </svg>

      <div className="relative z-10 font-display text-[5rem] font-black text-white/85 mix-blend-screen">
        {label}
      </div>

      <div className="absolute -inset-2 rounded-full pointer-events-none">
        <div className="absolute inset-0 rounded-full animate-pulse-glow text-neon-violet" />
      </div>
    </div>
  );
}
