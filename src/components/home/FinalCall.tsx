import { EditorialImage } from '@/components/motion/EditorialImage';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { RevealText } from '@/components/motion/RevealText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { BreathSection } from '@/components/webgl/BreathSection';
import { home } from '@/data/home';

/** Begin — the rings contract to a single point of stillness around the one invitation that matters. */
export function FinalCall() {
  const { closing } = home;
  return (
    <BreathSection
      id="begin"
      state="seed"
      center={[0.36, 0.42]}
      data-nav-theme="light"
      aria-labelledby="begin-title"
      className="relative px-page py-(--space-section)"
    >
      <div className="grid-page items-end gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="eyebrow">{closing.eyebrow}</p>
          <h2 id="begin-title" className="mt-8" aria-label={closing.lines.join(' ')}>
            <RevealText as="span" className="type-xl block">
              {closing.lines[0]}
            </RevealText>
            <RevealText as="span" delay={0.12} className="type-xl block pl-[10vw] italic">
              {closing.lines[1]}
            </RevealText>
          </h2>
        </div>
        <EditorialImage
          src={closing.image.src}
          alt={closing.image.alt}
          position={closing.image.position}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 24vw, (min-width: 768px) 40vw, 100vw"
          reveal="up"
          parallax={6}
          className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10"
        />
      </div>

      <div className="mt-16 flex flex-col items-start gap-12 border-t border-(--line) pt-12 md:flex-row md:items-center md:justify-between">
        <MagneticButton href={closing.cta.href} size="lg">
          {closing.cta.label}
        </MagneticButton>
        <ul className="grid gap-4 md:justify-items-end">
          <li>
            <ArrowLink href="/courses/">Explore courses</ArrowLink>
          </li>
          <li>
            <ArrowLink href="/yoga-retreats/">Explore retreats</ArrowLink>
          </li>
          <li>
            <ArrowLink href="/contact/">Get in touch</ArrowLink>
          </li>
        </ul>
      </div>
    </BreathSection>
  );
}
