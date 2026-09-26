import Image from 'next/image';
import type { BioVariant, Teacher, TeacherSlug } from '@/data/teachers';

/** Face-safe crops for the square portrait frames. */
const PORTRAIT_POSITION: Partial<Record<TeacherSlug, string>> = {
  helen: '50% 24%',
  leena: '52% 30%',
  sudhir: '50% 32%',
  matt: '50% 30%',
  madhav: '50% 36%',
  prabhakar: '46% 34%',
};

export const portraitPosition = (slug: TeacherSlug) => PORTRAIT_POSITION[slug] ?? '50% 40%';

/** The biography a page publishes: a page-specific variant when one exists, otherwise the full bio. */
export function bioFor(teacher: Teacher, variant?: BioVariant) {
  return (variant && teacher.variants?.[variant]) || teacher.bio;
}

type TeacherDetailsProps = { teacher: Teacher; variant?: BioVariant };

/** Full profile body used inside the teacher sheet. */
export function TeacherDetails({ teacher, variant }: TeacherDetailsProps) {
  const usesVariant = Boolean(variant && teacher.variants?.[variant]);
  const paragraphs = bioFor(teacher, variant);

  return (
    <div className="mt-10 grid gap-12">
      <div data-sheet-item="" className="flex items-center gap-6">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-sand md:size-36">
          <Image
            src={teacher.portrait.src}
            alt={teacher.portrait.alt}
            fill
            sizes="144px"
            className="scale-[1.07] object-cover"
            style={{ objectPosition: portraitPosition(teacher.slug) }}
          />
        </div>
        <p className="eyebrow max-w-[24ch] leading-relaxed text-ink/70">{teacher.discipline}</p>
      </div>

      <ul data-sheet-item="" className="border-t border-(--line)" aria-label={`${teacher.name} at a glance`}>
        {teacher.highlights.map((highlight) => (
          <li key={highlight} className="border-b border-(--line) py-4 font-display text-[1.3rem] leading-snug md:text-[1.45rem]">
            {highlight}
          </li>
        ))}
      </ul>

      <div data-sheet-item="" className="prose-avana">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {!usesVariant && teacher.certifications ? (
        <div data-sheet-item="">
          <h3 className="eyebrow text-ink/65">Certifications</h3>
          <ul className="mt-6 grid gap-2.5 text-[0.98rem] text-charcoal">
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
  );
}
