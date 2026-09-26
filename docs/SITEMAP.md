# Avana Yoga — Sitemap

**Source of truth:** a live crawl of https://avanayoga.com on 2026-09-11.

- Rank Math sitemap index → `page-sitemap.xml` (38 URLs), `post-sitemap.xml` (38 URLs), `category-sitemap.xml` (1 URL).
- Every page URL linked from the header menu, the mobile menu and the footer.
- Probes for URLs the brief assumed might exist.

Every URL listed below returned **HTTP 200** during the crawl unless marked otherwise.

---

## 1. Crawl findings

| Finding | Detail | Decision in rebuild |
|---|---|---|
| 38 public pages | All in `page-sitemap.xml`, all `index, follow` | All 38 preserved at identical URLs (trailing slash kept) |
| 38 blog posts | Root-level slugs (`/what-is-meditation/`) | All 38 preserved at identical URLs via one `JournalPost` template |
| Category archive | `/category/uncategorized/` + `/page/2/`…`/page/4/` | Preserved (`JournalIndex` (paginated)) |
| `/downloads/` | Linked in footer, **not** in sitemap, WordPress password-protected | Preserved as a password-gated page (content is not public, so none is invented) |
| `/course/` | 301 → `/courses/` (linked from homepage cards) | Permanent redirect kept |
| `/cpd` | Linked from `/courses/` “Learn More”, returns **404** | Link fixed to `/continuing-education/` + permanent redirect `/cpd/` |
| `/events/`, `/event/`, `/team/` | **404** on avanayoga.com | No `/team/` page is invented (teachers live on About, as on the live site) |
| Events | Homepage “Events → Read More” links to the brand's companion site `https://www.avanayoga.co.uk/event`, whose own nav has **Events** as a first-class item | `/events/` surfaces those two first-party events. Their detail links still point to the original RSVP/ticket pages. **This is the only route not present on avanayoga.com.** It is required by the brief and uses only first-party data. |
| Duplicate `<title>`s | `/goa-retreat/`, `/yoga-retreats/`, `/online-yoga-courses/` share the Austria title; `/courses/`, `/yoga-styles/`, `/yoga-classes/`, `/yogi-madhav/` share one title; `/contact/` and `/thank-you/` share one | Unique, accurate titles written per page (keyword intent kept) |

---

## 2. Navigation

### Live header (`menubar`)
Home · About · **Courses ▾** (200 Hour YTT, 300 Hour YTT, 50 Hour Yin YTT, Continuing Education) · **Retreats ▾** (Austria Retreat, Goa Retreat) · Contact
Mobile menu adds a “Get In Touch” button → `https://forms.gle/B3oi5nYWC53nJG6z5`

### Rebuild header
`AVANA YOGA` (home) · **Courses ▾** · **Retreats ▾** · Events · About · Contact · **Enroll** (→ live “Enroll Now” form)

### Live footer (preserved)
- Brand statement
- Facebook / YouTube / Instagram
- Quick Links: Home, About, Downloads
- Courses: 200 / 300 / 50 Hour
- Contacts: info@avanayoga.com, Avana Yoga UK +44 7514196466
- © 2026 Avana Yoga · Terms and conditions · Privacy policy

The rebuild footer adds WhatsApp, which is published on `/contact/`.

---

## 3. Route table

The template column names the component that renders each route. Page files live at `src/app/{route}/page.tsx`. Shared templates live in `src/components/{home,courses,retreats,templates}`.

### 3.1 Primary pages (in navigation or footer)

| Route | Live `<title>` | Template | Placement |
|---|---|---|---|
| `/` | Best Yoga Retreats & Courses In The UK - Avana Yoga | `app/page.tsx` + `components/home/*` | Logo |
| `/about/` | Learn & Know All About Avana Yoga Now - Avana Yoga | `app/about/page.tsx` | Header, footer |
| `/courses/` | Get Our All Courses From Our Experience Trainers - Avana | `app/courses/page.tsx` · `CourseEntry` | Header (Courses) |
| `/200-hour-yoga-teacher-training/` | 200-Hour Yoga Teacher Training \| Avana Yoga | `CoursePage` | Courses ▾, footer |
| `/300-hour-yoga-teacher-training/` | 300-Hour Yoga Teacher Training \| Avana Yoga | `CoursePage` | Courses ▾, footer |
| `/50-hour-yin-yttc/` | Best 50 Hours Yin YTTC \| Get In Touch Now - Avana Yoga | `CoursePage` | Courses ▾, footer |
| `/continuing-education/` | Continuing Education - Avana Yoga | `CoursePage` | Courses ▾ |
| `/yoga-retreats/` | Best Yoga Retreat In The Austrian Alps - Avana Yoga | `app/yoga-retreats/page.tsx` · `RetreatEntry` | Header (Retreats) |
| `/austria-retreat/` | Best Yoga Retreat In The Austrian Alps - Avana Yoga | `RetreatPage` · alpine | Retreats ▾ |
| `/goa-retreat/` | *(duplicate Austria title)* | `RetreatPage` · coastal | Retreats ▾ |
| `/events/` | — *(data from avanayoga.co.uk/event)* | `app/events/page.tsx` · `EventList` | Header |
| `/contact/` | Get In Touch With Us Now - Avana Yoga | `app/contact/page.tsx` · `ContactForm` | Header |
| `/downloads/` | Downloads - Avana Yoga | `app/downloads/page.tsx` · `DownloadsGate` | Footer |
| `/privacy-policy/` | Get All About Our Privacy Policy - Avana Yoga | `LegalPage` | Footer |
| `/terms-and-conditions/` | Learn All About Our Term & Conditions - Avana Yoga | `LegalPage` | Footer |

### 3.2 Public pages not linked from navigation (preserved)

| Route | Live `<title>` | Template | Purpose on live site |
|---|---|---|---|
| `/books/` | Yogi Madhav \| Yoga, Meditation & Philosophy Books | `app/books/page.tsx` | Two books by Yogi Madhav (Amazon links) |
| `/yogi-madhav/` | *(courses title dup)* | `app/yogi-madhav/page.tsx` | Teacher profile + YouTube film |
| `/online-yoga-courses/` | *(Austria title dup)* | `EditorialHero` · `TeacherIndex` | Three 30-hour online courses (£299) |
| `/yoga-classes/` | *(courses title dup)* | `EditorialHero` · `VideoEmbed` | “Yoga for everyone” + video |
| `/pranayama/` | Pranayama - Avana Yoga | `EditorialHero` · `VideoEmbed` | Student area: 3-day video series |
| `/yoga-therapy/` | Complete Yoga Therapy By Our Yoga Experts - Avana Yoga | `EditorialHero` · `TherapyForm` | Conditions + message form |
| `/registration-form/` | Get In Touch With Us Via Our Registration Form - Avana Yoga | `app/registration-form/page.tsx` · `RegistrationForm` | Full application form |
| `/thank-you/` | *(contact title dup)* | `app/thank-you/page.tsx` | Form confirmation |
| `/blogs/` | Learn Here From Our Blogs With Our Experience Trainers | `JournalIndex` | Blog & News listing |
| `/blog/` | Blog - Avana Yoga | `JournalIndex` (canonical → `/blogs/`) | Empty page on live site |
| `/category/uncategorized/` (+ `/page/2/`–`/page/4/`) | Our Uncategorized Blogs - Avana Yoga | `JournalIndex` (paginated) | WordPress archive |
| `/course-feedback/` | *(new, 2026-09)* | `app/course-feedback/page.tsx` | Unlisted: noindex, not in the sitemap, nav or footer. Links to the Tally feedback form; the client sends students the link |

**Withdrawn at the client's request (2026-09), each 301'd in `next.config.ts`:**

| Live route | Redirects to | Why |
|---|---|---|
| `/online-yoga-classes/` | `/yoga-classes/` | The client does not offer online classes |
| `/yoga-styles/` | `/yoga-classes/` | Listed only from the withdrawn "Further study" index |
| `/pregnancy-yoga/` | `/courses/` | Withdrawn with the "Further study" index |
| `/pyc/` | `/courses/` | Student area for the withdrawn pregnancy course |
| `/online-yoga/` (post) | `/blogs/` | Journal post advertising the Zoom schedule |
| `/online-yoga-courses/` | `/courses/` | Withdrawn earlier (2026-09) |

### 3.3 SEO landing pages (`EditorialLanding`, content in `src/content/landing/*.json`)

| Route | Live `<title>` |
|---|---|
| `/200-hour-yoga-teacher-training-course-landing-page/` | 200 Hour Yoga Teacher Training Course – Get Certified |
| `/200-hour-yoga-teacher-training-course/` | 200 Hour Yoga Teacher Training Course – Get Certified |
| `/300-hour-yoga-teacher-training-course/` | 300 Hour Yoga Teacher Training Course – Advance Your Skills |
| `/yoga-instructor-certificate-courses/` | Yoga Instructor Certificate Courses – Get Certified Today |
| `/yoga-instructor-certification/` | Yoga Instructor Certification – Get Certified Today |
| `/yoga-teacher-training-course/` | Yoga Teacher Training Course – Become a Certified Instructor |
| `/yoga-teacher-training-courses-in-the-uk/` | Yoga Teacher Training Courses in the UK – Get Certified |
| `/yoga-teacher-training-courses-in-india/` | Yoga Teacher Training Courses in India – Start Your Journey |
| `/yoga-retreats-in-india/` | Yoga Retreats in India – Experience True Wellness |
| `/yoga-retreats-in-the-uk/` | Best Yoga Retreats in the UK – Rejuvenate Your Mind & Body |
| `/yoga-and-meditation-retreats-europe/` | Yoga and Meditation Retreats Europe – Find Your Peace |

### 3.4 Journal posts (`JournalPost`, content in `src/content/posts/*.json`)

38 posts, each served at `/{slug}/` by `app/[slug]/page.tsx`, which also serves the 11 landing pages (`dynamicParams = false`, all statically generated). The full list with publish dates is in `CONTENT-AUDIT.md §9` and in `src/content/posts-index.json`.

---

## 4. Redirects

| From | To | Why |
|---|---|---|
| `/course/` | `/courses/` | Mirrors the live 301 |
| `/cpd/` | `/continuing-education/` | Repairs the broken live link |

---

## 5. External destinations (preserved exactly)

| Purpose | URL |
|---|---|
| Homepage “Enroll Now” / header Enroll | https://forms.gle/zycACemShG8D67L19 |
| Mobile menu “Get In Touch” | https://forms.gle/B3oi5nYWC53nJG6z5 |
| Austria & Goa retreat booking (all CTAs) | https://forms.gle/VsMjhHR1XfUux3uw7 |
| 200 Hour course-landing “Enroll Now” | https://forms.gle/C8PsZhVMbeR85mMg8 |
| Course applications (200 / 300 / 50 Yin) | Google Form `1FAIpQLSfcCY2FMnG1gdUOLqvVHdSZHTiaMyj8FwIAo2btpqHOU3KGSQ` prefilled with the course name |
| Online courses booking | https://forms.gle/po44Ca79T1Nepx3W7 |
| Live class schedule | https://bookwhen.com/avanayoga |
| Events detail / RSVP | https://www.avanayoga.co.uk/event-details/… |
| Books | Amazon author store + two `amzn.eu` links |
| Social | facebook.com/AvanaYoga · youtube.com/channel/UCjoOHlCOfv_X8zZ27Fk6eGA · instagram.com/avanayoga |
| WhatsApp | https://wa.me/447514196466 |

The 200-hour page's live “Enroll Now” `href` is malformed: two URLs are concatenated. The rebuild uses the prefilled registration Google Form, which is the same pattern as the 300-hour and Yin pages.
