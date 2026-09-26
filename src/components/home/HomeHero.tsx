'use client';

import { useRef } from 'react';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ScrollVideo } from '@/components/motion/ScrollVideo';
import { films } from '@/data/films';
import { home } from '@/data/home';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { onPageReady } from '@/lib/page-ready';

const RING = 2 * Math.PI * 49.5;

function Chars({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-clip pb-[0.04em]">
      {text.split('').map((char, index) => (
        <span key={`${char}-${index}`} className="hero-char inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}

/**
 * 01 · Entering the space.
 * A ring draws, the wordmark rises around a small aperture onto “The Origin”. Scrolling parts the
 * wordmark, opens the aperture to full bleed while the film plays (sand ring → ripples → mountains →
 * meditator), and the promise rises over the final frame.
 */
export function HomeHero() {
  const section = useRef<HTMLElement>(null);
  const aperture = useRef<HTMLDivElement>(null);
  const { hero } = home;

  useGSAP(
    () => {
      const el = section.current;
      const ap = aperture.current;
      if (!el || !ap) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, motion: MQ.motion }, (context) => {
        const { desktop, motion } = context.conditions as { desktop: boolean; motion: boolean };
        if (!motion) return;

        const startRadius = () =>
          desktop ? Math.min(window.innerHeight * 0.21, window.innerWidth * 0.15) : Math.min(window.innerHeight * 0.22, window.innerWidth * 0.32);
        const endRadius = () => Math.hypot(window.innerWidth, window.innerHeight) / 2 + 4;

        // Take over from the CSS pre-state without a jump.
        gsap.set(ap, { clipPath: `circle(${startRadius()}px at 50% 50%)` });
        gsap.set(q('.hero-char, .hero-line'), { y: 0, yPercent: 112 });
        gsap.set(q('.hero-scrim'), { opacity: 0 });
        gsap.set(q('.hero-sub'), { autoAlpha: 0 });
        gsap.set(q('.hero-meta-inner'), { opacity: 0 });
        gsap.set(q('.hero-ring circle'), { strokeDasharray: RING, strokeDashoffset: RING });
        el.setAttribute('data-motion-ready', '');

        // Arrival — the ring draws, the film breathes in, the wordmark rises.
        const intro = gsap.timeline({ paused: true });
        intro
          .to(q('.hero-ring circle'), { strokeDashoffset: 0, duration: 1.8, ease: 'breath' }, 0)
          .fromTo(q('.hero-film'), { scale: 1.3 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
          .to(q('.hero-char'), { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.045 }, 0.35)
          .to(q('.hero-meta-inner'), { opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.12 }, 1);
        const cancelReady = onPageReady(() => intro.play());

        // Entering the space — scrubbed across the pinned stage.
        const part = desktop
          ? { left: { xPercent: -65 }, right: { xPercent: 65 } }
          : { left: { yPercent: -150 }, right: { yPercent: 150 } };
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
        });
        tl.to(q('.hero-left'), { ...part.left, opacity: 0, duration: 0.3 }, 0)
          .to(q('.hero-right'), { ...part.right, opacity: 0, duration: 0.3 }, 0)
          .to(q('.hero-meta'), { opacity: 0, duration: 0.1 }, 0)
          .to(q('.hero-ring'), { scale: 2.6, opacity: 0, duration: 0.32 }, 0)
          .fromTo(
            ap,
            { clipPath: () => `circle(${startRadius()}px at 50% 50%)` },
            { clipPath: () => `circle(${endRadius()}px at 50% 50%)`, duration: 0.42 },
            0,
          )
          .to(q('.hero-scrim'), { opacity: 1, duration: 0.2 }, 0.44)
          .to(q('.hero-line'), { yPercent: 0, duration: 0.14, stagger: 0.06 }, 0.5)
          .to(q('.hero-sub'), { autoAlpha: 1, duration: 0.12 }, 0.7)
          .to({}, { duration: 0.18 }, 0.82);

        return () => cancelReady();
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="origin"
      data-hero=""
      data-nav-theme="light"
      aria-labelledby="hero-title"
      className="relative motion-safe:h-[260vh] lg:motion-safe:h-[300vh]"
    >
      <div className="relative h-svh overflow-hidden motion-safe:sticky motion-safe:top-0">
        <div ref={aperture} className="hero-aperture absolute inset-0 overflow-hidden bg-sand">
          <div className="hero-film absolute inset-0">
            <ScrollVideo
              film={films.origin}
              trigger={section}
              start="top top"
              end="bottom bottom"
              window={[0.03, 0.9]}
              controls={false}
              priority
              className="h-full w-full"
            />
          </div>
          <div className="hero-scrim pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(28_36_31/0.85)_0%,rgb(28_36_31/0.42)_42%,rgb(28_36_31/0)_72%)]" />
        </div>

        <div aria-hidden="true" className="hero-ring pointer-events-none absolute inset-0">
          <div className="grid h-full w-full place-items-center">
            <svg viewBox="0 0 100 100" className="text-ink" style={{ width: 'calc(2 * var(--hero-r0) + 3.5rem)', height: 'calc(2 * var(--hero-r0) + 3.5rem)' }}>
              <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.2" transform="rotate(-90 50 50)" opacity="0.55" />
            </svg>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-wordmark pointer-events-none absolute inset-0 text-ink"
        >
          <span className="hero-left font-display text-[clamp(3rem,min(23vw,13svh),8.5rem)] font-light leading-[0.82] tracking-[-0.03em] lg:text-[clamp(4.5rem,7.4vw,11rem)]">
            <Chars text="AVANA" />
          </span>
          <span className="hero-right font-display text-[clamp(3rem,min(23vw,13svh),8.5rem)] font-light leading-[0.82] tracking-[-0.03em] lg:text-[clamp(4.5rem,7.4vw,11rem)]">
            <Chars text="YOGA" />
          </span>
        </div>

        {/* The eyebrow sits under the nav on desktop. On phones the circle needs that room, so it
            joins the foot of the stage instead; exactly one of the two is ever displayed. */}
        <div className="hero-meta hero-eyebrow-top pointer-events-none absolute inset-x-0 top-0 px-page pt-[calc(var(--nav-h)+1.25rem)]">
          <p className="hero-meta-inner eyebrow">{hero.eyebrow}</p>
        </div>
        <div className="hero-meta pointer-events-none absolute inset-x-0 bottom-0 px-page pb-6 lg:pb-9">
          <div className="hero-meta-inner flex items-end justify-between gap-6">
            <p className="hero-eyebrow-bottom eyebrow">{hero.eyebrow}</p>
            <p aria-hidden="true" className="hidden max-w-[30ch] text-[0.95rem] leading-snug text-ink/80 lg:block">
              {hero.subline}
            </p>
            <p aria-hidden="true" className="eyebrow flex items-center gap-3">
              <span>Scroll</span>
              <span className="block h-9 w-px bg-current opacity-50" />
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-page pb-[max(2.5rem,7svh)] text-cream">
          <h1 id="hero-title" className="type-xl max-w-[14ch]">
            {hero.title.map((line) => (
              <span key={line} className="rl-mask block overflow-clip">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero-sub mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[34ch] text-[1.05rem] leading-relaxed text-cream/85">{hero.subline}</p>
            <MagneticButton href={hero.cta.href} tone="cream">
              {hero.cta.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
