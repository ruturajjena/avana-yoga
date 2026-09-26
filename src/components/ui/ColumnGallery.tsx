'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import type { Photo } from '@/lib/types';
import { cn } from '@/lib/utils';

type ColumnGalleryProps = { photos: Photo[]; label: string; className?: string };

const TRAVEL = [-9, 11, -5];

/** Alpine gallery: three columns rising and falling at different speeds, like ridgelines at different distances. */
export function ColumnGallery({ photos, label, className }: ColumnGalleryProps) {
  const root = useRef<HTMLDivElement>(null);
  const columns = [0, 1, 2].map((column) => photos.filter((_, index) => index % 3 === column));

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        el.querySelectorAll<HTMLElement>('[data-column]').forEach((column, index) => {
          gsap.fromTo(
            column,
            { yPercent: -TRAVEL[index] / 2 },
            { yPercent: TRAVEL[index] / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} role="region" aria-label={label} className={cn('px-page', className)}>
      <div className="columns-2 gap-3 md:hidden">
        {photos.map((photo) => (
          <figure key={photo.src} className="relative mb-3 break-inside-avoid overflow-hidden bg-sand" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="50vw"
              className="object-cover"
              style={photo.position ? { objectPosition: photo.position } : undefined}
            />
          </figure>
        ))}
      </div>

      <div className="hidden grid-cols-3 items-start gap-(--gutter) md:grid">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} data-column="" className={cn('grid gap-(--gutter)', columnIndex === 1 && 'mt-[10vh]')}>
            {column.map((photo) => (
              <figure key={photo.src} className="relative overflow-hidden bg-sand" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 1px"
                  className="object-cover"
                  style={photo.position ? { objectPosition: photo.position } : undefined}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
