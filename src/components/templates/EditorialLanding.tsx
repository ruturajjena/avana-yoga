import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { CtaButton } from '@/components/ui/CtaButton';
import { photos } from '@/data/media';
import { austriaPhotos, goaPhotos } from '@/data/retreats';
import type { LandingBlock, LandingPage } from '@/lib/landing';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';
import { padIndex } from '@/lib/utils';

type Link = { label: string; href: string };
type LandingContext = { eyebrow: string; image: { src: string; alt: string; position?: string }; related: Link[]; cta: Link };

const COURSES: Record<string, Link> = {
  ttc200: { label: '200 Hour Yoga Teacher Training', href: '/200-hour-yoga-teacher-training/' },
  ttc300: { label: '300 Hour Yoga Teacher Training', href: '/300-hour-yoga-teacher-training/' },
  yin: { label: '50 Hour Yin Yoga Teacher Training', href: '/50-hour-yin-yttc/' },
  cpd: { label: 'Continuing Education', href: '/continuing-education/' },
  all: { label: 'All courses', href: '/courses/' },
  austria: { label: 'Austria Retreat', href: '/austria-retreat/' },
  goa: { label: 'Goa Retreat', href: '/goa-retreat/' },
  retreats: { label: 'All retreats', href: '/yoga-retreats/' },
};

/** Imagery and internal links for each keyword page, chosen from the real photography. */
function contextFor(slug: string): LandingContext {
  if (slug.includes('retreats-in-india')) {
    return { eyebrow: 'Retreats · India', image: goaPhotos.sunsetMeditationSolo, related: [COURSES.goa, COURSES.retreats], cta: { label: 'Explore the Goa retreat', href: '/goa-retreat/' } };
  }
  if (slug.includes('retreats-europe')) {
    return { eyebrow: 'Retreats · Europe', image: austriaPhotos.meadowSavasana, related: [COURSES.austria, COURSES.retreats], cta: { label: 'Explore the Austria retreat', href: '/austria-retreat/' } };
  }
  if (slug.includes('retreats-in-the-uk')) {
    return {
      eyebrow: 'Retreats',
      image: { src: '/media/posters/the-origin-end.jpg', alt: 'Concentric rings in sand spreading across mountain ranges around a seated meditator' },
      related: [COURSES.retreats, COURSES.austria, COURSES.goa],
      cta: { label: 'Explore retreats', href: '/yoga-retreats/' },
    };
  }
  if (slug.includes('300-hour')) {
    return { eyebrow: 'Yoga Teacher Training', image: photos.graduationHandover, related: [COURSES.ttc300, COURSES.all], cta: { label: 'View the 300 Hour training', href: COURSES.ttc300.href } };
  }
  if (slug.includes('200-hour')) {
    return { eyebrow: 'Yoga Teacher Training', image: photos.graduatesJoy, related: [COURSES.ttc200, COURSES.all], cta: { label: 'View the 200 Hour training', href: COURSES.ttc200.href } };
  }
  if (slug.includes('india')) {
    return { eyebrow: 'Yoga Teacher Training · India', image: photos.tilakBlessing, related: [COURSES.ttc300, COURSES.all], cta: { label: 'Explore courses', href: '/courses/' } };
  }
  if (slug.includes('uk')) {
    return { eyebrow: 'Yoga Teacher Training · UK', image: photos.studioCircle, related: [COURSES.ttc200, COURSES.yin, COURSES.cpd], cta: { label: 'Explore courses', href: '/courses/' } };
  }
  return { eyebrow: 'Yoga Teacher Training', image: photos.graduationBlue, related: [COURSES.ttc200, COURSES.ttc300, COURSES.all], cta: { label: 'Explore courses', href: '/courses/' } };
}

/** Long-form SEO pages: their published copy set as a quiet, readable editorial column. */
export function EditorialLanding({ page }: { page: LandingPage }) {
  const context = contextFor(page.slug);
  const h1Index = page.blocks.findIndex((block) => block.type === 'heading' && block.level === 1);
  const titleIndex = h1Index >= 0 ? h1Index : 0;
  const titleBlock = page.blocks[titleIndex];
  const title = (titleBlock && 'text' in titleBlock ? titleBlock.text : page.legacyTitle).replace(/\bUk\b/, 'UK');
  const body = page.blocks.filter((_, index) => index !== titleIndex);
  const faqs = body.flatMap((block) => (block.type === 'faq' ? block.items.map((item) => ({ question: item.q, answer: item.a.join(' ') })) : []));
  const path = `/${page.slug}/`;

  return (
    <>
      <section data-nav-theme="light" aria-labelledby="landing-title" className="px-page pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="eyebrow flex flex-wrap items-center gap-x-3 text-ink/65 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center">
            <li>
              <TransitionLink href="/">
                <span className="link-underline">Home</span>
              </TransitionLink>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <TransitionLink href={context.related[context.related.length - 1].href}>
                <span className="link-underline">{context.related[context.related.length - 1].label}</span>
              </TransitionLink>
            </li>
          </ol>
        </nav>
        <p className="eyebrow">{context.eyebrow}</p>
        <RevealText as="h1" id="landing-title" trigger="load" className="type-xl mt-6 max-w-[16ch]">
          {title}
        </RevealText>
      </section>

      <div className="px-page pt-14" data-nav-theme="light">
        <EditorialImage
          src={context.image.src}
          alt={context.image.alt}
          position={context.image.position}
          sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
          className="aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
          reveal="horizon"
          revealOn="load"
          delay={0.25}
          parallax={6}
          priority
        />
      </div>

      <div className="px-page py-(--space-section)" data-nav-theme="light">
        <div className="grid-page gap-y-12">
          <aside aria-label="Related pages" className="col-span-4 md:col-span-8 lg:col-span-3">
            <div className="grid gap-5 lg:sticky lg:top-32">
              <p className="eyebrow text-ink/60">Related</p>
              <ul className="grid gap-3">
                {context.related.map((link) => (
                  <li key={link.href}>
                    <ArrowLink href={link.href}>{link.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <article className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-5">
            {body.map((block, index) => (
              <LandingBlockView key={index} block={block} />
            ))}
          </article>
        </div>
      </div>

      <ClosingCall
        cta={context.cta}
        links={[
          { label: 'Registration form', href: '/registration-form/' },
          { label: 'Contact', href: '/contact/' },
        ]}
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: title, path },
          ]),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />
    </>
  );
}

function LandingBlockView({ block }: { block: LandingBlock }) {
  switch (block.type) {
    case 'heading':
      if (block.level <= 2) {
        return <h2 className="type-m mt-20 border-t border-(--line) pt-10 first:mt-0 first:border-0 first:pt-0">{block.text}</h2>;
      }
      if (block.level === 3) return <h3 className="type-s mt-12">{block.text}</h3>;
      return <p className="eyebrow mt-8 text-ink/70">{block.text}</p>;
    case 'paragraph':
      return <p className="mt-6 text-[1.08rem] leading-[1.8] text-charcoal">{block.text}</p>;
    case 'list':
      return (
        <ul className="mt-8 border-t border-(--line)">
          {block.items.map((item) => (
            <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-(--line) py-3.5 text-charcoal">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-3 bg-current opacity-50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'features':
      return (
        <ol className="mt-10 grid gap-x-(--gutter) md:grid-cols-2">
          {block.items.map((item, index) => (
            <li key={item.title} className="border-t border-(--line) py-8">
              <span className="eyebrow nums-old opacity-55">{padIndex(index + 1)}</span>
              <h3 className="type-s mt-4">{item.title}</h3>
              <p className="mt-4 text-ink/75">{item.text}</p>
            </li>
          ))}
        </ol>
      );
    case 'faq':
      return (
        <Accordion
          className="mt-10"
          items={block.items.map((item) => ({
            question: item.q,
            answer: (
              <>
                {item.a.map((answer) => (
                  <p key={answer} className="mt-3 first:mt-0">
                    {answer}
                  </p>
                ))}
              </>
            ),
          }))}
        />
      );
    case 'cta':
      return (
        <div className="mt-10">
          <CtaButton href={block.href.startsWith('#') ? '/registration-form/' : block.href} label={block.label} />
        </div>
      );
    default:
      return null;
  }
}
