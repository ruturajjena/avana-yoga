import { TransitionLink } from '@/components/motion/TransitionProvider';
import { cn, isExternalHref } from '@/lib/utils';

type CtaButtonProps = { href: string; label: string; tone?: 'ink' | 'cream' | 'ghost-dark' | 'ghost-light'; className?: string; srSuffix?: string };

const TONE = {
  ink: 'btn--ink',
  cream: 'btn--cream',
  'ghost-dark': 'btn--ghost-dark',
  'ghost-light': 'btn--ghost-light',
} as const;

/** Rectangular button for conversion links: booking forms open in a new tab, mail links stay in place, internal links transition. */
export function CtaButton({ href, label, tone = 'ink', className, srSuffix }: CtaButtonProps) {
  const classes = cn('btn arrow-link', TONE[tone], className);
  const external = isExternalHref(href);
  const opensTab = /^https?:/.test(href);

  if (external) {
    return (
      <a href={href} className={classes} {...(opensTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <span>{label}</span>
        {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
        <span aria-hidden="true" className={cn('arrow inline-block', opensTab && 'arrow--diag')}>
          {opensTab ? '↗' : '→'}
        </span>
        {opensTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={classes}>
      <span>{label}</span>
      {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
      <span aria-hidden="true" className="arrow inline-block">
        →
      </span>
    </TransitionLink>
  );
}
