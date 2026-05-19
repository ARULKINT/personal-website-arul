import { useEffect, useState } from 'react';

export function useTypewriter(words, { typeSpeed = 70, eraseSpeed = 40, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    if (!words.length) return undefined;
    const current = words[index % words.length];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase('erasing'), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), eraseSpeed);
      } else {
        setPhase('typing');
        setIndex((i) => i + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typeSpeed, eraseSpeed, pause]);

  return text;
}
