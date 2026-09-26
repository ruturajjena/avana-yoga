import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JournalIndex } from '@/components/templates/JournalIndex';
import { POSTS_PER_PAGE, archivePage, archivePageCount } from '@/lib/journal';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ n: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: archivePageCount - 1 }, (_, index) => ({ n: String(index + 2) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { n } = await params;
  return buildMetadata({
    title: `Avanayoga: Articles, page ${n}`,
    description: 'All Avana Yoga journal articles, newest first.',
    path: `/category/uncategorized/page/${n}/`,
    image: '/media/og/origin.jpg',
  });
}

export default async function CategoryArchivePage({ params }: Params) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > archivePageCount) notFound();
  return (
    <JournalIndex
      posts={archivePage(page)}
      eyebrow={`Category · Page ${page}`}
      title="Avanayoga"
      path={`/category/uncategorized/page/${page}/`}
      showFeature={false}
      startIndex={(page - 1) * POSTS_PER_PAGE + 1}
      pagination={{ current: page, total: archivePageCount, basePath: '/category/uncategorized/' }}
    />
  );
}
