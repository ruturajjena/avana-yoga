import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { FactList } from '@/components/ui/FactList';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { home } from '@/data/home';
import { retreatList } from '@/data/retreats';
import { DestinationReveal } from './DestinationReveal';

/**
 * 06 · Retreats — two destinations with two different arrivals:
 * Austria opens from the horizon line (alpine, expansive); Goa rises like a tide (coastal, restorative).
 * Server-rendered; motion comes from the small DestinationReveal client shell.
 */
export function RetreatsStack() {
  return (
    <DestinationReveal id="retreats" data-nav-theme="dark" aria-labelledby="retreats-title" className="bg-ink text-cream">
      <div className="px-page pb-14 pt-(--space-section)">
        <SectionHeading id="retreats-title" index="06" eyebrow={home.retreats.eyebrow} title={home.retreats.heading} size="xl" />
      </div>

      {retreatList.map((retreat) => (
        <article
          key={retreat.slug}
          data-destination={retreat.mood}
          aria-labelledby={`destination-${retreat.slug}`}
          className="relative flex min-h-svh items-end overflow-hidden lg:min-h-[112svh]"
        >
          <TransitionLink href={retreat.href} tabIndex={-1} aria-hidden="true" data-cursor="Enter" className="absolute inset-0 block">
            <div data-destination-media="" className="absolute inset-0">
              <Image
                src={retreat.media.hero.src}
                alt={retreat.media.hero.alt}
                fill
                sizes="(orientation: portrait) 400vw, 100vw"
                quality={70}
                className="object-cover"
                style={retreat.media.hero.position ? { objectPosition: retreat.media.hero.position } : undefined}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(28_36_31/0.88)_0%,rgb(28_36_31/0.35)_52%,rgb(28_36_31/0.12)_100%)]" />
            </div>
          </TransitionLink>

          <div data-destination-copy="" className="pointer-events-none relative z-10 w-full px-page pb-[10svh]">
            <p className="eyebrow">{retreat.region}</p>
            <h3 id={`destination-${retreat.slug}`} className="type-mega mt-6">
              {retreat.destination}
            </h3>
            <div className="grid-page mt-8 items-end gap-y-8">
              <p className="type-lede col-span-4 max-w-[26ch] text-cream/90 md:col-span-4 lg:col-span-4">{retreat.title}</p>
              <FactList
                tone="dark"
                className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7"
                facts={[
                  { label: 'Status', value: retreat.status },
                  { label: 'Duration', value: retreat.duration },
                  { label: 'From', value: `${retreat.fromPrice} pp` },
                ]}
              />
            </div>
            <ArrowLink href={retreat.href} className="pointer-events-auto mt-10">
              {home.retreats.cta}
              <span className="sr-only"> about the {retreat.title}</span>
            </ArrowLink>
          </div>
        </article>
      ))}
    </DestinationReveal>
  );
}
