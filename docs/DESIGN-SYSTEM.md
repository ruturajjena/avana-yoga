# Avana Yoga — Design System

> Ancient practice, reimagined through a quiet, editorial, architectural digital language.

## 1. Principles

1. **Stillness is a material.** Use generous whitespace and long, calm pauses. Never animate more than one idea at a time.
2. **Typography carries the brand.** Large serif display type does the expressive work, and the UI chrome recedes.
3. **Documentary photography only.** Show real teachers, real graduates and real destinations. No stock people and no AI people.
4. **Architecture over decoration.** Hairline rules, strict grids and asymmetric compositions. No boxed cards, no gradients-as-style, no glassmorphism.
5. **One ornament.** The brand ring (from the AY monogram) is the only recurring motif. It appears as a thin circle, as sand ripples (film) and as the WebGL breath field. No lotus clip-art.

---

## 2. Colour

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#F8EADA` | **Primary canvas** (reference colour) |
| `--color-ivory` | `#FFFDF8` | Raised surfaces, input fill on dark, highlights |
| `--color-sand` | `#E9DCC8` | Secondary canvas, image placeholders, portrait backdrops |
| `--color-earth` | `#9A8068` | Accent: numerals, rules, hover states. **Large text or non-text only** |
| `--color-sage` | `#7E8C78` | Accent: alpine tint, meta on dark. **Large text or non-text only** |
| `--color-charcoal` | `#30332D` | Secondary text on light |
| `--color-ink` | `#1C241F` | Primary text; dark canvas |
| `--ink-70` | `rgb(28 36 31 / .70)` | Small secondary text on cream |
| `--cream-68` | `rgb(248 234 218 / .68)` | Small secondary text on ink |
| `--line` | `rgb(28 36 31 / .14)` | Hairline rules on light |
| `--line-dark` | `rgb(248 234 218 / .16)` | Hairline rules on ink |

### Destination tints

These are only used on retreat pages, so that Austria and Goa never share a treatment.

| Token | Hex | Use |
|---|---|---|
| `--alpine-mist` | `#E4E6DF` | Austria canvas (cool, expansive) |
| `--alpine-pine` | `#243029` | Austria dark sections |
| `--coast-sand` | `#F3DEC4` | Goa canvas (warm, restorative) |
| `--coast-dusk` | `#8A5E45` | Goa accent (large type only) |

### Measured contrast (WCAG 2.2)

| Foreground / background | Ratio | Allowed use |
|---|---|---|
| ink / cream | **13.4 : 1** | All text |
| charcoal / cream | **10.9 : 1** | All text |
| ink-70 / cream | **5.5 : 1** | Body and small text |
| cream / ink | **13.4 : 1** | All text |
| cream-68 / ink | **7.0 : 1** | Body and small text |
| earth / cream | 3.1 : 1 | ≥ 24 px display, rules, icons |
| sage / cream | 3.0 : 1 | ≥ 24 px display, rules, icons |

Focus rings are 2 px ink on light and 2 px cream on dark, offset 3 px, giving ≥ 3 : 1 against both neighbours.

---

## 3. Typography

| Role | Family | Weights |
|---|---|---|
| Display | **Cormorant Garamond** | 300, 400 + italic 300, 400 (500 is never set in the serif; medium weights belong to Manrope eyebrows and buttons) |
| Text & UI | **Manrope** | 400, 500, 600 |

Both families are self-hosted through `next/font` with `display: swap` and metric-matched fallbacks, so there is no layout shift. Only the Latin subsets are preloaded (Cormorant roman and italic, Manrope: about 100 KB). Extended-Latin faces load on demand through `unicode-range`, only on pages that set Sanskrit diacritics such as *āsanam*.

### Fluid scale

| Token | Size (`clamp`) | Line height | Tracking | Use |
|---|---|---|---|---|
| `display-mega` | `clamp(4.5rem, 17vw, 17rem)` | 0.82 | −0.035em | Hero wordmark, footer wordmark |
| `display-xl` | `clamp(3.2rem, 9vw, 9.5rem)` | 0.88 | −0.03em | Chapter titles, manifesto lines |
| `display-l` | `clamp(2.6rem, 6vw, 6.25rem)` | 0.94 | −0.02em | Page H1s |
| `display-m` | `clamp(2rem, 3.8vw, 4rem)` | 1.0 | −0.015em | Section H2s |
| `display-s` | `clamp(1.55rem, 2.3vw, 2.4rem)` | 1.12 | −0.01em | H3s, pull quotes |
| `lede` | `clamp(1.3rem, 1.9vw, 2rem)` | 1.35 | 0 | Serif lead paragraphs, kinetic copy |
| `body-l` | `clamp(1.05rem, 1.1vw, 1.2rem)` | 1.65 | 0 | Intro paragraphs (Manrope) |
| `body` | `1rem` | 1.7 | 0 | Body copy |
| `small` | `0.875rem` | 1.55 | 0.005em | Meta, captions |
| `eyebrow` | `0.72rem` | 1.2 | 0.24em, uppercase, 500 | Section labels, nav |

### Rules

- Body measure is 60–68ch. Display measure is ≤ 16ch, and line breaks are set by hand in data where they matter.
- Emphasis inside display type uses **Cormorant italic**, never bold.
- Chapter numerals use Cormorant with old-style figures (`font-variant-numeric: oldstyle-nums`).
- Never use all-caps for serif display, except the hero wordmark.
- Minimum size for interactive text is 16 px on mobile. Form inputs are always ≥ 16 px to stop iOS zoom.

---

## 4. Layout & spacing

- **Grid:** 12 columns ≥ 1024 px · 8 columns 768–1023 px · 4 columns < 768 px.
- **Page margin:** `--page-x: clamp(1.25rem, 4.2vw, 4.5rem)`. **Gutter:** `--gutter: clamp(1rem, 2vw, 2rem)`.
- **Max content width:** 1680 px. Full-bleed media ignores the max width.
- **Spacing scale (4 px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192.
- **Section rhythm:** `--space-section: clamp(6rem, 16vh, 12rem)`, with a tighter `--space-block: clamp(3rem, 8vh, 6rem)`.
- **Asymmetry:** editorial sections offset content by 1–2 columns (for example, text in columns 2–6 and image in columns 8–12, overlapping by −4 rem vertically).

---

## 5. Components

| Component | Specification |
|---|---|
| **MagneticButton** (brand CTA) | A pill (4 rem; 4.6–5.25 rem large) carrying a light disc with the AY mark, then the label in Cormorant with the last word in italic ("Enroll *Now*") and an arrow. Ink on light canvases, cream on dark ones and film. At rest, two hairline auras breathe out from the edge on the 6.5 s breath period. On hover, focus or press, a warm sunrise (`coast-dusk`) rises through the pill, rings ripple outward from the mark, the disc lifts slightly and the arrow moves on. Gentle magnetic pull on fine pointers. `block` stretches it to its container. **Used for primary conversion only:** home hero and close, course hero and enrolment panel, retreat hero and close, closing calls. |
| **ArrowLink** | Label plus a 14 px arrow, with a minimum height of 44 px (touch target). The underline draws left→right (`scaleX` 0→1, origin left) on hover and focus, and retracts right. The arrow translates 6 px. |
| **Button** | 48 px min height, 2 px radius, 1 px border, eyebrow type. Variants: `solid-ink`, `solid-cream`, `outline`. |
| **Navigation** | Fixed. 84 px tall, compressing to 64 px after 80 px of scroll. Colour follows the section underneath (`data-nav-theme`). Dropdowns are hairline panels with a course list and a single image. Mobile uses a full-screen ink overlay with 11vw Cormorant links. |
| **Entry** *(instead of cards)* | Image (3:2 or 4:5), hairline rule, meta line (eyebrow), title (display-s), optional ArrowLink. No background, border box or shadow. |
| **SectionHeading** | Eyebrow with a numeral (`01 — About Avana Yoga`), then a display heading with masked line reveal. |
| **SectionDivider** | Full-width hairline with a centred 28 px brand ring that draws on scroll. |
| **Accordion (FAQ)** | Hairline rows, question in display-s, and a +/× glyph that rotates 45°. Panel height is animated. Built on `button[aria-expanded]` plus a region. |
| **Dialog / Sheet** | Teacher and event details. Desktop: a right-hand sheet `min(760px, 92vw)`. Mobile: full screen. Focus trap, Escape closes. Scroll is locked through Lenis on desktop and `html.scroll-locked` on touch devices. |
| **Form field** | Underline only (1 px, 2 px on focus). Floating eyebrow label. Error text sits below in `#7A3F2C` (6.9 : 1 on cream) and is linked with `aria-describedby`. |
| **Footer** | Ink canvas: brand statement, three link columns, contact block, socials and legal (social and legal links at least 44 px tall). A full-width `AVANA YOGA` wordmark rises on scroll. |
| **Portrait** | Teachers are framed in a circle inside a 1 px halo at 20% opacity: the brand ring. The circle opens from its centre on reveal. Face-safe crops are set per teacher. |
| **Facts strip** (`FactList`) | Hairline `dl`: stacked pairs on mobile, one row of equal columns from 1024 px. Label in eyebrow, value in Cormorant at 1.2–1.55 rem. |
| **Enrolment panel** | The only filled block on a course page: ink panel with the fee, details, a full-width cream CTA and the contact line. It stays in view beside the dates. |
| **ClosingCall** | End-of-page invitation over the `seed` breath field: display heading, one magnetic CTA, up to three arrow links. |
| **EditorialHero** | Secondary-page opening: breadcrumb, eyebrow, masked title lines (last line italic and indented), optional lede and actions, then a 21:9 still or scrubbed film. |
| **Galleries** | `DriftGallery` (coastal and course pages: rows glide horizontally; native swipe on touch) and `ColumnGallery` (alpine: three parallax columns; two-column masonry on mobile). No lightbox chrome. |

---

## 6. Radius, borders & elevation

| Token | Value | Use |
|---|---|---|
| `--radius-0` | 0 | Images, media, sections (architectural) |
| `--radius-1` | 2px | Buttons, inputs |
| `--radius-full` | 999px | Magnetic CTA, monogram, cursor, ring glyphs |
| `--shadow-sheet` | `0 40px 120px -40px rgb(28 36 31 / .45)` | Dialog sheets only |

No other shadows exist. Depth comes from overlap, scale and parallax, not from drop shadows.

---

## 7. Image treatment

- **Delivery:** `next/image` with AVIF → WebP → JPEG negotiation, explicit `sizes`, and the `sand` colour as placeholder. Only above-the-fold hero images and film posters load eagerly with high priority. Full-bleed hero photography uses quality 70.
- **Ratios:** portrait 4:5 (teachers, editorial pairs), landscape 3:2 (supplied photography), cinematic 21:9 (crops through `object-position`), square 1:1 (Goa sources).
- **No CSS filters on photography.** They are expensive when combined with transforms. Where text sits on an image, legibility comes from a gradient overlay (`ink` 0 → 55%).
- **Faces are never cropped.** `object-position` is set per asset in `src/data/media.ts`.
- **Portrait crops on phones:** when a landscape photograph fills a portrait frame, `sizes` asks for the width the crop needs (`200vw` for 4:5 frames, `400vw` for full-bleed heroes). Mobile images stay sharp instead of being upscaled from a 390 px source.
- **Motion:** reveal with `clip-path: inset()`, breathe with a 1.12 → 1 inner scale, and parallax at ±8%.
- **Grain:** one fixed, static 3.5% SVG noise layer (no animation), which gives the page a paper-like tactility. Desktop only (≥ 1024 px): on phones it is barely visible but costs a full-screen composited layer.

---

## 8. Video treatment

| Film | Source | Encoding (desktop / mobile; plus a 540×960 portrait crop, CRF 28, for upright phones) | Treatment |
|---|---|---|---|
| The Origin | Generated, 10 s, 24 fps | 1600 w CRF 24 / 960 w CRF 26, GOP 8, no B-frames, no audio, faststart | Hero aperture; opens from a circle to full bleed |
| The Transformation | Generated, 10 s, 24 fps | same | Cream edges feathered into the page with a radial mask (desktop; full bleed on phones, where a masked video repaints every frame) |
| The Breath (Surya Namaskar) | Supplied, 60 → 30 fps | 1440 w CRF 26 / 960 w CRF 28, GOP 10, no B-frames, video track only | Ink chapter; inset frame expands to full bleed |
| The Practice (Bakasana) | Supplied, 60 → 30 fps | 1440 w CRF 26 / 960 w CRF 28, GOP 10, no B-frames, video track only | Full-bleed chapter II |
| The Journey (Inversions) | Supplied, 60 → 30 fps | 1440 w CRF 26 / 960 w CRF 28, GOP 10, no B-frames, video track only | Full-bleed chapter III |

- The short GOP (8 for generated films, 10 for yoga films) and absence of B-frames make every seek cheap, so scrubbing stays smooth. All fifteen encodes total 42 MB and load only near the viewport; phones wait for the first interaction and take portrait encodes on full-screen stages.
- **Posters:** the first frame is the scrub start state; `-still` and `-end` frames serve reduced motion, Save-Data and fallback. Each has a `-portrait` crop served through `<picture>` on upright phones.
- **Framing in narrow frames:** `film.mobilePosition` sets each film's crop (Breath `18% 50%` keeps the burned-in cues out of the frame instead of cutting them in half).
- Audio is stripped from all files. Nothing on the site can autoplay sound.

---

## 9. Iconography

**The logo** is the client's supplied AY mark (`public/media/brand/ay-mark.png`), rendered through one component, `layout/Logo.tsx`. It appears in the header, the footer, the page-transition cover, media placeholders and the seed of the primary call to action. It keeps its own colours — brand orange `#F8A058` with a grey bar — on both cream and ink canvases, and is never recoloured or redrawn.

Everything else is drawn as 1.25 px strokes in `currentColor`: a thin ring, an arrow (→ ↗), plus/close, burger, play, and the WhatsApp and envelope marks.

---

## 10. Breakpoints

| Name | Min width | Composition notes |
|---|---|---|
| base | 0 | Single column; no pinned horizontal tracks; shorter pins. Below `lg`: no WebGL (static breathing rings), no grain, native touch scrolling, portrait film encodes |
| `sm` | 640px | Two-column entries |
| `md` | 768px | 8-column grid; teacher index becomes a two-column list |
| `lg` | 1024px | 12-column grid; horizontal tracks, magnetic UI, custom cursor |
| `xl` | 1280px | Wider display measures |
| `2xl` | 1440px | Reference desktop |
| `3xl` | 1680px | Content max width reached |

QA widths: **1440 · 1280 · 1024 · 768 · 430 · 390 · 375**.
