import { RetreatPage } from '@/components/retreats/RetreatPage';
import { retreats } from '@/data/retreats';
import { buildMetadata } from '@/lib/seo';

const retreat = retreats['austria-retreat'];

export const metadata = buildMetadata({
  title: retreat.seo.title,
  description: retreat.seo.description,
  image: retreat.seo.image,
  imageAlt: retreat.media.hero.alt,
  path: retreat.href,
});

export default function Page() {
  return <RetreatPage retreat={retreat} />;
}
