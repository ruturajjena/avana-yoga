'use client';

import { useRef, type ElementType, type ReactNode, type RefObject } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { onPageReady } from '@/lib/page-ready';

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** 'scroll' reveals on entering the viewport; 'load' plays when the page becomes visible. */
  trigger?: 'scroll' | 'load';
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/**
 * Masked line reveal — the default text entrance of the site. Lines rise from behind a clip, never a generic fade.
 * Scroll reveals split their text only when the block comes within ~60% of a viewport, so a long page does
 * not measure every heading on load (a real saving on phones).
 */
export function RevealText({
  as: Tag = 'div',
  children,
  className,
  trigger = 'scroll',
  delay = 0,
  stagger = 0.09,
  start = 'top 88%',
  id,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let split: SplitText | null = null;
        let observer: IntersectionObserver | null = null;
        let cancelReady: (() => void) | undefined;

        const build = () => {
          split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'rl',
            autoSplit: true,
            onSplit(self) {
              cancelReady?.();
              const tween = gsap.from(self.lines, {
                yPercent: 118,
                duration: 1.25,
                ease: 'expo.out',
                stagger,
                delay,
                paused: trigger === 'load',
                scrollTrigger: trigger === 'scroll' ? { trigger: el, start, once: true } : undefined,
              });
              if (trigger === 'load') cancelReady = onPageReady(() => tween.play());
              return tween;
            },
          });
          // Hand over from the CSS pre-state only once the lines are split and hidden by GSAP.
          el.setAttribute('data-motion-ready', '');
        };

        if (trigger === 'load') {
          build();
        } else {
          observer = new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              observer?.disconnect();
              observer = null;
              build();
            },
            { rootMargin: '0px 0px 60% 0px' },
          );
          observer.observe(el);
        }

        return () => {
          observer?.disconnect();
          cancelReady?.();
          split?.revert();
        };
      });
      // Without motion there is no pre-state to hand over from.
      if (!window.matchMedia(MQ.motion).matches) el.setAttribute('data-motion-ready', '');
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Component = Tag as unknown as 'div';
  return (
    <Component ref={ref as RefObject<HTMLDivElement>} id={id} data-reveal="" className={className}>
      {children}
    </Component>
  );
}
