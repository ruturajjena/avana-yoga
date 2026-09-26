'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import type { BioVariant, Teacher, TeacherSlug } from '@/data/teachers';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn, padIndex } from '@/lib/utils';
import { TeacherDetails, portraitPosition } from './TeacherDetails';

type TeacherIndexProps = {
  teachers: Teacher[];
  /** Page-specific biography variants, so each page shows the wording it publishes. */
  variants?: Partial<Record<TeacherSlug, BioVariant>>;
  /** Label shown at the top of the profile sheet. */
  context: string;
  tone?: 'light' | 'dark';
  size?: 'l' | 'm';
  className?: string;
};

/**
 * Editorial teacher index. Desktop: names on the right, a single portrait in the brand ring on the left
 * that re-opens as each name is hovered or focused. Mobile: a vertical sequence with portraits inline.
 * Every name opens the full profile in a sheet.
 */
export function TeacherIndex({ teachers, variants, context, tone = 'light', size = 'l', className }: TeacherIndexProps) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef(1);
  const mounted = useRef(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      const disc = root.current?.querySelector<HTMLElement>(`[data-portrait="${active}"]`);
      if (!disc) return;
      const reduce = window.matchMedia(MQ.reduce).matches;
      layer.current += 1;
      gsap.set(disc, { zIndex: layer.current });
      gsap.fromTo(
        disc,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(50% at 50% 50%)', duration: reduce ? 0 : 1.1, ease: 'expo.out', overwrite: 'auto' },
      );
      const img = disc.querySelector('img');
      if (img && !reduce) gsap.fromTo(img, { scale: 1.22 }, { scale: 1.07, duration: 1.6, ease: 'expo.out', overwrite: 'auto' });
    },
    { dependencies: [active], scope: root },
  );

  const rule = tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)';
  const current = teachers[selected] ?? teachers[0];

  return (
    <div ref={root} className={cn('grid-page items-start gap-y-10', className)}>
      <div className="relative hidden self-stretch lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+6vh)]">
          <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
            <span aria-hidden="true" className="pointer-events-none absolute -inset-[5%] rounded-full border border-current opacity-20" />
            <span aria-hidden="true" className="pointer-events-none absolute -inset-[11%] rounded-full border border-current opacity-10" />
            {teachers.map((teacher, index) => (
              <div
                key={teacher.slug}
                data-portrait={index}
                className="absolute inset-0 overflow-hidden rounded-full bg-sand"
                style={{ clipPath: index === 0 ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)', zIndex: index === 0 ? 1 : 0 }}
              >
                <Image
                  src={teacher.portrait.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, 1px"
                  className="scale-[1.07] object-cover"
                  style={{ objectPosition: portraitPosition(teacher.slug) }}
                />
              </div>
            ))}
          </div>
          <p className="eyebrow mt-12 text-center opacity-70" aria-hidden="true">
            {teachers[active]?.discipline}
          </p>
        </div>
      </div>

      <ul className={cn('col-span-4 border-t md:col-span-8 lg:col-span-6 lg:col-start-7', rule)}>
        {teachers.map((teacher, index) => (
          <li key={teacher.slug} className={cn('border-b', rule)}>
            <button
              type="button"
              aria-haspopup="dialog"
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => {
                setSelected(index);
                setOpen(true);
              }}
              className="arrow-link group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 py-6 text-left md:gap-x-8 md:py-8"
            >
              <span className="relative size-16 overflow-hidden rounded-full bg-sand md:size-20 lg:hidden">
                <Image
                  src={teacher.portrait.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="scale-[1.07] object-cover"
                  style={{ objectPosition: portraitPosition(teacher.slug) }}
                />
              </span>
              <span className="eyebrow nums-old hidden opacity-55 lg:block">{padIndex(index + 1)}</span>
              <span className="min-w-0">
                <span
                  className={cn(
                    'block font-display font-light leading-[1] tracking-[-0.02em] transition-transform duration-700 ease-(--ease-expo) lg:group-hover:translate-x-3 lg:group-focus-visible:translate-x-3',
                    size === 'l' ? 'text-[clamp(1.9rem,4.2vw,4.1rem)]' : 'text-[clamp(1.7rem,3vw,3rem)]',
                  )}
                >
                  {teacher.fullName}
                </span>
                <span className="mt-3 block text-[0.9rem] leading-snug opacity-70">{teacher.discipline}</span>
              </span>
              <span className="eyebrow flex items-center gap-3 opacity-80">
                <span className="hidden sm:inline">Profile</span>
                <span aria-hidden="true" className="arrow inline-block">
                  →
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Sheet open={open} onClose={close} eyebrow={context} title={current.fullName}>
        <TeacherDetails teacher={current} variant={variants?.[current.slug]} />
      </Sheet>
    </div>
  );
}
