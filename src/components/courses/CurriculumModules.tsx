'use client';

import { useRef, useState } from 'react';
import type { CourseModule } from '@/data/courses';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { cn, padIndex } from '@/lib/utils';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);

/** Curriculum: a sticky module index on the left follows the reader through the modules on the right. */
export function CurriculumModules({ modules, className }: { modules: CourseModule[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const ids = modules.map((module, index) => `module-${index + 1}-${slugify(module.title)}`);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        el.querySelectorAll<HTMLElement>('[data-module]').forEach((module, index) => {
          ScrollTrigger.create({
            trigger: module,
            start: 'top 60%',
            end: 'bottom 60%',
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn('grid-page items-start gap-y-10', className)}>
      <nav aria-label="Modules" className="hidden self-stretch lg:col-span-4 lg:block">
        <ol className="sticky top-[calc(var(--nav-h)+8vh)] grid gap-1 border-l border-(--line)">
          {modules.map((module, index) => (
            <li key={module.title}>
              <a
                href={`#${ids[index]}`}
                aria-current={index === active ? 'location' : undefined}
                className={cn(
                  '-ml-px flex items-baseline gap-4 border-l py-2.5 pl-6 transition-[opacity,border-color] duration-500',
                  index === active ? 'border-ink opacity-100' : 'border-transparent opacity-45 hover:opacity-80',
                )}
              >
                <span className="eyebrow nums-old">{padIndex(index + 1)}</span>
                <span className="font-display text-[1.4rem] leading-tight">{module.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="col-span-4 grid gap-(--space-block) md:col-span-8 lg:col-span-7 lg:col-start-6">
        {modules.map((module, index) => (
          <article key={module.title} id={ids[index]} data-module="" aria-labelledby={`${ids[index]}-title`} className="border-t border-(--line) pt-8">
            <p className="eyebrow nums-old opacity-60">{padIndex(index + 1)}</p>
            <h3 id={`${ids[index]}-title`} className="type-m mt-4 max-w-[22ch]">
              {module.title}
            </h3>
            <ul className="mt-8 border-t border-(--line)">
              {module.items.map((item) => (
                <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b border-(--line) py-4 text-[1.02rem] leading-relaxed text-charcoal">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-3 bg-current opacity-50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
