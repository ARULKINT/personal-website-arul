import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../core/SectionWrapper';
import { ACHIEVEMENTS } from '../../data/achievements';

function Trophy({ color }) {
  return (
    <svg viewBox="0 0 64 80" className="h-24 w-24 md:h-28 md:w-28" aria-hidden="true">
      <defs>
        <linearGradient id="cup-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
        </linearGradient>
        <radialGradient id="cup-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="40" rx="28" ry="22" fill="url(#cup-glow)" />
      <path
        d="M16 10 H48 V28 C48 42 40 50 32 50 C24 50 16 42 16 28 Z"
        fill="url(#cup-grad)"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M16 14 C8 14 8 28 18 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M48 14 C56 14 56 28 46 30" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="28" y="50" width="8" height="8" fill={color} opacity="0.85" />
      <rect x="22" y="58" width="20" height="5" rx="1" fill={color} />
      <rect x="18" y="63" width="28" height="6" rx="1.5" fill="#ffffff" opacity="0.85" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function Pedestal({ children, color, title, blurb, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
        style={{ filter: `drop-shadow(0 18px 18px ${color}77)` }}
      >
        {children}
      </motion.div>
      <div className="relative z-10 mt-3 text-center">
        <div className="font-display text-sm text-white">{title}</div>
        <div className="mt-1 max-w-[220px] text-xs text-white/60">{blurb}</div>
      </div>
      <div
        className="relative -mt-4 w-full h-28 rounded-t-[40%] border-t border-white/10"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8))',
        }}
      >
        <div
          className="absolute left-1/2 top-1/3 h-32 w-48 -translate-x-1/2 rounded-[50%] opacity-50 blur-xl"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" eyebrow="// SECTION_06" title="Trophy Room">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 glass p-6 md:p-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(122,92,255,0.15), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
        }}
      >
        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {ACHIEVEMENTS.map((a, i) => (
            <Pedestal key={a.id} color={a.color} title={a.title} blurb={a.blurb} index={i}>
              <Trophy color={a.color} />
            </Pedestal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
