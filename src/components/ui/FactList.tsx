import { cn } from '@/lib/utils';

export type Fact = { label: string; value: string; note?: string };

type FactListProps = { facts: Fact[]; tone?: 'light' | 'dark'; className?: string };

/** Key facts as a hairline strip: stacked pairs on mobile, one row of equal columns on desktop. */
export function FactList({ facts, tone = 'light', className }: FactListProps) {
  const rule = tone === 'dark' ? 'border-(--line-dark)' : 'border-(--line)';
  return (
    <dl className={cn('grid grid-cols-2 border-t md:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none', rule, className)}>
      {facts.map((fact) => (
        <div key={fact.label} className={cn('border-b py-5 pr-4 lg:border-b-0 lg:border-l lg:px-6 lg:py-6 lg:first:border-l-0 lg:first:pl-0', rule)}>
          <dt className="eyebrow opacity-65">{fact.label}</dt>
          <dd className="mt-3 font-display text-[clamp(1.2rem,1.55vw,1.55rem)] leading-tight">
            {fact.value}
            {fact.note ? <span className="mt-1 block font-sans text-sm opacity-70">{fact.note}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
