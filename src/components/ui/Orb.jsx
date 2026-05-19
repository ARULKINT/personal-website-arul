import React, { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  cyan: '#00f5ff',
  magenta: '#ff2bd6',
  violet: '#7a5cff',
  lime: '#9dff00',
  amber: '#ffb800',
};

export default function Orb({ label, color = 'cyan', tip = '', delay = 0, size = 120 }) {
  const [open, setOpen] = useState(false);
  const c = COLORS[color] || color;

  return (
    <div className="relative inline-flex flex-col items-center" style={{ minWidth: size + 24 }}>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
        className="relative grid place-items-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 30%, ${c}66, transparent 60%), radial-gradient(circle at 65% 75%, ${c}33, transparent 65%), #0a0f1f`,
          boxShadow: `0 0 36px ${c}66, inset 0 0 40px ${c}33`,
          border: `1px solid ${c}55`,
        }}
      >
        <span className="font-display text-xs tracking-widest uppercase text-white/90">
          {label}
        </span>
        <span
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${c}55, transparent 35%)`,
            animation: 'spin-slow 9s linear infinite',
            maskImage:
              'radial-gradient(circle, transparent 58%, black 60%, black 78%, transparent 80%)',
          }}
        />
      </motion.button>
      {tip ? (
        <motion.span
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 8 : 0 }}
          className="mt-2 text-xs font-mono text-white/70 max-w-[180px] text-center"
        >
          {tip}
        </motion.span>
      ) : null}
    </div>
  );
}
