import { EditorialImage } from '@/components/motion/EditorialImage';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { FactList } from '@/components/ui/FactList';
import type { Retreat } from '@/data/retreats';
import { cn, padIndex } from '@/lib/utils';

/** A destination on the retreats hub. Austria opens from the horizon, Goa rises like a tide. */
export function RetreatEntry({ retreat, index, className }: { retreat: Retreat; index: number; className?: string }) {
  const alpine = retreat.mood === 'alpine';
  const headingId = `retreat-${retreat.slug}`;
  return (
    <article aria-labelledby={headingId} className={cn('flex flex-col', className)}>
      <TransitionLink href={retreat.href} tabIndex={-1} aria-hidden="true" data-cursor="Enter" className="block">
        <EditorialImage
          src={retreat.media.hero.src}
          alt=""
          position={retreat.media.hero.position}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 46vw, 100vw"
          reveal={alpine ? 'horizon' : 'up'}
          parallax={6}
        />
      </TransitionLink>
      <p className="eyebrow mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/70">
        <span className="nums-old">{padIndex(index)}</span>
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
        <span>{retreat.region}</span>
      </p>
      <h2 id={headingId} className="type-xl mt-5">
        <TransitionLink href={retreat.href}>
          <span className="link-underline">{retreat.destination}</span>
        </TransitionLink>
      </h2>
      <p className="type-lede mt-5 max-w-[28ch]">{retreat.title}</p>
      <p className="mt-5 max-w-[48ch] text-ink/75">{retreat.welcome.text}</p>
      <FactList
        className="mt-8"
        facts={[
          { label: 'Status', value: retreat.status },
          { label: 'Duration', value: retreat.duration },
          { label: 'From', value: `${retreat.fromPrice} pp` },
        ]}
      />
      <ArrowLink href={retreat.href} className="mt-8">
        Learn More
        <span className="sr-only"> about the {retreat.title}</span>
      </ArrowLink>
    </article>
  );
}
