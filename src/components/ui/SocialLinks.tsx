import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-8 gap-y-3', className)} aria-label="Avana Yoga on social media">
      {site.socials.map((social) => (
        <li key={social.href}>
          <a href={social.href} target="_blank" rel="noopener noreferrer" className="arrow-link eyebrow inline-flex min-h-11 items-center gap-2">
            <span className="link-underline">{social.label}</span>
            <span className="arrow arrow--diag inline-block" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
