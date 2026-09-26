import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorialLanding } from '@/components/templates/EditorialLanding';
import { JournalPost } from '@/components/templates/JournalPost';
import { canonicalOverrides, coverFor, getPost, postSlugs, stripBrandSuffix } from '@/lib/journal';
import { getLanding, isLandingSlug, landingSlugs } from '@/lib/landing';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

/** Root-level WordPress URLs: 38 journal posts and 11 SEO landing pages, all statically generated. */
export const dynamicParams = false;

/** Two live landing pages share one <title>; the Chester UK variant gets its own (keyword intent kept). */
const LANDING_TITLES: Record<string, string> = {
  '200-hour-yoga-teacher-training-course-landing-page': '200 Hour Yoga Teacher Training Course in Chester UK, Get Certified',
};

export function generateStaticParams() {
  return [...postSlugs, ...landingSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  if (isLandingSlug(slug)) {
    const page = await getLanding(slug);
    if (!page) return {};
    const image = slug.includes('retreat') ? (slug.includes('india') ? '/media/og/goa.jpg' : '/media/og/austria.jpg') : '/media/og/training.jpg';
    return buildMetadata({
      title: LANDING_TITLES[slug] ?? stripBrandSuffix(page.legacyTitle),
      description: page.legacyDescription,
      path: `/${slug}/`,
      image,
    });
  }

  const post = await getPost(slug);
  if (!post) return {};
  const cover = coverFor(post);
  return buildMetadata({
    title: stripBrandSuffix(post.seoTitle || post.title),
    description: post.description || post.excerpt,
    path: `/${slug}/`,
    canonical: canonicalOverrides[slug],
    type: 'article',
    publishedTime: post.published,
    modifiedTime: post.modified || post.published,
    image: cover.src,
    imageAlt: cover.alt,
  });
}

export default async function RootSlugPage({ params }: Params) {
  const { slug } = await params;

  if (isLandingSlug(slug)) {
    const page = await getLanding(slug);
    if (!page) notFound();
    return <EditorialLanding page={page} />;
  }

  const post = await getPost(slug);
  if (!post) notFound();
  return <JournalPost post={post} />;
}
