/**
 * Events published by Avana Yoga on its companion site (linked from the avanayoga.com homepage):
 * https://www.avanayoga.co.uk/event — crawled 2026-09-11.
 * Dates are "TBD" at source, so no dates are shown here and no Event schema is emitted
 * (schema.org Event requires a startDate we do not have).
 */

export type AvanaEvent = {
  slug: string;
  title: string;
  dateLabel: string;
  format: string;
  summary: string;
  about: string[];
  gains?: string[];
  tickets?: { type: string; price: string; fee: string; status: string }[];
  status?: string;
  href: string;
  cta: string;
  image: { src: string; alt: string };
};

export const events: AvanaEvent[] = [
  {
    slug: 'healing-with-ayurveda-ancient-wisdom-for-modern-living',
    title: 'Healing with Ayurveda: Ancient Wisdom for Modern Living',
    dateLabel: 'Date and time is TBD',
    format: 'Live',
    summary:
      'Discover how Ayurveda can bring balance, health, and vitality into your daily life with guidance from a live Ayurvedic doctor from India.',
    about: [
      'Join us for a special live session with an experienced Ayurvedic Doctor from India, where you’ll be introduced to the timeless principles of Ayurveda, the science of life and holistic healing. In this session, you will learn how Ayurveda views health, disease, and balance, and explore practical ways to apply its wisdom in your everyday routine.',
    ],
    gains: [
      'An introduction to the foundations of Ayurveda and the three doshas (Vata, Pitta, Kapha)',
      'Insights into how diet, lifestyle, and daily rituals influence your overall well-being',
      'Simple tips to restore balance and harmony in body and mind',
      'Guidance on natural ways to boost immunity, energy, and mental clarity',
    ],
    href: 'https://www.avanayoga.co.uk/event-details/healing-with-ayurveda-ancient-wisdom-for-modern-living',
    cta: 'RSVP',
    image: { src: '/media/retreats/goa/ayurveda-herbs.jpg', alt: 'Dried Ayurvedic herbs and flowers with a wooden mortar and pestle' },
  },
  {
    slug: 'the-roots-of-yoga-a-journey-through-history-philosophy',
    title: 'The Roots of Yoga: A Journey Through History & Philosophy',
    dateLabel: 'Date and time is TBD',
    format: 'Live Online',
    summary: 'Step back in time and discover the origins of yoga.',
    about: [
      'Step back in time and discover the origins of yoga. In this workshop, we’ll explore how yoga evolved from the wisdom of the Vedas, Upanishads, and Bhagavad Gita to the classical system of Patanjali and beyond. You’ll gain a clear understanding of the six Indian philosophies, the birth of Hatha Yoga, and how yoga travelled into the modern world. Perfect for students and teachers who wish to deepen their practice with authentic knowledge.',
    ],
    tickets: [{ type: 'General Admission', price: '£9.99', fee: '+£0.25 ticket service fee', status: 'Sale ended' }],
    status: 'Registration is closed',
    href: 'https://www.avanayoga.co.uk/event-details/the-roots-of-yoga-a-journey-through-history-philosophy',
    cta: 'See other events',
    image: { src: '/media/posters/the-origin-end.webp', alt: 'Concentric rings in sand spreading across mountain ranges around a seated meditator' },
  },
];
