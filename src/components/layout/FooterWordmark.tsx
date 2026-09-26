'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';

export function FooterWordmark() {
  const wrap = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          text.current,
          { yPercent: 60 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom bottom', scrub: 1 } },
        );
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} aria-hidden="true" className="overflow-hidden px-page pt-16">
      <p ref={text} className="whitespace-nowrap text-center font-display text-[13.6vw] font-light uppercase leading-[0.8] tracking-[-0.02em]">
        Avana Yoga
      </p>
    </div>
  );
}
