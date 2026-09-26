# Avana Yoga — Content Audit

**Source of truth:** a live crawl of https://avanayoga.com on **2026-09-11**. It covers every URL in `page-sitemap.xml` (38 pages) and `post-sitemap.xml` (38 posts), `/downloads/`, and the companion events page `avanayoga.co.uk/event` that the homepage links to. One text extract was produced per URL: headings, paragraphs, lists, images, links and forms, in document order.

**Where content lives now:** structured data in `src/data/*.ts` (pages) and `src/content/*.json` (journal posts, SEO landing pages). This document records what each live page contains, where it lives in the rebuild, and every editorial decision.

**Rule applied throughout:** nothing is invented. If the live site does not publish a fact (an address, a retreat date, a 300-hour fee), the rebuild shows nothing, or uses the live wording ("TBD", "Coming Soon…").

---

## 1. Business facts → `src/data/site.ts`

| Fact | Value | Published on |
|---|---|---|
| Name | Avana Yoga | everywhere |
| Tagline | Ancient Wisdom. Modern Life | Home hero |
| Promise (H1) | Yoga as it was always meant to be | Home hero |
| Roots | Rooted in the classical traditions of India. Shared with the world. | Home hero |
| Positioning | "We are not a fitness school. We are a school of transformation." | Home |
| Presence | UK, India, internationally | Home, About |
| Accreditation | Yoga Alliance (USA). Lead teachers are Yoga Alliance E-RYT 500 registered | Home, course pages |
| Email | info@avanayoga.com | Footer, Contact, retreats |
| Phone | Avana Yoga UK · +44 7514196466 | Footer, Contact |
| WhatsApp | +44 7514 196466 (wa.me/447514196466) | Contact |
| Social | Facebook `/AvanaYoga`, YouTube channel `UCjoOHlCOfv_X8zZ27Fk6eGA`, Instagram `/avanayoga` | Footer |
| Enrolment | Enroll Now → forms.gle/zycACemShG8D67L19. Get In Touch → forms.gle/B3oi5nYWC53nJG6z5 | Header, mobile menu |
| Postal / studio address | **Not published** | — |

---

## 2. Homepage `/` → `src/data/home.ts`

Live title: *Best Yoga Retreats & Courses In The UK - Avana Yoga*

| # | Live section | Heading | Content | CTA → target | Imagery |
|---|---|---|---|---|---|
| 1 | Hero | H1 "Yoga as it was always meant to be" | Eyebrow "Ancient Wisdom. Modern Life"; "Rooted in the classical traditions of India…" | Enroll Now → Google Form | Background |
| 2 | About Avana Yoga | Where Ancient Wisdom Meets the Modern World | One paragraph: Yoga Sutras, Bhagavad Gita, "not a fitness school", UK/India/international | Read More → `/about/` | — |
| 3 | Our Services | What We Offer | Courses · Retreats · Events, each with one sentence | Read More → `/course/` (301), `/austria-retreat/`, avanayoga.co.uk/event | ttc68, Goa retreat, ttc48 |
| 4 | Why Avana Yoga? | — | Experience(d) Yoga Teacher Trainers · Continually Updated Training Material · Ongoing Post Graduation Support | — | ttc43 |
| 5 | Our Courses | Yoga Teacher Training | 200 Hour · 300 Hour · 50 Hour Yin (image tiles) | View More → `/course/` | ttc29, ttc-15, ttc48 |
| 6 | Testimonials | What Our Students Say | Naomi, Clara, Flavia, Miyuki (carousel, placeholder avatars) | — | — |
| 7 | Upcoming Yoga Retreat | Yoga & Hiking Retreat Austria | "Coming Soon…" | Learn More → `/austria-retreat/` | Austria |

**Rebuild narrative:**
1. Hero (The Origin film)
2. Philosophy
3. Presence (the "school of transformation" paragraph split in two)
4. Chapter I · The Breath
5. What We Offer
6. Why Avana Yoga?
7. The Transformation (film carrying the "not a fitness school" lines)
8. Teacher Training index
9. Chapters II · The Practice and III · The Journey
10. Teachers (all 8 published teachers)
11. Testimonials
12. Retreats (Austria and Goa)
13. Final CTA ("Your journey begins here." is verbatim from the Austria retreat page)

Film chapter labels are the only editorial additions:
- Chapter titles.
- The on-film breath cues "Inhale · Exhale · Retain".
- *Sthira sukham āsanam*, Yoga Sūtra 2.46.

---

## 3. About `/about/` → `src/data/about.ts`, `src/data/teachers.ts`

Live sections, in order:
1. H2 "About Avana Yoga".
2. H2 "Where Ancient Wisdom Meets the Modern World", with 3 paragraphs: reverence for the lineage (Vedas, Yoga Sutras, Bhagavad Gita); "science of the mind… Samadhi"; "not as a trend, but as a transformation".
3. "Our Team / Our Teachers": Madhav, Katie, Prabhakar, Dr Pragyan, each with a 300 px portrait and full biography.

**Rebuild:** the About page becomes a manifesto in chapters:
- Philosophy (paragraph 2)
- Lineage (paragraph 1)
- Mission (paragraph 3)
- Approach (homepage "Why" pillars)
- Teachers (the four About profiles in full, plus the other four training faculty in a profile index)
- Global presence

The lineage texts come from wording published on the site: About; Home ("the Yoga Sutras, the Hatha Pradipika, the Bhagavad Gita"); `/pranayama/` ("Hatha Yoga Pradipika"); and the *Roots of Yoga* event ("Vedas, Upanishads, and Bhagavad Gita to the classical system of Patanjali"). Each global-presence location is a course or retreat location published on its own page.

### 3.1 Teacher profiles

| Teacher | Published on | Biography variants preserved | Key credentials |
|---|---|---|---|
| Yogi Madhav | About, 200 hr, 50 hr Yin, CPD, retreats (host), online courses, `/yogi-madhav/` | `bio` (About), `training` (course pages), `host` (retreats, online courses), `profile` (`/yogi-madhav/`) | BA Philosophy, Sanskrit & Hindi. MA Yoga & Meditation. Teaching internationally since 2012. Himalaya Yoga Olympiad winner 2008. 500+ hrs training, Yoga Alliance certified. Science of living coach |
| Katie | About | `bio` | 200 hr YA (India). +300 hrs Traditional Hatha. Extensive Yin training. Lead trainer, Yin YTT programme (per About) |
| Prabhakar Rana | About, 200 hr, online courses | `bio` | 1000+ hrs professional YTT. 16+ years teaching. Hatha & Ashtanga |
| Dr Pragyan Tripathi | About | `bio` | Ayurveda & Panchkarma trainer. Herbal medicine. Pulse reading (nadi) |
| Helen | 200 hr | `bio` | Practising since 2011. 200 hr Bali (2015). 300 hr India (2017). B-Yoga Studio (2019). Hotpod Yoga Chester (2025) |
| Sudhir Rishi | 200 hr | `bio` | Director of Teacher Trainings, Sthira Yoga. 30+ years. 150+ 200-hr and 40 300-hr YTTs. ERYT-500. 40,000+ hrs. Former monk |
| Leena | 200 hr, 50 hr Yin, CPD | `bio` + certifications list, `brief` (CPD) | IYN 200. 100 hr Ashtanga Vinyasa. 100 hr Yin. 100 hr Meditation (Rishikesh). Sound Healing. Soma Prana Vinyasa. Children's Yoga. HCPC Art Psychotherapist |
| Matt | 200 hr | `bio` | Practising since 2001, teaching Ashtanga Vinyasa since 2011. 200 hr RYT (Rishikesh). 40 hr adjustments each with Manju Jois and David Swenson. BSc (Hons) TCM Acupuncture |

Each page shows the teachers and wording it publishes today (see `teacherLineups` in `teachers.ts` and `teachers.variants` in `courses.ts`).

---

## 4. Courses → `src/data/courses.ts`

### 4.1 `/courses/` (Our Courses)

Four entries, each with a heading, a long description and **Learn More**:
- 200 Hour Yoga Teacher Training (Hatha description)
- 300 Hour Yoga Teacher Training
- 50 Hour Yin Yoga TTC
- Continuing Professional Development (CPD) → links to `/cpd` (**404**)

**Rebuild:**
- The same four entries in the same order, with descriptions verbatim (`listing`).
- The CPD link goes to `/continuing-education/`.
- A secondary "further study" index links the other published study pages: Pregnancy Yoga, Online Yoga Courses, Online Classes and Yoga Styles.

### 4.2 `/200-hour-yoga-teacher-training/`

Sections, in order:
1. Hero: "200 Hour Hatha & Vinyasa" · "Yoga Teacher Training Rhyl Wales UK" · "Starts on 23rd January 2027 (10 weekends)" · "Saturdays & Sundays (12:00 - 6:00 PM)".
2. "Full Accredited 200hr Hatha & Vinyasa Yoga Teacher Training" (1 paragraph, 1 image).
3. Areas of study (8).
4. Learning Outcomes (8).
5. Eligibility + Pre-Requisites (4).
6. Four Yoga Alliance badge icons.
7. Graduation.
8. Accredited: Yoga Alliance USA, 200-hour RYT, 90% attendance, catch-up classes charged.
9. Our Teachers: Madhav (training bio), Prabhakar, Helen, Sudhir, Leena (with certifications), Matt.
10. Dates: 10 weekends, 23 Jan – 28 Mar 2027, plus "2 Live Philosophy sessions per week (Catch up with recordings if missed)".
11. Course Fee £1899: Early Bird ends 30 Nov 2026; Regular £2099 after that; payment plans on request; Sat & Sun 12:00–6:00 PM; "We'll confirm your place by email within 1–2 business days"; **Enroll Now**.
12. Testimonials: Nikki, Ilona, Natasha, Chynthia, Claudia (with titles).
13. FAQ (6).
14. Gallery (8 images).

### 4.3 `/300-hour-yoga-teacher-training/`

Sections, in order:
1. "300 Hour YTTC".
2. "You've completed your 200-hour training – it's time to ADVANCE" (2 paragraphs).
3. Core Modules (10 items listed, 2 of them duplicates).
4. Asana (10).
5. Anatomy (8).
6. Pranayama (3).
7. Philosophy (3).
8. Vinyasa Yoga (5).
9. Meditation (5).
10. Pre-Requisite (intro plus 5).
11. Accreditation (300-hour RYT).
12. Badge icons.
13. Graduation.
14. Accredited (copy of the 200-hour block).
15. Date / Status / Location table: TBD · Available · Chester UK; TBD · Available · India; **Apply Now** (prefilled form "300 hour YTTC").
16. FAQ (4).

No teachers, testimonials or fee are published.

### 4.4 `/50-hour-yin-yttc/`

Sections, in order:
1. "50 Hour Yin YTTC".
2. "…can be counted as Additional Education Hours for Yoga Alliance."
3. Lede paragraph.
4. "Components of a 50-hour YIN TEACHER TRAINING" / Areas of study: one list mixing practice, "27 Yin Yoga Asana" with 7 sub-points, "Anatomy" with 7 sub-points, and 6 methodology items.
5. Learning Outcomes (6).
6. Eligibility (4).
7. Graduation (long paragraph).
8. Meet Our Teachers: Leena (full plus certifications), Madhav (training).
9. Join Our Upcoming Yin Training: Course Dates 2026 (5–6, 12–13, 26–27 September); time 10:00 AM–04:00 PM; Chester UK; £549 (payment plan available); **Apply Now** (prefilled "50 hour Yin YTTC").
10. FAQ (8).

The long description on `/courses/` is also used as the intro on this page.

### 4.5 `/continuing-education/`

Sections, in order:
1. "Elevate Your Expertise with Continuing Professional Development (CPD)".
2. "Namaste Yogis!" · "Take your yoga practice & teaching to the next level!" · 30-hour Continuing Education Certificate Course across three weekends.
3. Course Outline: Weekend 1 (Philosophy, History, Pranayama); Weekend 2 (Chakras, Meditation); Weekend 3 (Chakra-Based Yoga, Yoga Nidra), 3 points each.
4. Meet Our Teachers: Leena (brief), Madhav (training).
5. Course Details: Dates "Coming Soon…"; 12:00–05:00 PM (Sat & Sun); Chester UK; £89; **Reserve your Spot now** → `mailto:info@avanayoga.com`.

### 4.6 `/pregnancy-yoga/` (not in navigation)

Sections, in order:
1. "Pregnancy Yoga" · "50 Hour Pregnancy Yoga" (intro paragraph).
2. "Pregnancy Yoga Teacher Training" / Areas of study (15).
3. Learning Outcomes (5).
4. Eligibility (3).
5. Graduation.
6. Accreditation: recognised by the Indian govt.; 100% attendance.
7. Date / Status / Location: TBD · Available · Indore, India · **Apply Now** → `/registration-form/`.
8. FAQ (1).

---

## 5. Retreats → `src/data/retreats.ts`

### 5.1 `/yoga-retreats/` (Retreats menu parent)

The live page is an **older copy of the Austria retreat page**: "Coming Soon", a £200 deposit, empty price headings "£", 6 and 4 spots, and older images. It **conflicts** with the current `/austria-retreat/` (£299 deposit, £799 / £999, 4 and 2 spots).

**Rebuild:** a retreats hub presenting both current retreats with the figures from their own pages, using the homepage "Retreats" description. The stale figures are not reproduced.

### 5.2 `/austria-retreat/` (alpine)

Sections, in order:
1. H2 title · "Date: TBD" · Reserve my spot!
2. Welcome In: "Inspiring and Relaxing Yoga Holidays".
3. Pillars: Yoga · Hiking · Meditation.
4. Where you'll be… (3 paragraphs).
5. What you'll do… (2).
6. How you'll feel… (4).
7. What's Included: Accommodation (5 days / 4 nights, bio hotel); Meals (vegan/vegetarian, smoothie, brunch, fruit & nuts, 3-course dinner); Daily Yoga (one or two sessions with Madhav); Morning Meditations; Daily Activities (hiking, free backpack & pole rental, Schladming-Dachstein Sommercard); How To Reach (Rohrmoos-Schladming, Biohotel Bergkristall, Schladming station, Salzburg airport).
8. Begin your Journey…: £299 deposit; balance 60 days before; check-in 2:00 PM, check-out 10:00 AM; £799 shared double (4 spots); £999 private room (2 spots); Get it!
9. Meet Your Host (Madhav, host bio).
10. Ready for transformation? · Secure my Slot · email.
11. Gallery (17).

All CTAs → forms.gle/VsMjhHR1XfUux3uw7.

### 5.3 `/goa-retreat/` (coastal)

Sections, in order:
1. Title · "Coming Soon…" · Reserve my spot!
2. Welcome In: "Serenity by the Sea: A Yoga & Ayurveda Wellness Escape".
3. Pillars: Yoga Bliss · Ayurveda Wellness · Sea of Serenity.
4. Where / What / How you'll feel (1 paragraph each).
5. What's Included: Accommodation (North Goa, standard aircon room); Meals (vegan/vegetarian, breakfast, lunch, dinner, fruits & herbal tea); Daily Yoga (two sessions); Morning Meditation; Ayurveda Massage; Airport Pickup & drop off (Goa Airport).
6. Begin your Journey…: £299 deposit (nonrefundable); balance 60 days before; single supplement £199 (7 days) / £299 (10 days); check-in 12:00 PM, check-out 10:00 AM; 7 Days £899 (8 spots); 10 Days £1199 (8 spots).
7. Meet Your Host (Madhav).
8. Ready for transformation? (2 paragraphs) · Secure my Slot.
9. Gallery (17).

---

## 6. Events `/events/` → `src/data/events.ts`

avanayoga.com has no events page (`/events/`, `/event/` return 404). The homepage "Events → Read More" goes to the brand's companion site, which lists:

| Event | Date | Format | Details published | Link |
|---|---|---|---|---|
| Healing with Ayurveda: Ancient Wisdom for Modern Living | "Date and time is TBD" | Live | About paragraph plus 4 "what you'll gain" points | RSVP → avanayoga.co.uk/event-details/healing-with-ayurveda-… |
| The Roots of Yoga: A Journey Through History & Philosophy | "Date and time is TBD" | Live Online | About paragraph. General Admission £9.99 + £0.25 fee, *Sale ended*, *Registration is closed* | avanayoga.co.uk/event-details/the-roots-of-yoga-… |

`/events/` is required by the brief's navigation. It is the only route not present on avanayoga.com, and it uses only this first-party data.

---

## 7. Secondary pages → `src/data/pages.ts`

| URL | Live sections (in order) | CTAs / embeds |
|---|---|---|
| `/online-yoga-classes/` | 1. Hero "Live Online Yoga Classes / Yoga For Everyone From Anywhere" (YouTube background)<br>2. Namaste · Join Live Yoga Classes<br>3. You'll Experience (5 styles plus outro)<br>4. Why Join Our Classes? (5, emoji bullets)<br>5. Schedule (Bookwhen iframe)<br>6. Testimonials (Laura, Marta, Alex, Riya, Sasha)<br>7. FAQ (6) | View Schedule → bookwhen.com/avanayoga; Zoom link |
| `/online-yoga-courses/` | 1. Hero "Join Our Upcoming Online Yoga Course"<br>2. Transform Your Life…<br>3. Three course tiles<br>4. Three long descriptions<br>5. Begin your Journey… (£99 deposit non-refundable; balance 30 days before; flexible weekday/weekend live sessions; from home) · 30 Hours Course £299<br>6. Meet Your Teachers (Prabhakar Rana, Yogi Madhav host bio)<br>7. Ready for transformation? | Reserve / Book Now / Secure my Slot → forms.gle/po44Ca79T1Nepx3W7 |
| `/yoga-styles/` | Yoga Classes: Hatha · Ashtanga · Mysore Style · Yin · Corporate Yoga (2 paragraphs each), then the heading "Chester City Yoga Schedule" (no visible content) | "Book Now" × 5 (no link) |
| `/yoga-classes/` | YOGA FOR EVERYONE · Yoga Classes (4 paragraphs) · image · vidpowr video | Schedule & Booking (no link) |
| `/books/` | 1. NEW RELEASE · Ancient Wisdom, Timeless Stillness · Two books. One journey inward.<br>2. THE BOOKS: *Stillness in a Restless World*; *The Unbroken Thread*<br>3. BEYOND THE BOOKS: Study / Practice / Connect | Amazon author store; amzn.eu/d/07EZNOjp; amzn.eu/d/055AJQ0N; Explore → avanayoga.co.uk |
| `/yogi-madhav/` | Namaste! · About · Yogi Madhav (4 paragraphs, "profile" bio) | — |
| `/pyc/` | Pregnancy Yoga Course · Guiding Pregnancy with Awareness & Care (5 paragraphs) · Course Manual (designrr embed) · Thank You | designrr.page manual |
| `/pranayama/` | Pranayama — Beyond The Breath (intro, "especially suitable for" 3, 2 closing paragraphs) · Day 1 / 2 / 3 videos · Thank You | vidpowr embeds × 3 |
| `/yoga-therapy/` | 1. Quote and 2 paragraphs<br>2. "Yoga Therapy can be used to treat:" with Mental Health Conditions (10) and a second unlabeled list of physical conditions<br>3. "In a typical one-on-one session…" (intake plus 4)<br>4. Closing paragraph<br>5. Leave us a message (form) | WPForms: Name, Email, Subject, Message (all required) |

---

## 8. Forms, contact & legal

| Page | Content | Rebuild |
|---|---|---|
| `/contact/` | Our Contact · Get in touch · "We look forward to taking care of you with loving attention." Contact form (First, Last, Email, Message). Call +44 7514196466 · WhatsApp · Email · Connect With Us | `ContactForm`: server action, validation, honeypot, rate limit, SMTP delivery |
| `/registration-form/` | "To register our course please fill out the application form below…" Fields: First/Last, Gender (Male/Female/Other), Date of birth, Phone, Email, Country, Course (200 hour YTTC / 300 hour YTTC / 50 hour Yin YTTC / Retreat), Course date, Accommodation (Non Residential / Single / Shared), Health issues, Previous practice, Expectations, How did you find us, Comments (all required) | `RegistrationForm`: same fields and options |
| `/yoga-therapy/` | Leave us a message | `TherapyForm` |
| `/thank-you/` | "Thank you · We will get in touch soon" plus contact details | Preserved (noindex) |
| `/downloads/` | WordPress password-protected page | Password gate (`DOWNLOADS_PASSWORD`). No files are published because none are public |
| `/privacy-policy/` | Intro · Which data can we collect? (4) · Why do we collect this data? (4) · Safety · Links to other websites | `src/data/legal.ts`, verbatim |
| `/terms-and-conditions/` | Intro · Use of this website (7) · Refund Policy · Terms & Conditions · Credit Note · Transfer of Registration to a future date (GBP 200 charge < 4 weeks) · Transfer to a third Person | `src/data/legal.ts`, verbatim |

---

## 9. Journal posts

All 38 posts are preserved at their live root-level URLs. The HTML body, publish and modified dates, cover image and SEO title are stored in `src/content/posts/{slug}.json`. Posts without a cover image get a documentary cover chosen by topic (`coverFor` in `src/lib/journal.ts`). `experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga-2` duplicates its original, so it carries a canonical pointing to the original.

| # | URL | Title | Published | Cover |
|---|---|---|---|---|
| 1 | `/online-yoga/` | Online Yoga | 2025-07-26 | Fallback by topic |
| 2 | `/yoga-retreats-in-austria/` | Why Austria Is the Hidden Gem for Soulful Yoga Retreats | 2025-07-17 | Yes |
| 3 | `/yoga-alliance-certified-course-uk/` | 🧘‍♀️ Why Choose a Yoga Alliance Certified Course in the UK? | 2025-07-17 | Yes |
| 4 | `/retreat-inward-restore-your-mind-body-and-spirit-with-yoga/` | Retreat Inward: Restore Your Mind, Body, and Spirit with Yoga | 2025-06-04 | Fallback by topic |
| 5 | `/create-harmony-in-your-life-with-the-healing-energy-of-yoga/` | Create Harmony in Your Life with the Healing Energy of Yoga | 2025-06-04 | Fallback by topic |
| 6 | `/awaken-your-true-self-through-the-practice-of-yoga-and-meditation/` | Awaken Your True Self Through the Practice of Yoga and Meditation | 2025-06-04 | Fallback by topic |
| 7 | `/transform-stress-into-calm-the-restorative-power-of-yoga/` | Transform Stress into Calm: The Restorative Power of Yoga | 2025-06-04 | Fallback by topic |
| 8 | `/discover-bliss-through-the-avana-yoga-experience/` | Discover Bliss Through the Avana Yoga Experience | 2025-06-04 | Fallback by topic |
| 9 | `/embrace-lasting-happiness-with-the-mindful-path-of-yoga/` | Embrace Lasting Happiness with the Mindful Path of Yoga | 2025-06-04 | Fallback by topic |
| 10 | `/cultivate-clarity-and-joy-through-a-daily-yoga-practice/` | Cultivate Clarity and Joy Through a Daily Yoga Practice | 2025-06-04 | Fallback by topic |
| 11 | `/find-inner-peace-and-balance-at-a-yoga-retreat/` | Find Inner Peace and Balance at a Yoga Retreat | 2025-06-04 | Fallback by topic |
| 12 | `/find-inner-peace-and-balance-through-yoga-retreats/` | Find Inner Peace and Balance Through Yoga Retreats | 2025-02-27 | Fallback by topic |
| 13 | `/escape-heal-and-recharge-with-a-serene-yoga-retreat/` | Escape, Heal, and Recharge with a Serene Yoga Retreat | 2025-02-27 | Fallback by topic |
| 14 | `/how-yoga-retreats-can-transform-your-overall-well-being/` | How Yoga Retreats Can Transform Your Overall Well-Being | 2025-02-27 | Fallback by topic |
| 15 | `/rejuvenate-your-mind-and-body-with-a-yoga-retreat/` | Rejuvenate Your Mind and Body with a Yoga Retreat | 2025-02-27 | Fallback by topic |
| 16 | `/retreat-to-recharge-how-yoga-retreats-can-transform-your-well-being/` | Retreat to Recharge How Yoga Retreats Can Transform Your Well Being | 2025-02-17 | Fallback by topic |
| 17 | `/beyond-the-mat-applying-yoga-principles-to-everyday-life/` | Beyond the Mat Applying Yoga Principles to Everyday Life | 2025-02-17 | Fallback by topic |
| 18 | `/mastering-the-mind-yoga-techniques-for-mental-clarity-and-control/` | Mastering the Mind Yoga Techniques for Mental Clarity and Control | 2025-02-17 | Fallback by topic |
| 19 | `/the-path-to-bliss-how-yoga-cultivates-joy-and-inner-balance/` | The Path to Bliss How Yoga Cultivates Joy and Inner Balance | 2025-02-17 | Fallback by topic |
| 20 | `/escape-the-everyday-immerse-yourself-in-nature-and-wellness-with-avana-yogas-uk-retreats/` | Escape the Everyday: Immerse Yourself in Nature and Wellness with Avana Yoga's UK Retreats | 2023-06-01 | Fallback by topic |
| 21 | `/take-your-yoga-practice-to-new-heights-explore-avana-yogas-exceptional-yoga-courses-in-the-uk/` | Take Your Yoga Practice to New Heights: Explore Avana Yoga's Exceptional Yoga Courses in the UK | 2023-05-29 | Fallback by topic |
| 22 | `/unlock-your-inner-bliss-join-avana-yogas-life-changing-yoga-retreats-in-the-beautiful-landscapes-of-the-uk/` | Unlock Your Inner Bliss: Join Avana Yoga's Life-Changing Yoga Retreats in the Beautiful Landscapes of the UK | 2023-05-26 | Fallback by topic |
| 23 | `/experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga-2/` | Experience the Ultimate Yoga Retreat in India with Avana Yoga | 2023-05-23 | Fallback by topic |
| 24 | `/embark-on-a-transformative-journey-discover-the-best-yoga-retreats-in-the-uk-with-avana-yoga/` | Embark on a Transformative Journey: Discover the Best Yoga Retreats in the UK with Avana Yoga! | 2023-05-21 | Fallback by topic |
| 25 | `/elevate-your-practice-with-avana-yogas-200-hour-teacher-training-course/` | Elevate Your Practice with Avana Yoga's 200-hour Teacher Training Course | 2023-05-17 | Fallback by topic |
| 26 | `/experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga/` | Experience the Ultimate Yoga Retreat in India with Avana Yoga | 2023-05-14 | Fallback by topic |
| 27 | `/unlock-your-potential-with-avana-yogas-instructor-certification-program/` | Unlock Your Potential with Avana Yoga's Instructor Certification Program | 2023-05-11 | Fallback by topic |
| 28 | `/become-a-certified-yoga-teacher-with-avana-yogas-teacher-training-course/` | Become a Certified Yoga Teacher with Avana Yoga's Teacher Training Course | 2023-05-07 | Fallback by topic |
| 29 | `/discover-the-best-yoga-retreats-in-the-uk-with-avana-yoga/` | Discover the Best Yoga Retreats in the UK with Avana Yoga | 2023-05-04 | Fallback by topic |
| 30 | `/how-to-start-meditation/` | How to Start Meditation | 2022-07-11 | Yes |
| 31 | `/the-five-principles-of-yoga-by-swami-vishnudevananda/` | The Five Principles of Yoga by Swami Vishnudevananda | 2022-07-11 | Yes |
| 32 | `/the-difference-between-restorative-and-yin-yog/` | The difference between Restorative and Yin Yog | 2022-07-11 | Yes |
| 33 | `/what-is-meditation/` | What is Meditation? | 2022-07-11 | Yes |
| 34 | `/5-reasons-to-practice-yin-yoga/` | 5 Reasons to Practice Yin Yoga | 2022-07-11 | Yes |
| 35 | `/the-three-gunas-sattva-rajas-tamas/` | The Three Gunas – Sattva, Rajas, Tamas | 2022-07-04 | Yes |
| 36 | `/panchakosha-the-five-sheaths/` | Panchakosha – The Five Sheaths | 2022-07-04 | Yes |
| 37 | `/which-dosha-type-are-you/` | Which Dosha Type Are You? | 2022-07-04 | Yes |
| 38 | `/full-moon-meditation/` | Full Moon Meditation | 2022-07-04 | Yes |

---

## 10. SEO landing pages → `src/content/landing/*.json`

There are 11 long-form keyword pages. Blocks are stored as `heading`, `paragraph`, `list`, `features`, `faq` and `cta`, and rendered by `EditorialLanding`.

| URL | Blocks | Note |
|---|---|---|
| `/200-hour-yoga-teacher-training-course-landing-page/` | 44 | **Older intake published as live:** Chester UK, starts 5 Sept 2026, Early Bird ends 30 June 2026, enrol → forms.gle/C8PsZhVMbeR85mMg8. Preserved as published and flagged for the client to update or retire. `#form` CTA → `/registration-form/` |
| `/200-hour-yoga-teacher-training-course/` | 16 | — |
| `/300-hour-yoga-teacher-training-course/` | 12 | — |
| `/yoga-instructor-certificate-courses/` | 16 | — |
| `/yoga-instructor-certification/` | 12 | — |
| `/yoga-teacher-training-course/` | 14 | — |
| `/yoga-teacher-training-courses-in-the-uk/` | 17 | First heading is H2 on live; rendered as the page H1 |
| `/yoga-teacher-training-courses-in-india/` | 17 | First heading is H2 on live; rendered as the page H1 |
| `/yoga-retreats-in-india/` | 19 | — |
| `/yoga-retreats-in-the-uk/` | 15 | "Uk" → "UK" |
| `/yoga-and-meditation-retreats-europe/` | 15 | — |

---

## 11. Editorial decisions

| Where | Live | Rebuild | Why |
|---|---|---|---|
| Site-wide | Duplicate `<title>`s (e.g. Goa and Online Courses use the Austria title) | Unique, accurate titles; keyword intent kept | SEO |
| Home | "Experience Yoga Teacher Trainers" | "Experienced Yoga Teacher Trainers" | Typo |
| Home | Events → external site | `/events/` (RSVP links preserved) | Brief requires Events in the IA |
| Home | Retreat teaser "Coming Soon…" for Austria | Each retreat shows its own page wording (Austria "Date: TBD", Goa "Coming Soon…") | Consistency with the retreat pages |
| `/courses/` | CPD Learn More → `/cpd` (404) | `/continuing-education/` plus redirect | Broken link |
| 200 hr | Enroll Now `href` is two URLs concatenated | Prefilled application form ("200 hour YTTC"), the same pattern as 300 hr and Yin | Broken link |
| 300 hr | Core Modules lists "Philosophy Module" and "Yin Yoga Module" twice | Listed once | Duplicate |
| 300 hr | "Accredited" block says "200-hour RYT" beside an "Accreditation" block saying "300-hour RYT" | 300-hour statement kept; assessment and 90% attendance rules kept under Graduation | Copy-paste error; no fact lost |
| 300 hr FAQ | "a advanced course", "yoga alliance 200 hour ttc certificate", "different school" | "an advanced course", "Yoga Alliance 200 hour TTC certificates", "a different school" | Grammar |
| 50 hr Yin | One flat list with sub-points | Grouped into The Practice · 27 Yin Yoga Asana · Anatomy · Teaching Methodology; every item kept | Readability |
| 50 hr Yin | "practic", "there target areas", "prepares you perfectly for mediation" | "practice", "their target areas and the joints they affect", "meditation" | Typos |
| Pregnancy | Two corrupted sentences: "…gentle tension sickness the body active and supple and minimize the common smooth delivery by relieving around and constipation", "…during labor the cervix and birth canal and by opening the pelvis" | Not reproduced; every readable sentence kept | Unreadable, cannot be restored without inventing |
| Pregnancy | "classwill", "Garbhadhansanskar", "GabhadhanSamskar" | "class will", "Garbhadhan Samskar" | Typos |
| Austria | "Oraganic", "amazin", "vegetarien", "hiking mountains during our daytime", "smoothy", "Roohrmoos-Schaldming" | "Organic", "amazing", "vegetarian", "hike the mountains during the daytime", "smoothie", "Rohrmoos-Schladming" | Typos |
| Goa | "Medition", "Serenity by the Sea :" | "Meditation", "Serenity by the Sea:" | Typos |
| Retreats | "How To Reach" / "Airport Pickup" listed under What's Included | Shown in a dedicated *Getting there* chapter; Goa transfers are marked as included | Retreat structure (brief §19) |
| About | "centre's", "tripathi", "makings" | "centres", "Tripathi", "making" | Typos |
| Yin page vs About | About: Katie leads the Yin YTT programme. Yin page: Leena and Madhav | Each page keeps its own published lineup | Neither statement is invented or merged |
| `/books/` | Study / Practice / Connect all → avanayoga.co.uk home | `/courses/`, `/online-yoga-classes/`, `/yoga-retreats/` | Links match their labels |
| `/yoga-styles/` | Five "Book Now" buttons with no link; schedule heading with no content | Book Now and schedule → bookwhen.com/avanayoga (the brand's published booking page) | Dead buttons |
| `/yoga-classes/` | "Schedule & Booking" with no link | bookwhen.com/avanayoga | Dead button |
| `/yoga-therapy/` | Physical conditions in an unlabeled list interleaved with the session list; "HIV" and "Brain Injury" appear twice | Two groups, "Mental Health Conditions" (live heading) and "Physical Health Conditions" (label added); duplicates removed | Structure; the label is descriptive only |
| `/online-yoga-classes/` | Emoji bullets (🌿 🧘 🌎 💬 🕊️) | Removed | Editorial typography |
| Testimonials | Student spelling ("Knowlege", "teached", "hes") | **Unchanged** | Verbatim voices |
| Madhav | Four different published biographies | All kept; each page shows its own | Fidelity |

---

## 12. Not published → not shown

| Missing on live site | Consequence in rebuild |
|---|---|
| Postal or studio address | No `LocalBusiness` schema, no map on Contact |
| Retreat dates (Austria "TBD", Goa "Coming Soon…") | Status shown verbatim; no `Event` schema |
| 300 hr fee and dates | Facts strip shows "TBD" / "Available" only |
| Pregnancy Yoga fee and dates | "TBD" |
| CPD dates | "Coming Soon…" |
| Event dates | "Date and time is TBD"; no `Event` schema |
| Downloads files | Gate only; empty list with contact route |
| Online course dates | "Flexible weekday and weekend live sessions available" only |
| Review counts or ratings | No `AggregateRating` schema |
| Names of people in documentary photos (other than Yogi Madhav) | Alt text describes roles ("a teacher", "a graduate") |

**Client change (2026-09):** Katie removed at the client's request, from the About teacher profiles and the homepage teacher index. Her portrait (`katie.jpg`) was deleted. The entries above still describe the live site as crawled.

**Client change (2026-09): 200 Hour areas of study.** The live page lists eight area names only. At the client's request each area now opens to a short summary and key points (`CurriculumAreas`). The copy was written for the site and drawn only from published material: this page's Learning Outcomes and the About page's classical texts (Yoga Sutras, Hatha Pradipika, Bhagavad Gita). It claims no hours, named techniques or other specifics. **Awaiting client approval.**

**Client change (2026-09): online classes and courses withdrawn.** The client does not offer online
classes or courses, so the "Further study" index on `/courses/` and its three pages were removed:
`/online-yoga-classes/`, `/yoga-styles/` and `/pregnancy-yoga/`. `/pyc/` (the pregnancy course
student area) went with them, as did the "Online Yoga" journal post, which was an advert for the
Zoom schedule. Every URL 301s (see `next.config.ts`). Copy claiming an online offering was cut from
three landing pages and from the About "Global presence" list, and the unused `onlineTestimonials`
set was deleted. One generic FAQ answer on `/300-hour-yoga-teacher-training-course` was trimmed from
"in-person, online, or a hybrid of both" to the in-person format only. The `format: 'Live Online'`
label on the past "Roots of Yoga" event is left as crawled: it records a workshop that has already
happened and whose registration is closed, not an offering.

**Client change (2026-09): footer quick links.** Reduced, at the client's request, to Home, Events,
Retreats, Books and School Login, in that order. "Online courses" was renamed "School Login" (it
points at `school.avanayoga.com`) and its outbound arrow was dropped; the screen-reader "opens in a
new tab" note stays. About, Journal and Downloads remain reachable from the nav and in-page links.

**Client change (2026-09): Tally forms.** The client supplied five hosted Tally forms, branded by
them, whose responses go to their own Google Sheets and email. They replace the Google Forms the
live site linked to and the two hand-built forms the rebuild carried (`ContactForm` and
`RegistrationForm`, which needed SMTP that was never configured).

They were first embedded as iframes; the client then asked for **links, not embeds**, so the site
only ever links out and every one of those links opens in a new tab (`CtaButton` and
`MagneticButton` add `target="_blank" rel="noopener noreferrer"`, the `↗` arrow and a
"opens in a new tab" note for screen readers). The URLs live in one place, `TALLY` in
`src/data/site.ts`, surfaced as `site.forms`.

| Form | Linked from |
|---|---|
| Enquiry `VLgQy6` | `/contact/` ("Open the enquiry form"), mobile menu |
| Retreat booking `5BRjDQ` | Both retreat pages (each package, and "Secure my slot"), `/yoga-retreats/` |
| Teacher training `obWe1N` | 200 / 300 / 50 Hour Yin pages, `/registration-form/`, header and mobile-menu ENROLL, homepage, `/courses/` |
| Event RSVP `0QX8WA` | `/events/` ("Reserve your place"). Each event keeps its own "RSVP" link to that event's page on avanayoga.co.uk, which carries the ticket prices |
| Course feedback `aQV6bB` | `/course-feedback/` (unlisted, noindex) |

`/continuing-education/` keeps its "Reserve your Spot now" mailto, since the client mapped the
application form to the teacher trainings only. `submitContact` and `submitRegistration` were
deleted with their forms; the yoga therapy message and the downloads gate still use the server
action and still need SMTP.
