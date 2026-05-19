import { useEffect, useRef, useState } from 'react';

export function useMousePosition({ normalize = false } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (normalize) {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = -((e.clientY / window.innerHeight) * 2 - 1);
          setPos({ x, y });
        } else {
          setPos({ x: e.clientX, y: e.clientY });
        }
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      cancelAnimationFrame(raf.current);
    };
  }, [normalize]);

  return pos;
}
