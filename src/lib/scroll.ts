import type Lenis from 'lenis';

/**
 * Module-level access to the Lenis instance so non-React modules
 * (page transitions, WebGL, dialogs) can read velocity and lock scrolling.
 */
let instance: Lenis | null = null;
const listeners = new Set<() => void>();

export const scrollStore = {
  get: () => instance,
  set(next: Lenis | null) {
    instance = next;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
}

export function scrollToTarget(target: HTMLElement | string, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? 'instant' : 'smooth' });
}

let locks = 0;

export function lockScroll(lock: boolean) {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  applyLock();
}

export function resetScrollLocks() {
  locks = 0;
  applyLock();
}

function applyLock() {
  const locked = locks > 0;
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.classList.toggle('scroll-locked', locked);
}

export function getScrollVelocity() {
  return instance?.velocity ?? 0;
}
