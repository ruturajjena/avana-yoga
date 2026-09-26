'use client';

import { useRef, type ComponentPropsWithoutRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';

/**
 * Motion shell for the homepage destinations. The markup is rendered on the server (so retreat data never
 * ships in client JavaScript); this wrapper only animates the [data-destination] panels inside it:
 * Austria opens from the horizon line, Goa rises like a tide.
 */
export function DestinationReveal({ children, ...rest }: ComponentPropsWithoutRef<'section'>) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        el.querySelectorAll<HTMLElement>('[data-destination]').forEach((panel) => {
          const media = panel.querySelector<HTMLElement>('[data-destination-media]');
          const image = panel.querySelector<HTMLElement>('[data-destination-media] img');
          const copy = panel.querySelector<HTMLElement>('[data-destination-copy]');
          const from = panel.dataset.destination === 'alpine' ? 'inset(36% 0% 36% 0%)' : 'inset(55% 0% 0% 0%)';
          if (media) {
            gsap.fromTo(
              media,
              { clipPath: from },
              { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 12%', scrub: 0.8 } },
            );
          }
          if (image) {
            gsap.fromTo(image, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
          }
          if (copy) {
            gsap.fromTo(copy, { yPercent: 22 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} {...rest}>
      {children}
    </section>
  );
}
