import type { ReactNode } from 'react';
import { RevealText } from '@/components/motion/RevealText';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'l' | 'm' | 's';
  id?: string;
  className?: string;
  titleClassName?: string;
  lede?: ReactNode;
  align?: 'left' | 'center';
  trigger?: 'scroll' | 'load';
};

const SIZE = { xl: 'type-xl', l: 'type-l', m: 'type-m', s: 'type-s' } as const;

export function SectionHeading({
  index,
  eyebrow,
  title,
  as = 'h2',
  size = 'm',
  id,
  className,
  titleClassName,
  lede,
  align = 'left',
  trigger = 'scroll',
}: SectionHeadingProps) {
  const hasMeta = Boolean(index || eyebrow);
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {hasMeta ? (
        <p className={cn('eyebrow flex items-center gap-4', align === 'center' && 'justify-center')}>
          {index ? <span className="nums-old">{index}</span> : null}
          {index && eyebrow ? <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" /> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      ) : null}
      <RevealText as={as} id={id} trigger={trigger} className={cn(SIZE[size], hasMeta && 'mt-6', titleClassName)}>
        {title}
      </RevealText>
      {lede ? <div className={cn('type-body-l mt-8 max-w-[58ch] opacity-80', align === 'center' && 'mx-auto')}>{lede}</div> : null}
    </div>
  );
}
