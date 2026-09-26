'use client';

import { useRef } from 'react';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { home } from '@/data/home';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';

/** Presence — real teaching photography at two depths, and the places the practice is shared drifting past. */
export function Presence() {
  const section = useRef<HTMLElement>(null);
  const { presence } = home;

  useGSAP(
    () => {
      const el = section.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        el.querySelectorAll<HTMLElement>('[data-drift]').forEach((line, index) => {
          const from = index % 2 ? 10 : -6;
          gsap.fromTo(
            line,
            { xPercent: from },
            { xPercent: -from, ease: 'none', scrollTrigger: { trigger: line, start: 'top bottom', end: 'bottom top', scrub: 1 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="presence" data-nav-theme="light" aria-labelledby="presence-title" className="relative overflow-clip pb-(--space-section) pt-(--space-block)">
      <div className="grid-page items-start gap-y-14 px-page">
        <EditorialImage
          src={presence.primary.src}
          alt={presence.primary.alt}
          position={presence.primary.position}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 62vw, 100vw"
          parallax={7}
          reveal="up"
          className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-2"
        />
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:pt-[16vh]">
          <RevealText as="h2" id="presence-title" className="type-l">
            For those who seek yoga in its truest, deepest form.
          </RevealText>
          <p className="type-body-l mt-8 max-w-[44ch] text-ink/75">{presence.text}</p>
          <EditorialImage
            src={presence.secondary.src}
            alt={presence.secondary.alt}
            position={presence.secondary.position}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw"
            reveal="center"
            parallax={5}
            className="mt-14 w-[88%] md:ml-auto lg:mt-[12vh] lg:w-[92%]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="mt-(--space-block) grid select-none gap-1 whitespace-nowrap font-display text-[clamp(3.2rem,11vw,11.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink/[0.11]">
        {presence.places.map((place, index) => (
          <span key={place} data-drift="" className={index % 2 ? 'block pl-[24vw]' : 'block pl-[6vw]'}>
            {place}
          </span>
        ))}
      </div>
    </section>
  );
}
