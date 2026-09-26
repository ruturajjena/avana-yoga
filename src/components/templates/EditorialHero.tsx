import type { ReactNode } from 'react';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { ScrollVideo } from '@/components/motion/ScrollVideo';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { BreathSection } from '@/components/webgl/BreathSection';
import { films } from '@/data/films';
import type { Film } from '@/lib/types';
import { cn } from '@/lib/utils';

type HeroMedia = { kind: 'photo'; src: string; alt: string; position?: string } | { kind: 'film'; film: Film['id'] };

type EditorialHeroProps = {
  eyebrow: string;
  title: string[];
  lede?: ReactNode;
  actions?: ReactNode;
  /** Parent pages between Home and this page. */
  crumbs?: { label: string; href: string }[];
  media?: HeroMedia;
  breath?: 'ripples' | 'seed' | 'mandala';
  size?: 'mega' | 'xl';
  id?: string;
};

/** Typographic page opening shared by the secondary pages: masked title lines, optional still or scrubbed film beneath. */
export function EditorialHero({ eyebrow, title, lede, actions, crumbs, media, breath, size = 'xl', id = 'page-title' }: EditorialHeroProps) {
  const lastIndex = title.length - 1;
  const content = (
    <>
      {crumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="eyebrow flex flex-wrap items-center gap-x-3 text-ink/65 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center">
            {[{ label: 'Home', href: '/' }, ...crumbs].map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <TransitionLink href={crumb.href}>
                  <span className="link-underline">{crumb.label}</span>
                </TransitionLink>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={id} className={cn('mt-6', size === 'mega' ? 'type-mega' : 'type-xl')} aria-label={title.join(' ')}>
        {title.map((line, index) => (
          <RevealText
            key={line}
            as="span"
            trigger="load"
            delay={index * 0.08}
            className={cn('block', title.length > 1 && index === lastIndex && 'pl-[7vw] italic')}
          >
            {line}
          </RevealText>
        ))}
      </h1>
      {lede || actions ? (
        <div className="grid-page mt-10">
          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">
            {lede ? <div className="type-lede text-ink/80">{lede}</div> : null}
            {actions ? <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">{actions}</div> : null}
          </div>
        </div>
      ) : null}
    </>
  );

  const shell = 'px-page pb-(--space-block) pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]';

  return (
    <>
      {breath ? (
        <BreathSection state={breath} center={[0.8, 0.36]} data-nav-theme="light" aria-labelledby={id} className={shell}>
          {content}
        </BreathSection>
      ) : (
        <section data-nav-theme="light" aria-labelledby={id} className={shell}>
          {content}
        </section>
      )}

      {media?.kind === 'photo' ? (
        <div className="px-page pb-(--space-block)" data-nav-theme="light">
          <EditorialImage
            src={media.src}
            alt={media.alt}
            position={media.position}
            sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
            className="aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
            reveal="horizon"
            revealOn="load"
            delay={0.25}
            parallax={6}
            priority
          />
        </div>
      ) : null}
      {media?.kind === 'film' ? (
        <div className="px-page pb-(--space-block)" data-nav-theme="dark">
          <ScrollVideo
            film={films[media.film]}
            start="top 85%"
            end="bottom top"
            className="aspect-[4/5] w-full md:aspect-[16/9] lg:aspect-[21/9]"
            sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
            portrait={false}
            priority
          />
        </div>
      ) : null}
    </>
  );
}
