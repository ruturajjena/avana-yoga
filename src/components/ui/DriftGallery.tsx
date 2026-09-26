'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import type { Photo } from '@/lib/types';
import { cn } from '@/lib/utils';

type DriftGalleryProps = { photos: Photo[]; label: string; className?: string };

/**
 * Horizontal drift gallery. Desktop: rows glide with scroll like a tide — two rows in opposite directions
 * for larger sets, one tall row for smaller ones. Touch devices: one native, swipeable row with snap points.
 */
export function DriftGallery({ photos, label, className }: DriftGalleryProps) {
  const root = useRef<HTMLDivElement>(null);
  const rows = photos.length >= 6 ? [photos.filter((_, index) => index % 2 === 0), photos.filter((_, index) => index % 2 === 1)] : [photos];
  const single = rows.length === 1;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        el.querySelectorAll<HTMLElement>('[data-drift-row]').forEach((row, index) => {
          const travel = () => Math.max(0, row.scrollWidth - el.clientWidth);
          const forward = index % 2 === 0;
          gsap.fromTo(
            row,
            { x: () => (forward ? 0 : -travel()) },
            {
              x: () => (forward ? -travel() : 0),
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.9, invalidateOnRefresh: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} role="region" aria-label={label} className={cn('overflow-hidden', className)}>
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-page pb-2 [scrollbar-width:none] lg:hidden">
        {photos.map((photo) => (
          <li
            key={photo.src}
            className="relative h-[46svh] max-h-[30rem] shrink-0 snap-center overflow-hidden bg-sand"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="80vw"
              className="object-cover"
              style={photo.position ? { objectPosition: photo.position } : undefined}
            />
          </li>
        ))}
      </ul>

      <div className="hidden gap-8 lg:grid">
        {rows.map((row, rowIndex) => (
          <ul key={rowIndex} data-drift-row="" className="mx-auto flex w-max gap-8 px-page motion-reduce:w-auto motion-reduce:flex-wrap">
            {row.map((photo) => (
              <li
                key={photo.src}
                className={cn('relative shrink-0 overflow-hidden bg-sand', single ? 'h-[60vh]' : 'h-[42vh]')}
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 1px"
                  className="object-cover"
                  style={photo.position ? { objectPosition: photo.position } : undefined}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
