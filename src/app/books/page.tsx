import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { CtaButton } from '@/components/ui/CtaButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { booksPage as page } from '@/data/pages';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { cn, padIndex } from '@/lib/utils';

export const metadata = buildMetadata({ ...page.seo, absoluteTitle: true, path: '/books/', image: '/media/og/origin.jpg' });

export default function BooksPage() {
  return (
    <>
      <BreathSection
        state="seed"
        center={[0.72, 0.5]}
        data-nav-theme="light"
        aria-labelledby="books-title"
        className="px-page pb-(--space-section) pt-[calc(var(--nav-h)+clamp(3rem,9vh,7rem))]"
      >
        <div className="grid-page items-center gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="eyebrow">{page.hero.eyebrow}</p>
            <h1 id="books-title" className="type-xl mt-6" aria-label={page.hero.title.join(' ')}>
              {page.hero.title.map((line, index) => (
                <RevealText key={line} as="span" trigger="load" delay={index * 0.1} className={cn('block', index === 1 && 'italic')}>
                  {line}
                </RevealText>
              ))}
            </h1>
            <p className="type-s mt-10 italic">{page.hero.lede}</p>
            <p className="mt-4 max-w-[40ch] text-ink/75">{page.hero.text}</p>
            <CtaButton href={page.hero.cta.href} label={page.hero.cta.label} className="mt-10" />
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <div className="grid grid-cols-2 items-start gap-(--gutter)">
              {page.items.map((book, index) => (
                <EditorialImage
                  key={book.title}
                  src={book.cover.src}
                  alt={book.cover.alt}
                  ratio="5 / 7"
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  reveal="up"
                  revealOn="load"
                  delay={0.2 + index * 0.15}
                  priority
                  className={index === 1 ? 'mt-[22%]' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </BreathSection>

      <section data-nav-theme="light" aria-labelledby="the-books-title" className="px-page pb-(--space-section)">
        <div className="border-t border-(--line) pt-(--space-block)">
          <SectionHeading id="the-books-title" eyebrow={page.intro.eyebrow} title={page.intro.text} size="l" titleClassName="max-w-[20ch]" />
        </div>
        {page.items.map((book, index) => (
          <article key={book.title} aria-labelledby={`book-${index}`} className="grid-page items-center gap-y-10 border-b border-(--line) py-(--space-block)">
            <div className={cn('col-span-3 md:col-span-3 lg:col-span-3 lg:row-start-1', index % 2 === 1 ? 'lg:col-start-9' : 'lg:col-start-2')}>
              <EditorialImage src={book.cover.src} alt={book.cover.alt} ratio="5 / 7" sizes="(min-width: 1024px) 22vw, 60vw" parallax={4} />
            </div>
            <div className={cn('col-span-4 md:col-span-5 lg:col-span-6 lg:row-start-1', index % 2 === 1 ? 'lg:col-start-2' : 'lg:col-start-6')}>
              <p className="eyebrow flex items-center gap-4 text-ink/70">
                <span className="nums-old">{padIndex(index + 1)}</span>
                <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
                <span>Yogi Madhav</span>
              </p>
              <h2 id={`book-${index}`} className="type-l mt-5">
                {book.title}
              </h2>
              <p className="mt-4 font-display text-[1.6rem] italic leading-snug text-ink/80">{book.subtitle}</p>
              <p className="type-body-l mt-6 text-ink/75">{book.text}</p>
              <CtaButton href={book.href} label="View on Amazon" className="mt-8" srSuffix={`: ${book.title}`} />
            </div>
          </article>
        ))}
      </section>

      <section data-nav-theme="dark" aria-labelledby="beyond-title" className="bg-ink px-page py-(--space-section) text-cream">
        <p className="eyebrow">{page.beyond.eyebrow}</p>
        <RevealText as="h2" id="beyond-title" className="type-l mt-6 max-w-[16ch]">
          {page.beyond.heading}
        </RevealText>
        <p className="type-lede mt-8 max-w-[40ch] text-cream/80">{page.beyond.text.join(' ')}</p>
        <ul className="mt-16 grid gap-x-(--gutter) md:grid-cols-3">
          {page.beyond.items.map((item) => (
            <li key={item.title} className="border-t border-(--line-dark) pb-8 pt-8">
              <h3 className="type-m">{item.title}</h3>
              <p className="mt-4 max-w-[34ch] text-cream/75">{item.text}</p>
              <ArrowLink href={item.href} className="mt-8">
                {item.label}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          ...page.items.map((book) => ({
            '@context': 'https://schema.org',
            '@type': 'Book',
            name: book.title,
            alternativeHeadline: book.subtitle,
            description: book.text,
            author: { '@type': 'Person', name: 'Yogi Madhav' },
            image: `${site.url}${book.cover.src}`,
            url: book.href,
          })),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Books', path: '/books/' },
          ]),
        ]}
      />
    </>
  );
}
