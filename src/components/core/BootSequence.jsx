import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  'Loading...',
  'Initializing Arul OS...',
  'Loading skills...',
  'Loading projects...',
  'AI systems online...',
  'Welcome to Arul Universe',
];

export default function BootSequence({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const timeouts = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      onComplete?.();
      return undefined;
    }
    let elapsed = 0;
    LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
      }, elapsed);
      timeouts.current.push(t);
      elapsed += i === LINES.length - 1 ? 900 : 520 + Math.random() * 220;
    });
    const done = setTimeout(() => onComplete?.(), elapsed + 700);
    timeouts.current.push(done);
    return () => timeouts.current.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[120] grid place-items-center bg-bg-deep"
    >
      <div className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(700px 500px at 50% 40%, rgba(0,245,255,0.15), transparent 60%), radial-gradient(800px 600px at 50% 80%, rgba(255,43,214,0.12), transparent 60%)',
        }}
      />
      <div className="relative w-[min(680px,90vw)] glass-strong rounded-2xl border border-neon-cyan/30 p-7 holo-border">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-white/60">arul-os :: boot.log</span>
        </div>
        <div className="pt-5 min-h-[230px] font-mono text-sm leading-7">
          {LINES.slice(0, visibleCount).map((line, idx) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 ${
                idx === LINES.length - 1
                  ? 'mt-2 text-lg font-display tracking-widest text-neon-gradient'
                  : 'text-white/85'
              }`}
            >
              <span className="text-neon-cyan">{idx === LINES.length - 1 ? '✦' : '›'}</span>
              <span>{line}</span>
              {idx === visibleCount - 1 && idx !== LINES.length - 1 ? (
                <span className="ml-1 inline-block h-4 w-2 bg-neon-cyan animate-pulse" />
              ) : null}
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/60">
            <span>boot integrity</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #00f5ff, #7a5cff, #ff2bd6)',
                boxShadow: '0 0 12px rgba(0,245,255,0.6)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
