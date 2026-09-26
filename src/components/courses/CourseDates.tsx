'use client';

import { useEffect, useState } from 'react';
import type { CourseSession } from '@/data/courses';
import { cn, padIndex } from '@/lib/utils';

/**
 * Today's date, read on the client so a statically built page never shows a stale "registration closed".
 * Null during server render and first paint: nothing is claimed until the real date is known.
 */
function useToday() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const set = () => setToday(new Date().toISOString().slice(0, 10));
    set();
    // A tab left open overnight picks up the new day.
    const timer = window.setInterval(set, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);
  return today;
}

const hasPassed = (session: CourseSession, today: string | null) => Boolean(today && session.date < today);

/** True when every dated session has passed. */
export function allSessionsPassed(items: CourseSession[], today: string | null) {
  return Boolean(today) && items.length > 0 && items.every((item) => hasPassed(item, today));
}

/** The dated sessions. Any weekend already past is marked, and reads as closed to screen readers. */
export function CourseDates({ items, className }: { items: CourseSession[]; className?: string }) {
  const today = useToday();
  return (
    <ol className={cn('mt-8 border-t border-(--line)', className)}>
      {items.map((item, index) => {
        const passed = hasPassed(item, today);
        return (
          <li
            key={item.date}
            className={cn('flex items-baseline gap-5 border-b border-(--line) py-4', passed && 'text-ink/45')}
          >
            <span className="eyebrow nums-old opacity-55">{padIndex(index + 1)}</span>
            <span className={cn('font-display text-[1.35rem] leading-tight', passed && 'line-through decoration-ink/30')}>{item.label}</span>
            {passed ? <span className="eyebrow ml-auto shrink-0 text-ink/50">Registration closed</span> : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Sits beside the apply button. It says nothing while places remain, and only once every dated
 * session has passed does it say registration has closed.
 */
export function RegistrationNotice({ items, tone = 'light', className }: { items: CourseSession[]; tone?: 'light' | 'dark'; className?: string }) {
  const today = useToday();
  if (!allSessionsPassed(items, today)) return null;
  return (
    <p className={cn('eyebrow', tone === 'dark' ? 'text-cream/70' : 'text-ink/60', className)}>Registration closed for these dates</p>
  );
}
