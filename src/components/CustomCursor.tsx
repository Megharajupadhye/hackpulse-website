'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dotX = useSpring(x, { stiffness: 800, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 800, damping: 45, mass: 0.2 });

  const ringX = useSpring(x, { stiffness: 420, damping: 35, mass: 0.3 });
  const ringY = useSpring(y, { stiffness: 420, damping: 35, mass: 0.3 });

  useEffect(() => {
    setMounted(true);

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        raf = 0;
      });
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        setIsPointer(true);
      }
    };

    const handlePointerOut = () => setIsPointer(false);

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  if (!mounted || typeof window === 'undefined') return null;

  const isTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: isPointer ? 40 : 28,
          height: isPointer ? 40 : 28,
          borderColor: isPointer ? '#ff0000' : 'rgba(255, 0, 0, 0.6)',
        }}
      />
    </>
  );
}
