import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../core/SectionWrapper';
import { TOOL_GROUPS } from '../../data/tools';

function ToolTile({ tool, color, index }) {
  const { Icon, name } = tool;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.04, rotateX: 6, rotateY: -6 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex flex-col items-center"
    >
      <div
        className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all md:h-24 md:w-24"
        style={{
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 30px ${color}1a`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${color}40, transparent 60%)`,
            boxShadow: `0 0 24px ${color}66`,
          }}
        />
        <Icon
          size={36}
          className="relative z-10 text-white/85 transition-colors group-hover:text-white"
          style={{ filter: `drop-shadow(0 0 8px ${color}99)` }}
        />
        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s linear infinite',
          }}
        />
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/65 group-hover:text-white/90">
        {name}
      </div>
    </motion.div>
  );
}

function ToolGroup({ group }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 md:p-7 backdrop-blur"
      style={{ boxShadow: `inset 0 0 0 1px ${group.color}22` }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: group.color, boxShadow: `0 0 12px ${group.color}` }}
        />
        <h3 className="font-display text-sm md:text-base uppercase tracking-[0.25em] text-white">
          {group.title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6">
        {group.tools.map((t, i) => (
          <ToolTile key={t.name} tool={t} color={group.color} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Tools() {
  const wallRef = useRef(null);

  useEffect(() => {
    const el = wallRef.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <SectionWrapper id="tools" eyebrow="// SECTION_04" title="Holographic Tool Wall">
      <p className="-mt-4 mb-8 max-w-2xl font-mono text-sm text-white/65">
        The arsenal — design, code, data, infra, productivity, OS, and AI tools I work with.
      </p>

      <div style={{ perspective: '1400px' }}>
        <div
          ref={wallRef}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease' }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {TOOL_GROUPS.map((g) => (
            <ToolGroup key={g.id} group={g} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
