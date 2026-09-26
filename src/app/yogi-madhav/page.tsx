import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { bioFor, portraitPosition } from '@/components/teachers/TeacherDetails';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { Portrait } from '@/components/ui/Portrait';
import { yogiMadhavPage as page } from '@/data/pages';
import { site } from '@/data/site';
import { teachers } from '@/data/teachers';
import { breadcrumbSchema, buildMetadata, organizationId } from '@/lib/seo';

export const metadata = buildMetadata({ ...page.seo, path: '/yogi-madhav/', image: '/media/og/origin.jpg' });

export default function YogiMadhavPage() {
  const madhav = teachers.madhav;
  const [lede, ...rest] = bioFor(madhav, 'profile');

  return (
    <>
      <section data-nav-theme="light" aria-labelledby="madhav-title" className="px-page pb-(--space-block) pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]">
        <div className="grid-page items-end gap-y-12">
          <div className="col-span-4 md:col-span-5 lg:col-span-7">
            <p className="eyebrow">{page.hero.eyebrow}</p>
            <p className="eyebrow mt-3 text-ink/60">{page.hero.label}</p>
            <RevealText as="h1" id="madhav-title" trigger="load" className="type-xl mt-6">
              {page.hero.title}
            </RevealText>
          </div>
          <Portrait
            src={madhav.portrait.src}
            alt={madhav.portrait.alt}
            position={portraitPosition(madhav.slug)}
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 60vw"
            className="col-span-3 md:col-span-3 lg:col-span-3 lg:col-start-10"
            priority
          />
        </div>
      </section>

      <div className="px-page" data-nav-theme="light">
        <EditorialImage
          src={page.image.src}
          alt={page.image.alt}
          position={page.image.position}
          sizes="(min-width: 1024px) 92vw, 100vw"
          className="aspect-[4/5] md:aspect-[16/9]"
          reveal="horizon"
          revealOn="load"
          delay={0.3}
          parallax={6}
        />
      </div>

      <section data-nav-theme="light" aria-labelledby="profile-title" className="px-page py-(--space-section)">
        <div className="grid-page gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <h2 id="profile-title" className="eyebrow">
              Profile
            </h2>
            <ul className="mt-8 border-t border-(--line)">
              {madhav.highlights.map((highlight) => (
                <li key={highlight} className="border-b border-(--line) py-4 font-display text-[1.35rem] leading-snug">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <p className="type-lede text-ink">{lede}</p>
            <div className="prose-avana mt-8">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCall
        eyebrow="Study with Yogi Madhav"
        cta={{ label: 'Explore courses', href: '/courses/' }}
        links={[
          { label: 'Books', href: '/books/' },
          { label: 'Retreats', href: '/yoga-retreats/' },
          { label: 'About Avana Yoga', href: '/about/' },
        ]}
      />

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Yogi Madhav',
            jobTitle: 'Yoga teacher and meditation guide',
            description: lede,
            image: `${site.url}${madhav.portrait.src}`,
            award: 'Winner of the Himalaya Yoga Olympiad, 2008',
            worksFor: { '@id': organizationId },
            url: `${site.url}/yogi-madhav/`,
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Yogi Madhav', path: '/yogi-madhav/' },
          ]),
        ]}
      />
    </>
  );
}
