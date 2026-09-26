'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { primaryNav, type NavItem } from '@/data/navigation';
import { site } from '@/data/site';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { lockScroll } from '@/lib/scroll';

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
  burgerRef: RefObject<HTMLButtonElement | null>;
};

const items: NavItem[] = [{ label: 'Home', href: '/' }, ...primaryNav];

export function MobileMenu({ id, open, onClose, pathname, burgerRef }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      timeline.current = gsap
        .timeline({ paused: true })
        .set(root, { visibility: 'visible' })
        .fromTo(root, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'breath' })
        .fromTo('.mm-line', { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.05 }, 0.2)
        .fromTo('.mm-fade', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.03 }, 0.45);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = timeline.current;
    const root = rootRef.current;
    if (!tl || !root) return;
    const reduce = window.matchMedia(MQ.reduce).matches;
    if (open && !wasOpen.current) {
      wasOpen.current = true;
      lockScroll(true);
      tl.timeScale(reduce ? 50 : 1).play();
      // preventScroll: the first link is still rising inside its clipping mask, and scrolling it into
      // view would leave the mask permanently offset (the label then reads as cut off at the top).
      const focusTimer = window.setTimeout(() => root.focus({ preventScroll: true }), reduce ? 0 : 320);
      return () => window.clearTimeout(focusTimer);
    }
    if (!open && wasOpen.current) {
      wasOpen.current = false;
      lockScroll(false);
      tl.timeScale(reduce ? 50 : 1.7).reverse();
      if (root.contains(document.activeElement)) burgerRef.current?.focus();
    }
  }, [open, burgerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const root = rootRef.current;
      if (!root) return;
      const focusables = [burgerRef.current, ...Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, burgerRef]);

  return (
    <div
      ref={rootRef}
      id={id}
      className="fixed inset-0 z-10 flex flex-col overflow-y-auto bg-ink text-cream outline-none lg:hidden"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      inert={!open}
      data-lenis-prevent=""
    >
      {/* Clipped: the ring is wider than the screen, and without this it could be panned sideways. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[45vw] top-[14vh] size-[115vw] rounded-full border border-cream/10">
          <div className="orbit absolute inset-0">
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/50" />
          </div>
        </div>
      </div>

      <nav aria-label="Mobile" className="relative flex-1 px-page pb-8 pt-[calc(var(--nav-h)+1.25rem)]">
        <ul>
          {items.map((item) => (
            <li key={item.href} className="border-b border-(--line-dark) py-4">
              {/* overflow-clip, not hidden: a clipped box cannot be scrolled, so focus or iOS can never
                  shift the label inside its mask and leave it cut off. */}
              <div className="overflow-clip">
                <TransitionLink
                  href={item.href}
                  onClick={onClose}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="mm-line block font-display text-[clamp(2.4rem,10.5vw,4.25rem)] font-light leading-[1.02]"
                >
                  {item.label}
                </TransitionLink>
              </div>
              {item.children ? (
                <ul className="mt-3 grid gap-2.5">
                  {item.children.map((child) => (
                    <li key={child.href} className="mm-fade">
                      <TransitionLink
                        href={child.href}
                        onClick={onClose}
                        aria-current={pathname === child.href ? 'page' : undefined}
                        className="text-[0.98rem] text-cream/75 transition-colors hover:text-cream"
                      >
                        {child.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative grid gap-7 px-page pb-10">
        <div className="mm-fade flex flex-wrap gap-3">
          <a href={site.links.enroll} target="_blank" rel="noopener noreferrer" className="btn btn--cream">
            Enroll now<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={site.links.getInTouch} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light text-cream">
            Get in touch<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
