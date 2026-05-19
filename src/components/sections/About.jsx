import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Palette, Database, Bot, Zap, Activity } from 'lucide-react';
import SectionWrapper from '../core/SectionWrapper';
import GlassPanel from '../ui/GlassPanel';
import Orb from '../ui/Orb';

const INTERESTS = [
  { label: 'Design', color: 'magenta', icon: Palette, tip: 'Crafting interfaces.' },
  { label: 'Technology', color: 'cyan', icon: Cpu, tip: 'Always tinkering.' },
  { label: 'Data', color: 'violet', icon: Database, tip: 'Insights from signal.' },
  { label: 'AI', color: 'lime', icon: Bot, tip: 'Co-creating with models.' },
  { label: 'Electronics', color: 'amber', icon: Zap, tip: 'Hands-on hardware.' },
  { label: 'Sports', color: 'cyan', icon: Activity, tip: 'Kabaddi & team play.' },
];

export default function About() {
  return (
    <SectionWrapper id="about" eyebrow="// SECTION_02" title="Who I Am">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <GlassPanel holo className="p-6 md:p-8 scanlines">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              › who_am_i.txt
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-mono text-[15px] leading-7 text-white/85"
          >
            I am a multidisciplinary creator who combines{' '}
            <span className="text-neon-cyan">design</span>,{' '}
            <span className="text-neon-violet">technology</span>,{' '}
            <span className="text-neon-magenta">data</span>, and practical
            problem-solving skills. I build user-focused digital experiences,
            work with data systems, create modern interfaces, and solve
            technical challenges with a fast-learning mindset.
          </motion.p>

          <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-wider text-white/60">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-neon-cyan text-base font-display">7+</div>
              <div>Disciplines</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-neon-magenta text-base font-display">20+</div>
              <div>Tools mastered</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-neon-violet text-base font-display">∞</div>
              <div>Curiosity</div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel holo className="relative p-6 md:p-8 scanlines">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-magenta animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              › interest_modules.dat
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 place-items-center sm:gap-4">
            {INTERESTS.map((it, i) => (
              <Orb
                key={it.label}
                label={it.label}
                color={it.color}
                tip={it.tip}
                delay={i * 0.2}
                size={96}
              />
            ))}
          </div>
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
