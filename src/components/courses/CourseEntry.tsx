import { EditorialImage } from '@/components/motion/EditorialImage';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { ArrowLink } from '@/components/ui/ArrowLink';
import type { Course } from '@/data/courses';
import { cn, padIndex } from '@/lib/utils';

type CourseEntryProps = { course: Course; index: number; flip?: boolean };

/** A course on the /courses/ hub: documentary image, published description, one clear way in. No card chrome. */
export function CourseEntry({ course, index, flip = false }: CourseEntryProps) {
  const { listing } = course;
  const headingId = `course-${course.slug}`;
  return (
    <article aria-labelledby={headingId} className="grid-page items-center gap-y-10 border-t border-(--line) py-(--space-block)">
      <TransitionLink
        href={course.href}
        tabIndex={-1}
        aria-hidden="true"
        data-cursor="View"
        className={cn('col-span-4 block md:col-span-8 lg:col-span-6', flip && 'lg:col-start-7 lg:row-start-1')}
      >
        <EditorialImage
          src={listing.image.src}
          alt=""
          position={listing.image.position}
          ratio="4 / 3"
          sizes="(min-width: 1024px) 48vw, 100vw"
          parallax={5}
        />
      </TransitionLink>
      <div className={cn('col-span-4 md:col-span-8 lg:col-span-5 lg:row-start-1', flip ? 'lg:col-start-1' : 'lg:col-start-8')}>
        <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-ink/70">
          <span className="nums-old">{padIndex(index)}</span>
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
          <span>{listing.meta}</span>
        </p>
        <h2 id={headingId} className="type-l mt-6">
          <TransitionLink href={course.href}>
            <span className="link-underline">{listing.heading}</span>
          </TransitionLink>
        </h2>
        <div className="mt-6 grid gap-4 text-ink/75">
          {listing.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ArrowLink href={course.href} className="mt-8">
          Learn More
          <span className="sr-only"> about the {course.title}</span>
        </ArrowLink>
      </div>
    </article>
  );
}
