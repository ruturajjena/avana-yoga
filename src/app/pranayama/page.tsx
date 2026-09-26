import { RevealList } from '@/components/motion/RevealList';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialHero } from '@/components/templates/EditorialHero';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { BreathSection } from '@/components/webgl/BreathSection';
import { films } from '@/data/films';
import { pranayamaSeries as page } from '@/data/pages';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...page.seo, path: '/pranayama/', image: '/media/og/origin.jpg' });

export default function PranayamaPage() {
  const [lede, ...rest] = page.paragraphs;
  return (
    <>
      <EditorialHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        media={{ kind: 'photo', src: films.breath.still, alt: films.breath.alt }}
      />

      <section data-nav-theme="light" aria-label="About the series" className="px-page py-(--space-section)">
        <div className="grid-page gap-y-12">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-7 lg:col-start-4">
            <p className="type-lede text-ink">{lede}</p>
            <div className="prose-avana mt-8">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <h2 className="eyebrow mt-14 text-ink/65">{page.suitable.intro}</h2>
            <RevealList as="ul" className="mt-6 border-t border-(--line)">
              {page.suitable.items.map((item) => (
                <li key={item} className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-(--line) py-5 font-display text-[1.45rem] leading-snug">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 bg-current opacity-50" />
                  <span>{item}</span>
                </li>
              ))}
            </RevealList>
            <div className="prose-avana mt-12">
              {page.closingParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-label="Video lessons" className="px-page pb-(--space-section)">
        <ol className="grid gap-(--space-block)">
          {page.days.map((day) => (
            <li key={day.title} className="border-t border-(--line) pt-10">
              <RevealText as="h2" className="type-l">
                {day.title}
              </RevealText>
              <VideoEmbed src={day.src} title={`Pranayama: Beyond the Breath, ${day.title}`} className="mt-8" />
            </li>
          ))}
        </ol>
      </section>

      <BreathSection state="seed" data-nav-theme="light" aria-labelledby="thanks-title" className="px-page pb-(--space-section) text-center">
        <RevealText as="h2" id="thanks-title" className="type-xl mx-auto">
          {page.closing}
        </RevealText>
      </BreathSection>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Pranayama', path: '/pranayama/' },
        ])}
      />
    </>
  );
}
