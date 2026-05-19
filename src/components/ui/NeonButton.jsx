import React from 'react';
import { motion } from 'framer-motion';

export default function NeonButton({
  children,
  color = 'cyan',
  className = '',
  as: Tag = 'button',
  ...rest
}) {
  const shadowClass = {
    cyan: 'shadow-neon-cyan border-neon-cyan/60 text-neon-cyan',
    magenta: 'shadow-neon-magenta border-neon-magenta/60 text-neon-magenta',
    violet: 'shadow-neon-violet border-neon-violet/60 text-neon-violet',
  }[color];

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-block ${className}`}
    >
      <Tag
        className={`group relative inline-flex items-center gap-2 rounded-xl border bg-white/5 px-5 py-2.5 font-display text-sm uppercase tracking-widest backdrop-blur-sm transition-all hover:bg-white/10 ${shadowClass}`}
        {...rest}
      >
        <span className="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: 'linear-gradient(120deg, rgba(0,245,255,0.18), rgba(122,92,255,0.18), rgba(255,43,214,0.18))',
          }}
        />
        {children}
      </Tag>
    </motion.div>
  );
}
