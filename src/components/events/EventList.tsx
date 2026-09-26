'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { CtaButton } from '@/components/ui/CtaButton';
import { Sheet } from '@/components/ui/Sheet';
import type { AvanaEvent } from '@/data/events';
import { cn, padIndex } from '@/lib/utils';

/** Editorial event listing. Each event opens its full details in a sheet; booking stays on the published event page. */
export function EventList({ events }: { events: AvanaEvent[] }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const current = events[selected] ?? events[0];

  if (!current) return null;

  return (
    <>
      <ol className="border-t border-(--line)">
        {events.map((event, index) => (
          <li key={event.slug} className="grid-page items-center gap-y-10 border-b border-(--line) py-(--space-block)">
            <div className={cn('col-span-4 md:col-span-8 lg:col-span-6', index % 2 === 1 && 'lg:col-start-7 lg:row-start-1')}>
              <EditorialImage src={event.image.src} alt={event.image.alt} ratio="4 / 3" sizes="(min-width: 1024px) 48vw, 100vw" parallax={5} />
            </div>
            <article
              aria-labelledby={`event-${event.slug}`}
              className={cn('col-span-4 md:col-span-8 lg:col-span-5 lg:row-start-1', index % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-8')}
            >
              <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/70">
                <span className="nums-old">{padIndex(index + 1)}</span>
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
                <span>{event.format}</span>
                <span aria-hidden="true">·</span>
                <span>{event.dateLabel}</span>
              </p>
              <h2 id={`event-${event.slug}`} className="type-l mt-6">
                {event.title}
              </h2>
              <p className="type-lede mt-6 text-ink/80">{event.summary}</p>
              {event.status ? <p className="eyebrow mt-6 text-error">{event.status}</p> : null}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  className="btn btn--ink"
                  onClick={() => {
                    setSelected(index);
                    setOpen(true);
                  }}
                >
                  View details
                  <span className="sr-only">: {event.title}</span>
                </button>
                <ArrowLink href={event.href}>
                  {event.cta}
                  <span className="sr-only">: {event.title}</span>
                </ArrowLink>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <Sheet open={open} onClose={close} eyebrow={`${current.format} · ${current.dateLabel}`} title={current.title}>
        <div className="mt-10 grid gap-10">
          <div data-sheet-item="" className="relative aspect-[16/10] overflow-hidden bg-sand">
            <Image src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 768px) 52rem, 100vw" className="object-cover" />
          </div>
          <div data-sheet-item="" className="prose-avana">
            {current.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {current.gains ? (
            <div data-sheet-item="">
              <h3 className="eyebrow text-ink/65">Session highlights</h3>
              <ul className="mt-5 border-t border-(--line)">
                {current.gains.map((gain) => (
                  <li key={gain} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-(--line) py-4 text-charcoal">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-3 bg-current opacity-50" />
                    <span>{gain}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {current.tickets ? (
            <div data-sheet-item="" className="overflow-x-auto">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <caption className="eyebrow pb-4 text-left text-ink/65">Tickets</caption>
                <thead>
                  <tr className="eyebrow text-ink/60">
                    <th scope="col" className="border-b border-(--line) py-3 font-medium">
                      Ticket type
                    </th>
                    <th scope="col" className="border-b border-(--line) py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="border-b border-(--line) py-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {current.tickets.map((ticket) => (
                    <tr key={ticket.type}>
                      <td className="border-b border-(--line) py-4 pr-4">{ticket.type}</td>
                      <td className="border-b border-(--line) py-4 pr-4">
                        {ticket.price}
                        <span className="block text-sm text-ink/65">{ticket.fee}</span>
                      </td>
                      <td className="border-b border-(--line) py-4">{ticket.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {current.status ? (
            <p data-sheet-item="" className="eyebrow text-error">
              {current.status}
            </p>
          ) : null}
          <div data-sheet-item="">
            <CtaButton href={current.href} label={current.cta} srSuffix={`: ${current.title}`} />
          </div>
        </div>
      </Sheet>
    </>
  );
}
