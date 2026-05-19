import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlowText from '../ui/GlowText';
import HoloAvatar from '../ui/HoloAvatar';
import NeonButton from '../ui/NeonButton';
import { useTypewriter } from '../../hooks/useTypewriter';

const HeroScene = lazy(() => import('../three/HeroScene'));

const ROLES = [
  'UI/UX Designer',
  'Web Developer',
  'Data Engineer',
  'Tech Specialist',
  'Creative Problem Solver',
];

export default function Hero() {
  const role = useTypewriter(ROLES);

  const letters = 'ARUL'.split('');

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,6,13,0.55) 80%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 md:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-neon-cyan/80"
            >
              › access granted // arul.universe
            </motion.div>

            <h1 className="mt-4 font-display text-[18vw] leading-[0.85] md:text-[12rem] font-black tracking-tight">
              {letters.map((l, i) => (
                <motion.span
                  key={`${l}-${i}`}
                  initial={{ opacity: 0, y: 80, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block"
                >
                  <GlowText>{l}</GlowText>
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center gap-3 font-mono text-lg md:text-2xl text-white/90"
            >
              <span className="text-neon-magenta">›</span>
              <span className="min-h-[1.4em]">
                {role}
                <span className="ml-0.5 inline-block h-[1em] w-[2px] bg-neon-cyan align-middle animate-pulse" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-6 max-w-xl text-white/70"
            >
              Multidisciplinary creator at the intersection of design, code,
              data and hardware. Welcome to my digital universe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <NeonButton
                color="cyan"
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Explore Projects
              </NeonButton>
              <NeonButton
                color="magenta"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Initiate Contact
              </NeonButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="justify-self-center md:justify-self-end"
          >
            <HoloAvatar size={300} label="A" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-neon-cyan"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>
    </section>
  );
}
