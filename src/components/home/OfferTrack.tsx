'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { home } from '@/data/home';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { padIndex } from '@/lib/utils';

/**
 * 02 · What We Offer — a horizontal walk through Courses, Retreats and Events on desktop,
 * a calm vertical sequence on mobile and under reduced motion.
 */
export function OfferTrack() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { offer } = home;

  useGSAP(
    () => {
      const el = section.current;
      const tr = track.current;
      if (!el || !tr) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
        const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        const tween = gsap.to(tr, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tr.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
          const media = panel.querySelector('[data-panel-media]');
          const rule = panel.querySelector('[data-panel-rule]');
          if (media) {
            gsap.fromTo(
              media,
              { scale: 1.22 },
              { scale: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true } },
            );
          }
          if (rule) {
            gsap.fromTo(
              rule,
              { scaleX: 0 },
              { scaleX: 1, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 85%', end: 'left 35%', scrub: true } },
            );
          }
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="offer" data-nav-theme="light" aria-labelledby="offer-title" className="relative overflow-hidden lg:motion-safe:h-svh">
      <div
        ref={track}
        className="flex flex-col gap-24 px-page py-(--space-section) lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[6vw] lg:motion-safe:py-0 lg:motion-safe:pr-[12vw]"
      >
        <div className="shrink-0 lg:motion-safe:w-[32vw]">
          <SectionHeading id="offer-title" index="02" eyebrow={offer.eyebrow} title={offer.heading} size="xl" />
          <p aria-hidden="true" className="eyebrow mt-12 hidden items-center gap-4 opacity-70 lg:motion-safe:flex">
            {offer.items.map((item) => item.title).join(' · ')}
            <span className="arrow inline-block">→</span>
          </p>
        </div>

        {offer.items.map((item, index) => (
          <article
            key={item.title}
            data-panel=""
            aria-labelledby={`offer-${index}`}
            className="grid shrink-0 gap-8 md:grid-cols-2 md:items-end md:gap-(--gutter) lg:motion-safe:h-[72svh] lg:motion-safe:w-[64vw] lg:motion-safe:grid-cols-[1.2fr_1fr] lg:motion-safe:gap-[3vw]"
          >
            <TransitionLink
              href={item.href}
              tabIndex={-1}
              aria-hidden="true"
              data-cursor="Explore"
              className="group relative block aspect-[4/5] overflow-hidden bg-sand lg:motion-safe:aspect-auto lg:motion-safe:h-full"
            >
              <div data-panel-media="" className="absolute inset-0">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-(--ease-expo) group-hover:scale-[1.04]"
                  style={item.image.position ? { objectPosition: item.image.position } : undefined}
                />
              </div>
            </TransitionLink>
            <div className="pb-1">
              <p className="eyebrow nums-old opacity-60">{padIndex(index + 1)}</p>
              <span data-panel-rule="" aria-hidden="true" className="mt-6 block h-px w-full origin-left bg-current opacity-25" />
              <h3 id={`offer-${index}`} className="type-xl mt-8">
                {item.title}
              </h3>
              <p className="mt-6 max-w-[38ch] text-ink/75">{item.text}</p>
              <ArrowLink href={item.href} className="mt-8">
                {offer.cta}
                <span className="sr-only"> about {item.title}</span>
              </ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
