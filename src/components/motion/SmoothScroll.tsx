'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { scrollStore } from '@/lib/scroll';

/**
 * Lenis smooth scrolling for mouse and trackpad users, driven by the GSAP ticker (single rAF source).
 * Touch devices keep native momentum scrolling (no JavaScript in the scroll path), and Lenis is not
 * created at all for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(MQ.reduce);
    const fine = window.matchMedia(MQ.fine);
    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);
    const wanted = () => !reduce.matches && fine.matches;

    const start = () => {
      if (lenis || !wanted()) return;
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      scrollStore.set(lenis);
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = null;
      scrollStore.set(null);
    };

    gsap.ticker.lagSmoothing(0);
    start();

    const onChange = () => {
      if (wanted()) start();
      else stop();
      ScrollTrigger.refresh();
    };
    reduce.addEventListener('change', onChange);
    fine.addEventListener('change', onChange);

    return () => {
      reduce.removeEventListener('change', onChange);
      fine.removeEventListener('change', onChange);
      stop();
    };
  }, []);

  return null;
}
