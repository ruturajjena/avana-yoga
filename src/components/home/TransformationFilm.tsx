'use client';

import { useRef } from 'react';
import { ScrollVideo } from '@/components/motion/ScrollVideo';
import { films } from '@/data/films';
import { home } from '@/data/home';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * The Transformation — stone becomes mandala, smoke, a human form, and stone again.
 * The film is feathered into the cream page; the school’s two sentences arrive in turn.
 */
export function TransformationFilm() {
  const section = useRef<HTMLElement>(null);
  const { lines } = home.transformation;

  useGSAP(
    () => {
      const el = section.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        });
        tl.fromTo(q('.tf-film'), { scale: 0.88 }, { scale: 1, duration: 1 }, 0);
        q('.tf-line').forEach((line, index) => {
          const words = line.querySelectorAll('.tf-word');
          if (index === 0) {
            tl.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 0.1, stagger: 0.018 }, 0.06).to(
              words,
              { yPercent: -115, duration: 0.08, stagger: 0.012 },
              0.42,
            );
          } else {
            tl.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 0.1, stagger: 0.018 }, 0.56);
          }
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="transformation"
      data-nav-theme="light"
      aria-labelledby="transformation-title"
      className="relative motion-safe:h-[180vh] lg:motion-safe:h-[260vh]"
    >
      <div className="relative h-svh overflow-hidden motion-safe:sticky motion-safe:top-0">
        <div className="tf-film absolute inset-0">
          <ScrollVideo
            film={films.transformation}
            trigger={section}
            start="top top"
            end="bottom bottom"
            window={[0.02, 0.96]}
            className="h-full w-full"
            mediaClassName="film-feather"
          />
        </div>
        <h2 id="transformation-title" className="pointer-events-none absolute inset-0 grid grid-rows-2 px-page text-center">
          {lines.map((line, index) => (
            <span
              key={line}
              className={cn(
                'tf-line block font-display text-[clamp(2.3rem,6vw,6.25rem)] font-light leading-[1.02] tracking-[-0.02em]',
                index === 0 ? 'self-start pt-[calc(var(--nav-h)+6svh)]' : 'self-end pb-[10svh] italic',
              )}
            >
              {line.split(' ').map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`} className="mr-[0.24em] inline-block overflow-clip pb-[0.12em] align-top last:mr-0">
                  <span className="tf-word inline-block">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
