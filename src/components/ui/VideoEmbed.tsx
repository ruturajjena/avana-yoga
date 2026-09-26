'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

type VideoEmbedProps = {
  src: string;
  title: string;
  poster?: { src: string; alt: string };
  ratio?: string;
  className?: string;
  /** Verb for the button, e.g. "Play video" or "Open course manual". */
  action?: string;
  allow?: string;
};

/**
 * Click-to-load facade for third-party embeds (video lessons, course manual).
 * Nothing from the third party loads until the visitor asks for it — faster pages, no tracking on arrival.
 */
export function VideoEmbed({
  src,
  title,
  poster,
  ratio = '16 / 9',
  className,
  action = 'Play video',
  allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media',
}: VideoEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-ink text-cream', className)} style={{ aspectRatio: ratio }}>
      {active ? (
        <iframe src={src} title={title} allow={allow} allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 grid place-items-center" data-cursor={action.split(' ')[0]}>
          {poster ? (
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover opacity-60 transition-transform duration-[1600ms] ease-(--ease-expo) group-hover:scale-[1.03]"
            />
          ) : (
            <Logo className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 opacity-15" />
          )}
          <span className="relative grid size-20 place-items-center rounded-full border border-cream/70 transition-colors duration-500 group-hover:bg-cream group-hover:text-ink group-focus-visible:bg-cream group-focus-visible:text-ink md:size-28">
            <svg viewBox="0 0 12 14" className="ml-1 w-3.5" aria-hidden="true">
              <path d="M1 1l10 6-10 6z" fill="currentColor" />
            </svg>
          </span>
          <span className="eyebrow absolute bottom-5 left-5 right-5 text-left md:bottom-7 md:left-7">
            {action}
            <span className="sr-only">: {title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
