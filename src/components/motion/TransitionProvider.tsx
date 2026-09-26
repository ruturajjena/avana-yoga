'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ComponentProps, type ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { primaryNav } from '@/data/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { PAGE_REVEAL_EVENT, setNavigating } from '@/lib/page-ready';
import { lockScroll, resetScrollLocks, scrollToTarget, scrollToTop } from '@/lib/scroll';
import { normalizePath } from '@/lib/utils';

type TransitionContextValue = { navigate: (href: string) => void };
const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionRouter(): TransitionContextValue {
  const context = useContext(TransitionContext);
  const router = useRouter();
  return context ?? { navigate: (href: string) => router.push(href) };
}

const flatNav = primaryNav.flatMap((item) => [item, ...(item.children ?? [])]);

function labelFor(pathname: string) {
  if (pathname === '/') return 'Home';
  const match = flatNav.find((item) => item.href === pathname);
  if (match) return match.label;
  const slug = pathname.split('/').filter(Boolean).pop() ?? '';
  const words = slug.replace(/-/g, ' ');
  return words.length > 32 ? 'Journal' : words.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Smoothly scrolls to an in-page anchor, clearing the fixed header. Returns false if there is no target. */
function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;
  const bar = document.querySelector<HTMLElement>('.site-header__bar');
  scrollToTarget(target, -((bar?.getBoundingClientRect().height ?? 84) + 16));
  window.history.replaceState(window.history.state, '', `#${id}`);
  return true;
}

/**
 * Cinematic page transitions: a cream panel with the brand ring covers the page,
 * the route changes underneath, then the panel lifts as the next page's hero reveals.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = normalizePath(usePathname() ?? '/');
  const coverRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const safetyRef = useRef<number | undefined>(undefined);
  const firstRef = useRef(true);

  const uncover = useCallback(() => {
    window.clearTimeout(safetyRef.current);
    pendingRef.current = null;
    scrollToTop(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        document.dispatchEvent(new Event(PAGE_REVEAL_EVENT));
        setNavigating(false);
        const cover = coverRef.current;
        const finish = () => {
          busyRef.current = false;
          resetScrollLocks();
          if (window.location.hash) scrollToHash(window.location.hash);
        };
        if (!cover) {
          finish();
          return;
        }
        const reduce = window.matchMedia(MQ.reduce).matches;
        const done = () => {
          gsap.set(cover, { visibility: 'hidden', clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 });
          finish();
        };
        if (reduce) gsap.to(cover, { opacity: 0, duration: 0.18, ease: 'none', onComplete: done });
        else gsap.to(cover, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'breath', onComplete: done });
      }),
    );
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;
      const samePage = normalizePath(url.pathname) === normalizePath(window.location.pathname) && url.search === window.location.search;
      if (samePage) {
        if (!url.hash || !scrollToHash(url.hash)) scrollToTop(false);
        return;
      }
      if (busyRef.current) return;
      busyRef.current = true;
      pendingRef.current = normalizePath(url.pathname);
      setNavigating(true);
      lockScroll(true);
      router.prefetch(target);

      if (labelRef.current) labelRef.current.textContent = labelFor(normalizePath(url.pathname));
      const cover = coverRef.current;
      const go = () => router.push(target, { scroll: false });
      if (!cover) {
        go();
        return;
      }
      gsap.killTweensOf(cover);
      if (window.matchMedia(MQ.reduce).matches) {
        gsap.set(cover, { visibility: 'visible', clipPath: 'inset(0% 0% 0% 0%)', opacity: 0 });
        gsap.to(cover, { opacity: 1, duration: 0.18, ease: 'none', onComplete: go });
      } else {
        gsap.set(cover, { visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 });
        gsap.to(cover, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'breath', onComplete: go });
      }
      safetyRef.current = window.setTimeout(() => {
        if (busyRef.current) uncover();
      }, 4500);
    },
    [router, uncover],
  );

  // Route committed → lift the cover. Back/forward and first load only refresh measurements.
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return;
    }
    if (pendingRef.current !== null) uncover();
    else requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, uncover]);

  // Plain same-origin anchors (e.g. links inside journal HTML) get the same transition; hash links scroll smoothly.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || anchor.hasAttribute('data-tlink') || anchor.hasAttribute('download') || anchor.hasAttribute('data-no-transition')) return;
      if (anchor.target && anchor.target !== '_self') return;
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      if (raw.startsWith('#')) {
        if (scrollToHash(raw)) event.preventDefault();
        return;
      }
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith('/media/') || url.pathname.startsWith('/api/')) return;
      if (normalizePath(url.pathname) === normalizePath(window.location.pathname) && url.hash) {
        if (scrollToHash(url.hash)) event.preventDefault();
        return;
      }
      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div ref={coverRef} className="page-cover" aria-hidden="true">
        <div className="flex flex-col items-center gap-6">
          <Logo className="size-12" />
          <span ref={labelRef} className="eyebrow" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'onNavigate'> & { href: string };

/** next/link (keeps prefetching) whose navigation is routed through the transition. */
export function TransitionLink({ href, ...props }: TransitionLinkProps) {
  const { navigate } = useTransitionRouter();
  return (
    <Link
      {...props}
      href={href}
      data-tlink=""
      onNavigate={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    />
  );
}
