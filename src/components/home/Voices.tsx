import { EditorialImage } from '@/components/motion/EditorialImage';
import { TestimonialStage } from '@/components/testimonials/TestimonialStage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { home } from '@/data/home';
import { homeTestimonials } from '@/data/testimonials';

/** 06 · Community — students’ own words, one voice at a time. */
export function Voices() {
  const { testimonials } = home;
  return (
    <section id="voices" data-nav-theme="dark" aria-labelledby="voices-title" className="bg-ink px-page py-(--space-section) text-cream">
      <div className="grid-page gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <SectionHeading id="voices-title" index="05" eyebrow={testimonials.eyebrow} title={testimonials.heading} size="m" titleClassName="max-w-[10ch]" />
          <EditorialImage
            src={testimonials.image.src}
            alt={testimonials.image.alt}
            position={testimonials.image.position}
            ratio="4 / 5"
            sizes="(min-width: 1024px) 20vw, 1px"
            reveal="up"
            className="mt-14 hidden w-[84%] lg:block"
          />
        </div>
        <TestimonialStage items={homeTestimonials} tone="dark" className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5" />
      </div>
    </section>
  );
}
