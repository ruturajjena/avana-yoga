import { TherapyForm } from '@/components/forms/TherapyForm';
import { RevealList } from '@/components/motion/RevealList';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialHero } from '@/components/templates/EditorialHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { yogaTherapy as page } from '@/data/pages';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { padIndex } from '@/lib/utils';

export const metadata = buildMetadata({ ...page.seo, path: '/yoga-therapy/', image: '/media/og/community.jpg' });

export default function YogaTherapyPage() {
  return (
    <>
      <EditorialHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        size="mega"
        breath="ripples"
        lede={<span className="italic">“{page.quote}”</span>}
      />

      <section data-nav-theme="light" aria-label="About yoga therapy" className="px-page pb-(--space-section)">
        <div className="grid-page">
          <div className="type-body-l col-span-4 grid gap-6 text-ink/80 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-6">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-labelledby="conditions-title" className="px-page pb-(--space-section)">
        <div className="border-t border-(--line) pt-(--space-block)">
          <SectionHeading id="conditions-title" index="01" title={page.conditions.heading} size="l" titleClassName="max-w-[16ch]" />
          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-(--gutter)">
            {page.conditions.groups.map((group) => (
              <div key={group.title}>
                <h3 className="eyebrow text-ink/65">{group.title}</h3>
                <RevealList as="ul" className="mt-6 grid border-t border-(--line) sm:grid-cols-2 sm:gap-x-6">
                  {group.items.map((item) => (
                    <li key={item} className="border-b border-(--line) py-3.5 font-display text-[1.35rem] leading-snug">
                      {item}
                    </li>
                  ))}
                </RevealList>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-nav-theme="light" aria-labelledby="session-title" className="px-page pb-(--space-section)">
        <div className="grid-page gap-y-12 border-t border-(--line) pt-(--space-block)">
          <SectionHeading id="session-title" index="02" title={page.session.heading} size="m" className="col-span-4 md:col-span-8 lg:col-span-5" />
          <RevealList as="ol" className="col-span-4 border-t border-(--line) md:col-span-8 lg:col-span-6 lg:col-start-7">
            {page.session.items.map((item, index) => (
              <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-(--line) py-6">
                <span className="eyebrow nums-old pt-2 opacity-55">{padIndex(index + 1)}</span>
                <span className="type-s">{item}</span>
              </li>
            ))}
          </RevealList>
          <p className="type-lede col-span-4 text-ink md:col-span-8 lg:col-span-7 lg:col-start-6">{page.closing}</p>
        </div>
      </section>

      <section id="message" data-nav-theme="dark" aria-labelledby="message-title" className="bg-ink px-page py-(--space-section) text-cream">
        <div className="grid-page gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow">Yoga Therapy</p>
            <RevealText as="h2" id="message-title" className="type-l mt-6">
              {page.form.heading}
            </RevealText>
            <p className="mt-8 text-cream/70">
              Or write to{' '}
              <a href={`mailto:${site.email}`} className="text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream">
                {site.email}
              </a>
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <TherapyForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Yoga Therapy', path: '/yoga-therapy/' },
        ])}
      />
    </>
  );
}
