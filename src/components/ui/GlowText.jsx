import React from 'react';

export default function GlowText({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`font-display text-neon-gradient ${className}`}
      style={{ textShadow: '0 0 32px rgba(0,245,255,0.25), 0 0 64px rgba(255,43,214,0.18)' }}
    >
      {children}
    </Tag>
  );
}
