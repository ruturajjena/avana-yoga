export const MQ = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023.98px)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  fine: '(hover: hover) and (pointer: fine)',
} as const;

export const DURATION = { micro: 0.35, reveal: 1.2, slow: 1.8, cover: 0.6, uncover: 0.9 } as const;
export const STAGGER = { lines: 0.09, words: 0.022, items: 0.08 } as const;

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;
}

/** Marks an element as controlled by JS so CSS pre-states / failsafes stop applying. */
export function markMotionReady(el: Element | null | undefined) {
  el?.setAttribute('data-motion-ready', '');
}
