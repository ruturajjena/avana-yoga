/**
 * Homepage copy — verbatim from avanayoga.com/ (crawl 2026-09-11), arranged into the narrative in
 * docs/ANIMATION-SYSTEM.md §8. The only editorial additions are the film chapter labels, which name what
 * each film shows or quote classical sources; they make no claims about the business.
 */
import { photos } from './media';
import { site } from './site';

export const whyAvana = {
  heading: 'Why Avana Yoga?',
  pillars: [
    {
      title: 'Experienced Yoga Teacher Trainers',
      text: 'Our teachers carry decades of experience and deep personal practice. Yogi Madhav holds a Master’s degree in Yoga and Meditation and has led teacher training programmes internationally since 2012. All lead teachers are Yoga Alliance E-RYT 500 registered.',
      image: photos.studioCircle,
    },
    {
      title: 'Continually Updated Training Material',
      text: 'Our curriculum is rooted in classical texts: the Yoga Sutras, the Hatha Pradipika and the Bhagavad Gita, while remaining clear, accessible, and relevant to modern students. We review and refine our materials regularly to ensure the deepest, most meaningful learning experience.',
      image: photos.satsangCircle,
    },
    {
      title: 'Ongoing Post Graduation Support',
      text: 'Your journey does not end at graduation. We offer continued guidance, community, and CPD opportunities to support you as your teaching evolves, because at Avana Yoga, we believe the real practice begins after training.',
      image: photos.graduationEmbrace,
    },
  ],
};

export const home = {
  seo: {
    title: 'Avana Yoga: Yoga Courses, Teacher Training & Retreats in the UK',
    description:
      'Yoga as it was always meant to be. Yoga Alliance accredited teacher trainings, retreats and events rooted in the classical traditions of India, across the UK, India and internationally.',
  },
  hero: {
    eyebrow: 'Ancient Wisdom. Modern Life',
    title: ['Yoga as it was', 'always meant to be'],
    subline: 'Rooted in the classical traditions of India. Shared with the world.',
    cta: { label: 'Enroll Now', href: site.links.enroll },
  },
  philosophy: {
    eyebrow: 'About Avana Yoga',
    heading: 'Where Ancient Wisdom Meets the Modern World',
    // Live copy, with the client's em dashes replaced by commas (2026-09).
    text: 'Avana Yoga carries the living wisdom of India’s ancient yoga tradition, from the Yoga Sutras of Patanjali to the teachings of the Bhagavad Gita, into the heart of modern life.',
    cta: { label: 'Read More', href: '/about/' },
  },
  presence: {
    text: 'Our programmes are offered across the UK, India, and internationally for those who seek yoga in its truest, deepest form.',
    places: ['United Kingdom', 'India', 'International'],
    primary: photos.madhavForestWide,
    secondary: photos.tilakBlessing,
  },
  offer: {
    eyebrow: 'Our Services',
    heading: 'What We Offer',
    items: [
      {
        title: 'Courses',
        text: 'Yoga Alliance accredited 200 and 300-hour Teacher Trainings, rooted in classical Indian philosophy and guided by experienced E-RYT 500 teachers.',
        href: '/courses/',
        image: photos.graduatesGroup,
      },
      {
        title: 'Retreats',
        text: 'Immersive retreats in Austria, India, UK, and beyond where daily yoga, pranayama, and meditation meet the stillness of extraordinary natural landscapes.',
        href: '/yoga-retreats/',
        image: {
          src: '/media/retreats/austria/meadow-group-practice.jpg',
          alt: 'Group yoga practice on a meadow surrounded by forested mountains',
          width: 1024,
          height: 768,
        },
      },
      {
        title: 'Events',
        text: 'Workshops and community gatherings for students and teachers to deepen their practice, connect with others, and explore yoga together.',
        href: '/events/',
        image: photos.communityCircle,
      },
    ],
    cta: 'Read More',
  },
  transformation: { lines: ['We are not a fitness school.', 'We are a school of transformation.'] },
  training: { eyebrow: 'Our Courses', heading: 'Yoga Teacher Training', cta: { label: 'View More', href: '/courses/' }, image: photos.circleLaughter },
  testimonials: { eyebrow: 'Testimonials', heading: 'What Our Students Say', image: photos.studentJoy },
  retreats: { eyebrow: 'Upcoming Yoga Retreat', heading: 'Retreats', cta: 'Learn More' },
  closing: {
    eyebrow: 'Ready for transformation?',
    lines: ['Your journey', 'begins here.'],
    image: photos.graduatesJoy,
    cta: { label: 'Enroll Now', href: site.links.enroll },
  },
};
