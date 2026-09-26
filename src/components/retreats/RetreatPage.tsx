import { EditorialImage } from '@/components/motion/EditorialImage';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ContactQuickLinks } from '@/components/ui/ContactChannels';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { TeacherProfile } from '@/components/teachers/TeacherProfile';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ColumnGallery } from '@/components/ui/ColumnGallery';
import { CtaButton } from '@/components/ui/CtaButton';
import { DriftGallery } from '@/components/ui/DriftGallery';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { retreatList, type Retreat } from '@/data/retreats';
import { site } from '@/data/site';
import { teachers } from '@/data/teachers';
import { breadcrumbSchema, tripSchema } from '@/lib/seo';
import { cn, padIndex } from '@/lib/utils';
import { RetreatHero } from './RetreatHero';
import { StoryChapters, type StoryChapter } from './StoryChapters';

type SectionProps = { retreat: Retreat; canvas: string };

/**
 * Retreat template: destination → welcome → yoga / hiking / meditation → where, what, how you’ll feel →
 * what’s included → getting there → pricing → host → gallery → book.
 * Austria (alpine) and Goa (coastal) share structure but never treatment.
 */
export function RetreatPage({ retreat }: { retreat: Retreat }) {
  const alpine = retreat.mood === 'alpine';
  const canvas = alpine ? 'bg-alpine-mist' : 'bg-coast-sand';
  const other = retreatList.find((candidate) => candidate.slug !== retreat.slug) ?? retreat;
  const chapters: StoryChapter[] = [
    { key: 'where', label: 'Where you’ll be…', paragraphs: retreat.story.where, image: retreat.media.where[0], secondary: retreat.media.where[1] },
    { key: 'what', label: 'What you’ll do…', paragraphs: retreat.story.what, image: retreat.media.what[0], secondary: retreat.media.what[1] },
    { key: 'feel', label: 'How you’ll feel…', paragraphs: retreat.story.feel, image: retreat.media.feel },
  ];

  return (
    <>
      <RetreatHero retreat={retreat} />
      <RetreatWelcome retreat={retreat} canvas={canvas} />
      <RetreatPillars retreat={retreat} canvas={canvas} />
      <section id="experience" data-nav-theme="light" aria-labelledby="experience-title">
        <h2 id="experience-title" className="sr-only">
          Your retreat: where you’ll be, what you’ll do and how you’ll feel
        </h2>
        <StoryChapters chapters={chapters} mood={retreat.mood} />
      </section>
      <RetreatIncluded retreat={retreat} canvas={canvas} />
      <RetreatTravel retreat={retreat} canvas={canvas} />
      <RetreatPricing retreat={retreat} canvas={canvas} />
      <section id="host" data-nav-theme="light" aria-label={retreat.host.heading} className="px-page py-(--space-section)">
        <TeacherProfile
          teacher={teachers[retreat.host.teacher]}
          index={6}
          variant={retreat.host.variant}
          headingLevel="h2"
          eyebrow={retreat.host.heading}
        />
      </section>
      <section data-nav-theme="light" aria-labelledby="gallery-title" className={cn('overflow-hidden py-(--space-section)', canvas)}>
        <div className="px-page">
          <h2 id="gallery-title" className="eyebrow">
            {retreat.destination} · Gallery
          </h2>
        </div>
        {alpine ? (
          <ColumnGallery photos={retreat.media.gallery} label={`${retreat.title} photographs`} className="mt-12" />
        ) : (
          <DriftGallery photos={retreat.media.gallery} label={`${retreat.title} photographs`} className="mt-12" />
        )}
      </section>
      <RetreatClosing retreat={retreat} other={other} />
      <JsonLd
        data={[
          tripSchema(retreat),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Retreats', path: '/yoga-retreats/' },
            { name: retreat.title, path: retreat.href },
          ]),
        ]}
      />
    </>
  );
}

/* ───────────────────────── 01 · Welcome ───────────────────────── */
function RetreatWelcome({ retreat, canvas }: SectionProps) {
  const alpine = retreat.mood === 'alpine';
  const image = retreat.media.welcome;
  return (
    <section id="welcome" data-nav-theme="light" aria-labelledby="welcome-title" className={cn('px-page py-(--space-section)', canvas)}>
      <div className="grid-page items-center gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <SectionHeading id="welcome-title" index="01" eyebrow={retreat.welcome.eyebrow} title={retreat.welcome.heading} size="l" titleClassName="max-w-[16ch]" />
          <p className="type-lede mt-10 max-w-[40ch] text-ink/85">{retreat.welcome.text}</p>
        </div>
        <EditorialImage
          src={image.src}
          alt={image.alt}
          position={image.position}
          ratio={alpine ? '4 / 5' : '4 / 3'}
          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 70vw, 100vw"
          reveal={alpine ? 'horizon' : 'up'}
          parallax={alpine ? 8 : 4}
          className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </section>
  );
}

/* ───────────────────────── Pillars ───────────────────────── */
function RetreatPillars({ retreat, canvas }: SectionProps) {
  const alpine = retreat.mood === 'alpine';
  return (
    <section id="pillars" data-nav-theme="light" aria-labelledby="pillars-title" className={cn('px-page pb-(--space-section)', canvas)}>
      <h2 id="pillars-title" className="sr-only">
        {retreat.pillars.map((pillar) => pillar.title).join(', ')}
      </h2>
      {alpine ? (
        <ul className="grid gap-y-16 md:grid-cols-3 md:gap-x-(--gutter)">
          {retreat.pillars.map((pillar, index) => (
            <li key={pillar.title} className={cn(index === 1 && 'md:mt-[14vh]', index === 2 && 'md:mt-[6vh]')}>
              <EditorialImage
                src={pillar.image.src}
                alt={pillar.image.alt}
                position={pillar.image.position}
                ratio="3 / 4"
                sizes="(min-width: 768px) 30vw, 100vw"
                reveal="horizon"
                parallax={6}
              />
              <p className="eyebrow nums-old mt-8 opacity-60">{padIndex(index + 1)}</p>
              <h3 className="type-m mt-3">{pillar.title}</h3>
              <p className="mt-5 max-w-[36ch] text-ink/75">{pillar.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-y-(--space-block)">
          {retreat.pillars.map((pillar, index) => (
            <li key={pillar.title} className="grid items-center gap-8 border-t border-(--line) pt-10 md:grid-cols-12 md:gap-x-(--gutter)">
              <EditorialImage
                src={pillar.image.src}
                alt={pillar.image.alt}
                position={pillar.image.position}
                ratio="16 / 10"
                sizes="(min-width: 768px) 56vw, 100vw"
                reveal="up"
                parallax={4}
                className={cn('md:col-span-7', index % 2 === 1 && 'md:col-start-6 md:row-start-1')}
              />
              <div className={cn('md:col-span-4 md:row-start-1', index % 2 === 1 ? 'md:col-start-1' : 'md:col-start-9')}>
                <p className="eyebrow nums-old opacity-60">{padIndex(index + 1)}</p>
                <h3 className="type-m mt-3">{pillar.title}</h3>
                <p className="mt-5 text-ink/75">{pillar.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ───────────────────────── 03 · What’s included ───────────────────────── */
function RetreatIncluded({ retreat }: SectionProps) {
  return (
    <section id="included" data-nav-theme="light" aria-labelledby="included-title" className="px-page py-(--space-section)">
      <div className="grid-page gap-y-12">
        <SectionHeading
          id="included-title"
          index="03"
          eyebrow={retreat.duration}
          title="What’s Included"
          size="l"
          className="col-span-4 md:col-span-8 lg:col-span-4"
        />
        <ol className="col-span-4 border-t border-(--line) md:col-span-8 lg:col-span-8 lg:col-start-5">
          {retreat.included.map((item, index) => (
            <li key={item.title} className="grid gap-5 border-b border-(--line) py-8 md:grid-cols-[4rem_1fr_11rem] md:gap-x-8 md:py-10">
              <span className="eyebrow nums-old pt-2 opacity-55">{padIndex(index + 1)}</span>
              <div>
                <h3 className="type-m">{item.title}</h3>
                {item.text.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-[58ch] text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>
              {item.image ? (
                <EditorialImage
                  src={item.image.src}
                  alt={item.image.alt}
                  position={item.image.position}
                  ratio="4 / 3"
                  sizes="(min-width: 768px) 176px, 1px"
                  reveal="center"
                  className="hidden md:block"
                />
              ) : (
                <span aria-hidden="true" className="hidden md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── 04 · Getting there ───────────────────────── */
function RetreatTravel({ retreat, canvas }: SectionProps) {
  const alpine = retreat.mood === 'alpine';
  const travel = retreat.travel;
  return (
    <section id="travel" data-nav-theme="light" aria-labelledby="travel-title" className={cn('px-page py-(--space-section)', canvas)}>
      <div className="grid-page items-center gap-y-12">
        {travel.image ? (
          <EditorialImage
            src={travel.image.src}
            alt={travel.image.alt}
            position={travel.image.position}
            ratio={alpine ? '1 / 1' : '4 / 3'}
            sizes="(min-width: 1024px) 40vw, 100vw"
            reveal={alpine ? 'horizon' : 'up'}
            parallax={5}
            className="col-span-4 md:col-span-6 lg:col-span-5"
          />
        ) : null}
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <p className="eyebrow flex flex-wrap items-center gap-4">
            <span className="nums-old">04</span>
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
            <span>Getting there</span>
            {travel.included ? <span className="border border-current px-2.5 py-1 text-[0.62rem]">Included</span> : null}
          </p>
          <RevealText as="h2" id="travel-title" className="type-l mt-6">
            {travel.title}
          </RevealText>
          {travel.text.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink/75">
              {paragraph}
            </p>
          ))}
          <dl className="mt-10 grid border-t border-(--line) sm:grid-cols-2 sm:gap-x-(--gutter)">
            {travel.facts.map((fact) => (
              <div key={fact.label} className="border-b border-(--line) py-5">
                <dt className="eyebrow text-ink/60">{fact.label}</dt>
                <dd className="mt-2 font-display text-[1.4rem] leading-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 05 · Pricing ───────────────────────── */
function RetreatPricing({ retreat }: SectionProps) {
  const alpine = retreat.mood === 'alpine';
  const { booking } = retreat;
  return (
    <section
      id="booking"
      data-nav-theme="dark"
      aria-labelledby="booking-title"
      className={cn('px-page py-(--space-section) text-cream', alpine ? 'bg-alpine-pine' : 'bg-ink')}
    >
      <div className="grid-page gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionHeading id="booking-title" index="05" eyebrow="Pricing" title={booking.heading} size="l" />
          <p className="type-lede mt-8 text-cream/80">{booking.intro}</p>
          <ul className="mt-10 border-t border-(--line-dark)">
            {booking.terms.map((term) => (
              <li key={term} className="border-b border-(--line-dark) py-3.5 text-[0.98rem] text-cream/80">
                {term}
              </li>
            ))}
          </ul>
        </div>
        <ul className="col-span-4 grid gap-y-14 md:col-span-8 md:grid-cols-2 md:gap-x-(--gutter) lg:col-span-7 lg:col-start-6">
          {booking.packages.map((pkg) => (
            <li key={pkg.name} className="flex flex-col border-t border-cream/40 pt-8">
              <h3 className="eyebrow">{pkg.name}</h3>
              <p className="mt-6 font-display text-[clamp(4rem,8vw,7.5rem)] font-light leading-none tracking-[-0.03em]">{pkg.price}</p>
              <p className="mt-3 text-cream/70">{pkg.unit}</p>
              <p className="mt-6 max-w-[30ch] text-cream/85">{pkg.basis}</p>
              <p className="eyebrow mt-5 text-cream/70">{pkg.availability}</p>
              <CtaButton
                href={booking.href}
                label={booking.packageLabel}
                tone="cream"
                srSuffix={`: ${pkg.name}, ${pkg.price}, ${retreat.destination}`}
                className="mt-10 self-start"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── Book ───────────────────────── */
function RetreatClosing({ retreat, other }: { retreat: Retreat; other: Retreat }) {
  return (
    <BreathSection state="seed" center={[0.5, 0.4]} data-nav-theme="light" aria-labelledby="closing-title" className="px-page py-(--space-section)">
      <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
        <p className="eyebrow">
          {retreat.destination} · {retreat.status}
        </p>
        <RevealText as="h2" id="closing-title" className="type-xl mt-8">
          {retreat.closing.heading}
        </RevealText>
        <div className="mt-10 grid max-w-[58ch] gap-5 text-[1.05rem] leading-relaxed text-ink/75">
          {retreat.closing.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center gap-9 md:flex-row md:gap-12">
          <MagneticButton href={retreat.booking.href} size="lg">
            {retreat.closing.cta}
          </MagneticButton>
          <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
            <span aria-hidden="true" className="flex items-center gap-4 text-ink/45">
              <span className="h-px w-8 bg-current" />
              <span className="font-display text-[1.3rem] italic">or</span>
              <span className="h-px w-8 bg-current md:hidden" />
            </span>
            <ContactQuickLinks />
          </div>
        </div>
        <p className="mt-12 text-ink/70">
          {retreat.closing.question}{' '}
          <a href={`mailto:${site.email}`} className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            {site.email}
          </a>
        </p>
      </div>
      <div className="mt-(--space-section) flex flex-col items-start justify-between gap-6 border-t border-(--line) pt-10 md:flex-row md:items-center">
        <p className="eyebrow text-ink/60">Another destination</p>
        <ArrowLink href={other.href}>{other.title}</ArrowLink>
        <ArrowLink href="/yoga-retreats/">All retreats</ArrowLink>
      </div>
    </BreathSection>
  );
}
