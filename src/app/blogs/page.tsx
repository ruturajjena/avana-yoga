import { JournalIndex } from '@/components/templates/JournalIndex';
import { posts } from '@/lib/journal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Journal: Blog & News',
  description: 'Articles from Avana Yoga on meditation, yoga philosophy, Ayurveda, teacher training and retreats.',
  path: '/blogs/',
  image: '/media/og/origin.jpg',
});

export default function BlogsPage() {
  return (
    <JournalIndex
      posts={posts}
      eyebrow="Blog & News"
      title="The Journal"
      path="/blogs/"
      lede="Reflections on meditation, yoga philosophy, Ayurveda, teacher training and retreats."
    />
  );
}
