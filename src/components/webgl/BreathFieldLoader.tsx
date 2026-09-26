'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MQ } from '@/lib/motion';

const BreathField = dynamic(() => import('./BreathField'), { ssr: false });

type Capabilities = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/**
 * The Three.js breath field is a desktop enhancement. Phones, tablets and low-powered devices keep the
 * static ring pattern (with a slow CSS breath), so they never download the WebGL chunk or spend GPU time on it.
 * On capable devices the chunk loads when the browser is idle after first paint.
 */
export function BreathFieldLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = navigator as Capabilities;
    const capable =
      window.matchMedia(`${MQ.desktop} and ${MQ.fine} and ${MQ.motion}`).matches &&
      !nav.connection?.saveData &&
      (nav.deviceMemory ?? 8) >= 4 &&
      (nav.hardwareConcurrency ?? 8) >= 4;

    if (!capable) {
      document.documentElement.classList.add('no-webgl');
      return;
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(id);
  }, []);

  return ready ? <BreathField /> : null;
}
