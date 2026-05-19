import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import SectionWrapper from '../core/SectionWrapper';
import { SKILL_CATEGORIES } from '../../data/skills';

const SkillGalaxy = lazy(() => import('../three/SkillGalaxy'));

export default function Skills() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="skills" eyebrow="// SECTION_03" title="Skill Galaxy">
      <p className="-mt-4 mb-8 max-w-2xl font-mono text-sm text-white/65">
        Each planet is a skill. Hover for highlight, click for detail. The galaxy auto-rotates — drag to look around.
      </p>

      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 glass">
        <Suspense fallback={
          <div className="grid h-full place-items-center">
            <div className="loader-ring" />
          </div>
        }>
          <SkillGalaxy onSelect={setSelected} />
        </Suspense>

        {/* Category legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 md:gap-3">
          {SKILL_CATEGORIES.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/85 backdrop-blur"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.color, boxShadow: `0 0 10px ${c.color}` }}
              />
              {c.name}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur" />
            <motion.div
              className="relative max-w-md glass-strong holo-border rounded-2xl p-7"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 0 1px ${selected.category.color}55, 0 30px 80px rgba(0,0,0,0.6)`,
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full p-1.5 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest"
                style={{
                  color: selected.category.color,
                  border: `1px solid ${selected.category.color}66`,
                  background: `${selected.category.color}11`,
                }}
              >
                {selected.category.name}
              </div>
              <h3 className="mt-3 font-display text-2xl text-white">{selected.name}</h3>
              <p className="mt-3 text-white/75">{selected.detail}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  );
}
