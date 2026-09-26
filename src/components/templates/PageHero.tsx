import type { ReactNode } from 'react';
import { RevealText } from '@/components/motion/RevealText';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  size?: 'xl' | 'l';
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/** Typographic opening used by quieter pages (legal, forms, journal). */
export function PageHero({ eyebrow, title, lede, size = 'xl', children, className, titleClassName }: PageHeroProps) {
  return (
    <section data-nav-theme="light" className={cn('px-page pb-(--space-block) pt-[calc(var(--nav-h)+clamp(4rem,12vh,9rem))]', className)}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <RevealText as="h1" trigger="load" className={cn(size === 'xl' ? 'type-xl' : 'type-l', eyebrow ? 'mt-6' : null, 'max-w-[15ch]', titleClassName)}>
        {title}
      </RevealText>
      {lede ? <div className="type-body-l mt-10 max-w-[58ch] text-ink/75">{lede}</div> : null}
      {children}
    </section>
  );
}
