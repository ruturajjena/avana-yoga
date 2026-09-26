import { RevealText } from '@/components/motion/RevealText';
import { RetreatEntry } from '@/components/retreats/RetreatEntry';
import { JsonLd } from '@/components/seo/JsonLd';
import { bioFor, portraitPosition } from '@/components/teachers/TeacherDetails';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { Portrait } from '@/components/ui/Portrait';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { home } from '@/data/home';
import { retreatList } from '@/data/retreats';
import { site } from '@/data/site';
import { teachers } from '@/data/teachers';
import { breadcrumbSchema, buildMetadata, itemListSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Yoga Retreats: Austria & Goa',
  description:
    'Immersive retreats in Austria, India, UK, and beyond where daily yoga, pranayama, and meditation meet the stillness of extraordinary natural landscapes.',
  path: '/yoga-retreats/',
  image: '/media/og/austria.jpg',
});

const COMPARE: { label: string; values: string[] }[] = [
  { label: 'Region', values: retreatList.map((retreat) => retreat.region) },
  { label: 'Status', values: retreatList.map((retreat) => retreat.status) },
  { label: 'Duration', values: retreatList.map((retreat) => retreat.duration) },
  { label: 'Packages', values: retreatList.map((retreat) => retreat.booking.packages.map((pkg) => `${pkg.name} ${pkg.price}`).join(' · ')) },
  { label: 'Deposit', values: retreatList.map((retreat) => retreat.booking.terms[0]) },
  { label: 'Check-in · out', values: retreatList.map((retreat) => retreat.travel.facts[retreat.travel.facts.length - 1].value) },
];

export default function RetreatsPage() {
  const host = teachers.madhav;
  return (
    <>
      <BreathSection
        state="ripples"
        center={[0.8, 0.38]}
        data-nav-theme="light"
        aria-labelledby="retreats-title"
        className="px-page pb-(--space-block) pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]"
      >
        <p className="eyebrow">Retreats</p>
        <RevealText as="h1" id="retreats-title" trigger="load" className="type-mega mt-6">
          Yoga Retreats
        </RevealText>
        <div className="grid-page mt-10">
          <p className="type-lede col-span-4 text-ink/80 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">{home.offer.items[1].text}</p>
        </div>
      </BreathSection>

      <section data-nav-theme="light" aria-label="Destinations" className="px-page pb-(--space-section)">
        <div className="grid gap-(--space-section) lg:grid-cols-2 lg:gap-x-(--gutter)">
          {retreatList.map((retreat, index) => (
            <RetreatEntry key={retreat.slug} retreat={retreat} index={index + 1} className={index === 1 ? 'lg:mt-[18vh]' : undefined} />
          ))}
        </div>
      </section>

      <section data-nav-theme="light" aria-labelledby="compare-title" className="px-page pb-(--space-section)">
        <div className="grid-page gap-y-12 border-t border-(--line) pt-(--space-block)">
          <SectionHeading id="compare-title" eyebrow="At a glance" title="Two destinations" size="l" className="col-span-4 md:col-span-8 lg:col-span-4" />
          <div className="col-span-4 overflow-x-auto md:col-span-8 lg:col-span-8 lg:col-start-5">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">The Austria and Goa retreats compared</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[24%] border-b border-(--line) py-4">
                    <span className="sr-only">Detail</span>
                  </th>
                  {retreatList.map((retreat) => (
                    <th key={retreat.slug} scope="col" className="border-b border-(--line) py-4 pr-6 font-display text-[1.9rem] font-normal">
                      {retreat.destination}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="eyebrow border-b border-(--line) py-5 pr-4 align-top font-medium text-ink/60">
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${index}`} className="border-b border-(--line) py-5 pr-6 align-top text-[1.02rem]">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section data-nav-theme="dark" aria-labelledby="host-title" className="bg-ink px-page py-(--space-section) text-cream">
        <div className="grid-page items-center gap-y-12">
          <Portrait
            src={host.portrait.src}
            alt={host.portrait.alt}
            position={portraitPosition(host.slug)}
            sizes="(min-width: 1024px) 26vw, 60vw"
            className="col-span-3 mx-auto w-full md:col-span-3 lg:col-span-3 lg:col-start-2"
          />
          <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-6">
            <p className="eyebrow">Meet Your Host</p>
            <RevealText as="h2" id="host-title" className="type-l mt-6">
              {host.fullName}
            </RevealText>
            <p className="type-lede mt-8 text-cream/85">{bioFor(host, 'host')[0]}</p>
            <ArrowLink href="/about/" className="mt-10">
              About our teachers
            </ArrowLink>
          </div>
        </div>
      </section>

      <ClosingCall
        eyebrow="Begin your Journey…"
        cta={{ label: 'Reserve my spot!', href: site.links.retreatBooking }}
        links={retreatList.map((retreat) => ({ label: retreat.title, href: retreat.href }))}
      />

      <JsonLd
        data={[
          itemListSchema(
            'Avana Yoga retreats',
            retreatList.map((retreat) => ({ name: retreat.title, path: retreat.href })),
          ),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Retreats', path: '/yoga-retreats/' },
          ]),
        ]}
      />
    </>
  );
}
