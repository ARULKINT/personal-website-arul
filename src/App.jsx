import React, { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './components/core/BootSequence';
import CustomCursor from './components/core/CustomCursor';
import ParticleBackground from './components/core/ParticleBackground';
import FloatingNav from './components/core/FloatingNav';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Tools = lazy(() => import('./components/sections/Tools'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/sections/Footer'));

function SectionFallback({ minH = '60vh' }) {
  return (
    <div className="grid place-items-center" style={{ minHeight: minH }}>
      <div className="loader-ring" />
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('arul-booted') === '1';
  });

  useEffect(() => {
    if (booted) sessionStorage.setItem('arul-booted', '1');
  }, [booted]);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        ) : null}
      </AnimatePresence>

      {/* FloatingNav must live OUTSIDE the animated div — Framer Motion's
          opacity animation sets CSS transforms on its element, which creates
          a new containing block and breaks position:fixed children. */}
      {booted ? <FloatingNav /> : null}

      {/* initial={false} → skip animation on mount; animate state is applied
          immediately. This prevents the 0.8s blank flash on repeat visits. */}
      <motion.div
        initial={false}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <main className="relative z-10 md:pl-20">
          <Hero />

          <Suspense fallback={<SectionFallback />}><About /></Suspense>
          <Suspense fallback={<SectionFallback minH="70vh" />}><Skills /></Suspense>
          <Suspense fallback={<SectionFallback />}><Tools /></Suspense>
          <Suspense fallback={<SectionFallback minH="80vh" />}><Projects /></Suspense>
          <Suspense fallback={<SectionFallback />}><Achievements /></Suspense>
          <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
          <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
          <Suspense fallback={null}><Footer /></Suspense>
        </main>
      </motion.div>
    </div>
  );
}
