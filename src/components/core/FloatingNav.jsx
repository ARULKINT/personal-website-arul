import React from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../data/nav';
import { useScrollSection } from '../../hooks/useScrollSection';

export default function FloatingNav() {
  const active = useScrollSection(NAV_ITEMS.map((n) => n.id));

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Desktop / left rail — fixed width so the glass panel never resizes.
          Each item's expanding pill is absolutely positioned, overlaying
          content to the right without shifting the nav box. */}
      <nav
        aria-label="Primary"
        style={{ width: 56 }}
        className="hidden md:flex fixed left-4 top-1/2 z-50 -translate-y-1/2 flex-col gap-2 glass-strong holo-border rounded-2xl p-2"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              initial={false}
              whileHover="hover"
              className="group relative flex h-10 w-full items-center"
            >
              <motion.div
                variants={{ hover: { width: 164 } }}
                initial={{ width: 36 }}
                animate={{ width: isActive ? 164 : 36 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 items-center gap-2 overflow-hidden rounded-xl border px-1.5 ${
                  isActive
                    ? 'border-neon-cyan/70 bg-[#05060d] shadow-neon-cyan'
                    : 'border-white/10 bg-[#05060d]/95 group-hover:border-neon-violet/60 group-hover:shadow-neon-violet'
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                    isActive ? 'text-neon-cyan' : 'text-white/80 group-hover:text-neon-violet'
                  }`}
                >
                  <Icon size={16} />
                </span>
                <span className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.18em] text-white/90">
                  {label}
                </span>
                {isActive ? (
                  <span className="ml-auto mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan animate-pulse" />
                ) : null}
              </motion.div>
            </motion.a>
          );
        })}
      </nav>

      {/* Mobile bottom dock */}
      <nav
        aria-label="Primary mobile"
        className="md:hidden fixed bottom-3 left-1/2 z-50 -translate-x-1/2 max-w-[96vw] overflow-x-auto glass-strong holo-border rounded-2xl px-2 py-2"
      >
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider ${
                  isActive ? 'text-neon-cyan bg-white/10' : 'text-white/70'
                }`}
              >
                <Icon size={16} />
                <span className="mt-1">{label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
