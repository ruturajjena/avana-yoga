import type { ReactNode } from 'react';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { cn, isExternalHref } from '@/lib/utils';

type ArrowLinkProps = { href: string; children: ReactNode; className?: string; external?: boolean };

export function ArrowLink({ href, children, className, external }: ArrowLinkProps) {
  const isExternal = external ?? isExternalHref(href);
  const opensTab = isExternal && /^https?:/.test(href);
  const classes = cn('arrow-link eyebrow inline-flex min-h-11 items-center gap-3', className);
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <span aria-hidden="true" className={cn('arrow inline-block', opensTab && 'arrow--diag')}>
        {opensTab ? '↗' : '→'}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} {...(opensTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
        {opensTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={classes}>
      {inner}
    </TransitionLink>
  );
}
