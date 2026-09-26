# Avana Yoga — website

A full rebuild of [avanayoga.com](https://avanayoga.com). It keeps the same information architecture, URLs and published content, presented as a cinematic, editorial experience.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3.15 (ScrollTrigger, SplitText) · Lenis · Three.js
- **Pages:**
  - 38 pages from the live sitemap, all at their original URLs.
  - 38 journal posts, the category archive and `/downloads/`.
  - `/events/`, the one addition the brief required. It uses only the brand's own event data.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm run start        # add `-p 3100` to change the port
```

Quality gates:

```bash
npm run typecheck
npm run lint
```

Requires Node.js 20 or newer.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and structured data (default `https://avanayoga.com`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Email delivery for the Contact, Registration and Yoga Therapy forms |
| `FORMS_TO`, `FORMS_FROM` | Recipient and sender for form emails (default `info@avanayoga.com`) |
| `FORMS_STORE=file` | Appends submissions to `.data/submissions.jsonl` instead of emailing. This is the default in development |
| `DOWNLOADS_PASSWORD` | Password for `/downloads/`, replacing the WordPress page password |

In production without SMTP, forms show a friendly message with the email address and phone number instead of failing silently.

---

## Where things live

```
src/
  app/                  one folder per live URL; [slug] serves journal posts and SEO landing pages
  components/
    home/               homepage chapters (hero, film chapters, offer track, teachers, retreats…)
    courses/            CoursePage template, curriculum index, course entries
    retreats/           RetreatPage template (alpine / coastal), hero, story chapters
    teachers/           TeacherIndex (sheet profiles), TeacherProfile, details
    motion/             ScrollVideo, RevealText, KineticText, EditorialImage, MagneticButton, transitions, Lenis
    webgl/              BreathField (Three.js shader), BreathSection
    ui/ forms/ layout/ templates/ seo/ testimonials/ events/
  data/                 all page content as typed data: site, navigation, courses, retreats, teachers,
                        testimonials, events, home, about, pages (secondary pages), media, films, legal
  content/              journal posts and landing pages (JSON), legacy SEO titles
public/media/           processed photography, films, posters, Open Graph images
assets/                 original supplied photography and films (not served)
docs/                   SITEMAP · CONTENT-AUDIT · ASSET-MAP · DESIGN-SYSTEM · ANIMATION-SYSTEM
scripts/qa/             headless-Chrome audit harness
```

### Editing content

Content is stored as data, never duplicated across components.

| Change | File |
|---|---|
| Course dates, fees, FAQs, curriculum | `src/data/courses.ts` |
| Retreat packages, status, inclusions | `src/data/retreats.ts` |
| Teacher biographies and the lineups per page | `src/data/teachers.ts` |
| Events | `src/data/events.ts` (dates are "TBD" at source, so no Event schema is emitted until a real date is added) |
| Contact details, booking form links, social links | `src/data/site.ts` |

Every editorial decision against the live site (typos, duplicates, broken links) is logged in `docs/CONTENT-AUDIT.md`.

### Films

Every film is scroll-controlled through `<ScrollVideo>`. Each film has three encodes: desktop, mobile (landscape), and a 540×960 portrait crop for upright phones. To re-encode a supplied film:

```bash
ffmpeg -i source.mov -map 0:v:0 -an -dn -map_metadata -1 -write_tmcd 0 \
  -vf "scale=1440:-2:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 26 -g 10 -bf 0 \
  -pix_fmt yuv420p -movflags +faststart public/media/video/NAME-desktop.mp4
# mobile: scale=960:-2 and -crf 28
# portrait (P = horizontal crop position 0–1, e.g. 0.36 for the Breath):
#   -vf "crop=trunc(ih*9/16/2)*2:ih:trunc((iw-ih*9/16)*P/2)*2:0,scale=540:960:flags=lanczos,fps=30" -crf 28 → NAME-portrait.mp4
```

Keep the short GOP and `-bf 0`: they are what make frame-accurate scrubbing smooth. Regenerate the posters from the first frame when the source changes, including the `-portrait.webp` crops at the same position. Set `mobilePosition` in `src/data/films.ts` if the subject is off-centre.

---

## QA harness

```bash
npm run build && npm run start -- -p 3100
npm i --no-save playwright-core            # uses the locally installed Google Chrome
OUT=./qa-out node scripts/qa/audit.mjs crawl    # every route at 1440 & 390: errors, requests, h1, metadata, alt, overflow, JSON-LD
OUT=./qa-out node scripts/qa/audit.mjs widths   # key templates at 1440/1280/1024/768/430/390/375
OUT=./qa-out node scripts/qa/audit.mjs links    # every internal href → HTTP status
OUT=./qa-out ROUTE=/ WIDTH=390 node scripts/qa/audit.mjs shots   # screenshots through a page
FORMS_STORE=file npm run start -- -p 3100 && OUT=./qa-out node scripts/qa/interact.mjs   # transitions, sheets, menu, forms, perf, redirects
BASE=http://localhost:3100 OUT=./qa-out LABEL=run node scripts/qa/mobile-perf.mjs   # phone profile (4× CPU, slow 4G): FCP, LCP, TBT, CLS, bytes, scroll jank
BASE=http://localhost:3100 node scripts/qa/mobile-film.mjs   # phone/desktop media strategy: encodes, deferral, scrubbing, WebGL/Lenis gating, fallbacks
```

Mobile results and the strategy behind them are in `docs/ANIMATION-SYSTEM.md` §14.

## Deployment notes

- Any Node host that runs `next start`, or Vercel. All routes are statically generated except `/downloads/`, which reads a cookie.
- Set `NEXT_PUBLIC_SITE_URL` to the production origin, and set the SMTP variables so forms deliver by email.
- The form rate limiter is in-memory, so it is per instance. Use a shared store if you run several instances.
