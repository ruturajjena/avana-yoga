import { EventList } from '@/components/events/EventList';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { CtaButton } from '@/components/ui/CtaButton';
import { events } from '@/data/events';
import { home } from '@/data/home';
import { photos } from '@/data/media';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Events: Workshops & Community Gatherings',
  description: home.offer.items[2].text,
  path: '/events/',
  image: '/media/og/community.jpg',
});

export default function EventsPage() {
  return (
    <>
      <section data-nav-theme="light" aria-labelledby="events-title" className="px-page pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]">
        <p className="eyebrow">Community</p>
        <RevealText as="h1" id="events-title" trigger="load" className="type-mega mt-6">
          Events
        </RevealText>
        <div className="grid-page mt-10">
          <p className="type-lede col-span-4 text-ink/80 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">{home.offer.items[2].text}</p>
        </div>
      </section>

      <div className="px-page pt-14" data-nav-theme="light">
        <EditorialImage
          src={photos.communityCircle.src}
          alt={photos.communityCircle.alt}
          position={photos.communityCircle.position}
          sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
          className="aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
          reveal="horizon"
          revealOn="load"
          delay={0.25}
          parallax={6}
          priority
        />
      </div>

      <section data-nav-theme="light" aria-label="Events" className="px-page py-(--space-section)">
        <EventList events={events} />
        <div className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-ink/70">Events are booked on Avana Yoga’s events page, where new dates are published.</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <CtaButton href={site.forms.eventRsvp} label="Reserve your place" />
            <ArrowLink href={site.links.eventsSite}>All events</ArrowLink>
          </div>
        </div>
      </section>

      <ClosingCall
        cta={{ label: 'Get in touch', href: '/contact/' }}
        links={[
          { label: 'Courses', href: '/courses/' },
          { label: 'Retreats', href: '/yoga-retreats/' },
        ]}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Events', path: '/events/' },
        ])}
      />
    </>
  );
}
