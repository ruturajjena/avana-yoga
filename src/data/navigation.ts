export type NavChild = { label: string; href: string; meta: string };
export type NavItem = { label: string; href: string; children?: NavChild[]; external?: boolean };

/** Mirrors the live `menubar` (Courses ▾, Retreats ▾, Contact) + Events and About per the brief. */
export const primaryNav: NavItem[] = [
  {
    label: 'Courses',
    href: '/courses/',
    children: [
      { label: '200 Hour Yoga Teacher Training', href: '/200-hour-yoga-teacher-training/', meta: 'Hatha & Vinyasa · Rhyl, Wales' },
      { label: '300 Hour Yoga Teacher Training', href: '/300-hour-yoga-teacher-training/', meta: 'Advanced · Chester UK & India' },
      { label: '50 Hour Yin Yoga Teacher Training', href: '/50-hour-yin-yttc/', meta: 'Yin · Chester UK' },
      { label: 'Continuing Education', href: '/continuing-education/', meta: 'CPD · Chester UK' },
    ],
  },
  {
    label: 'Retreats',
    href: '/yoga-retreats/',
    children: [
      { label: 'Austria Retreat', href: '/austria-retreat/', meta: 'Yoga & Hiking · Austrian Alps' },
      { label: 'Goa Retreat', href: '/goa-retreat/', meta: 'Yoga & Ayurveda · Goa, India' },
    ],
  },
  { label: 'Events', href: '/events/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  /** Two footer columns. The quick links are the client's chosen five, in this order (2026-09). */
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events/' },
    { label: 'Retreats', href: '/yoga-retreats/' },
    { label: 'Books', href: '/books/' },
    { label: 'School Login', href: 'https://school.avanayoga.com/portal-login.html', external: true },
  ],
  courses: [
    { label: '200 Hour Yoga Teacher Training', href: '/200-hour-yoga-teacher-training/' },
    { label: '300 Hour Yoga Teacher Training', href: '/300-hour-yoga-teacher-training/' },
    { label: '50 Hour Yin Yoga Teacher Training', href: '/50-hour-yin-yttc/' },
    { label: 'Continuing Education', href: '/continuing-education/' },
  ],
  legal: [
    { label: 'Terms and conditions', href: '/terms-and-conditions/' },
    { label: 'Privacy policy', href: '/privacy-policy/' },
  ],
};
