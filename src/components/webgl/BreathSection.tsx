'use client';

import { useId, useRef, type ComponentPropsWithoutRef } from 'react';
import { breath, type BreathState } from '@/lib/breath';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type BreathSectionProps = ComponentPropsWithoutRef<'section'> & {
  state: Exclude<BreathState, 'off'>;
  /** Field centre in viewport fractions, [x from left, y from top]. */
  center?: [number, number];
  intensity?: number;
};

/**
 * A section that asks the persistent breath field for a state while it is in view.
 * When WebGL is unavailable (or motion is reduced) a static ring pattern is shown instead.
 */
export function BreathSection({ state, center, intensity = 1, className, children, ...rest }: BreathSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const cx = center?.[0];
  const cy = center?.[1];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const target = {
        state,
        intensity,
        center: cx !== undefined && cy !== undefined ? ([cx, cy] as [number, number]) : undefined,
      };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        end: 'bottom 35%',
        onToggle: (self) => (self.isActive ? breath.push(id, target) : breath.remove(id)),
      });
      return () => breath.remove(id);
    },
    { scope: ref, dependencies: [state, intensity, cx, cy], revertOnUpdate: true },
  );

  const rings = state === 'seed' ? 10 : 18;
  const step = state === 'seed' ? 3.2 : 5.5;

  return (
    <section ref={ref} className={cn('relative', className)} {...rest}>
      <div aria-hidden="true" className="breath-fallback pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 text-ink"
          style={{ left: `${(cx ?? 0.5) * 100}%`, top: `${(cy ?? 0.5) * 100}%` }}
          viewBox="-100 -100 200 200"
          fill="none"
          stroke="currentColor"
        >
          {Array.from({ length: rings }, (_, index) => (
            <circle key={index} r={(index + 1) * step} strokeWidth={0.14} opacity={0.1 * (1 - index / rings)} />
          ))}
        </svg>
      </div>
      {children}
    </section>
  );
}
