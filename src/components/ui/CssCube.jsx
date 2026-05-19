import React from 'react';

export default function CssCube({ color = '#00f5ff', size = 110 }) {
  const half = size / 2;
  const faceBase = {
    position: 'absolute',
    width: size,
    height: size,
    background:
      `linear-gradient(135deg, ${color}26, transparent 60%), radial-gradient(circle at 30% 30%, ${color}33, transparent 55%), rgba(10,15,28,0.55)`,
    border: `1px solid ${color}88`,
    boxShadow: `inset 0 0 22px ${color}55, 0 0 18px ${color}55`,
    backdropFilter: 'blur(2px)',
  };
  const faces = [
    { transform: `translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div
      className="relative grid h-full w-full place-items-center"
      style={{ perspective: 700 }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: 'cube-spin 14s linear infinite',
        }}
      >
        {faces.map((f, i) => (
          <div key={i} style={{ ...faceBase, ...f }} />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${color}22, transparent 70%)`,
        }}
      />

      <style>{`
        @keyframes cube-spin {
          0%   { transform: rotateX(-18deg) rotateY(0deg); }
          100% { transform: rotateX(-18deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
