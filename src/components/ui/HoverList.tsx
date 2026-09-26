'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn, padIndex } from '@/lib/utils';

export type HoverListItem = {
  href: string;
  title: string;
  eyebrow?: string;
  meta?: string;
  image?: { src: string; alt: string };
  external?: boolean;
};

type HoverListProps = {
  items: HoverListItem[];
  className?: string;
  size?: 'l' | 'm' | 's';
  tone?: 'light' | 'dark';
  numbered?: boolean;
  startIndex?: number;
  headingLevel?: 'h2' | 'h3';
};

const TITLE = {
  l: 'text-[clamp(2rem,4.6vw,4.75rem)] leading-[0.98] tracking-[-0.02em] font-light',
  m: 'text-[clamp(1.6rem,3vw,3rem)] leading-[1.02] tracking-[-0.015em]',
  s: 'text-[clamp(1.35rem,2vw,2rem)] leading-[1.1]',
} as const;

/**
 * Editorial index rows. On desktop a single preview image follows the pointer and
 * swaps as rows are hovered or focused; on touch devices each row carries a thumbnail.
 */
export function HoverList({ items, className, size = 'm', tone = 'light', numbered = true, startIndex = 1, headingLevel = 'h3' }: HoverListProps) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const Heading = headingLevel;

  useGSAP(
    () => {
      const el = root.current;
      const card = preview.current;
      if (!el || !card) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.fine} and ${MQ.motion} and ${MQ.desktop}`, () => {
        const xTo = gsap.quickTo(card, 'x', { duration: 0.8, ease: 'power3.out' });
        const yTo = gsap.quickTo(card, 'y', { duration: 0.8, ease: 'power3.out' });
        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          xTo(event.clientX - rect.left);
          yTo(event.clientY - rect.top);
        };
        el.addEventListener('pointermove', move);
        return () => el.removeEventListener('pointermove', move);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const card = preview.current;
      if (!card) return;
      gsap.to(card, {
        autoAlpha: active === null ? 0 : 1,
        scale: active === null ? 0.9 : 1,
        duration: 0.6,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    },
    { dependencies: [active] },
  );

  const hasImages = items.some((item) => item.image);
  const rule = tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)';

  return (
    <div ref={root} className={cn('relative', className)} onPointerLeave={() => setActive(null)}>
      <ul className={cn('border-t', rule)}>
        {items.map((item, index) => {
          const content = (
            <span className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 py-7 md:grid-cols-[4rem_1fr_auto] md:items-center md:py-9">
              {item.image ? (
                <span className="relative row-span-2 block aspect-[4/5] w-16 overflow-hidden bg-sand md:hidden">
                  <Image src={item.image.src} alt="" fill sizes="64px" className="object-cover" />
                </span>
              ) : numbered ? (
                <span className="eyebrow nums-old pt-1 opacity-60 md:hidden">{padIndex(index + startIndex)}</span>
              ) : (
                <span className="md:hidden" />
              )}
              <span className="eyebrow nums-old hidden opacity-60 md:block">{numbered ? padIndex(index + startIndex) : null}</span>
              <span className="min-w-0">
                {item.eyebrow ? <span className="eyebrow mb-3 block opacity-65">{item.eyebrow}</span> : null}
                <Heading className={cn('font-display transition-transform duration-700 ease-(--ease-expo) md:group-hover:translate-x-3', TITLE[size])}>
                  {item.title}
                </Heading>
              </span>
              <span className="eyebrow col-start-2 flex items-center gap-4 opacity-80 md:col-start-auto md:justify-end">
                {item.meta ? <span>{item.meta}</span> : null}
                <span aria-hidden="true" className="arrow inline-block">
                  {item.external ? '↗' : '→'}
                </span>
              </span>
            </span>
          );
          const handlers = { onPointerEnter: () => setActive(index), onFocus: () => setActive(index), onBlur: () => setActive(null) };
          return (
            <li key={item.href + item.title} className={cn('border-b', rule)}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="arrow-link group block" {...handlers}>
                  {content}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <TransitionLink href={item.href} className="arrow-link group block" {...handlers}>
                  {content}
                </TransitionLink>
              )}
            </li>
          );
        })}
      </ul>

      {hasImages ? (
        <div
          ref={preview}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/5] w-[min(22vw,20rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-sand opacity-0 lg:block"
          style={{ visibility: 'hidden' }}
        >
          {items.map((item, index) =>
            item.image ? (
              <Image
                key={item.href + item.title}
                src={item.image.src}
                alt=""
                fill
                sizes="320px"
                className={cn('object-cover transition-opacity duration-500', active === index ? 'opacity-100' : 'opacity-0')}
              />
            ) : null,
          )}
        </div>
      ) : null}
    </div>
  );
}
