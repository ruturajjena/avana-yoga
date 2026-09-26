import { EditorialImage } from '@/components/motion/EditorialImage';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { HoverList } from '@/components/ui/HoverList';
import { site } from '@/data/site';
import { coverFor, type PostSummary } from '@/lib/journal';
import { breadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { PageHero } from './PageHero';

type Pagination = { current: number; total: number; basePath: string };

type JournalIndexProps = {
  posts: PostSummary[];
  title: string;
  eyebrow: string;
  path: string;
  lede?: string;
  pagination?: Pagination;
  showFeature?: boolean;
  startIndex?: number;
};

export function JournalIndex({ posts, title, eyebrow, path, lede, pagination, showFeature = true, startIndex = 1 }: JournalIndexProps) {
  const [feature, ...rest] = posts;
  const listed = showFeature ? rest : posts;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />

      {showFeature && feature ? <FeaturePost post={feature} /> : null}

      <section className="px-page pb-(--space-section)" data-nav-theme="light" aria-label="Articles">
        <HoverList
          size="s"
          startIndex={showFeature ? startIndex + 1 : startIndex}
          items={listed.map((post) => ({
            href: `/${post.slug}/`,
            title: post.title,
            eyebrow: formatDate(post.published),
            meta: `${post.readingMinutes} min`,
            image: coverFor(post),
          }))}
        />
        {pagination ? <PaginationNav {...pagination} /> : null}
      </section>

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${site.name} Journal`,
            url: `${site.url}${path}`,
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.published,
              url: `${site.url}/${post.slug}/`,
            })),
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: title, path },
          ]),
        ]}
      />
    </>
  );
}

function FeaturePost({ post }: { post: PostSummary }) {
  const cover = coverFor(post);
  return (
    <section className="px-page pb-(--space-block)" data-nav-theme="light" aria-label="Latest article">
      <TransitionLink href={`/${post.slug}/`} className="group grid-page items-end gap-y-8 border-t border-(--line) pt-10" data-cursor="Read">
        <EditorialImage
          src={cover.src}
          alt=""
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="col-span-4 aspect-[4/3] md:col-span-8 lg:col-span-7 lg:aspect-[16/10]"
          reveal="up"
          revealOn="load"
          delay={0.2}
          priority
        />
        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-ink/65">
            Latest · <time dateTime={post.published}>{formatDate(post.published)}</time>
          </p>
          <h2 className="type-m mt-5">
            <span className="link-underline">{post.title}</span>
          </h2>
          {post.excerpt ? <p className="mt-6 text-ink/75">{post.excerpt}</p> : null}
          <span className="arrow-link eyebrow mt-8 inline-flex items-center gap-3">
            Read article
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </TransitionLink>
    </section>
  );
}

function PaginationNav({ current, total, basePath }: Pagination) {
  const hrefFor = (page: number) => (page === 1 ? basePath : `${basePath}page/${page}/`);
  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-between gap-6">
      <div>{current > 1 ? <ArrowLink href={hrefFor(current - 1)}>Newer articles</ArrowLink> : null}</div>
      <ol className="flex items-center gap-2">
        {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <TransitionLink
              href={hrefFor(page)}
              aria-current={page === current ? 'page' : undefined}
              className={`eyebrow grid size-11 place-items-center border ${page === current ? 'border-ink bg-ink text-cream' : 'border-(--line) hover:border-ink'}`}
            >
              {page}
            </TransitionLink>
          </li>
        ))}
      </ol>
      <div>{current < total ? <ArrowLink href={hrefFor(current + 1)}>Older articles</ArrowLink> : null}</div>
    </nav>
  );
}
