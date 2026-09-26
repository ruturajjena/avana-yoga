'use client';

import { useId, useRef, useState } from 'react';
import type { CourseModule } from '@/data/courses';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn, padIndex } from '@/lib/utils';

/**
 * Areas of study as numbered rows that open on click. Each opens to a short summary and its key points.
 * One area is open at a time; the panel height breathes open and the points rise in sequence.
 */
export function CurriculumAreas({ modules, className }: { modules: CourseModule[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  return (
    <ol className={cn('border-t border-(--line)', className)}>
      {modules.map((module, index) => (
        <AreaRow
          key={module.title}
          id={`${baseId}-${index}`}
          index={index}
          module={module}
          open={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
        />
      ))}
    </ol>
  );
}

type AreaRowProps = { id: string; index: number; module: CourseModule; open: boolean; onToggle: () => void };

function AreaRow({ id, index, module, open, onToggle }: AreaRowProps) {
  const row = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      const points = el.querySelectorAll('[data-area-point]');
      if (!mounted.current) {
        mounted.current = true;
        gsap.set(el, { height: open ? 'auto' : 0 });
        return;
      }
      const reduce = window.matchMedia(MQ.reduce).matches;
      gsap.to(el, {
        height: open ? 'auto' : 0,
        duration: reduce ? 0 : open ? 0.85 : 0.6,
        ease: 'breath',
        onComplete: () => ScrollTrigger.refresh(),
      });
      if (open && !reduce) {
        gsap.fromTo(points, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 0.15 });
      }
    },
    { dependencies: [open], scope: row },
  );

  return (
    <li ref={row} className="area border-b border-(--line)" data-open={open ? 'true' : 'false'}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="area__trigger grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left md:grid-cols-[5rem_1fr_auto] md:py-8"
        >
          <span className="eyebrow nums-old area__index">{padIndex(index + 1)}</span>
          <span className="area__title font-display text-[clamp(1.6rem,2.8vw,2.75rem)] font-light leading-[1.05]">{module.title}</span>
          <span className="area__toggle flex items-center gap-3">
            <span className="eyebrow hidden sm:inline" aria-hidden="true">
              {open ? 'Close' : 'Explore'}
            </span>
            <span aria-hidden="true" className="area__ring">
              <span className="plus" data-open={open ? 'true' : 'false'} />
            </span>
          </span>
        </button>
      </h3>
      <div ref={panel} id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} className="h-0 overflow-hidden" inert={!open}>
        <div className="grid gap-8 pb-10 md:grid-cols-[5rem_1fr] md:gap-x-4 md:pb-12">
          <div className="grid gap-8 md:col-start-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-(--gutter)">
            {module.summary ? (
              <p data-area-point="" className="type-lede max-w-[32ch] text-ink/85">
                {module.summary}
              </p>
            ) : null}
            <ul className="grid content-start border-t border-(--line)">
              {module.items.map((item) => (
                <li key={item} data-area-point="" className="grid grid-cols-[1.75rem_1fr] items-baseline gap-2 border-b border-(--line) py-4 text-[1.02rem] leading-relaxed text-charcoal">
                  <span aria-hidden="true" className="area__dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
