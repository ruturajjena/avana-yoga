import { EditorialImage } from '@/components/motion/EditorialImage';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { coverFor, type PostSummary } from '@/lib/journal';
import { formatDate } from '@/lib/utils';

export function JournalCard({ post, headingLevel = 'h3' }: { post: PostSummary; headingLevel?: 'h2' | 'h3' }) {
  const cover = coverFor(post);
  const Heading = headingLevel;
  return (
    <TransitionLink href={`/${post.slug}/`} className="group block">
      <EditorialImage src={cover.src} alt="" sizes="(min-width: 768px) 30vw, 100vw" ratio="4 / 3" reveal="up" />
      <p className="eyebrow mt-6 text-ink/65">
        <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readingMinutes} min read
      </p>
      <Heading className="type-s mt-3">
        <span className="link-underline">{post.title}</span>
      </Heading>
    </TransitionLink>
  );
}
