import { KineticText } from '@/components/motion/KineticText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { home } from '@/data/home';

/** 02 · Ancient wisdom — the rings of the film continue as light behind the manifesto. */
export function Philosophy() {
  const { philosophy } = home;
  return (
    <BreathSection
      id="philosophy"
      state="ripples"
      center={[0.84, 0.36]}
      intensity={0.9}
      data-nav-theme="light"
      aria-labelledby="philosophy-title"
      className="px-page pb-(--space-block) pt-(--space-section)"
    >
      <div className="grid-page gap-y-14">
        <SectionHeading
          id="philosophy-title"
          index="01"
          eyebrow={philosophy.eyebrow}
          title={philosophy.heading}
          size="xl"
          className="col-span-4 md:col-span-8 lg:col-span-10"
          titleClassName="max-w-[13ch]"
        />
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-6">
          <KineticText className="type-lede text-ink">{philosophy.text}</KineticText>
          <ArrowLink href={philosophy.cta.href} className="mt-10">
            {philosophy.cta.label}
          </ArrowLink>
        </div>
      </div>
    </BreathSection>
  );
}
