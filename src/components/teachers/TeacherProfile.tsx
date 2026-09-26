import { RevealText } from '@/components/motion/RevealText';
import { Portrait } from '@/components/ui/Portrait';
import type { BioVariant, Teacher } from '@/data/teachers';
import { cn, padIndex } from '@/lib/utils';
import { bioFor, portraitPosition } from './TeacherDetails';

type TeacherProfileProps = {
  teacher: Teacher;
  index: number;
  variant?: BioVariant;
  flip?: boolean;
  headingLevel?: 'h2' | 'h3';
  eyebrow?: string;
};

/** Full editorial profile: the portrait in the ring, credentials as hairline rows, the complete biography. */
export function TeacherProfile({ teacher, index, variant, flip = false, headingLevel = 'h3', eyebrow }: TeacherProfileProps) {
  const paragraphs = bioFor(teacher, variant);
  const usesVariant = Boolean(variant && teacher.variants?.[variant]);
  const headingId = `teacher-${teacher.slug}`;

  return (
    <article aria-labelledby={headingId} className="grid-page items-start gap-y-12 border-t border-(--line) py-(--space-block)">
      <div className={cn('col-span-4 md:col-span-3 lg:col-span-4 lg:self-stretch', flip ? 'lg:col-start-9 lg:row-start-1' : 'lg:col-start-1')}>
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+5vh)]">
          <Portrait
            src={teacher.portrait.src}
            alt={teacher.portrait.alt}
            position={portraitPosition(teacher.slug)}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 34vw, 72vw"
            className="mx-auto w-[72%] md:w-full"
          />
        </div>
      </div>

      <div className={cn('col-span-4 md:col-span-5 md:col-start-4 lg:col-span-6 lg:row-start-1', flip ? 'lg:col-start-2' : 'lg:col-start-6')}>
        <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/70">
          <span className="nums-old">{padIndex(index)}</span>
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
          <span>{eyebrow ?? teacher.discipline}</span>
        </p>
        <RevealText as={headingLevel} id={headingId} className="type-l mt-6">
          {teacher.fullName}
        </RevealText>

        <ul className="mt-10 grid border-t border-(--line) sm:grid-cols-2 sm:gap-x-8" aria-label={`${teacher.name} at a glance`}>
          {teacher.highlights.map((highlight) => (
            <li key={highlight} className="border-b border-(--line) py-4 text-[0.95rem] leading-snug text-charcoal">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="prose-avana mt-10 max-w-[64ch]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {!usesVariant && teacher.certifications ? (
          <div className="mt-10">
            <h4 className="eyebrow text-ink/65">Certifications</h4>
            <ul className="mt-5 grid gap-2.5 text-[0.98rem] text-charcoal">
              {teacher.certifications.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-current opacity-50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
