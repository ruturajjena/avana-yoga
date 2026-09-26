import type { MetadataRoute } from 'next';
import { courseList } from '@/data/courses';
import { retreatList } from '@/data/retreats';
import { site } from '@/data/site';
import { archivePageCount, canonicalOverrides, posts } from '@/lib/journal';
import { landingSlugs } from '@/lib/landing';

type Frequency = MetadataRoute.Sitemap[number]['changeFrequency'];

/** Every indexable URL. Excluded: /downloads/ and /thank-you/ (noindex), /blog/ (canonical → /blogs/), duplicate posts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: Frequency = 'monthly', lastModified: Date | string = now) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/about/', 0.8),
    entry('/courses/', 0.9, 'weekly'),
    ...courseList.map((course) => entry(course.href, 0.9, 'weekly')),
    entry('/yoga-retreats/', 0.8, 'weekly'),
    ...retreatList.map((retreat) => entry(retreat.href, 0.8, 'weekly')),
    entry('/events/', 0.7, 'weekly'),
    entry('/contact/', 0.7),
    ...[
      '/yoga-classes/',
      '/books/',
      '/yogi-madhav/',
      '/yoga-therapy/',
      '/pranayama/',
      '/registration-form/',
    ].map((path) => entry(path, 0.6)),
    entry('/blogs/', 0.6, 'weekly'),
    entry('/category/uncategorized/', 0.3, 'weekly'),
    ...Array.from({ length: Math.max(archivePageCount - 1, 0) }, (_, index) => entry(`/category/uncategorized/page/${index + 2}/`, 0.2, 'weekly')),
    ...landingSlugs.map((slug) => entry(`/${slug}/`, 0.5)),
    ...posts.filter((post) => !canonicalOverrides[post.slug]).map((post) => entry(`/${post.slug}/`, 0.5, 'yearly', post.published)),
    entry('/privacy-policy/', 0.2, 'yearly'),
    entry('/terms-and-conditions/', 0.2, 'yearly'),
  ];
}
