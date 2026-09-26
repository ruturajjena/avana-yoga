'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { Testimonial } from '@/data/testimonials';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn, padIndex } from '@/lib/utils';

type TestimonialStageProps = {
  items: Testimonial[];
  tone?: 'light' | 'dark';
  label?: string;
  className?: string;
};

/**
 * Editorial testimonials: one voice at a time. A verbatim line from the quote is set large,
 * the full quote sits beneath it, and names act as tabs. Nothing auto-advances.
 */
export function TestimonialStage({ items, tone = 'dark', label = 'Student testimonials', className }: TestimonialStageProps) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const mounted = useRef(false);
  const baseId = useId();

  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const highlight = el.querySelector<HTMLElement>('[data-t-highlight]');
        const body = el.querySelector<HTMLElement>('[data-t-body]');
        if (!highlight) return;
        const split = SplitText.create(highlight, { type: 'words', mask: 'words' });
        gsap.from(split.words, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.022 });
        if (body) gsap.from(body, { opacity: 0, y: 18, duration: 1, ease: 'power3.out', delay: 0.25 });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: root, revertOnUpdate: true },
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const count = items.length;
    const next =
      event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (active + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const item = items[active];
  const muted = tone === 'dark' ? 'text-cream/75' : 'text-ink/75';
  const rule = tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)';

  return (
    <div ref={root} className={cn('grid gap-12', className)}>
      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className="min-h-[26rem] md:min-h-[24rem]">
        <figure key={item.id} className="grid gap-10">
          <blockquote>
            {item.title ? <p className="eyebrow mb-6 opacity-70">{item.title}</p> : null}
            <p
              data-t-highlight=""
              className="max-w-[20ch] font-display text-[clamp(2rem,4.3vw,4.4rem)] font-light italic leading-[1.05] tracking-[-0.015em]"
            >
              “{item.highlight}”
            </p>
            <p data-t-body="" className={cn('mt-10 max-w-[62ch] text-[1.02rem] leading-relaxed', muted)}>
              {item.quote}
            </p>
          </blockquote>
          <figcaption className="eyebrow flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
            {item.name}
          </figcaption>
        </figure>
      </div>

      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cn('flex flex-wrap gap-x-8 gap-y-2 border-t pt-7', rule)}>
        {items.map((testimonial, index) => (
          <button
            key={testimonial.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn('flex min-h-11 items-baseline gap-3 transition-opacity duration-500', index === active ? 'opacity-100' : 'opacity-55 hover:opacity-90')}
          >
            <span className="eyebrow nums-old">{padIndex(index + 1)}</span>
            <span className="font-display text-[1.55rem] leading-none">
              <span className="link-underline" data-active={index === active ? 'true' : undefined}>
                {testimonial.name}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
