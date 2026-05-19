import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import SectionWrapper from '../core/SectionWrapper';
import CssCube from '../ui/CssCube';
import { PROJECTS } from '../../data/projects';

const ProjectCube = lazy(() => import('../three/ProjectCube'));

function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur transition-all hover:border-white/25"
      style={{
        boxShadow: `inset 0 0 0 1px ${project.color}22, 0 18px 50px ${project.color}10`,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), ${project.color}22, transparent 40%)`,
        }}
      />

      <div className="relative h-44 w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
        <CssCube color={project.color} size={108} />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 100%, ${project.color}22, transparent 70%)` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest"
          style={{
            color: project.color,
            border: `1px solid ${project.color}66`,
            background: `${project.color}10`,
          }}
        >
          {project.category}
        </span>
        <ArrowUpRight size={16} className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <h3 className="mt-2 font-display text-lg text-white">{project.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-white/65">{project.description}</p>
    </motion.button>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);

  return (
    <SectionWrapper id="projects" eyebrow="// SECTION_05" title="Project Portals">
      <p className="-mt-4 mb-8 max-w-2xl font-mono text-sm text-white/65">
        Each cube is a portal into a project. Click to open.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <motion.div
              layoutId={`card-${open.id}`}
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass-strong holo-border rounded-3xl p-6 md:p-8"
              style={{ boxShadow: `0 0 0 1px ${open.color}55, 0 40px 100px rgba(0,0,0,0.65)` }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr]">
                <div className="h-64 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                  <Suspense fallback={<div className="grid h-full place-items-center"><div className="loader-ring" /></div>}>
                    <ProjectCube color={open.color} height={256} />
                  </Suspense>
                </div>
                <div>
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest"
                    style={{
                      color: open.color,
                      border: `1px solid ${open.color}66`,
                      background: `${open.color}11`,
                    }}
                  >
                    {open.category}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-white">{open.title}</h3>
                  <p className="mt-3 text-white/80">{open.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {open.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-white/85"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 text-xs font-mono text-white/55">
                    › status: <span className="text-neon-cyan">deployed</span> // build: <span className="text-neon-violet">production</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  );
}
