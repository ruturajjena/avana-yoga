# Avana Yoga — Asset Map

Every visual on the site has one deliberate editorial job. Supplied photography is real Avana Yoga documentary work, and no AI-generated people are used anywhere. This map records each asset:
- its source and processed file,
- what it shows,
- where it lives, and why it lives there,
- how it behaves on desktop and on mobile.

---

## 1. Inventory

| Group | Source | Files | Processed to |
|---|---|---|---|
| Supplied photography | `assets/Images/` | 23 JPEG. 21 teacher-training documentary frames (1600×1066, and 1066×1600 portrait). 2 meditation portraits (3096 px) | `public/media/images/` (renamed by subject; meditation portraits resized to 2400 px) |
| Supplied yoga films | `assets/videos/*.mov` | 3 × 1920×1080, 60 fps, H.264 + AAC, ~12 s, ~47 MB each | `public/media/video/the-{breath,practice,journey}-{desktop,mobile}.mp4` |
| Generated films | `assets/videos/THE ORIGIN.mp4`, `THE TRANSFORMATION.mp4` | 2 × 1920×1080, 24 fps, 10 s, 240 frames, no cuts | `public/media/video/the-{origin,transformation}-{desktop,mobile}.mp4` |
| Poster frames | Extracted from the films | First frame + representative/end frame, JPEG + WebP, plus 540×960 portrait crops (WebP) for upright phones | `public/media/posters/` |
| Retreat photography | Live `/austria-retreat/`, `/goa-retreat/` | 25 Austria, 18 Goa | `public/media/retreats/{austria,goa}/` |
| Teacher portraits | Live About and course pages | 10 files (8 teachers) | `public/media/teachers/` |
| Book covers | Live `/books/` | 2 (900×1260) | `public/media/books/` |
| Journal images | Live posts | 13 | `public/media/journal/` |
| Brand | Supplied by the client (2026-09) | `ay-mark.png` — the AY ring, 512×512, trimmed and squared with transparency. The earlier horizontal lockup (`avana-yoga-logo.png`) is kept but unused | `public/media/brand/` |
| Open Graph | Composed from the photography | 6 × 1200×630 | `public/media/og/` |

**Delivery**
- All stills go through `next/image`: AVIF → WebP → JPEG negotiation, explicit `sizes`, `deviceSizes` 390–2400.
- Only above-the-fold film posters and page-hero photographs load eagerly with high priority. Everything else lazy-loads.
- Full-bleed hero photography is served at quality 70. Film posters are art-directed: phones held upright receive the portrait crop.

---

## 2. Supplied photography

Placements are enforced in `src/data/media.ts` (registry) and the page data files.

| # | Original | Processed | Size · ratio | What it shows | Role | Page → section | Desktop / mobile treatment |
|---|---|---|---|---|---|---|---|
| 1 | `31_01026.jpg` | `madhav-meditation-forest-wide.jpg` | 2400×1856 · 1.29 | Yogi Madhav in seated meditation on a stone ledge, forest canopy | Editorial, hero-grade | **Home → Presence** (primary, parallax) · **/yogi-madhav/ → hero** | Desktop: 4:5 frame, 5 columns, ±7% parallax. Mobile: full width 4:5, `object-position 50% 40%` |
| 2 | `31_01030.jpg` | `madhav-meditation-forest-close.jpg` | 2400×2000 · 1.2 | Same moment, closer | Editorial portrait | **About → 01 Philosophy** · **/online-yoga-classes/ → intro** | 4:5 crop at `50% 32%`; horizon clip reveal |
| 3 | `…training2.jpg` | `ttc-teachers-namaste.jpg` | 1066×1600 · 2:3 | Yogi Madhav, hands in namaste, beside a teacher in a sari | Editorial portrait | **About → 04 Approach** | Tall 2:3 column (desktop), 4:5 (mobile) |
| 4 | `…training5.jpg` | `ttc-circle-laughter.jpg` | 1066×1600 · 2:3 | Teachers laughing with the group | Editorial portrait | **Home → 04 Teacher Training** (tall, beside the course index) · **/yoga-classes/** | Desktop: 2:3 with parallax. Mobile: hidden on Home (the index carries thumbnails); 4:5 on /yoga-classes/ |
| 5 | `…training8.jpg` | `ttc-students-seated.jpg` | 1600×1066 · 3:2 | Trainees in quiet seated meditation | Course hero | **50 Hr Yin → hero** · /courses/ Yin entry · Home course index preview (Yin) | 21:9 hero crop (desktop) → 4:5 (mobile) at `55% 50%` |
| 6 | `…training10.jpg` | `ttc-students-listening.jpg` | 3:2 | Three trainees listening | Editorial | **/online-yoga-courses/ → Patanjali Yoga Sutras** | 4:3 |
| 7 | `…training12.jpg` | `ttc-satsang-circle.jpg` | 3:2 | Teachers and trainees seated in a circle | Editorial | **Home → 03 Why (Training material)** · **About → 02 Lineage** | 4:3, centre clip reveal |
| 8 | `…training15.jpg` | `ttc-graduation-01.jpg` | 3:2 | A graduate receives his certificate from Yogi Madhav | Certification | **200 Hr → Certification** | 4:3 beside the accreditation text |
| 9 | `…training18.jpg` | `ttc-graduation-embrace.jpg` | 3:2 | Yogi Madhav's hand on a graduate's shoulder | Editorial | **Home → 03 Why (Post-graduation support)** | 4:3 |
| 10 | `…training21.jpg` | `ttc-tilak-blessing.jpg` | 3:2 | A teacher marks a trainee's forehead with tilak | Editorial (tradition) | **Home → Presence** (overlapping secondary) | Desktop: 3:2 overlapping the primary by −16vh. Mobile: stacked |
| 11 | `…training22.jpg` | `ttc-graduation-02.jpg` | 3:2 | Certificate handover, teachers applauding | Certification · card | **300 Hr → Certification** · /courses/ 300 entry · Home index preview (300) | 4:3 |
| 12 | `…training23.jpg` | `ttc-student-joy.jpg` | 3:2 | A trainee laughing with joy | Editorial | **Home → 06 Voices** | Desktop: 4:5 at `78% 40%`. Mobile: hidden (the quote carries the section) |
| 13 | `…training26.jpg` | `ttc-graduation-03.jpg` | 3:2 | Graduate smiling with certificate | Gallery | **200 Hr → Gallery** | Drift gallery |
| 14 | `…training29.jpg` | `ttc-graduation-04.jpg` | 3:2 | Graduate in blue with Yogi Madhav | Card | **/courses/ 200 entry** · Home index preview (200) · 200 Hr gallery | 4:3 card, 4:5 preview |
| 15 | `…training32.jpg` | `ttc-graduation-05.jpg` | 3:2 | Graduate with certificate and a flower | Gallery | **200 Hr → Gallery** | Drift gallery |
| 16 | `…training47.jpg` | `ttc-community-circle.jpg` | 3:2 | The whole group seated in a wide circle | Card · hero | **Home → 02 What We Offer (Events)** · **/events/ → hero** | Panel image (desktop track), 4:5 (mobile) |
| 17 | `…training62.jpg` | `ttc-celebration.jpg` | 3:2 | Trainees applauding around lit diyas | Editorial | **Continuing Education → intro** · 200 Hr gallery | 4:3 |
| 18 | `…training68.jpg` | `ttc-graduates-group.jpg` | 3:2 | Graduating group with certificates | Card · hero | **Home → 02 What We Offer (Courses)** · **/courses/ → hero** · 200 Hr gallery | Panel image; 21:9 hub hero |
| 19 | `…training71.jpg` | `ttc-graduates-joy.jpg` | 3:2 | Graduates cheering, arms raised | Emotional close | **Home → Final CTA** | Desktop: 4:5 column beside "Your journey begins here." Mobile: full width 4:3 |
| 20 | `…training76.jpg` | `ttc-graduation-06.jpg` | 3:2 | Graduate laughing with Yogi Madhav | Card | **/courses/ CPD entry** · Home index preview (CPD) · 200 Hr gallery | 4:3 |
| 21 | `…training101.jpg` | `ttc-workshop-gathering.jpg` | 3:2 | Trainees kneeling together in a workshop | Editorial | **300 Hr → intro** | 4:3 |
| 22 | `…training103.jpg` | `ttc-student-rest.jpg` | 3:2 | A trainee resting on the floor, smiling | Editorial (ease) | **50 Hr Yin → Graduation** · /courses/ further study (Pregnancy) | 4:3 at `40% 60%` |
| 23 | `…training106.jpg` | `ttc-studio-circle.jpg` | 3:2 | Yogi Madhav and a teacher lead seated meditation | Editorial | **Home → 03 Why (Experienced trainers)** · **200 Hr → intro** | 4:3 at `35% 55%` |

No supplied photograph is repeated within one page, and none is used more than three times across the site.

---

## 3. Films (scroll-controlled)

All five films are scrubbed by scroll through `<ScrollVideo>`. None autoplays and none has sound.

| Original | Processed | Encode | What it shows | Narrative meaning | Page → section | Desktop | Mobile | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| `THE ORIGIN.mp4` (generated) | `the-origin-desktop.mp4` (1600×900, 3.6 MB) · `-mobile.mp4` (960×540, 1.5 MB) · `-portrait.mp4` (540×960 centre crop, 0.9 MB) | 24 fps, 240 frames, GOP 8, no B-frames, faststart, no audio | A ring is pressed into sand, ripples into concentric circles, which rise into Himalayan ranges around a seated meditator | **Ancient Wisdom:** everything begins from one point of stillness | **Home → Hero** (aperture opens as it plays) · **About → opener** | Pinned 300 vh; aperture circle → full bleed; film spans 3–90% of the pin | Pinned 260 vh; wordmark stacked above and below the circle | `the-origin-end` still, full bleed, no pin |
| `Surya-Namaskar.mov` | `the-breath-desktop.mp4` (1440 px, 7.1 MB) · `-mobile.mp4` (960 px, 3.1 MB) · `-portrait.mp4` (540×960, crop at 36%, 2.3 MB) | 60 → 30 fps, 374 frames, GOP 10 | Yogi Madhav in white moves through Sun Salutation at temple ruins, with on-screen cues (inhale / exhale / retain) | **The Breath:** practice is led by the breath | **Home → Chapter I** · **200 Hr → hero** · **/pranayama/ → hero still** | Pinned 320 vh; inset frame expands to full bleed (0–22%), then scrubs | Pinned 200 vh; the portrait encode keeps the yogi in frame and the burned-in cues out. The 4:5 course hero uses the landscape encode at `18% 50%` for the same reason | Framed still + Play film button |
| `THE TRANSFORMATION.mp4` (generated) | `the-transformation-desktop.mp4` (3.2 MB) · `-mobile.mp4` (1.2 MB) · `-portrait.mp4` (centre crop, 1.1 MB) | 24 fps, 240 frames | A dark stone on sand is carved into a mandala, becomes smoke, draws a Warrior II figure, and settles as a pale smooth stone | **Transformation:** "We are not a fitness school. We are a school of transformation." | **Home → The Transformation** · **Continuing Education → hero** | Pinned 260 vh, radial feather mask so the sand blends into the cream page | Pinned 180 vh, full bleed (no mask below 1024 px) | Still + Play film button |
| `yoga-perform-3.mov` | `the-practice-desktop.mp4` (1440 px, 3.3 MB) · `-mobile.mp4` (960 px, 1.5 MB) · `-portrait.mp4` (crop at 40%, 1.0 MB) | 60 → 30 fps, 352 frames, GOP 10 | A yogi lowers into Bakasana (crow) beside a temple ruin | **The Practice:** steadiness and ease, *sthira sukham āsanam* (YS 2.46) | **Home → Chapter II** (first half of a shared pin) · **300 Hr → hero** | Shared pin 420 vh; 0–50% | Shared pin 280 vh; the portrait crop at 40% keeps the head and arms of Bakasana; the 4:5 300 Hr hero uses `31% 50%` | Still + Play film button, stacked |
| `yoga-perform-2.mov` | `the-journey-desktop.mp4` (1440 px, 7.3 MB) · `-mobile.mp4` (960 px, 3.0 MB) · `-portrait.mp4` (centre crop, 2.2 MB) | 60 → 30 fps, 368 frames, GOP 10 | Headstand and inversions in a temple courtyard | **The Journey:** a new perspective; "the real practice begins after training" | **Home → Chapter III** (second half, crossfades in at 46–54%) · **/yoga-styles/ → hero** | Shared pin; 50–100% | Shared pin | Still + Play film button, stacked |

**Retreat hero films** (generated in Google Flow, frames-to-video, with the live hero photograph as the first frame; sources kept in `assets/videos /`)

| Original | Processed | Encode | What it shows | Page → section | Treatment |
|---|---|---|---|---|---|
| `Austria.mp4` (1920×1080, 24 fps, 10 s) | `austria-hero-desktop.mp4` (1600×900, 5.6 MB) · `-mobile.mp4` (960×540, 2.5 MB) · `-portrait.mp4` (540×960 centre crop, 2.0 MB) | 238 frames (last 2 trimmed), GOP 8, no B-frames, no audio | The camera rises over the rooftop yoga class in Schladming to the Dachstein and the valley | **/austria-retreat/ → hero** | Sticky stage 230svh (desktop) / 210svh (mobile); the film plays across the first 96% while title, facts and the booking call stay in place. Poster and still: `austria-hero` (first frame) |
| `goa-retreat .mov` (1920×1080, 60 fps, 12.9 s; replaced the generated Goa film 2026-09) | `goa-hero-v2-desktop.mp4` (1600×900, 5.7 MB) · `-mobile.mp4` (1.8 MB) · `-portrait.mp4` (1.5 MB) | 60 → 30 fps, 387 frames, GOP 10, no audio. Its letterboxed opening aerial (first 131 source frames, 1920×844) is cropped to fill the frame | Montage: aerials of palm-lined beaches and coast, sunset over rice fields, a group practising yoga on a hilltop above the sea | **/goa-retreat/ → hero** | Same sticky stage as Austria; scroll-controlled. Poster and still: `goa-hero-v2` (first frame) |

The photographs (`rooftop-yoga-dachstein.jpg`, `sunset-beach-meditation.jpg`) remain the retreat cards, home destinations and share images.

**Replaced and added 2026-09** (replaced films use new `-v2` file names: `/media/` is cached for 30 days, so reusing a name would keep serving the old film to returning visitors)

| Original | Processed | Encode | Page → section | Treatment |
|---|---|---|---|---|
| `surya-namaskar-updated.mov` (1920×1080, 60 fps, 10.3 s; replaces `Surya-Namaskar.mov`) | `the-breath-v2-desktop.mp4` (1440 px, 7.4 MB) · `-mobile.mp4` (3.5 MB) · `-portrait.mp4` (540×960, crop at 30%, 2.6 MB) | 60 → 30 fps, 309 frames, GOP 10, no audio. One continuous take with no burned-in captions | **Home → Chapter I · The Breath** · **/pranayama/ → hero still** | Unchanged stage (sticky, scroll-controlled). New poster `the-breath-v2` (first frame) and still `the-breath-v2-still` (frame 153) |
| `200-hour.mov` (1920×1080, 60 fps, 12.4 s) | `ttc200-hero-desktop.mp4` (1440 px, 5.7 MB) · `-mobile.mp4` (2.6 MB) · `-portrait.mp4` (2.1 MB) | 60 → 30 fps, 373 frames, GOP 10, no audio. Montage of hands-on adjustments; Avana's AY logo in the corner | **200 Hr → hero** (previously used the Breath film) | Scroll-controlled as the hero passes (top 85% → bottom top). Full 16:9 frame on desktop (`frame: 'full'`) so headstands aren't cropped; 4:5 at `45% 50%` on phones. Poster `ttc200-hero` (first frame), still `ttc200-hero-still` (frame 45) |

**Why the encodes are built this way**
- **Seek cost:** GOP 8 (generated films) or GOP 10 (yoga films) with no B-frames means any seek decodes at most 7–9 frames.
- **Loading:** files are fetched as a Blob only near the viewport (150% on desktop, 100% on mobile) and after the page has loaded, so a seek never waits on the network. Phones also wait for the first interaction.
- **Smoothness:** 30 fps (yoga) and 24 fps (generated) give roughly one frame per 8 px of scroll across the pins.
- **Mobile landscape encodes** are 960 px wide and roughly 40% of the desktop size. They serve tablets, phones held sideways, and the 4:5 course and About heroes.
- **Portrait encodes (540×960)** serve full-screen stages on upright phones. A phone only ever shows a centre strip of a 16:9 frame, so the crop spends its pixels there: 1.8× the on-screen resolution of the landscape encode, for 60–85% of the bytes. Crop positions: Breath 36%, Practice 40%, the rest centred.
- **Totals:** all fifteen encodes come to 42 MB, video track only (audio and timecode tracks removed). A phone on the homepage downloads at most the five portrait files (7.6 MB).

---

## 4. Poster frames `public/media/posters/`

| File | Frame | Used as |
|---|---|---|
| `the-origin.{jpg,webp}` | First frame (plain sand) | Scrub start state for the hero aperture |
| `the-origin-end.{jpg,webp}` | Final frame (meditator among ranges) | Reduced-motion hero. Event artwork (*The Roots of Yoga*). Online course tile (*Yoga History and Philosophy*). Journal fallback cover |
| `the-breath.*` / `the-breath-still.*` | First frame / mid-salutation | Scrub start / reduced-motion still. `/pranayama/` hero |
| `the-transformation.*` / `-still.*` / `-end.*` | First / Warrior II figure / smooth stone | Scrub start / reduced motion / journal fallback |
| `the-practice.*` / `-still.*` | First / Bakasana hold | Scrub start / reduced motion |
| `the-journey.*` / `-still.*` | First / headstand | Scrub start / reduced motion |
| `*-portrait.webp` (10 files) | The first and still/end frames above, cropped to 540×960 at each film's portrait crop position | Art-directed posters on upright phones (`<picture>` source), for scrub start, reduced motion and Save-Data |

---

## 5. Live-site photography

### 5.1 Austria (alpine palette: `alpine-mist` canvas, `alpine-pine` dark)

| File | Placement |
|---|---|
| `rooftop-yoga-dachstein.jpg` | **Hero** (21:9, horizon clip reveal) · Home Retreats panel · Retreats hub |
| `lake-tree-pose.jpg` | Welcome In |
| `rooftop-tree-pose.jpg` · `group-meadow.jpg` · `alpine-stream-rest.jpg` | Pillars: Yoga · Hiking · Meditation |
| `balcony-view.jpg` · `relax-room-view.jpg` | Story: Where you'll be |
| `meadow-group-practice.jpg` · `hiking-stream.jpg` | Story: What you'll do (the first also on Home → What We Offer: Retreats) |
| `meadow-savasana.jpg` | Story: How you'll feel · journal cover rule (Austria posts) |
| `room-modern.jpg` · `breakfast-porridge.jpg` · `yoga-studio.jpg` · `studio-practice.jpg` · `waterfall-bridge.jpg` | What's Included: Accommodation · Meals · Daily Yoga · Morning Meditations · Daily Activities |
| `hotel-bergkristall.jpg` | Getting there (Biohotel Bergkristall) |
| `rooftop-overhead.jpg` · `meadow-warrior.jpg` · `group-lakeside.jpg` · `fountain-lake.jpg` · `hiker-valley.jpg` · `rooftop-dancer-pose.jpg` · `breakfast-granola.jpg` · `room-double.jpg` · `breakfast-bowls.jpg` | Alpine gallery (slow vertical parallax columns) |

### 5.2 Goa (coastal palette: `coast-sand` canvas, `coast-dusk` accent)

| File | Placement |
|---|---|
| `sunset-beach-meditation.jpg` | **Hero** (tide clip reveal from the bottom) · Home Retreats panel · Retreats hub |
| `beach-meditation-group.jpg` | Welcome In |
| `poolside-yoga.jpg` · `ayurveda-massage.jpg` · `lone-beach.jpg` | Pillars: Yoga Bliss · Ayurveda Wellness · Sea of Serenity |
| `palms-sea.jpg` · `beach-jetty.jpg` | Story: Where you'll be |
| `yoga-shala.jpg` · `beach-handstand.jpg` | Story: What you'll do |
| `sunset-meditation-solo.jpg` | Story: How you'll feel · journal cover rule (India/Goa posts) |
| `beach-breakfast.jpg` · `misty-meditation.jpg` · `ayurveda-herbs.jpg` | What's Included: Meals · Morning Meditation · Ayurveda Massage. `misty-meditation` also on the online course *Mantra and Meditation*; `ayurveda-herbs` also on the *Healing with Ayurveda* event |
| `coastal-view-pair.jpg` | Getting there (airport pickup) |
| `pastel-waves.jpg` · `fishing-boat.jpg` · `river-mouth.jpg` · `sunset-sea.jpg` | Coastal gallery (horizontal drift) |

### 5.3 Teachers `public/media/teachers/`

| File | Teacher | Used in |
|---|---|---|
| `madhav.jpg` (1080²) | Yogi Madhav | Teacher index, sheets, About profile, retreat host, `/yogi-madhav/` |
| `dr-pragyan.jpg` | Dr Pragyan Tripathi | About profiles, Home index |
| `prabhakar.jpg` (1400²) | Prabhakar Rana | About, 200 Hr, online courses, Home index |
| `helen.jpg` · `sudhir.jpg` · `leena.jpg` · `matt.jpg` | Helen · Sudhir Rishi · Leena · Matt | Course pages (200 Hr, Yin, CPD), About faculty index, Home index |
| `madhav-about.jpg` · `prabhakar-about.jpg` | — | **Not used**: lower-resolution circular cut-outs duplicating the portraits above |

All portraits are framed in a circle inside a hairline halo (the brand ring). Face-safe crops are set per teacher in `TeacherDetails.tsx`.

### 5.4 Books `public/media/books/`

`stillness-in-a-restless-world.jpg` and `the-unbroken-thread.jpg`: `/books/` hero pair and book entries.

### 5.5 Journal `public/media/journal/`

13 post covers, used by the journal index, post headers and Open Graph. The 27 posts without a cover use a documentary fallback chosen by topic (`coverFor` in `src/lib/journal.ts`).

---

## 6. Open Graph `public/media/og/` (1200×630)

| File | Pages |
|---|---|
| `default.jpg` | Home and fallback |
| `origin.jpg` | Journal, About |
| `training.jpg` | Courses hub, all course pages, landing pages about training |
| `austria.jpg` | Austria retreat, Retreats hub |
| `goa.jpg` | Goa retreat |
| `community.jpg` | Contact, Events |

---

## 7. Treatment rules

1. **Crops never cut faces.** `object-position` is set per asset in the data (`Photo.position`) and per teacher portrait.
2. **No CSS filters on photography.** Legibility over images comes from ink gradients (`rgb(28 36 31)` from 0 to 85%).
3. **Reveals and grain.** Stills reveal with `clip-path` only: up, horizon, centre, or tide. They breathe from 1.18 to 1 scale. Parallax is ±8% on desktop and ±4% on mobile. The grain overlay is a single static 3.5% SVG noise.
4. **Destination language.**
   - Austria opens from the horizon line and moves vertically (alpine, expansive).
   - Goa opens like a tide from the bottom and drifts horizontally (coastal, restorative).
   - The two retreats never share a treatment.
5. **Mobile.** Pins shorten (≈60% of desktop), horizontal tracks become vertical sequences, and hover previews become inline thumbnails.
