/**
 * Business facts sourced from avanayoga.com (crawl 2026-09-11).
 * Do not add information here that is not published on the live site.
 */

/**
 * The five hosted Tally forms supplied by the client (2026-09). They are branded by Tally and post
 * straight to Avana Yoga's Google Sheets and email, so the site only ever links to them. Every
 * button built from these opens in a new tab (see `CtaButton` / `MagneticButton`).
 */
const TALLY = {
  enquiry: 'https://tally.so/r/VLgQy6',
  retreatBooking: 'https://tally.so/r/5BRjDQ',
  teacherTraining: 'https://tally.so/r/obWe1N',
  eventRsvp: 'https://tally.so/r/0QX8WA',
  courseFeedback: 'https://tally.so/r/aQV6bB',
} as const;

export const site = {
  name: 'Avana Yoga',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://avanayoga.com').replace(/\/$/, ''),
  tagline: 'Ancient Wisdom. Modern Life',
  promise: 'Yoga as it was always meant to be',
  roots: 'Rooted in the classical traditions of India. Shared with the world.',
  statement:
    'Avana Yoga carries the authentic teachings of India’s classical yoga tradition to students and teachers worldwide through training, retreats, and a lifelong community of practice.',
  email: 'info@avanayoga.com',
  phone: { label: 'Avana Yoga UK', display: '+44 7514196466', href: 'tel:+447514196466' },
  whatsapp: { display: '+44 7514 196466', href: 'https://wa.me/447514196466' },
  presence: ['United Kingdom', 'India', 'International'],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/avanayoga/' },
    { label: 'Facebook', href: 'https://www.facebook.com/AvanaYoga/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCjoOHlCOfv_X8zZ27Fk6eGA' },
  ],
  forms: TALLY,
  links: {
    enroll: TALLY.teacherTraining,
    getInTouch: TALLY.enquiry,
    retreatBooking: TALLY.retreatBooking,
    ttcLandingEnroll: TALLY.teacherTraining,
    bookwhen: 'https://bookwhen.com/avanayoga',
    eventsSite: 'https://www.avanayoga.co.uk/event',
    booksStore:
      'https://www.amazon.co.uk/stores/author/B0HD2NKQJD/allbooks?ingress=0&visitId=6de07887-9403-41e4-bc2e-0a75a4b3d7fa&ref_=aufs_ap_ahdr_dsk_ab',
  },
} as const;

export type Site = typeof site;
