import { readFile } from 'node:fs/promises';
import path from 'node:path';
import index from '@/content/posts-index.json';

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  published: string;
  image: string | null;
  excerpt: string;
  readingMinutes: number;
};

export type Post = PostSummary & { seoTitle: string; modified: string; html: string };

/** All 38 published posts, newest first (same order as the WordPress archive). */
export const posts = index as PostSummary[];
export const postSlugs = posts.map((post) => post.slug);
export const isPostSlug = (slug: string) => postSlugs.includes(slug);

export async function getPost(slug: string): Promise<Post | null> {
  if (!isPostSlug(slug)) return null;
  const file = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.json`);
  return JSON.parse(await readFile(file, 'utf8')) as Post;
}

export const POSTS_PER_PAGE = 10;
export const archivePageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
export const archivePage = (page: number) => posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

/** The live site publishes this article twice; the duplicate points search engines at the original. */
export const canonicalOverrides: Record<string, string> = {
  'experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga-2': '/experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga/',
};

const COVER_RULES: { test: RegExp; src: string; alt: string }[] = [
  { test: /austria/, src: '/media/retreats/austria/meadow-savasana.jpg', alt: 'Guests resting on an alpine meadow in Austria' },
  { test: /india|goa/, src: '/media/retreats/goa/sunset-meditation-solo.jpg', alt: 'Meditating on a hillside at sunset in Goa' },
  { test: /-uk|in-the-uk/, src: '/media/posters/the-origin-end.jpg', alt: 'Concentric rings in sand spreading across a mountain landscape' },
  { test: /retreat/, src: '/media/retreats/goa/misty-meditation.jpg', alt: 'Meditating on a hilltop above morning mist' },
  { test: /teacher|certif|instructor|alliance|course/, src: '/media/images/ttc-graduates-joy.jpg', alt: 'Avana Yoga teacher training graduates celebrating with their certificates' },
  { test: /online/, src: '/media/images/ttc-students-seated.jpg', alt: 'Students seated in meditation in the studio' },
  { test: /mind|bliss|self|harmony|stress|clarity|happiness|mat/, src: '/media/images/madhav-meditation-forest-close.jpg', alt: 'Seated meditation in a forest' },
];

export function coverFor(post: PostSummary): { src: string; alt: string } {
  if (post.image) return { src: post.image, alt: post.title };
  const rule = COVER_RULES.find((candidate) => candidate.test.test(post.slug));
  return rule ? { src: rule.src, alt: rule.alt } : { src: '/media/posters/the-transformation-still.jpg', alt: 'An abstract figure formed from ink on sand' };
}

export function relatedPosts(slug: string, count = 3) {
  const position = posts.findIndex((post) => post.slug === slug);
  const ordered = [...posts.slice(position + 1), ...posts.slice(0, Math.max(position, 0))];
  return ordered.filter((post) => post.slug !== slug).slice(0, count);
}

export const stripBrandSuffix = (title: string) => title.replace(/\s*[-|–]\s*Avana Yoga\s*$/i, '').trim();
