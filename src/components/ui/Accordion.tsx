'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type AccordionItem = { question: string; answer: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  headingLevel?: 2 | 3 | 4;
  tone?: 'light' | 'dark';
};

export function Accordion({ items, className, headingLevel = 3, tone = 'light' }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  return (
    <div className={cn('border-t', tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)', className)}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          id={`${baseId}-${index}`}
          item={item}
          open={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
          headingLevel={headingLevel}
          tone={tone}
        />
      ))}
    </div>
  );
}

type AccordionRowProps = {
  id: string;
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
  headingLevel: 2 | 3 | 4;
  tone: 'light' | 'dark';
};

function AccordionRow({ id, item, open, onToggle, headingLevel, tone }: AccordionRowProps) {
  const panel = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      if (!mounted.current) {
        mounted.current = true;
        gsap.set(el, { height: open ? 'auto' : 0 });
        return;
      }
      const reduce = window.matchMedia(MQ.reduce).matches;
      gsap.to(el, {
        height: open ? 'auto' : 0,
        duration: reduce ? 0 : 0.75,
        ease: 'breath',
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { dependencies: [open] },
  );

  const Heading = `h${headingLevel}` as 'h3';

  return (
    <div className={cn('border-b', tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)')}>
      <Heading className="m-0">
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-8 py-7 text-left font-display text-[clamp(1.3rem,1.9vw,1.85rem)] leading-snug"
        >
          <span>{item.question}</span>
          <span aria-hidden="true" className="plus" data-open={open ? 'true' : 'false'} />
        </button>
      </Heading>
      <div ref={panel} id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} className="h-0 overflow-hidden" inert={!open}>
        <div className={cn('max-w-[68ch] pb-9 text-[1.02rem] leading-relaxed', tone === 'dark' ? 'text-cream/75' : 'text-ink/75')}>{item.answer}</div>
      </div>
    </div>
  );
}
