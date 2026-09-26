import { EditorialImage } from '@/components/motion/EditorialImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialHero } from '@/components/templates/EditorialHero';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { CtaButton } from '@/components/ui/CtaButton';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { yogaClasses as page } from '@/data/pages';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...page.seo, path: '/yoga-classes/', image: '/media/og/community.jpg' });

export default function YogaClassesPage() {
  const [lede, ...rest] = page.paragraphs;
  return (
    <>
      <EditorialHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        size="mega"
        breath="ripples"
        actions={<CtaButton href={page.cta.href} label={page.cta.label} />}
      />

      <section data-nav-theme="light" aria-label="Yoga for everyone" className="px-page pb-(--space-section)">
        <div className="grid-page items-start gap-y-12">
          <EditorialImage
            src={page.image.src}
            alt={page.image.alt}
            position={page.image.position}
            ratio="2 / 3"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            parallax={6}
            className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-2"
          />
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 lg:pt-[10vh]">
            <p className="type-lede text-ink">{lede}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="type-body-l mt-6 text-ink/75">
                {paragraph}
              </p>
            ))}
            <CtaButton href={page.cta.href} label={page.cta.label} className="mt-10" />
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-labelledby="video-title" className="px-page pb-(--space-section)">
        <h2 id="video-title" className="eyebrow border-t border-(--line) pt-10">
          Film · Yoga Classes
        </h2>
        <VideoEmbed src={page.video.src} title={page.video.title} className="mt-8" />
      </section>

      <ClosingCall
        cta={{ label: page.cta.label, href: page.cta.href }}
        links={[
          { label: 'Our courses', href: '/courses/' },
          { label: 'Contact us', href: '/contact/' },
        ]}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Yoga Classes', path: '/yoga-classes/' },
        ])}
      />
    </>
  );
}
