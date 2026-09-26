/**
 * Secondary pages — verbatim from avanayoga.com (crawl 2026-09-11):
 * /yoga-classes/, /books/, /yogi-madhav/, /pranayama/, /yoga-therapy/.
 * Editorial decisions (emoji removed, unlabeled lists grouped, dead buttons linked) are logged in
 * docs/CONTENT-AUDIT.md §11.
 */
import { books, photos } from './media';
import { site } from './site';

/* ───────────── /yoga-classes/ ───────────── */
export const yogaClasses = {
  seo: {
    title: 'Yoga Classes: Yoga for Everyone',
    description:
      'At Avana Yoga, we believe that yoga is for everyone, regardless of age, fitness level, or experience. Explore our class schedule and book your mat today.',
  },
  hero: { eyebrow: 'Yoga for Everyone', title: ['Yoga Classes'] },
  paragraphs: [
    'Discover the transformative power of yoga with our authentic teachers. At Avana Yoga, we believe that yoga is for everyone, regardless of age, fitness level, or experience. Our mission is to create a welcoming and inclusive space where you can embark on a journey to improved physical and mental well-being through the practice of yoga.',
    'Whether you’re looking to increase flexibility, reduce stress, improve strength, or simply find a moment of calm in your busy life, Avana Yoga is here to support you on your journey to well-being.',
    'Join us today and experience the profound benefits of yoga for yourself. No matter where you are on your path, we’re here to help you take the next step toward a healthier, happier you.',
    'Ready to start your yoga journey with us? Explore our class schedule and book your mat today!',
  ],
  cta: { label: 'Schedule & Booking', href: site.links.bookwhen },
  video: { src: 'https://vidpowr.net/embed/ajS2oStxlSTQsmG', title: 'Yoga classes with Avana Yoga' },
  image: photos.circleLaughter,
};

/* ───────────── /books/ ───────────── */
export const booksPage = {
  seo: {
    title: 'Yogi Madhav | Yoga, Meditation & Philosophy Books',
    description:
      'Explore books by Yogi Madhav on yoga, meditation and timeless wisdom, bringing ancient teachings into meaningful practice for modern life.',
  },
  hero: {
    eyebrow: 'New Release',
    title: ['Ancient Wisdom,', 'Timeless Stillness'],
    lede: 'Two books. One journey inward.',
    text: 'Explore meditation, yoga, philosophy and timeless teachings for the modern world.',
    cta: { label: 'Explore the books', href: site.links.booksStore },
  },
  intro: { eyebrow: 'The Books', text: 'Two journeys into meditation, yoga and timeless wisdom.' },
  items: [
    {
      title: 'Stillness in a Restless World',
      subtitle: 'Meditation from the Vedic Tradition to the Digital Age',
      text: 'An invitation to slow down, turn inward and rediscover the stillness that remains beneath the noise of modern life. Drawing from yogic wisdom and meditation, this book offers a practical path back to presence.',
      href: 'https://amzn.eu/d/07EZNOjp',
      cover: books.stillness,
    },
    {
      title: 'The Unbroken Thread',
      subtitle: 'Yoga’s Ancient Wisdom for the Modern World',
      text: 'A journey into the roots of yoga, exploring the philosophy, practices and timeless teachings that connect ancient wisdom with modern life.',
      href: 'https://amzn.eu/d/055AJQ0N',
      cover: books.unbrokenThread,
    },
  ],
  beyond: {
    eyebrow: 'Beyond the Books',
    heading: 'Bring the teachings into practice',
    text: ['Yoga, meditation and timeless wisdom are not simply ideas to be read,', 'but experiences to be lived.'],
    items: [
      { title: 'Study', text: 'Deepen your understanding of yoga, philosophy and meditation.', label: 'Explore courses', href: '/courses/' },
      { title: 'Practice', text: 'Move beyond reading and experience the teachings through practice.', label: 'Explore classes', href: '/yoga-classes/' },
      { title: 'Connect', text: 'Continue the journey through retreats, workshops and shared experiences.', label: 'Explore retreats', href: '/yoga-retreats/' },
    ],
  },
};

/* ───────────── /yogi-madhav/ ───────────── */
export const yogiMadhavPage = {
  seo: {
    title: 'Yogi Madhav: Yoga Teacher & Meditation Guide',
    description:
      'Yogi Madhav is a yoga teacher and meditation guide with a Master’s Degree in Yoga and Meditation, winner of the Himalaya Yoga Olympiad in 2008.',
  },
  hero: { eyebrow: 'Namaste!', label: 'About', title: 'Yogi Madhav' },
  image: photos.madhavForestWide,
};

/* ───────────── /pranayama/ ───────────── */
export const pranayamaSeries = {
  seo: {
    title: 'Pranayama: Beyond the Breath',
    description:
      'Pranayama is far more than breathing exercises. A three-day video series guiding you from healthy breathing into the classical pranayama of the Hatha Yoga tradition.',
  },
  hero: { eyebrow: 'Pranayama', title: ['Pranayama', 'Beyond the Breath'] },
  paragraphs: [
    'Pranayama is far more than breathing exercises. It is a profound yogic practice that works directly with prāṇa: the vital life force that sustains the body, mind, and consciousness. In this video series, Pranayama Beyond the Breath, you are guided step by step from the foundations of healthy breathing into the classical practices of pranayama as described in the Hatha Yoga tradition.',
    'This course begins with a clear understanding of basic breathing mechanics, posture, awareness, and preparation: essential elements often overlooked but crucial for a safe and effective pranayama practice. From there, the teachings gradually deepen into traditional pranayama techniques drawn from the Hatha Yoga Pradipika and classical Hatha Yoga texts, ensuring that the practices remain authentic, structured, and rooted in yogic wisdom.',
    'Each pranayama is explained not only as a technique, but as a process: how it affects the nervous system, energy channels (nāḍīs), mind, and inner awareness. Emphasis is placed on correct sequencing, preparation, contraindications, and the subtle shift from controlling the breath to observing and refining prāṇa.',
  ],
  suitable: {
    intro: 'This series is especially suitable for:',
    items: [
      'Yoga teachers and teacher-trainees',
      'Students who have recently completed training and wish to revise or deepen their understanding',
      'Dedicated practitioners who want to move beyond surface-level breathwork into traditional pranayama',
    ],
  },
  closingParagraphs: [
    'The videos are designed to be followed at your own pace, allowing time for reflection, practice, and integration. Rather than rushing toward advanced techniques, this course encourages patience, consistency, and respect for the body’s natural rhythm, honouring the traditional yogic approach where pranayama becomes a bridge between asana, meditation, and inner stillness.',
    'Pranayama Beyond the Breath is an invitation to return to the roots of yogic breathing, where awareness, discipline, and subtlety transform the breath into a tool for balance, clarity, and deeper self-understanding.',
  ],
  days: [
    { title: 'Day 1', src: 'https://vidpowr.net/embed/wnUQxsZGqf753yy' },
    { title: 'Day 2', src: 'https://vidpowr.net/embed/kq3YLnXlSoUgv4N' },
    { title: 'Day 3', src: 'https://vidpowr.net/embed/58frjEoIuY2D07q' },
  ],
  closing: 'Thank You',
};

/* ───────────── /yoga-therapy/ ───────────── */
export const yogaTherapy = {
  seo: {
    title: 'Yoga Therapy',
    description:
      'Yoga therapy is the process of empowering individuals to progress toward improved health and well-being through the application of the teachings and practices of Yoga.',
  },
  hero: { eyebrow: 'Yoga Therapy', title: ['Yoga Therapy'] },
  quote:
    'Yoga therapy is the process of empowering individuals to progress toward improved health and well-being through the application of the teachings and practices of Yoga.',
  paragraphs: [
    'Therapeutic yoga is an inherently holistic approach, simultaneously working on the body, mind, and spirit. Yoga therapy is rooted in the ancient practice of yoga, which originated thousands of years ago in India. Yoga therapy is a growing field and scientific evidence has begun to emphasize its efficacy. It is used to treat existing mental and physical health issues, but can also be used as a self-care strategy for prevention and maintenance.',
    'These days yoga therapy has become so popular, that many doctors are now supporting it. Various medical journals reveal research as to yoga’s multi-tiered benefits. Likewise those in the field of mental health often recommend yoga to clients or may even integrate aspects into their work.',
  ],
  conditions: {
    heading: 'Yoga Therapy can be used to treat:',
    groups: [
      {
        title: 'Mental Health Conditions',
        items: ['Autism', 'Post-Natal Depression', 'Eating Disorders', 'Addiction', 'Stress', 'Depression', 'Anxiety', 'PTSD', 'Schizophrenia', 'ADHD'],
      },
      {
        title: 'Physical Health Conditions',
        items: [
          'HIV',
          'Brain Injury',
          'Back Pain',
          'Musculoskeletal problems',
          'Diabetes',
          'High Blood Pressure',
          'Parkinson’s',
          'Asthma',
          'COPD',
          'Autoimmune Diseases',
          'IBS',
          'Obesity',
          'Heart Disease',
          'Insomnia',
          'Arthritis',
          'Osteoporosis',
          'Multiple Sclerosis',
          'Alzheimer’s',
          'Cancer',
        ],
      },
    ],
  },
  session: {
    heading: 'In a typical one-on-one yoga therapy session, you could expect:',
    items: [
      'A thorough intake inquiring into your medical history, along with your physical, mental, energetic, and spiritual needs.',
      'An analysis of your breath, posture, gait, and various yoga poses.',
      'Physical poses chosen and adapted for your needs.',
      'Breathing, meditation, and relaxation practice.',
      'Homework (yoga is like magic, but in order for the magic to work, you have to practice!)',
    ],
  },
  closing:
    'The number of people doing yoga, specifically for therapeutic reasons, is rising. More and more doctors and healthcare practitioners are recommending yoga to complement usual medical care.',
  form: { heading: 'Leave us a message' },
};
