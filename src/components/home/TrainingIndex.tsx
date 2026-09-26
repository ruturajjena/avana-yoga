import { EditorialImage } from '@/components/motion/EditorialImage';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { HoverList } from '@/components/ui/HoverList';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courseList } from '@/data/courses';
import { home } from '@/data/home';

/** 04 · Teaching — the trainings as an editorial index with a floating documentary preview. */
export function TrainingIndex() {
  const { training } = home;
  return (
    <section id="training" data-nav-theme="light" aria-labelledby="training-title" className="px-page py-(--space-section)">
      <div className="grid-page gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionHeading id="training-title" index="04" eyebrow={training.eyebrow} title={training.heading} size="l" titleClassName="max-w-[10ch]" />
          <EditorialImage
            src={training.image.src}
            alt={training.image.alt}
            position={training.image.position}
            ratio="2 / 3"
            sizes="(min-width: 1024px) 28vw, 1px"
            parallax={6}
            className="mt-16 hidden w-[82%] lg:block"
          />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:pt-[18vh]">
          <HoverList
            size="l"
            items={courseList.map((course) => ({
              href: course.href,
              title: course.title,
              eyebrow: course.listing.meta,
              image: { src: course.listing.image.src, alt: course.listing.image.alt },
            }))}
          />
          <ArrowLink href={training.cta.href} className="mt-12">
            {training.cta.label}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
