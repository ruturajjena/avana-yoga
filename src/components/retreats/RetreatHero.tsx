"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollVideo } from "@/components/motion/ScrollVideo";
import { useRef } from "react";
import { TransitionLink } from "@/components/motion/TransitionProvider";
import { films } from "@/data/films";
import type { Retreat } from "@/data/retreats";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";
import { onPageReady } from "@/lib/page-ready";
import { cn } from "@/lib/utils";

/**
 * Destination opening. Alpine: the frame opens from the horizon line. Coastal: it rises like a tide.
 * With a hero film, the section becomes a sticky stage: scrolling the first ~110svh plays the film
 * (Austria rises from the rooftop class to the Dachstein; Goa moves towards the setting sun) while the
 * title, facts and booking call stay in place. Without a film, the photograph drifts on scroll.
 */
export function RetreatHero({ retreat }: { retreat: Retreat }) {
  const root = useRef<HTMLElement>(null);
  const alpine = retreat.mood === "alpine";
  const hero = retreat.media.hero;
  const film = retreat.media.heroFilm ? films[retreat.media.heroFilm] : null;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(q(".rh-media"), {
          clipPath: alpine ? "inset(50% 0% 50% 0%)" : "inset(100% 0% 0% 0%)",
        });
        gsap.set(q(".rh-image"), { scale: 1.28 });
        gsap.set(q(".rh-line"), { y: 0, yPercent: 115 });
        el.setAttribute("data-motion-ready", "");

        const intro = gsap.timeline({ paused: true });
        intro
          .to(
            q(".rh-media"),
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: alpine ? 2 : 1.7,
              ease: "breath",
            },
            0,
          )
          .to(
            q(".rh-image"),
            { scale: 1.04, duration: 2.8, ease: "expo.out" },
            0,
          )
          .to(
            q(".rh-line"),
            { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.1 },
            0.6,
          );
        const cancelReady = onPageReady(() => intro.play());

        if (!film)
          gsap.to(q(".rh-drift"), {
            yPercent: alpine ? 12 : 4,
            xPercent: alpine ? 0 : -3,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        return () => cancelReady();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [film] },
  );

  return (
    <section
      ref={root}
      data-retreat-hero={retreat.mood}
      data-nav-theme="dark"
      aria-labelledby="retreat-title"
      className={cn(
        "relative bg-ink text-cream",
        film && "motion-safe:h-[210svh] lg:motion-safe:h-[230svh]",
      )}
    >
      <div
        className={cn(
          "relative flex min-h-svh flex-col justify-end overflow-hidden",
          film && "motion-safe:sticky motion-safe:top-0",
        )}
      >
        <div className="rh-media absolute inset-0 overflow-hidden">
          {film ? (
            <ScrollVideo
              film={film}
              trigger={root}
              start="top top"
              end="bottom bottom"
              window={[0, 0.96]}
              smoothing={0.1}
              priority
              className="rh-image h-full w-full"
            />
          ) : (
            <div className="rh-drift absolute inset-x-[-4%] inset-y-[-8%]">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(orientation: portrait) 400vw, 100vw"
                quality={70}
                preload
                className="rh-image object-cover"
                style={
                  hero.position ? { objectPosition: hero.position } : undefined
                }
              />
            </div>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(28_36_31/0.88)_0%,rgb(28_36_31/0.36)_48%,rgb(28_36_31/0.3)_100%)]" />
        </div>

        <nav
          aria-label="Breadcrumb"
          className="absolute inset-x-0 top-0 z-10 px-page pt-[calc(var(--nav-h)+1rem)]"
        >
          <ol className="eyebrow flex flex-wrap items-center gap-x-3 text-cream/75 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center">
            <li>
              <TransitionLink href="/">
                <span className="link-underline">Home</span>
              </TransitionLink>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <TransitionLink href="/yoga-retreats/">
                <span className="link-underline">Retreats</span>
              </TransitionLink>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-cream">
              {retreat.destination}
            </li>
          </ol>
        </nav>

        <div className="relative z-10 px-page pb-[max(2.5rem,6svh)] pt-[calc(var(--nav-h)+5rem)]">
          <p className="eyebrow">{retreat.region}</p>
          <h1 id="retreat-title" className="mt-6">
            <span className="rl-mask block overflow-clip">
              <span className="rh-line type-mega block">
                {retreat.destination}
              </span>
            </span>
            <span className="rl-mask mt-5 block overflow-clip">
              <span className="rh-line type-s block max-w-[26ch] font-light">
                {retreat.title}
              </span>
            </span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-(--line-dark) pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <dl className="grid grid-cols-3 gap-5 md:max-w-[42rem]">
              <div>
                <dt className="eyebrow text-cream/65">Status</dt>
                <dd className="mt-2 font-display text-[clamp(1.15rem,1.8vw,1.6rem)] leading-tight">
                  {retreat.status}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/65">Duration</dt>
                <dd className="mt-2 font-display text-[clamp(1.15rem,1.8vw,1.6rem)] leading-tight">
                  {retreat.duration}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/65">From</dt>
                <dd className="mt-2 font-display text-[clamp(1.15rem,1.8vw,1.6rem)] leading-tight">
                  {retreat.fromPrice} pp
                </dd>
              </div>
            </dl>
            <MagneticButton
              href={retreat.booking.href}
              tone="cream"
              srSuffix={`: ${retreat.title}`}
              className="justify-self-start"
            >
              {retreat.booking.reserveLabel}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
