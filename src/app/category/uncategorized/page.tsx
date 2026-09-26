import { JournalIndex } from '@/components/templates/JournalIndex';
import { archivePage, archivePageCount } from '@/lib/journal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Avanayoga: Articles',
  description: 'All Avana Yoga journal articles, newest first.',
  path: '/category/uncategorized/',
  image: '/media/og/origin.jpg',
});

export default function CategoryPage() {
  return (
    <JournalIndex
      posts={archivePage(1)}
      eyebrow="Category"
      title="Avanayoga"
      path="/category/uncategorized/"
      showFeature={false}
      pagination={{ current: 1, total: archivePageCount, basePath: '/category/uncategorized/' }}
    />
  );
}
