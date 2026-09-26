import { CourseEntry } from '@/components/courses/CourseEntry';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { courseList } from '@/data/courses';
import { home } from '@/data/home';
import { photos } from '@/data/media';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata, itemListSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Courses: Yoga Teacher Training & CPD',
  description:
    'Yoga Alliance accredited 200 and 300-hour Teacher Trainings, a 50 hour Yin Yoga Teacher Training and Continuing Professional Development, rooted in classical Indian philosophy.',
  path: '/courses/',
  image: '/media/og/training.jpg',
});

export default function CoursesPage() {
  return (
    <>
      <section data-nav-theme="light" aria-labelledby="courses-title" className="px-page pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]">
        <p className="eyebrow">Courses</p>
        <RevealText as="h1" id="courses-title" trigger="load" className="type-mega mt-6">
          Our Courses
        </RevealText>
        <div className="grid-page mt-10">
          <p className="type-lede col-span-4 text-ink/80 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">{home.offer.items[0].text}</p>
        </div>
      </section>

      <div className="px-page pt-14" data-nav-theme="light">
        <EditorialImage
          src={photos.graduatesGroup.src}
          alt={photos.graduatesGroup.alt}
          position={photos.graduatesGroup.position}
          sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
          className="aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
          reveal="horizon"
          revealOn="load"
          delay={0.25}
          parallax={6}
          priority
        />
      </div>

      <section data-nav-theme="light" aria-label="Teacher trainings" className="px-page py-(--space-section)">
        {courseList.map((course, index) => (
          <CourseEntry key={course.slug} course={course} index={index + 1} flip={index % 2 === 1} />
        ))}
      </section>

      <ClosingCall
        eyebrow="Enroll Now"
        cta={{ label: 'Enroll Now', href: site.links.enroll }}
        links={[
          { label: 'Registration form', href: '/registration-form/' },
          { label: 'Contact us', href: '/contact/' },
        ]}
      />

      <JsonLd
        data={[
          itemListSchema(
            'Avana Yoga courses',
            courseList.map((course) => ({ name: course.title, path: course.href })),
          ),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses/' },
          ]),
        ]}
      />
    </>
  );
}
