'use client';

import { useRef } from 'react';
import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Contextual cursor label. It never trails the pointer on its own —
 * it only appears over media marked with [data-cursor="Label"].
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  if (!fine || reduced) return null;
  return <CursorLabel />;
}

function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;
    gsap.set(el, { x: -200, y: -200 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let current: Element | null = null;

    const move = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      const target = (event.target as Element | null)?.closest?.('[data-cursor]') ?? null;
      if (target === current) return;
      current = target;
      label.textContent = target?.getAttribute('data-cursor') ?? '';
      el.dataset.variant = target ? 'label' : 'dot';
      el.dataset.hidden = target ? 'false' : 'true';
    };
    const hide = () => {
      el.dataset.hidden = 'true';
      current = null;
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  });

  return (
    <div ref={ref} className="cursor" data-variant="dot" data-hidden="true" aria-hidden="true">
      <span ref={labelRef} className="cursor__label" />
    </div>
  );
}
