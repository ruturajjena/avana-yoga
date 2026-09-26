# Avana Yoga — Animation System

Motion should feel like **breath**: it inhales (expands, reveals), holds (stillness) and exhales (settles, releases). Every animation has to communicate something. If it only decorates, it is removed.

This document describes the system **as built**. File references point to `src/`.

---

## 1. Stack

| Layer | Library | Why |
|---|---|---|
| Choreography | **GSAP 3.15**: core, ScrollTrigger, SplitText, CustomEase. `@gsap/react` provides `useGSAP` | One engine for scroll, text, video scrubbing, sheets and page transitions |
| Smooth scroll | **Lenis 1.3** | Heavy, fluid wheel scrolling on mouse and trackpad. Not created on touch devices (native momentum, no JavaScript in the scroll path) or under reduced motion |
| WebGL | **Three.js 0.186** (vanilla, dynamically imported, capable desktops only) | One full-screen fragment shader. React Three Fiber was not used: a single shader plane gains nothing from a reconciler, and vanilla Three keeps the chunk small and gives exact control over the render loop and disposal |
| Framer Motion | **Not used** | GSAP already covers everything the design needs, so a second engine would be dead weight |

Registration happens once, in `lib/gsap.ts`. It registers the plugins, creates the `breath` ease and sets `ScrollTrigger.config({ ignoreMobileResize: true })`.

---

## 2. The ten rules, as constraints in code

| Brief rule | Constraint |
|---|---|
| Motion communicates meaning | Reveal = arrival. Scrub = time passing. Sticky stage = a pause for attention |
| Scroll reveals information | Copy is never gated behind hover. Hover adds previews only |
| Never animate everything at once | At most 2 motion groups per viewport. Staggers are capped at about 12 items |
| Stillness vs motion | Each film chapter is followed by a still, readable section |
| Large type moves slowly | Display type reveals over ≥ 1.25 s. Scrubbed display type moves ≤ 35% of its height |
| Images breathe | Clip reveals plus 1.18–1.3 → 1 inner scale. No bounce or elastic on imagery |
| Organic transitions | `breath` ease (`0.37,0,0.13,1`) for panels, sheets and page covers. `expo.out` for reveals |
| No fade-in-everything | The default text entrance is a **masked line rise**. Opacity is reserved for meta, rows and kinetic copy |
| No excessive bounce | `elastic` is not used anywhere. The magnetic CTA returns with `power3.out` |
| No template card animations | There are no cards. Entries reveal through their image clip and hairline rules |

---

## 3. Tokens (`lib/motion.ts`, `app/globals.css`)

```ts
ease.breath = CustomEase("breath", "0.37,0,0.13,1")   // --ease-breath in CSS
ease.enter  = "expo.out"                              // --ease-expo in CSS
DURATION    = { micro: .35, reveal: 1.2, slow: 1.8, cover: .6, uncover: .9 }
STAGGER     = { lines: .09, words: .022, items: .08 }
scrub       = .6–1 for timelines · ScrollVideo lerp .14 per ticker frame
```

Media conditions for `gsap.matchMedia()`:

| Name | Query |
|---|---|
| `MQ.desktop` | `(min-width: 1024px)` |
| `MQ.mobile` | `(max-width: 1023.98px)` |
| `MQ.motion` | `(prefers-reduced-motion: no-preference)` |
| `MQ.reduce` | `(prefers-reduced-motion: reduce)` |
| `MQ.fine` | `(hover: hover) and (pointer: fine)` |

---

## 4. Architecture

```
RootLayout (server)
 ├ SmoothScroll        Lenis driven by gsap.ticker (one rAF source); fine pointers only, never under reduced motion
 ├ TransitionProvider  cover panel · TransitionLink · same-origin <a> interception · smooth hash scrolling
 │  ├ Navigation       theme follows [data-nav-theme]; compresses after 48 px; tucks away on fast downward scroll
 │  ├ BreathFieldLoader → BreathField (dynamic, idle, ssr:false): one persistent WebGL canvas on capable desktops;
 │  │                    everywhere else html.no-webgl → static rings with a slow CSS breath
 │  ├ <main>           server page composed of client motion primitives
 │  └ Footer           wordmark rises on scroll
 ├ Cursor              contextual label over [data-cursor], fine pointers only
 └ grain               static 3.5% SVG noise (≥ 1024 px only)
```

### 4.1 Lenis ⇄ GSAP

```ts
const lenis = new Lenis({ lerp: .085, wheelMultiplier: .9, smoothWheel: true, syncTouch: false, autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Lenis exists only while `(hover: hover) and (pointer: fine)` matches and reduced motion is off. It is created or destroyed live if either changes (for example, an iPad gains a trackpad). ScrollTrigger listens to native scroll either way.

`lib/scroll.ts` exposes the instance to non-React code, with a native fallback for every call:
- `lockScroll()` is reference-counted, and is used by the mobile menu, sheets and page transitions. Without Lenis it toggles `html.scroll-locked`.
- `scrollToTarget()` scrolls to a section or anchor with a header offset: through Lenis, or `window.scrollTo` on touch devices and under reduced motion.
- `getScrollVelocity()` feeds the WebGL field (0 without Lenis).

### 4.2 Sticky stages vs pins

| Technique | Used for | Why |
|---|---|---|
| **CSS `position: sticky`** inside a tall section whose height is declared in CSS (`motion-safe:h-[320vh]`) | Every film chapter: hero, Breath, Transformation, Practice → Journey | Heights exist in the server HTML, so there is no pin-spacer insertion, no layout shift and no re-measuring. Under reduced motion the height classes don't apply and the stage becomes a normal block |
| **ScrollTrigger `pin`** | The horizontal "What We Offer" track (desktop) | The scroll distance depends on the measured track width |

A sticky column must be able to stretch to its row. Grid items that contain sticky elements use `self-stretch`: the teacher portrait, the retreat story frame, the curriculum index and the enrolment panel.

### 4.3 Pre-states and failsafes

- Elements that animate in are hidden **only** when `html.js` is present and `prefers-reduced-motion: no-preference` applies. This covers `[data-reveal]`, `[data-reveal-img]`, `[data-reveal-portrait]`, the home hero and the retreat hero.
- GSAP writes inline start states, then sets `data-motion-ready`, which switches the CSS pre-state off with no jump.
- If JavaScript fails, a `0s … 4s forwards` keyframe animation reveals the content. The failsafe selectors include `:not([data-motion-ready])`, so they never override GSAP.

### 4.4 Lifecycle and cleanup

- Every primitive uses `useGSAP(fn, { scope })` plus `gsap.matchMedia()`. Reverting the context kills tweens, ScrollTriggers and SplitText instances on unmount and when media conditions change.
- Tickers and observers (video scrub, WebGL loop) are attached only while their target is in view, and are removed in cleanup.
- After a route change:
  1. `scrollToTop(immediate)`
  2. two animation frames
  3. `ScrollTrigger.sort()` and `refresh()`
  4. the `avana:page-reveal` event, which starts the load-triggered hero reveals
  5. the cover lifts
- **Gotcha, documented in `ScrollVideo`:** a child's layout effect runs before its parent's ref is attached. A primitive that receives a parent ref must resolve it lazily, and it can fall back to the DOM with `closest('section')`.

---

## 5. Primitive catalogue

| Primitive | File | Trigger | Motion | Mobile | Reduced motion |
|---|---|---|---|---|---|
| `RevealText` | `motion/RevealText.tsx` | top at 88% (split only once within 60% of a viewport), or page reveal | SplitText lines in masks, `yPercent 118 → 0`, stagger .09, expo 1.25 s | Same | Static |
| `KineticText` | `motion/KineticText.tsx` | scrubbed through the block (split on approach) | Word opacity .16 → 1 in reading order | Same | Full opacity |
| `EditorialImage` (`ImageReveal`, `ParallaxImage`) | `motion/EditorialImage.tsx` | top at 90%, or page reveal | `clip-path` up / down / centre / horizon, inner scale 1.18 → 1, optional parallax ±N% | Parallax halved | Static |
| `RevealList` | `motion/RevealList.tsx` | top at 86% | Rows rise 26 px and settle, stagger .07 | Same | Static |
| `Portrait` | `ui/Portrait.tsx` | top at 88% | Circle clip 0 → 50% (the brand ring opening), halo scales .82 → 1 | Same | Static |
| `ScrollVideo` | `motion/ScrollVideo.tsx` | trigger range | `currentTime` follows scroll (see §6) | Portrait encode on full-screen stages, landscape encode in 4:5 heroes; loads after the first interaction | Still + Play/Pause |
| `MagneticButton` (brand CTA) | `motion/MagneticButton.tsx` | pointer inside the zone · hover/focus | `quickTo` pull ×.2/.28. Aura rings breathe out every 6.5 s (CSS). Sunrise rises through the pill; rings ripple out of the AY mark (CSS, 2.3 s) | No magnetism; sunrise on press | No magnetism, no aura; states change without motion |
| `Cursor` | `motion/Cursor.tsx` | pointermove | Label ring over `[data-cursor]` | Not mounted | Not mounted |
| `TransitionProvider` | `motion/TransitionProvider.tsx` | link click | Cover `inset(100%→0)` .6 s, uncover `inset(0→0 0 100%)` .9 s | Same | 180 ms fade |
| `Sheet` | `ui/Sheet.tsx` | open state | Panel `xPercent 100 → 0` .95 s breath, items rise | Full screen | Instant |
| `Accordion` | `ui/Accordion.tsx` | click | Height 0 ↔ auto .75 s breath, glyph rotates 45° | Same | Instant |
| `TestimonialStage` | `testimonials/TestimonialStage.tsx` | tab change | Highlight words rise in masks, body fades up | Same | Static |
| `TeacherIndex` | `teachers/TeacherIndex.tsx` | hover / focus | Sticky portrait re-opens as a circle for each name | Inline thumbnails | Instant swap |
| `CurriculumModules` | `courses/CurriculumModules.tsx` | module crosses 60% | Sticky index marks the current module | Index hidden | Same |
| `StoryChapters` | `retreats/StoryChapters.tsx` | chapter crosses 55% | Sticky frame re-opens (horizon / tide). Coastal canvas warms `#f3dec4 → #ecc9a4` | Images inline | Static |
| `DriftGallery` | `ui/DriftGallery.tsx` | scrubbed | Rows glide in opposite directions (one tall row for < 6 photos) | Native swipe + snap | Wrapped rows |
| `ColumnGallery` | `ui/ColumnGallery.tsx` | scrubbed | Three columns at different parallax speeds | Two-column masonry | Static |
| `SectionDivider` | `ui/SectionDivider.tsx` | top at 92% | Rules draw outward, ring stroke draws | Same | Static |
| `ChapterRail` | `home/ChapterRail.tsx` | section crosses 55% | Current chapter's hairline lengthens | Hidden | Same |
| `BreathSection` | `webgl/BreathSection.tsx` | section between 65% and 35% | Requests a breath-field state | Static rings with a slow CSS breath | Static SVG rings |
| `FooterWordmark` | `layout/FooterWordmark.tsx` | scrubbed | `yPercent 60 → 0` | Same | Static |

---

## 6. `ScrollVideo`

```tsx
<ScrollVideo
  film={films.breath}          // desktop, mobile and portrait encodes; posters and stills; framing; alt, fps, duration
  trigger={sectionRef}         // optional; resolves to closest('section') if the ref is not attached yet
  start="top top" end="bottom bottom"
  window={[0.1, 1]}            // sub-range of the trigger progress used by this clip
  range={[0, 1]}               // portion of the clip that plays
  smoothing={0.14}             // lerp per ticker frame
  direction={1}                // -1 plays backwards
  pin={false}                  // optional ScrollTrigger pin of the wrapper
  mobile="scrub"               // or "poster"
  portrait                     // portrait encode on upright phones (default); portrait={false} for 4:5 heroes
  controls                     // Play/Pause button when not scrubbing
  priority                     // eager, high-priority poster (above the fold)
  position / mobilePosition / sizes / mediaClassName / onProgress
/>
```

**Pipeline**

1. **Server:** an art-directed poster sits under a muted, `playsInline`, `preload="none"` `<video>` at opacity 0. The poster is a `<picture>` built with `getImageProps`: a 540×960 portrait crop for upright phones, the landscape frame everywhere else. The browser picks it before hydration.
2. **Encode choice:**
   - the portrait encode when `portrait` is set and `(max-width: 1023.98px) and (orientation: portrait)` matches;
   - otherwise the mobile landscape encode below 1024 px, and the desktop encode above.

   Rotating the device swaps the encode. In narrow landscape frames, `film.mobilePosition` keeps each film's subject in view (Breath `18% 50%` also keeps the burned-in cues out of the crop rather than cutting them in half).
3. **Loading:** the encode is fetched near the viewport (IntersectionObserver, 150% margin on desktop, 100% on mobile), and only after `load` plus idle. On phones it also waits for the first scroll, touch, click or key press, so a visitor who only sees the first screen downloads no film.
   - The file arrives as a **Blob** and is assigned with `URL.createObjectURL`, so seeks never wait on range requests.
   - If the fetch fails, the video falls back to the direct URL with `preload="auto"`.
4. **Priming and reveal:** on `loadeddata`:
   1. `play()`, then `pause()` primes the decoder (iOS);
   2. the video seeks to the current scroll position;
   3. it fades in over the poster only after that first `seeked`, so iOS never shows an empty frame.

   Scrubbing starts once priming has finished.
5. **Scrub:** ScrollTrigger `onUpdate`/`onRefresh` sets `target`. A `gsap.ticker` callback, attached only while the wrapper is visible, eases `current` toward it. It writes `currentTime` only when `!video.seeking` and the difference is more than half a frame. Slow scrolls interpolate between frames; fast flicks drop stale seeks instead of queuing them.
6. **Fallbacks:**
   - Save-Data, or a 2G/3G `effectiveType` → still frame plus the Play button. Nothing downloads for scrubbing.
   - Reduced motion → still frame plus an accessible "Play film" toggle.
   - A decoder or seek failure → the poster stays.
7. **Cleanup:** abort the fetch, disconnect the observers, remove the ticker, `pause()`, `removeAttribute('src')` + `load()` to release decoder memory, revoke the object URL.

**Verified in QA:** sampling `currentTime` while scrolling the homepage at 1440 px.

| Film | Scroll positions | `currentTime` |
|---|---|---|
| Breath | 15 / 40 / 65 / 90% | 0.7 → 4.2 → 7.6 → 11.1 s |
| Transformation | 15 / 40 / 65 / 90% | 1.4 → 4.0 → 6.7 → 9.4 s |
| Practice | — | holds its last frame once its half of the shared stage has passed |

**Verified on a phone profile** (390×844, touch; `scripts/qa/mobile-film.mjs`):
- No film bytes are downloaded before the first interaction. After it, the homepage requests only portrait encodes, and every film scrubs:

  | Film | `currentTime` |
  |---|---|
  | Origin | 1.4 → 4.8 → 8.3 s |
  | Breath | 2.1 → 5.5 → 9.0 s |
  | Practice | 2.4 → 5.9 → 9.4 s |
  | Journey | 2.5 → 6.1 → 9.8 s |
  | Transformation | 2.5 → 5.1 → 7.8 s |

- The 200 Hour 4:5 hero uses the landscape mobile encode at `18% 50%`.
- Reduced motion and Save-Data show stills with a Play button and download no film.
- Desktop still loads the desktop encode on idle, with WebGL and Lenis active.

**Encodes** (`public/media/video`)

| Films | Desktop | Mobile (landscape) | Portrait (upright phones) | Settings |
|---|---|---|---|---|
| Generated (Origin, Transformation) | 1600 w | 960 w | 540×960, centre crop, CRF 28 | 24 fps, GOP 8 |
| Yoga (Breath, Practice, Journey) | 1440 w, CRF 26 | 960 w, CRF 28 | 540×960, crop at 36% / 40% / 50%, CRF 28 | 60 → 30 fps, GOP 10 |

All encodes have no B-frames, faststart, and a video track only.
- **All fifteen files:** 42 MB, and each loads only when near the viewport.
- **Phone, homepage:** at most the five portrait files (7.6 MB), after the first interaction.
- **Why portrait encodes:** a full-screen phone stage only ever shows a centre strip of the frame. The portrait encode spends its pixels there, giving 1.8× the on-screen resolution of the 960×540 encode for 60–85% of the bytes.

---

## 7. Film narrative

| Film | Chapter | What it communicates | Where |
|---|---|---|---|
| **The Origin** (generated) | Ancient wisdom | A single ring in sand becomes ripples, mountains, and a meditator at the centre. *Everything begins from one point of stillness* | Home hero aperture · About opener |
| **I · The Breath** (Surya Namaskar) | Practice | The salutation is cued by breath on screen; the page echoes *Inhale · Exhale · Retain* | Home chapter I · 200 Hour hero · Pranayama still |
| **The Transformation** (generated) | Transformation | Stone → mandala → smoke → human form → smooth stone, carrying *"We are not a fitness school. / We are a school of transformation."* | Home, before Teacher Training · Continuing Education hero |
| **II · The Practice** (Bakasana) | Discipline | *Sthira sukham āsanam* (Yoga Sūtra 2.46) | Home chapter II · 300 Hour hero |
| **III · The Journey** (inversions) | Mastery | *"The real practice begins after training."* | Home chapter III · Yoga Styles hero |

---

## 8. Homepage choreography (`app/page.tsx`)

| # | Section | Stage (desktop · mobile) | Scroll-linked | Entry | Breath field | Nav |
|---|---|---|---|---|---|---|
| 01 | **Hero · The Origin** (`HomeHero`) | Sticky, 300vh · 260vh | Aperture `circle(r₀) → circle(cover)` over 0–42%. Film plays across 3–90%. `AVANA` and `YOGA` part (±65% on desktop, ±150% vertical on mobile). Ring expands and fades. H1 lines rise at 50%; subline and CTA at 70% | Ring draws 1.8 s, film breathes 1.3 → 1, wordmark chars rise (stagger .045) | off | light |

> **Hero wordmark placement (2026-09).** The wordmark is a three-track grid whose middle track is the
> ring's diameter plus air: three rows on phones and tablets (`AVANA` bottom-aligned above, `YOGA`
> top-aligned below), three columns from `64rem` up. The track carries no padding, so its centre is
> the viewport centre, which is where the ring and the aperture are centred: the wordmark therefore
> cannot touch the circle at any size. The mobile type is capped at `min(23vw, 13svh)` so short
> viewports (browser chrome showing) shrink the word rather than crowd the ring. The eyebrow moves
> to the foot of the stage below `64rem`, where it replaces the decorative subline (which reappears
> under the H1 once the aperture opens); only one of the two eyebrows is ever displayed.
| 02 | **Philosophy** | none | Kinetic words | Heading lines | `ripples` | light |
| — | **Presence** | none | Place names drift ±6–10%; photos at two parallax depths | Image clips | off | light |
| 03 | **What We Offer** | ScrollTrigger pin (desktop), distance = track width · vertical on mobile | Track `x`. Each panel image scales 1.22 → 1 as it centres; rules draw | Heading lines | off | light |
| 04 | **Why Avana Yoga?** | Sticky heading | — | Pillar images clip in | `mandala` | light |
| 05 | **The Transformation** | Sticky, 260vh · 180vh | Film (feathered into the page) plays across 2–96%. Line 1 in at 6%, out at 42%. Line 2 in at 56% | — | off | light |
| 06 | **Teacher Training** | none | Hover preview follows the pointer | Row titles | off | light |
| 07 | **I · The Practice → II · The Journey** | Sticky, 420vh · 280vh | Practice 0–50%, Journey 50–100%. Crossfade 46–54%; chapter type swaps in masks; two rails fill | — | off | dark |
| 08 | **Voices** | none | — | Quote words on tab change | off | dark |
| 09 | **Retreats** | none | Austria opens from the horizon (`inset(36%…)` → 0); Goa rises like a tide (`inset(55% 0 0 0)` → 0); copy counter-parallaxes | — | off | dark |
| 10 | **Begin** | none | — | Lines rise; magnetic CTA | `seed` | light |

The desktop `ChapterRail` tracks: *Origin · Philosophy · What We Offer · Why Avana · Transformation · Teacher Training · Practice & Journey · Voices · Retreats · Begin*. The Surya Namaskar chapter was removed from the homepage at the client's request (2026-09); its film now appears only as the still on /pranayama/. The teacher line-up lives on /about/ (removed from the homepage at the client's request, 2026-09).

---

## 9. Inner page patterns

| Template | Signature motion |
|---|---|
| `CoursePage` | Masked title lines on page reveal. Film or photograph opens beneath (scrubbed film, or horizon clip). Facts strip. Curriculum as a sticky module index, or a numbered index when modules have no sub-items. Outcomes on ink. Enrolment panel stays in view beside the dates. FAQ accordion. Documentary drift gallery. Closing call |
| `RetreatPage` · **alpine** (Austria) | Hero opens from the horizon line into a sticky film stage: scrolling plays the rise from the rooftop class to the Dachstein. `alpine-mist` canvas. Pillars in staggered tall columns. Story frame re-opens from the horizon. Column gallery with vertical parallax. `alpine-pine` pricing |
| `RetreatPage` · **coastal** (Goa) | Hero rises like a tide into a sticky film stage: scrolling moves the camera towards the setting sun. `coast-sand` canvas that warms through the story. Pillars as alternating rows. Story frame rises like a tide. Horizontal drift gallery. Ink pricing |
| About | Origin film opener, then manifesto chapters: kinetic philosophy, lineage timeline (rows rise on a drawn rule), mission on ink, approach, full teacher profiles with ring portraits, presence index |
| Events | Entries clip in; details open in a `Sheet` |
| Contact | "Begin / *your* / journey." rises line by line over the `seed` breath field |
| Secondary pages | `EditorialHero` with masked lines, then a horizon still or scrubbed film |
| Journal and landing pages | Restrained: title reveal and horizon image only. Reading comes first |

---

## 10. WebGL breath field (`webgl/BreathField.tsx`, `webgl/shaders.ts`)

- **Concept:** the sand ripples of *The Origin* continued as light. It represents energy, breath and consciousness; it is not a tech demo.
- **Rendering:** one full-screen triangle and one fragment shader on a fixed canvas behind transparent sections (`z-index: 0`, `pointer-events: none`).
- **Uniforms:**

  | Uniform | Role |
  |---|---|
  | `uTime` | Clock |
  | `uBreath` | 6.5 s sine; ring spacing changes ±2.5% |
  | `uVelocity` | Smoothed Lenis velocity; rings contract slightly while scrolling |
  | `uMorph` | 8-fold mandala modulation |
  | `uSeed` | Rings contract toward a point |
  | `uOpacity` | Visibility |
  | `uCenter`, `uResolution`, `uInk` | Placement, viewport, colour |

- **States:** `off`, `ripples`, `mandala`, `seed`. Sections opt in with `<BreathSection state>`. A tiny store (`lib/breath.ts`) keeps the most recently activated section, and uniforms tween with the `breath` ease over 1.4–2.2 s.
- **Budget:**
  - Pixel ratio is capped at 1.25 × 0.7 on desktop and × 0.5 on mobile. `antialias: false`, `powerPreference: 'low-power'`.
  - The loop stops when opacity reaches 0 or no breath section is active. It skips frames while the tab is hidden, and runs at about 30 fps when scroll velocity is near 0.
- **Lifecycle:**
  - Loaded with `next/dynamic` on idle, and only on capable desktops. `BreathFieldLoader` requires all of these:
    - ≥ 1024 px and a fine pointer;
    - no reduced motion and no Save-Data;
    - ≥ 4 CPU cores and ≥ 4 GB device memory, where reported.

    Phones and tablets never request the Three.js chunk (129 KB gzipped).
  - One renderer per session.
  - `webglcontextlost`/`restored` are handled.
  - Full disposal plus `forceContextLoss()` on unmount.
- **Fallbacks:** touch devices, small screens, reduced motion, Save-Data, low CPU or memory, or no WebGL → `html.no-webgl` → static SVG rings at the same opacity. With motion allowed, the rings breathe on the compositor: `scale` 1 → 1.045 plus opacity, 6.5 s alternate, the same period as `uBreath`.

---

## 11. Page transitions

1. A same-origin link is clicked. Modifier keys, `target=_blank`, downloads, `/media/` paths and `data-no-transition` are ignored.
2. Hash links scroll smoothly (Lenis on desktop, native `window.scrollTo` on touch) and clear the fixed header. Cross-page hash links scroll after the cover lifts.
3. `lockScroll(true)`. The cover panel (cream, brand ring, destination label) closes with `inset(100%) → inset(0)` over 0.6 s (`breath`), then `router.push(href, { scroll: false })`.
4. On the pathname change: scroll to top → refresh ScrollTrigger → `avana:page-reveal` → uncover `inset(0) → inset(0 0 100% 0)` over 0.9 s → unlock.
5. **Safety:** if the route is not ready within 4.5 s, the page uncovers anyway. Back/forward navigation skips the cover.
6. **Reduced motion:** 180 ms opacity crossfade.

---

## 12. Reduced-motion matrix

| Feature | `no-preference` | `reduce` |
|---|---|---|
| Lenis | on | **off** (native scroll) |
| Sticky film stages and pins | on | **off** (normal flow, one viewport per film) |
| Video scrubbing | on | **Still frame + Play/Pause** |
| Text, image and portrait reveals | on | **Static** |
| Parallax, drift, kinetic text | on | **Off** |
| Horizontal Offer track | pinned | **Vertical sequence** |
| WebGL | animated | **Static SVG rings** |
| Page transitions | cover/uncover | **180 ms fade** |
| Cursor, magnetic CTA | on (fine pointers) | **Off** |
| Home hero | aperture sequence | **Final composition** (film still, H1, CTA) |

---

## 13. Performance checklist (verified in QA)

- [x] Only `transform`, `opacity`, `clip-path`, `mask`, and one scrubbed `background-color` (coastal story) are animated. No layout properties.
- [x] No React state updates per scroll frame. State changes only on discrete events: chapter change, hover, tab, sheet.
- [x] SplitText uses `autoSplit`, so it re-splits on font load and resize.
- [x] The WebGL chunk loads on idle, on capable desktops only. Films load near the viewport after load and idle (plus the first interaction on phones), with a ticker only while visible.
- [x] SplitText work is deferred: scroll reveals and kinetic copy split only once they are within 60% of a viewport.
- [x] Mobile compositing is light: no grain overlay and no film edge mask below 1024 px.
- [x] Film stage heights are declared in CSS (no pin-spacer layout shift). Image frames have fixed aspect boxes.
- [x] 0 console errors and 0 failed requests across 164 audited page loads (every route at 1440 px and 390 px).

---

## 14. Mobile strategy (phones and tablets)

**How it was measured:** `scripts/qa/mobile-perf.mjs` on a production build.
- **Profile:** 390×844 at DPR 3, 4× CPU slowdown, 1.6 Mbps / 150 ms RTT.
- **Comparison:** "before" is the build that preceded the mobile pass.

| Route | LCP | JS (transfer) | Fonts | Film bytes on load |
|---|---|---|---|---|
| `/` | 1532 → **840 ms** | 361 → **224 KB** | 183 → **149 KB** | 1541 → **0 KB** |
| `/200-hour-yoga-teacher-training/` | 2664 → **1664 ms** | 382 → **245 KB** | 183 → **100 KB** | 0 |
| `/austria-retreat/` | 3352 → **2784 ms** | 389 → **252 KB** | 183 → **100 KB** | 0 |
| `/about/` | 1912 → **1020 ms** | 364 → **227 KB** | 183 → **100 KB** | 1541 → **0 KB** |
| `/courses/` | 952 → **856 ms** | 370 → **233 KB** | 183 → **100 KB** | 0 |

- **Stability:** CLS is 0 on every route, and a 200-frame throttled scroll shows at most 1 janky frame.
- **Blocking time:** TBT is 0–2 ms in isolated runs.
- **Slowest route:** Austria, where the LCP element is the full-bleed hero photograph at DPR 3.

**What changed, in order of impact**
1. **No WebGL on phones and tablets.** The Three.js chunk (129 KB gz) is never requested. The static rings breathe in CSS instead.
2. **Films wait for intent.** Phones show posters until the first interaction. Full-screen stages then load portrait encodes (0.9–2.4 MB) instead of landscape ones (1.3–3.3 MB).
3. **Fonts.** Only the Latin subsets are preloaded (Cormorant roman and italic, Manrope). Extended-Latin faces load on demand through `unicode-range`. The homepage's Sanskrit diacritics (ā, ū) use them, which is why it measures 149 KB.
4. **Native touch scrolling.** Touch devices have no Lenis instance and no per-frame Lenis work.
5. **Lighter hydration.**
   - The homepage destinations render on the server, so retreat data no longer ships to the client. A small `DestinationReveal` shell animates them.
   - SplitText runs only as text approaches.
6. **Cheaper compositing.** The grain overlay and the Transformation edge mask are desktop-only. Hero photography uses quality 70.
7. **Touch targets.**
   - Arrow links, social links and footer legal links are at least 44 px tall.
   - Breadcrumb links are at least 32 px, with spacing between them.
   - Anchor scrolls clear the header without Lenis.
8. **Slow connections.** Save-Data and 2G/3G get stills with a Play button, and nothing downloads for scrubbing.

