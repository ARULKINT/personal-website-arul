import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({ id, title, eyebrow, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full px-4 py-24 md:px-10 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-10 md:mb-14"
          >
            {eyebrow ? (
              <div className="font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan/80">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight text-neon-gradient">
                {title}
              </h2>
            ) : null}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
