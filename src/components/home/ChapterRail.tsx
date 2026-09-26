'use client';

import { useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { scrollToTarget } from '@/lib/scroll';
import { cn } from '@/lib/utils';

const CHAPTERS = [
  { id: 'origin', label: 'Origin' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'offer', label: 'What We Offer' },
  { id: 'why', label: 'Why Avana' },
  { id: 'transformation', label: 'Transformation' },
  { id: 'training', label: 'Teacher Training' },
  { id: 'voices', label: 'Voices' },
  { id: 'retreats', label: 'Retreats' },
  { id: 'begin', label: 'Begin' },
];

/** Desktop-only narrative rail: a hairline per chapter, the current one drawn longer. */
export function ChapterRail() {
  const [active, setActive] = useState(0);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      CHAPTERS.forEach((chapter, index) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) setActive(index);
          },
        });
      });
      const footer = document.querySelector('.site-footer');
      if (footer) {
        ScrollTrigger.create({ trigger: footer, start: 'top bottom', end: 'max', onToggle: (self) => setHidden(self.isActive) });
      }
    });
    return () => mm.revert();
  });

  return (
    <nav
      aria-label="Homepage chapters"
      className={cn('chapter-rail fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block', hidden ? 'pointer-events-none opacity-0' : 'opacity-100')}
    >
      <ol className="grid gap-1">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={index === active ? 'step' : undefined}
              onClick={(event) => {
                const target = document.getElementById(chapter.id);
                if (!target) return;
                event.preventDefault();
                scrollToTarget(target);
              }}
              className="group flex h-5 items-center justify-end gap-3 px-1"
            >
              <span className="eyebrow text-[0.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-80 group-focus-visible:opacity-80">
                {chapter.label}
              </span>
              <span
                aria-hidden="true"
                className={cn('block h-px bg-current transition-[width,opacity] duration-700 ease-(--ease-expo)', index === active ? 'w-8 opacity-100' : 'w-3 opacity-35')}
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
