'use client';

import { useRef, type ReactNode, type RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';

type RevealListProps = {
  as?: 'ul' | 'ol' | 'div' | 'dl';
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
};

/** Hairline lists: rows settle into place one after another as the list enters the viewport. */
export function RevealList({ as = 'ul', children, className, ...rest }: RevealListProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          Array.from(el.children),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 86%', once: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Tag = as as unknown as 'ul';
  return (
    <Tag ref={ref as RefObject<HTMLUListElement>} className={className} {...rest}>
      {children}
    </Tag>
  );
}
