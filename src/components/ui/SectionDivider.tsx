'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** A breath between chapters: two hairlines draw outward from a small brand ring. */
export function SectionDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        tl.fromTo(el.querySelectorAll('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.out' });
        tl.fromTo(el.querySelector('circle'), { strokeDashoffset: 88 }, { strokeDashoffset: 0, duration: 1.8, ease: 'expo.out' }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className={cn('flex items-center gap-5 px-page', className)}>
      <span data-rule="" className="h-px flex-1 origin-right bg-current opacity-20" />
      <svg viewBox="0 0 30 30" className="size-7 -rotate-90 opacity-50">
        <circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="88" />
      </svg>
      <span data-rule="" className="h-px flex-1 origin-left bg-current opacity-20" />
    </div>
  );
}
