'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import type { Photo } from '@/lib/types';
import { cn, padIndex } from '@/lib/utils';

export type StoryChapter = { key: string; label: string; paragraphs: string[]; image: Photo; secondary?: Photo };

const HIDDEN = { alpine: 'inset(50% 0% 50% 0%)', coastal: 'inset(100% 0% 0% 0%)' } as const;

/**
 * Where you’ll be · What you’ll do · How you’ll feel.
 * Desktop: one sticky frame re-opens with each chapter while the text scrolls beside it.
 * Coastal pages also warm the canvas, like light moving towards sunset.
 */
export function StoryChapters({ chapters, mood }: { chapters: StoryChapter[]; mood: 'alpine' | 'coastal' }) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef(1);
  const mounted = useRef(false);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        el.querySelectorAll<HTMLElement>('[data-chapter]').forEach((pane, index) => {
          ScrollTrigger.create({
            trigger: pane,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
      });
      if (mood === 'coastal') {
        mm.add(MQ.motion, () => {
          gsap.fromTo(
            el,
            { backgroundColor: '#f3dec4' },
            { backgroundColor: '#ecc9a4', ease: 'none', scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 40%', scrub: true } },
          );
        });
      }
      return () => mm.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      const frame = root.current?.querySelector<HTMLElement>(`[data-story-frame="${active}"]`);
      if (!frame) return;
      const reduce = window.matchMedia(MQ.reduce).matches;
      layer.current += 1;
      gsap.set(frame, { zIndex: layer.current });
      gsap.fromTo(frame, { clipPath: HIDDEN[mood] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduce ? 0 : 1.4, ease: 'breath', overwrite: 'auto' });
      const image = frame.querySelector('img');
      if (image && !reduce) gsap.fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.9, ease: 'expo.out', overwrite: 'auto' });
    },
    { dependencies: [active], scope: root },
  );

  const alpine = mood === 'alpine';

  return (
    <div ref={root} className={cn('px-page py-(--space-section)', alpine ? 'bg-alpine-mist' : 'bg-coast-sand')}>
      <div className="grid-page items-start">
        <div className={cn('relative hidden self-stretch lg:col-span-6 lg:row-start-1 lg:block', alpine ? 'lg:col-start-1' : 'lg:col-start-7')}>
          <div className="sticky top-[calc(var(--nav-h)+5vh)] h-[min(80vh,52rem)] w-full overflow-hidden bg-sand">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.key}
                data-story-frame={index}
                className="absolute inset-0"
                style={{ zIndex: index === 0 ? 1 : 0, clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : HIDDEN[mood] }}
              >
                <Image
                  src={chapter.image.src}
                  alt={chapter.image.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 1px"
                  className="object-cover"
                  style={chapter.image.position ? { objectPosition: chapter.image.position } : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cn('col-span-4 grid gap-(--space-section) md:col-span-8 lg:col-span-5 lg:row-start-1', alpine ? 'lg:col-start-8' : 'lg:col-start-1')}>
          {chapters.map((chapter, index) => (
            <article
              key={chapter.key}
              data-chapter=""
              aria-labelledby={`story-${chapter.key}`}
              className="flex flex-col justify-center lg:min-h-[min(80vh,52rem)]"
            >
              <EditorialImage
                src={chapter.image.src}
                alt={chapter.image.alt}
                position={chapter.image.position}
                ratio="4 / 5"
                sizes="(min-width: 768px) 70vw, 100vw"
                reveal={alpine ? 'horizon' : 'up'}
                className="mb-10 md:w-[80%] lg:hidden"
              />
              <p className="eyebrow nums-old opacity-60">{padIndex(index + 1)}</p>
              <h3 id={`story-${chapter.key}`} className="type-l mt-5">
                {chapter.label}
              </h3>
              <div className="mt-8 grid gap-5">
                {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraph} className={paragraphIndex === 0 ? 'type-lede text-ink' : 'text-[1.05rem] leading-relaxed text-ink/75'}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {chapter.secondary ? (
                <EditorialImage
                  src={chapter.secondary.src}
                  alt={chapter.secondary.alt}
                  position={chapter.secondary.position}
                  ratio="3 / 2"
                  sizes="(min-width: 1024px) 30vw, 78vw"
                  reveal="center"
                  parallax={4}
                  className={cn('mt-12 w-[78%]', !alpine && 'self-end')}
                />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
