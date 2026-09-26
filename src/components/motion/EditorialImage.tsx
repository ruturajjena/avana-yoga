'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { onPageReady } from '@/lib/page-ready';
import { cn } from '@/lib/utils';

export type RevealDirection = 'up' | 'down' | 'center' | 'horizon' | 'none';

const CLIP: Record<Exclude<RevealDirection, 'none'>, string> = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  center: 'inset(14% 14% 14% 14%)',
  horizon: 'inset(50% 0% 50% 0%)',
};

export type EditorialImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit when the parent sizes the frame. */
  ratio?: string;
  position?: string;
  /** Preload (LCP images only). */
  priority?: boolean;
  quality?: 60 | 70 | 75 | 80 | 85;
  reveal?: RevealDirection;
  revealOn?: 'scroll' | 'load';
  delay?: number;
  /** Scrubbed vertical travel of the image inside its frame (yPercent). */
  parallax?: number;
  /** Starting scale of the "breathe-in" as the clip opens. */
  scale?: number;
  cursor?: string;
};

/** Photography frame: clip-path reveal + breathing scale + optional parallax. */
export function EditorialImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  ratio,
  position,
  priority = false,
  quality = 80,
  reveal = 'up',
  revealOn = 'scroll',
  delay = 0,
  parallax = 0,
  scale = 1.18,
  cursor,
}: EditorialImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = frame.current;
      const media = inner.current;
      if (!el || !media) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const rest = parallax ? 1 + Math.abs(parallax) / 45 : 1;
        let cancelReady: (() => void) | undefined;

        if (reveal !== 'none') {
          const tl = gsap.timeline({
            paused: revealOn === 'load',
            delay,
            scrollTrigger: revealOn === 'scroll' ? { trigger: el, start: 'top 90%', once: true } : undefined,
          });
          tl.fromTo(el, { clipPath: CLIP[reveal] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out' }).fromTo(
            media,
            { scale },
            { scale: rest, duration: 2.1, ease: 'expo.out' },
            0,
          );
          if (revealOn === 'load') cancelReady = onPageReady(() => tl.play());
        } else if (rest !== 1) {
          gsap.set(media, { scale: rest });
        }

        if (parallax) {
          const amount = desktop ? parallax : parallax / 2;
          gsap.fromTo(
            media,
            { yPercent: -amount },
            { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
          );
        }
        return () => cancelReady?.();
      });
      el.setAttribute('data-motion-ready', '');
      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <div
      ref={frame}
      data-reveal-img={reveal !== 'none' ? '' : undefined}
      data-cursor={cursor}
      className={cn('relative overflow-hidden bg-sand', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div ref={inner} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={quality}
          className={cn('object-cover', imageClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    </div>
  );
}

export function ImageReveal(props: EditorialImageProps) {
  return <EditorialImage parallax={0} {...props} />;
}

export function ParallaxImage(props: EditorialImageProps) {
  return <EditorialImage reveal="none" parallax={8} {...props} />;
}
