import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { site } from '@/data/site';
import { coverFor, relatedPosts, type Post } from '@/lib/journal';
import { breadcrumbSchema, organizationId } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { JournalCard } from './JournalCard';

export function JournalPost({ post }: { post: Post }) {
  const cover = coverFor(post);
  const related = relatedPosts(post.slug);
  const html = post.html.replace(/<img /g, '<img loading="lazy" decoding="async" ');

  return (
    <article>
      <header className="px-page pt-[calc(var(--nav-h)+clamp(3rem,10vh,7rem))]" data-nav-theme="light">
        <div className="grid-page">
          <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
            <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/70">
              <TransitionLink href="/blogs/">
                <span className="link-underline">Journal</span>
              </TransitionLink>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
            <RevealText as="h1" trigger="load" className="type-l mt-8 max-w-[20ch]">
              {post.title}
            </RevealText>
          </div>
        </div>
        <EditorialImage
          src={cover.src}
          alt={cover.alt}
          sizes="100vw"
          className="mt-14 aspect-[4/3] md:aspect-[16/9] lg:mt-20 lg:aspect-[21/9]"
          reveal="horizon"
          revealOn="load"
          delay={0.25}
          priority
        />
      </header>

      <div className="px-page py-(--space-block) lg:py-(--space-section)">
        <div className="grid-page gap-y-10">
          <aside className="col-span-4 md:col-span-8 lg:col-span-2 lg:col-start-2">
            <div className="grid gap-4 lg:sticky lg:top-32">
              <ArrowLink href="/blogs/">All articles</ArrowLink>
            </div>
          </aside>
          <div className="prose-avana col-span-4 md:col-span-7 md:col-start-1 lg:col-span-7 lg:col-start-4" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      <section className="border-t border-(--line) px-page py-(--space-section)" data-nav-theme="light" aria-labelledby="related-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="related-title" className="type-m">
            Continue reading
          </h2>
          <ArrowLink href="/blogs/">The journal</ArrowLink>
        </div>
        <ul className="mt-14 grid gap-14 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <JournalCard post={item} />
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description || post.excerpt,
            datePublished: post.published,
            dateModified: post.modified || post.published,
            image: `${site.url}${cover.src}`,
            author: { '@id': organizationId },
            publisher: { '@id': organizationId },
            mainEntityOfPage: `${site.url}/${post.slug}/`,
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blogs/' },
            { name: post.title, path: `/${post.slug}/` },
          ]),
        ]}
      />
    </article>
  );
}
