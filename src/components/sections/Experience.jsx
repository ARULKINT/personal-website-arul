import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from '../core/SectionWrapper';
import { EXPERIENCE } from '../../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const roadRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    if (!linesRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(linesRef.current, {
        backgroundPositionY: '+=1200',
        ease: 'none',
        scrollTrigger: {
          trigger: roadRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, roadRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="experience" eyebrow="// SECTION_07" title="Experience Timeline">
      <p className="-mt-4 mb-8 max-w-2xl font-mono text-sm text-white/65">
        2024 → 2026 :: a journey along the neon road.
      </p>

      <div
        ref={roadRef}
        className="relative overflow-hidden rounded-3xl border border-white/10 glass"
        style={{ minHeight: 620 }}
      >
        {/* Sky / horizon */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #050616 0%, #0a0930 35%, #1a0a3a 55%, #2a0f4a 70%, transparent 80%)',
          }}
        />
        {/* Sun */}
        <div
          className="absolute left-1/2 top-[28%] -translate-x-1/2"
          style={{
            width: 280,
            height: 280,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, #ffb800 0%, #ff2bd6 45%, transparent 75%)',
            filter: 'blur(2px)',
            opacity: 0.85,
          }}
        />
        {/* Mountains silhouette */}
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute left-0 right-0 top-[42%] h-24 w-full">
          <path d="M0 30 L8 20 L14 25 L22 12 L30 22 L40 8 L48 18 L58 14 L66 22 L74 10 L82 20 L92 14 L100 22 L100 30 Z" fill="#05060d" opacity="0.95" />
        </svg>

        {/* Road */}
        <div
          ref={linesRef}
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
          style={{
            width: '180vw',
            maxWidth: 2400,
            height: 380,
            transform: 'translateX(-50%) perspective(700px) rotateX(60deg)',
            transformOrigin: 'top center',
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 36px, rgba(0,245,255,0.85) 36px, rgba(0,245,255,0.85) 42px), linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95))',
            backgroundSize: '60px 60px, 100% 100%',
            boxShadow: '0 0 80px rgba(0,245,255,0.45)',
          }}
        />
        {/* Road edges */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
          style={{
            width: '180vw',
            maxWidth: 2400,
            height: 380,
            transform: 'translateX(-50%) perspective(700px) rotateX(60deg)',
            transformOrigin: 'top center',
            background:
              'linear-gradient(90deg, transparent 0, transparent 5%, rgba(255,43,214,0.9) 5.1%, rgba(255,43,214,0.9) 5.6%, transparent 5.7%, transparent 94.3%, rgba(0,245,255,0.9) 94.4%, rgba(0,245,255,0.9) 94.9%, transparent 95%)',
          }}
        />

        {/* Milestones */}
        <div className="relative z-10 grid grid-cols-1 gap-6 p-6 pt-12 md:grid-cols-3 md:p-10">
          {EXPERIENCE.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
              className="glass rounded-2xl border border-white/15 p-5 backdrop-blur-md scanlines"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(122,92,255,0.18), 0 20px 60px rgba(0,0,0,0.5)' }}
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-neon-cyan/85">
                <span>› node_{i + 1}</span>
                <span className="rounded-full border border-neon-violet/40 bg-neon-violet/10 px-2 py-0.5 text-neon-violet">
                  {m.year}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg text-white">{m.title}</h3>
              <p className="mt-2 text-sm text-white/70">{m.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
