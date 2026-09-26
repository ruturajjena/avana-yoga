'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { MQ } from '@/lib/motion';

export function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export const useReducedMotion = () => useMediaQuery(MQ.reduce);
export const useIsMobile = () => useMediaQuery(MQ.mobile);
export const useFinePointer = () => useMediaQuery(MQ.fine);

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };
const connection = () => (navigator as Navigator & { connection?: NetworkInformation }).connection;

/** True when the visitor asked to save data or is on a slow (2G/3G-class) connection. */
const isLite = () => {
  const info = connection();
  return Boolean(info?.saveData || (info?.effectiveType && /2g|3g/.test(info.effectiveType)));
};

const subscribeConnection = (onChange: () => void) => {
  const info = connection();
  info?.addEventListener?.('change', onChange);
  return () => info?.removeEventListener?.('change', onChange);
};

/** Lite media mode: films show stills instead of downloading for scroll scrubbing. */
export const useLiteMedia = () => useSyncExternalStore(subscribeConnection, isLite, () => false);
