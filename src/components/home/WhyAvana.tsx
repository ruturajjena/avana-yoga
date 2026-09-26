import { EditorialImage } from '@/components/motion/EditorialImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { whyAvana } from '@/data/home';
import { padIndex } from '@/lib/utils';

/** 03 · Why Avana Yoga? — the breath field folds into a mandala while the three pillars pass one at a time. */
export function WhyAvana() {
  return (
    <BreathSection
      id="why"
      state="mandala"
      center={[0.2, 0.5]}
      data-nav-theme="light"
      aria-labelledby="why-title"
      className="px-page py-(--space-section)"
    >
      <div className="grid-page gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+10vh)]">
            <SectionHeading id="why-title" index="03" title={whyAvana.heading} size="xl" titleClassName="max-w-[8ch]" />
            <ol className="mt-12 hidden gap-3 border-t border-(--line) pt-8 lg:grid" aria-hidden="true">
              {whyAvana.pillars.map((pillar, index) => (
                <li key={pillar.title} className="flex gap-4 text-[0.92rem] text-ink/70">
                  <span className="eyebrow nums-old pt-[0.2em]">{padIndex(index + 1)}</span>
                  <span>{pillar.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="col-span-4 grid gap-(--space-section) md:col-span-8 lg:col-span-7 lg:col-start-6">
          {whyAvana.pillars.map((pillar, index) => (
            <li key={pillar.title} className="grid gap-8">
              <EditorialImage
                src={pillar.image.src}
                alt={pillar.image.alt}
                position={pillar.image.position}
                ratio="4 / 3"
                sizes="(min-width: 1024px) 52vw, 100vw"
                reveal={index === 1 ? 'center' : 'up'}
                parallax={5}
                className={index === 1 ? 'md:w-[86%] md:self-end md:justify-self-end' : undefined}
              />
              <div className="grid gap-5 md:grid-cols-[5rem_1fr]">
                <p className="eyebrow nums-old pt-2 opacity-60">{padIndex(index + 1)}</p>
                <div>
                  <h3 className="type-m max-w-[18ch]">{pillar.title}</h3>
                  <p className="type-body-l mt-6 max-w-[56ch] text-ink/75">{pillar.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </BreathSection>
  );
}
