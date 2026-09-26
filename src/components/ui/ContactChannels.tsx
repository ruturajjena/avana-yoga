import { site } from '@/data/site';
import { cn } from '@/lib/utils';

/** WhatsApp mark redrawn in the site's 1.25 px line language: a speech bubble carrying a handset. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4.2 19.8l1.1-3.9A8.2 8.2 0 1 1 8.4 19z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9.2 7.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3-.1.5.3.6.8 1.2 1.3 1.6.5.4 1 .7 1.6.9.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.3.4.5 0 .6-.2 1.1-.6 1.5-.5.4-1.2.6-1.9.5-1.1-.2-2.3-.8-3.4-1.8-1.1-1-1.9-2.1-2.3-3.1-.3-.9-.2-1.9.3-2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

/** An envelope with a bindu on its seal. */
export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.25" y="5.75" width="17.5" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.9 6.6l7 5.6a1.8 1.8 0 0 0 2.2 0l7-5.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="15.3" r="0.95" fill="currentColor" />
    </svg>
  );
}

type Channel = {
  key: 'whatsapp' | 'email';
  eyebrow: string;
  title: [string, string];
  value: string;
  href: string;
  external: boolean;
  Icon: typeof WhatsAppIcon;
};

const CHANNELS: Channel[] = [
  {
    key: 'whatsapp',
    eyebrow: 'On WhatsApp',
    title: ['WhatsApp', 'us'],
    value: site.whatsapp.display,
    href: site.whatsapp.href,
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    key: 'email',
    eyebrow: 'By email',
    title: ['Email', 'us'],
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    Icon: MailIcon,
  },
];

/**
 * WhatsApp and email as two premium cards. The icon sits in a ring (the brand ring); on hover or focus a warm
 * glow rises from it, ripples spread outward, the ring fills and the arrow moves on. Links are unchanged:
 * WhatsApp opens wa.me in a new tab, email opens the mail app.
 */
export function ContactChannels({ tone = 'light', layout = 'row', className }: { tone?: 'light' | 'dark'; layout?: 'row' | 'stack'; className?: string }) {
  return (
    <ul className={cn('grid gap-4 md:gap-5', layout === 'row' ? 'md:grid-cols-2' : 'grid-cols-1', className)}>
      {CHANNELS.map(({ key, eyebrow, title, value, href, external, Icon }) => (
        <li key={key} className="flex">
          <a
            href={href}
            className="channel"
            data-tone={tone}
            data-channel={key}
            data-no-transition=""
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span aria-hidden="true" className="channel__glow" />
            <span className="channel__top">
              <span className="channel__mark">
                <span aria-hidden="true" className="channel__ripple" />
                <span aria-hidden="true" className="channel__ripple" />
                <span aria-hidden="true" className="channel__ripple" />
                <Icon className="channel__icon" />
              </span>
              <span aria-hidden="true" className="channel__arrow">
                ↗
              </span>
            </span>
            <span className="channel__eyebrow eyebrow">{eyebrow}</span>
            <span className="channel__title">
              {title[0]} <em>{title[1]}</em>
            </span>
            <span className="channel__value">{value}</span>
            {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Compact WhatsApp + email links that sit beside a booking call to action (retreat closing sections).
 * Same ring-and-ripple language as the channel cards, sized to sit next to the lotus button.
 */
export function ContactQuickLinks({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <ul aria-label="Ask us directly" className={cn('flex flex-wrap items-center justify-center gap-x-7 gap-y-4', className)}>
      {CHANNELS.map(({ key, value, href, external, Icon }) => (
        <li key={key}>
          <a
            href={href}
            className="quick"
            data-tone={tone}
            data-channel={key}
            data-no-transition=""
            title={value}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="quick__mark">
              <span aria-hidden="true" className="quick__ripple" />
              <span aria-hidden="true" className="quick__ripple" />
              <Icon className="quick__icon" />
            </span>
            <span className="quick__text">
              <span className="quick__eyebrow eyebrow">{key === 'whatsapp' ? 'Ask on' : 'Ask by'}</span>
              <span className="quick__label">{key === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
            </span>
            {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
