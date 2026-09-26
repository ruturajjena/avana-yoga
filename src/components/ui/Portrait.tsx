'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn } from '@/lib/utils';

type PortraitProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  /** Thin halo ring around the portrait — the brand ring motif. */
  ring?: boolean;
  reveal?: boolean;
  priority?: boolean;
};

/**
 * Teacher portrait held inside the brand ring. On scroll it opens as an expanding circle,
 * echoing the concentric rings of “The Origin”.
 */
export function Portrait({ src, alt, sizes, className, position, ring = true, reveal = true, priority = false }: PortraitProps) {
  const frame = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = frame.current;
      const d = disc.current;
      if (!el || !d || !reveal) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        tl.fromTo(d, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 1.6, ease: 'expo.out' });
        tl.fromTo(d.querySelector('img'), { scale: 1.3 }, { scale: 1.07, duration: 2.2, ease: 'expo.out' }, 0);
        if (halo.current) tl.fromTo(halo.current, { scale: 0.82 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.05);
      });
      el.setAttribute('data-motion-ready', '');
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn('relative aspect-square', className)} data-reveal-portrait={reveal ? '' : undefined}>
      {ring ? <span ref={halo} aria-hidden="true" className="pointer-events-none absolute -inset-[5%] rounded-full border border-current opacity-20" /> : null}
      <div ref={disc} className="portrait-disc absolute inset-0 overflow-hidden rounded-full bg-sand">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={80}
          className="scale-[1.07] object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    </div>
  );
}
