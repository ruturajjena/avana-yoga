import { JournalIndex } from '@/components/templates/JournalIndex';
import { posts } from '@/lib/journal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Articles from Avana Yoga on meditation, yoga philosophy, Ayurveda, teacher training and retreats.',
  path: '/blog/',
  canonical: '/blogs/',
  image: '/media/og/origin.jpg',
});

export default function BlogPage() {
  return <JournalIndex posts={posts} eyebrow="Journal" title="Blog" path="/blog/" />;
}
