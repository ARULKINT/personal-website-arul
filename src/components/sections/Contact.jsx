import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import SectionWrapper from '../core/SectionWrapper';

const INFO = [
  { Icon: Mail, label: 'EMAIL', value: 'aruldme004@gmail.com', href: 'mailto:aruldme004@gmail.com' },
  { Icon: Phone, label: 'PHONE', value: '6374354206', href: 'tel:6374354206' },
  { Icon: MapPin, label: 'LOC', value: 'Pondy, Cuddalore' },
  { Icon: Linkedin, label: 'LINKEDIN', value: 'linkedin.com/in/arul-eng', href: 'https://www.linkedin.com/in/arul-eng' },
  { Icon: Github, label: 'GITHUB', value: 'github.com/ARULKINT', href: 'https://github.com/ARULKINT' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [phase, setPhase] = useState('idle');
  const [logLines, setLogLines] = useState([]);
  const timerRefs = useRef([]);

  useEffect(() => () => timerRefs.current.forEach(clearTimeout), []);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (phase !== 'idle') return;
    setPhase('sending');
    setLogLines([]);
    const steps = [
      '› Establishing secure link…',
      '› Encrypting payload with AES-256…',
      '› Routing through neon relay…',
      '› Transmitting…',
      '› MESSAGE DELIVERED ✓',
    ];
    steps.forEach((line, i) => {
      const t = setTimeout(() => {
        setLogLines((l) => [...l, line]);
        if (i === steps.length - 1) {
          const reset = setTimeout(() => {
            setPhase('idle');
            setForm({ name: '', email: '', message: '' });
          }, 2400);
          timerRefs.current.push(reset);
        }
      }, 450 * (i + 1));
      timerRefs.current.push(t);
    });
    // Also kick a mailto fallback
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.setTimeout(() => {
      const a = document.createElement('a');
      a.href = `mailto:aruldme004@gmail.com?subject=${subject}&body=${body}`;
      a.click();
    }, 2200);
  };

  return (
    <SectionWrapper id="contact" eyebrow="// SECTION_08" title="Contact Terminal">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Terminal info */}
        <div className="glass-strong holo-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-[11px] text-white/60">arul@universe ~ contact</span>
          </div>
          <div className="font-mono text-sm p-5 md:p-6 space-y-3">
            <div className="text-white/70">
              <span className="text-neon-cyan">arul@universe</span>
              <span className="text-white/50">:</span>
              <span className="text-neon-violet">~</span>
              <span className="text-white/50">$</span>{' '}
              <span className="text-white">cat contact_card.txt</span>
            </div>
            {INFO.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={15} className="text-neon-cyan" />
                <span className="w-24 shrink-0 text-white/55 uppercase tracking-widest text-[11px]">{label}</span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-white hover:text-neon-cyan transition-colors break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-white break-all">{value}</span>
                )}
              </div>
            ))}
            <div className="pt-2 text-white/60">
              <span className="text-neon-cyan">arul@universe</span>
              <span className="text-white/50">:</span>
              <span className="text-neon-violet">~</span>
              <span className="text-white/50">$</span>{' '}
              <span className="text-white">_</span>
              <span className="ml-0.5 inline-block h-4 w-2 bg-neon-cyan align-middle animate-pulse" />
            </div>
          </div>
        </div>

        {/* Send form */}
        <form
          onSubmit={submit}
          className="glass-strong holo-border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-[11px] text-white/60">› send_message.sh</span>
          </div>

          <div className="p-5 md:p-6 space-y-4 font-mono text-sm">
            <label className="block">
              <span className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">› NAME</span>
              <input
                value={form.name}
                onChange={onChange('name')}
                required
                placeholder="visitor"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-all focus:border-neon-cyan focus:shadow-neon-cyan"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">› EMAIL</span>
              <input
                type="email"
                value={form.email}
                onChange={onChange('email')}
                required
                placeholder="visitor@signal.io"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-all focus:border-neon-magenta focus:shadow-neon-magenta"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] uppercase tracking-widest text-white/60 mb-1">› MESSAGE</span>
              <textarea
                rows={4}
                value={form.message}
                onChange={onChange('message')}
                required
                placeholder="Initiate contact…"
                className="w-full resize-none rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 text-white outline-none transition-all focus:border-neon-violet focus:shadow-neon-violet"
              />
            </label>

            <motion.button
              type="submit"
              disabled={phase !== 'idle'}
              whileHover={{ scale: phase === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: phase === 'idle' ? 0.98 : 1 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-neon-cyan/60 bg-white/5 px-5 py-3 font-display text-sm uppercase tracking-[0.2em] text-neon-cyan shadow-neon-cyan transition-all hover:bg-white/10 disabled:opacity-60"
            >
              <Send size={16} />
              <span>{phase === 'idle' ? 'Transmit' : 'Transmitting…'}</span>
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform group-hover:translate-x-full"
                style={{ transitionDuration: '900ms' }}
              />
            </motion.button>

            {logLines.length > 0 ? (
              <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-[12px] leading-6">
                {logLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      l.includes('DELIVERED')
                        ? 'text-neon-lime'
                        : 'text-white/80'
                    }
                  >
                    {l}
                  </motion.div>
                ))}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
