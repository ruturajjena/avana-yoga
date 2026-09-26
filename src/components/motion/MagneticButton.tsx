"use client";

import { Children, useRef, type ReactNode, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";
import { cn, isExternalHref } from "@/lib/utils";
import { TransitionLink } from "./TransitionProvider";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  /** 'ink' on light canvases, 'cream' on dark canvases and film. */
  tone?: "ink" | "cream";
  size?: "md" | "lg";
  /** Stretch to the container width (e.g. inside the enrolment panel). */
  block?: boolean;
  /** Extra context for screen readers, e.g. "— 200 Hour Yoga Teacher Training". */
  srSuffix?: string;
  className?: string;
};

/** Petal pairs: [closed angle, open angle]. The centre petal stays upright. */
const PETALS = [
  [0, 0],
  [-16, -34],
  [16, 34],
  [-34, -68],
  [34, 68],
] as const;

/** A lotus drawn in the same 1.25 px stroke language as the brand ring. Petals unfold on hover. */
function Lotus() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="lotus-cta__lotus"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PETALS.map(([closed, open], index) => (
        <path
          key={index}
          className="lotus-cta__petal"
          style={
            {
              "--rc": `${closed}deg`,
              "--ro": `${open}deg`,
            } as React.CSSProperties
          }
          d="M12 18.5C9.4 15.4 9.6 10.2 12 6.2c2.4 4 2.6 9.2 0 12.3Z"
        />
      ))}
      <circle
        className="lotus-cta__bindu"
        cx="12"
        cy="3.2"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
      <path d="M4.5 20.6c2.4 1.1 4.9 1.6 7.5 1.6s5.1-.5 7.5-1.6" />
    </svg>
  );
}

/** Sets the last word in Cormorant italic: "Enroll *Now*", "Secure my *slot*". */
function Label({ children }: { children: ReactNode }) {
  const text = Children.toArray(children).join("");
  const words = text.trim().split(/\s+/);
  if (!text || words.length < 2) return <>{children}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")} <em>{words.at(-1)}</em>
    </>
  );
}

/**
 * Primary conversion moment — the "lotus" call to action.
 * A pill carrying a lotus seed. At rest an aura breathes out from its edge (6.5 s, the breath-field period).
 * On hover or focus a warm sunrise rises through the pill, the lotus unfolds and the arrow moves on.
 * Magnetic on fine pointers. Used at most once per viewport.
 */
export function MagneticButton({
  href,
  children,
  tone = "ink",
  size = "md",
  block = false,
  srSuffix,
  className,
}: MagneticButtonProps) {
  const zone = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const z = zone.current;
      const b = button.current;
      const l = label.current;
      if (!z || !b || !l || block) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const bx = gsap.quickTo(b, "x", { duration: 0.9, ease: "power3.out" });
        const by = gsap.quickTo(b, "y", { duration: 0.9, ease: "power3.out" });
        const lx = gsap.quickTo(l, "x", { duration: 0.9, ease: "power3.out" });
        const ly = gsap.quickTo(l, "y", { duration: 0.9, ease: "power3.out" });

        const move = (event: PointerEvent) => {
          const rect = b.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          bx(dx * 0.2);
          by(dy * 0.28);
          lx(dx * 0.06);
          ly(dy * 0.08);
        };
        const leave = () => {
          bx(0);
          by(0);
          lx(0);
          ly(0);
        };
        z.addEventListener("pointermove", move);
        z.addEventListener("pointerleave", leave);
        return () => {
          z.removeEventListener("pointermove", move);
          z.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: zone, dependencies: [block] },
  );

  const external = isExternalHref(href);
  const opensTab = /^https?:/.test(href);
  const classes = cn("lotus-cta", block && "lotus-cta--block");

  const content = (
    <>
      <span aria-hidden="true" className="lotus-cta__aura" />
      <span aria-hidden="true" className="lotus-cta__aura" />
      <span className="lotus-cta__body">
        <span aria-hidden="true" className="lotus-cta__sun" />
        <span className="lotus-cta__seed">
          <Lotus />
        </span>
        <span ref={label} className="lotus-cta__label">
          <Label>{children}</Label>
          {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "lotus-cta__arrow",
            opensTab && "lotus-cta__arrow--diag",
          )}
        >
          {opensTab ? "↗" : "→"}
        </span>
      </span>
    </>
  );

  return (
    <div
      ref={zone}
      className={cn(block ? "block" : "inline-block lg:-m-8 lg:p-8", className)}
    >
      {external ? (
        <a
          ref={button}
          href={href}
          className={classes}
          data-tone={tone}
          data-size={size}
          {...(opensTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
          {opensTab ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
        </a>
      ) : (
        <TransitionLink
          ref={button as RefObject<HTMLAnchorElement>}
          href={href}
          className={classes}
          data-tone={tone}
          data-size={size}
        >
          {content}
        </TransitionLink>
      )}
    </div>
  );
}
