'use client';

import { useRef, type ElementType, type ReactNode, type RefObject } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';

type KineticTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  from?: number;
  start?: string;
  end?: string;
};

/**
 * Manifesto copy: words gain presence as you read, scrubbed to scroll.
 * Words are split only when the paragraph approaches the viewport.
 */
export function KineticText({ as: Tag = 'p', children, className, from = 0.16, start = 'top 82%', end = 'bottom 55%' }: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let split: SplitText | null = null;
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            split = SplitText.create(el, {
              type: 'words',
              wordsClass: 'kw',
              autoSplit: true,
              onSplit(self) {
                return gsap.fromTo(
                  self.words,
                  { opacity: from },
                  { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start, end, scrub: 1 } },
                );
              },
            });
          },
          { rootMargin: '0px 0px 60% 0px' },
        );
        observer.observe(el);
        return () => {
          observer.disconnect();
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Component = Tag as unknown as 'p';
  return (
    <Component ref={ref as RefObject<HTMLParagraphElement>} className={className}>
      {children}
    </Component>
  );
}
