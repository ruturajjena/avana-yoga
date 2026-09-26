import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type LandingBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'features'; items: { title: string; text: string }[] }
  | { type: 'faq'; items: { q: string; a: string[] }[] }
  | { type: 'cta'; label: string; href: string };

export type LandingPage = {
  slug: string;
  legacyTitle: string;
  legacyDescription: string;
  blocks: LandingBlock[];
  legacyImages?: string[];
};

/** The 11 long-form SEO pages published on avanayoga.com, preserved at their live URLs. */
export const landingSlugs = [
  '200-hour-yoga-teacher-training-course-landing-page',
  '200-hour-yoga-teacher-training-course',
  '300-hour-yoga-teacher-training-course',
  'yoga-instructor-certificate-courses',
  'yoga-instructor-certification',
  'yoga-teacher-training-course',
  'yoga-teacher-training-courses-in-the-uk',
  'yoga-teacher-training-courses-in-india',
  'yoga-retreats-in-india',
  'yoga-retreats-in-the-uk',
  'yoga-and-meditation-retreats-europe',
] as const;

export const isLandingSlug = (slug: string) => (landingSlugs as readonly string[]).includes(slug);

export async function getLanding(slug: string): Promise<LandingPage | null> {
  if (!isLandingSlug(slug)) return null;
  const file = path.join(process.cwd(), 'src', 'content', 'landing', `${slug}.json`);
  return JSON.parse(await readFile(file, 'utf8')) as LandingPage;
}
