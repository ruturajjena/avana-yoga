'use client';

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { lockScroll } from '@/lib/scroll';

const subscribeNoop = () => () => undefined;
const useIsClient = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
};

/**
 * Right-hand detail sheet (full screen on mobile) for teacher profiles and event details.
 * Focus moves in and is trapped, Escape closes, focus returns to the trigger,
 * and page scrolling is locked through Lenis while open.
 */
export function Sheet(props: SheetProps) {
  const isClient = useIsClient();
  if (!isClient) return null;
  return createPortal(<SheetPanel {...props} />, document.body);
}

function SheetPanel({ open, onClose, title, eyebrow, children }: SheetProps) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const isOpen = useRef(false);
  const titleId = useId();

  useGSAP(
    () => {
      const r = root.current;
      const p = panel.current;
      const o = overlay.current;
      if (!r || !p || !o) return;
      const reduce = window.matchMedia(MQ.reduce).matches;

      if (open && !isOpen.current) {
        isOpen.current = true;
        returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        lockScroll(true);
        if (scroller.current) scroller.current.scrollTop = 0;
        gsap.killTweensOf([p, o]);
        gsap.set(r, { visibility: 'visible' });
        gsap.fromTo(o, { opacity: 0 }, { opacity: 1, duration: reduce ? 0 : 0.6, ease: 'breath' });
        gsap.fromTo(p, { xPercent: 100 }, { xPercent: 0, duration: reduce ? 0 : 0.95, ease: 'breath' });
        const items = p.querySelectorAll('[data-sheet-item]');
        if (items.length && !reduce) {
          gsap.fromTo(items, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.3 });
        }
        requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
      } else if (!open && isOpen.current) {
        isOpen.current = false;
        lockScroll(false);
        gsap.killTweensOf([p, o]);
        gsap.to(o, { opacity: 0, duration: reduce ? 0 : 0.5, ease: 'breath' });
        gsap.to(p, {
          xPercent: 100,
          duration: reduce ? 0 : 0.7,
          ease: 'breath',
          onComplete: () => {
            gsap.set(r, { visibility: 'hidden' });
          },
        });
        returnFocus.current?.focus({ preventScroll: true });
      }
    },
    { dependencies: [open] },
  );

  useEffect(
    () => () => {
      if (isOpen.current) lockScroll(false);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const p = panel.current;
      if (!p) return;
      const focusables = Array.from(
        p.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'),
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && (document.activeElement === first || !p.contains(document.activeElement))) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (document.activeElement === last || !p.contains(document.activeElement))) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div ref={root} className="fixed inset-0 z-[80]" style={{ visibility: 'hidden' }} inert={!open}>
      <div ref={overlay} className="absolute inset-0 bg-ink/55" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-cream text-ink shadow-[0_40px_120px_-40px_rgb(28_36_31/0.45)] md:w-[min(52rem,92vw)]"
      >
        <div className="flex items-center justify-between gap-6 border-b border-(--line) px-page py-4 md:px-12">
          <div className="eyebrow text-ink/65">{eyebrow}</div>
          <button ref={closeButton} type="button" onClick={onClose} className="flex h-11 items-center gap-3">
            <span className="eyebrow">Close</span>
            <span aria-hidden="true" className="plus mt-0" data-open="true" />
          </button>
        </div>
        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain px-page pb-20 pt-10 md:px-12 md:pt-14" data-lenis-prevent="">
          <h2 id={titleId} data-sheet-item="" className="type-l max-w-[16ch]">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
