'use client';

import { getImageProps } from 'next/image';
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { useLiteMedia, useMediaQuery, useReducedMotion } from '@/hooks/useMediaQuery';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import type { Film } from '@/lib/types';
import { cn } from '@/lib/utils';

/** Phones and tablets held upright: served the 540×960 portrait encode and portrait posters. */
const PORTRAIT_MQ = `${MQ.mobile} and (orientation: portrait)`;

export type ScrollVideoProps = {
  /** Desktop, mobile and portrait encodes with matching posters and stills (see src/data/films.ts). */
  film: Film;
  /** Element whose scroll range drives playback. Defaults to the component's own wrapper. */
  trigger?: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  /** Pin the wrapper for the duration of the range. */
  pin?: boolean;
  /** Sub-range of the trigger progress mapped to this clip, e.g. [0, 0.5]. */
  window?: readonly [number, number];
  /** Portion of the clip (0–1) that plays across the range. */
  range?: readonly [number, number];
  /** Per-frame lerp toward the scroll target (0–1). Lower feels heavier. */
  smoothing?: number;
  /** -1 plays the clip backwards as you scroll down. */
  direction?: 1 | -1;
  /** Mobile behaviour: scrub the mobile encode, or show the still with a play button. */
  mobile?: 'scrub' | 'poster';
  /**
   * Serve the portrait encode on phones held upright (full-screen stages). Turn off for frames wider than
   * 9:16, such as a 4:5 hero, where the landscape encode shows more of the picture.
   */
  portrait?: boolean;
  /** Show the accessible Play/Pause button when not scrubbing (reduced motion, slow connections, mobile poster). */
  controls?: boolean;
  /** Above-the-fold poster: fetched eagerly with high priority. */
  priority?: boolean;
  className?: string;
  mediaClassName?: string;
  position?: string;
  /** object-position for the landscape encode on small screens. Defaults to the film's own framing; the portrait encode is already framed. */
  mobilePosition?: string;
  /** `sizes` for the landscape poster; upright phones use the portrait poster instead. */
  sizes?: string;
  onProgress?: (progress: number) => void;
  children?: ReactNode;
};

/** Resolves once the page has loaded and the main thread is idle, so films never compete with first paint. */
function afterLoadIdle(timeout: number) {
  return new Promise<void>((resolve) => {
    const idle = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout });
      else setTimeout(resolve, 200);
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
  });
}

let engagement: Promise<void> | null = null;

/**
 * Resolves on the visitor's first scroll, touch, click or key press (shared across films and page transitions).
 * Phones wait for it, so a visitor who only glances at the first screen never downloads a film.
 */
function firstEngagement() {
  engagement ??= new Promise<void>((resolve) => {
    if (window.scrollY > 0) {
      resolve();
      return;
    }
    const events = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    const done = () => {
      events.forEach((type) => window.removeEventListener(type, done, true));
      resolve();
    };
    events.forEach((type) => window.addEventListener(type, done, { capture: true, passive: true }));
  });
  return engagement;
}

/**
 * Scroll-controlled film. Scroll progress → eased target time → video.currentTime.
 * - Each device gets the right encode: desktop, mobile landscape, or the portrait crop on upright phones.
 * - The file is fetched as a Blob near the viewport, after load and idle (and, on phones, after the first
 *   interaction), so seeking never waits on the network and films never compete with first paint.
 * - Seeks are skipped while the decoder is busy, so fast flicks never queue up.
 * - The poster stays until a real frame has been decoded (first `seeked`), so iOS never flashes an empty frame.
 * - Reduced motion, Save-Data and slow connections get a still frame and a Play button instead.
 */
export function ScrollVideo({
  film,
  trigger,
  start = 'top top',
  end = 'bottom bottom',
  pin = false,
  window: clipWindow,
  range = [0, 1],
  smoothing = 0.14,
  direction = 1,
  mobile = 'scrub',
  portrait = true,
  controls = true,
  priority = false,
  className,
  mediaClassName,
  position,
  mobilePosition,
  sizes = '(orientation: portrait) 200vw, 100vw',
  onProgress,
  children,
}: ScrollVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(onProgress);
  const reduced = useReducedMotion();
  const lite = useLiteMedia();
  const isMobile = useMediaQuery(MQ.mobile);
  const isPortrait = useMediaQuery(PORTRAIT_MQ);
  const [playing, setPlaying] = useState(false);
  const mode: 'scrub' | 'static' | 'reduced' = reduced ? 'reduced' : lite || (isMobile && mobile === 'poster') ? 'static' : 'scrub';
  const usePortrait = portrait && isPortrait;
  const source = usePortrait ? film.portrait : isMobile ? film.mobile : film.desktop;

  useEffect(() => {
    progressRef.current = onProgress;
  }, [onProgress]);

  const w0 = clipWindow?.[0] ?? 0;
  const w1 = clipWindow?.[1] ?? 1;
  const r0 = range[0];
  const r1 = range[1];

  useGSAP(
    () => {
      if (mode !== 'scrub') return;
      const wrap = wrapRef.current;
      const video = videoRef.current;
      if (!wrap || !video) return;

      // Child layout effects run before a parent's ref is attached, so resolve the trigger from the DOM
      // when the ref is not ready yet: the nearest section (or [data-video-trigger]) that owns the scroll range.
      const triggerEl = trigger?.current ?? (trigger ? wrap.closest<HTMLElement>('[data-video-trigger], section') : null) ?? wrap;
      const frame = 1 / film.fps;
      const controller = new AbortController();
      let objectUrl: string | null = null;
      let disposed = false;
      let requested = false;
      let primed = false;
      let ticking = false;
      let duration = 0;
      let target = 0;
      let current = 0;
      let lastProgress = 0;

      const sync = (progress: number) => {
        lastProgress = progress;
        let p = w1 > w0 ? (progress - w0) / (w1 - w0) : progress;
        p = Math.min(Math.max(p, 0), 1);
        if (direction === -1) p = 1 - p;
        target = (r0 + (r1 - r0) * p) * duration;
        progressRef.current?.(p);
      };

      const clampTime = (time: number) => Math.min(Math.max(time, 0), Math.max((duration || film.duration) - frame, 0));
      const markReady = () => {
        if (!disposed) wrap.dataset.videoReady = 'true';
      };

      const onMeta = () => {
        duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : film.duration;
        sync(lastProgress);
        current = target;
      };
      const onData = () => {
        if (disposed || primed) return;
        // Prime the decoder: iOS paints seeked frames only once playback has started. Reveal on the first seek.
        const finish = () => {
          if (disposed) return;
          video.pause();
          primed = true;
          current = target;
          const time = clampTime(current);
          if (Math.abs(video.currentTime - time) < 1e-3) {
            markReady();
          } else {
            video.addEventListener('seeked', markReady, { once: true });
            video.currentTime = time;
          }
        };
        const attempt = video.play();
        if (attempt) attempt.then(finish, finish);
        else finish();
      };
      video.addEventListener('loadedmetadata', onMeta);
      video.addEventListener('loadeddata', onData);

      const load = async () => {
        if (requested) return;
        requested = true;
        await Promise.all([afterLoadIdle(isMobile ? 2000 : 600), isMobile ? firstEngagement() : undefined]);
        if (disposed) return;
        try {
          const response = await fetch(source, { signal: controller.signal });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          if (disposed) return;
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
        } catch {
          if (disposed) return;
          video.preload = 'auto';
          video.src = source;
        }
        video.load();
      };

      const tick = () => {
        if (!primed || !duration || video.readyState < 1) return;
        current += (target - current) * smoothing;
        if (Math.abs(target - current) < frame * 0.2) current = target;
        if (video.seeking) return;
        const time = clampTime(current);
        if (Math.abs(video.currentTime - time) > frame * 0.5) video.currentTime = time;
      };
      const setTicking = (on: boolean) => {
        if (on && !ticking) {
          gsap.ticker.add(tick);
          ticking = true;
        } else if (!on && ticking) {
          gsap.ticker.remove(tick);
          ticking = false;
        }
      };

      const margin = isMobile ? '100%' : '150%';
      const near = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            void load();
            near.disconnect();
          }
        },
        { rootMargin: `${margin} 0px ${margin} 0px` },
      );
      near.observe(triggerEl);
      const visible = new IntersectionObserver((entries) => setTicking(entries.some((entry) => entry.isIntersecting)), {
        rootMargin: '20% 0px 20% 0px',
      });
      visible.observe(wrap);

      ScrollTrigger.create({
        trigger: triggerEl,
        start,
        end,
        pin: pin ? wrap : false,
        anticipatePin: pin ? 1 : 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => sync(self.progress),
        onRefresh: (self) => sync(self.progress),
      });

      return () => {
        disposed = true;
        controller.abort();
        near.disconnect();
        visible.disconnect();
        setTicking(false);
        video.removeEventListener('loadedmetadata', onMeta);
        video.removeEventListener('loadeddata', onData);
        video.removeEventListener('seeked', markReady);
        video.pause();
        video.removeAttribute('src');
        video.load();
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        delete wrap.dataset.videoReady;
      };
    },
    {
      scope: wrapRef,
      dependencies: [mode, source, isMobile, start, end, pin, w0, w1, r0, r1, smoothing, direction],
      revertOnUpdate: true,
    },
  );

  const toggleFilm = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }
    if (!video.getAttribute('src')) video.src = source;
    video.loop = true;
    video
      .play()
      .then(() => {
        wrapRef.current?.setAttribute('data-video-ready', 'true');
        setPlaying(true);
      })
      .catch(() => setPlaying(false));
  };

  const scrub = mode === 'scrub';
  const narrowPosition = mobilePosition ?? film.mobilePosition;
  const objectPosition = usePortrait ? undefined : isMobile && narrowPosition ? narrowPosition : position;
  const landscapePoster = getImageProps({ src: scrub ? film.poster : film.still, alt: '', fill: true, sizes, quality: 70 }).props;
  const portraitPoster = portrait
    ? getImageProps({ src: scrub ? film.portraitPoster : film.portraitStill, alt: '', fill: true, sizes: '100vw', quality: 70 }).props
    : null;

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)} data-film={film.id}>
      <div className={cn('absolute inset-0', mediaClassName)}>
        <picture>
          {portraitPoster ? <source media={PORTRAIT_MQ} srcSet={portraitPoster.srcSet} sizes={portraitPoster.sizes} /> : null}
          <img
            {...landscapePoster}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover"
            style={{ ...landscapePoster.style, objectPosition }}
          />
        </picture>
        <video
          ref={videoRef}
          className="scroll-video__media absolute inset-0 h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <p className="sr-only">{film.alt}</p>
      {children}
      {!scrub && controls ? (
        <button type="button" onClick={toggleFilm} aria-pressed={playing} className="btn btn--cream absolute bottom-6 right-6 z-20">
          {playing ? 'Pause film' : 'Play film'}
          <span className="sr-only">: {film.title}</span>
        </button>
      ) : null}
    </div>
  );
}
