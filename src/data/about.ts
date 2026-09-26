/**
 * About — verbatim from avanayoga.com/about/ (crawl 2026-09-11), broken into manifesto chapters.
 * The lineage and global-presence chapters assemble facts published elsewhere on the site;
 * each entry cites its source page.
 */
import { photos } from './media';

export const about = {
  seo: {
    title: 'About Avana Yoga',
    description:
      'Avana Yoga was born from a deep reverence for India’s classical yoga tradition. Meet our teachers and discover yoga not as a trend, but as a transformation.',
  },
  hero: { eyebrow: 'About Avana Yoga', title: ['Where Ancient Wisdom', 'Meets the Modern World'] },
  philosophy: {
    eyebrow: 'Philosophy',
    statement: 'We believe yoga is far more than movement.',
    text: 'At its heart, it is the science of the mind: a path towards Samadhi, inner stillness, and the clarity that comes from truly knowing oneself. Every class, course, and retreat we offer is rooted in this understanding.',
    image: photos.madhavForestClose,
  },
  lineage: {
    eyebrow: 'Lineage',
    text: 'Avana Yoga was born from a deep reverence for India’s classical yoga tradition: a living lineage that stretches back thousands of years through the Vedas, the Yoga Sutras of Patanjali, and the timeless teachings of the Bhagavad Gita.',
    /** Texts named across the site: About, homepage (“Why Avana Yoga?”), /pranayama/ and the Roots of Yoga event. */
    sources: ['The Vedas', 'The Upanishads', 'The Bhagavad Gita', 'The Yoga Sutras of Patanjali', 'The Hatha Yoga Pradipika'],
    caption: 'From the wisdom of the Vedas, Upanishads, and Bhagavad Gita to the classical system of Patanjali and beyond.',
    image: photos.satsangCircle,
  },
  mission: {
    eyebrow: 'Mission',
    statement: ['Not as a trend,', 'but as a transformation.'],
    text: 'From India to the UK and beyond, we share these teachings with sincerity, depth, and care, welcoming students and teachers who are ready to experience yoga not as a trend, but as a transformation.',
  },
  approach: { eyebrow: 'Approach', image: photos.teachersNamaste },
  teachers: {
    eyebrow: 'Our Team',
    heading: 'Our Teachers',
    facultyEyebrow: 'Teacher training faculty',
    facultyHeading: 'Also teaching on our trainings',
  },
  presence: {
    eyebrow: 'Global presence',
    heading: 'From India to the UK and beyond',
    places: [
      { place: 'Rhyl, Wales', country: 'United Kingdom', offering: '200 Hour Yoga Teacher Training', href: '/200-hour-yoga-teacher-training/' },
      { place: 'Chester', country: 'United Kingdom', offering: '300 Hour YTTC · 50 Hour Yin YTTC · Continuing Education', href: '/courses/' },
      { place: 'India', country: 'India', offering: '300 Hour YTTC', href: '/300-hour-yoga-teacher-training/' },
      { place: 'North Goa', country: 'India', offering: 'Yoga & Ayurveda Wellness Retreat', href: '/goa-retreat/' },
      { place: 'Schladming', country: 'Austria', offering: 'Yoga & Hiking Retreat', href: '/austria-retreat/' },
    ],
  },
};
