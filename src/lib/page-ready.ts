export const PAGE_REVEAL_EVENT = 'avana:page-reveal';

let navigating = false;

export function setNavigating(value: boolean) {
  navigating = value;
}

export function isNavigating() {
  return navigating;
}

/**
 * Runs `callback` when the page is visible to the user:
 * on the next frame for a first load, or when the transition cover starts lifting.
 */
export function onPageReady(callback: () => void): () => void {
  if (!navigating) {
    const frame = requestAnimationFrame(() => callback());
    return () => cancelAnimationFrame(frame);
  }
  const handler = () => callback();
  document.addEventListener(PAGE_REVEAL_EVENT, handler, { once: true });
  return () => document.removeEventListener(PAGE_REVEAL_EVENT, handler);
}
