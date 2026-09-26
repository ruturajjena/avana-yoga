import { EditorialImage } from '@/components/motion/EditorialImage';
import { KineticText } from '@/components/motion/KineticText';
import { RevealList } from '@/components/motion/RevealList';
import { RevealText } from '@/components/motion/RevealText';
import { ScrollVideo } from '@/components/motion/ScrollVideo';
import { JsonLd } from '@/components/seo/JsonLd';
import { TeacherIndex } from '@/components/teachers/TeacherIndex';
import { TeacherProfile } from '@/components/teachers/TeacherProfile';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { HoverList } from '@/components/ui/HoverList';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import { about } from '@/data/about';
import { films } from '@/data/films';
import { whyAvana } from '@/data/home';
import { site } from '@/data/site';
import { getTeachers, teacherLineups } from '@/data/teachers';
import { breadcrumbSchema, buildMetadata, organizationId } from '@/lib/seo';
import { cn, padIndex } from '@/lib/utils';

export const metadata = buildMetadata({
  title: about.seo.title,
  description: about.seo.description,
  path: '/about/',
  image: '/media/og/origin.jpg',
});

function ChapterMark({ index, label, tone = 'light' }: { index: string; label: string; tone?: 'light' | 'dark' }) {
  return (
    <p className={cn('eyebrow flex items-center gap-4', tone === 'dark' ? 'text-cream' : 'text-ink')}>
      <span className="nums-old">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}

/** About as a manifesto: philosophy → lineage → mission → approach → teachers → presence. */
export default function AboutPage() {
  const principal = getTeachers(teacherLineups.about);
  const faculty = getTeachers(['helen', 'sudhir', 'leena', 'matt']);

  return (
    <>
      <BreathSection
        state="ripples"
        center={[0.78, 0.34]}
        data-nav-theme="light"
        aria-labelledby="about-title"
        className="px-page pb-14 pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]"
      >
        <p className="eyebrow">{about.hero.eyebrow}</p>
        <h1 id="about-title" className="type-xl mt-6" aria-label={about.hero.title.join(' ')}>
          {about.hero.title.map((line, index) => (
            <RevealText key={line} as="span" trigger="load" delay={index * 0.1} className={cn('block', index === 1 && 'pl-[10vw] italic')}>
              {line}
            </RevealText>
          ))}
        </h1>
      </BreathSection>

      <div className="px-page" data-nav-theme="light">
        <ScrollVideo
          film={films.origin}
          start="top 85%"
          end="bottom top"
          className="aspect-[4/5] w-full md:aspect-[16/9] lg:aspect-[21/9]"
          sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
          portrait={false}
          priority
        />
      </div>

      {/* 01 · Philosophy */}
      <section id="philosophy" data-nav-theme="light" aria-labelledby="philosophy-title" className="px-page py-(--space-section)">
        <div className="grid-page items-start gap-y-14">
          <EditorialImage
            src={about.philosophy.image.src}
            alt={about.philosophy.image.alt}
            position={about.philosophy.image.position}
            ratio="4 / 5"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
            parallax={7}
            className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-2"
          />
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:pt-[12vh]">
            <ChapterMark index="01" label={about.philosophy.eyebrow} />
            <RevealText as="h2" id="philosophy-title" className="type-l mt-6 max-w-[14ch]">
              {about.philosophy.statement}
            </RevealText>
            <KineticText className="type-lede mt-10 text-ink">{about.philosophy.text}</KineticText>
          </div>
        </div>
      </section>

      {/* 02 · Lineage */}
      <section id="lineage" data-nav-theme="light" aria-labelledby="lineage-title" className="px-page pb-(--space-section)">
        <div className="grid-page gap-y-14 border-t border-(--line) pt-(--space-block)">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeading id="lineage-title" index="02" eyebrow={about.lineage.eyebrow} title="A living lineage" size="l" />
            <p className="type-lede mt-10 text-ink/85">{about.lineage.text}</p>
            <EditorialImage
              src={about.lineage.image.src}
              alt={about.lineage.image.alt}
              position={about.lineage.image.position}
              ratio="3 / 2"
              sizes="(min-width: 1024px) 38vw, 100vw"
              reveal="center"
              className="mt-14"
            />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <RevealList as="ol" aria-label="Classical texts of the lineage" className="border-l border-(--line) pl-8 md:pl-12">
              {about.lineage.sources.map((source, index) => (
                <li key={source} className="relative py-7 md:py-9">
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-cream md:-left-12"
                  />
                  <span className="eyebrow nums-old block opacity-55">{padIndex(index + 1)}</span>
                  <span className="mt-3 block font-display text-[clamp(2rem,4vw,3.75rem)] font-light leading-[1]">{source}</span>
                </li>
              ))}
            </RevealList>
            <p className="mt-10 max-w-[40ch] font-display text-[1.45rem] italic leading-snug text-ink/75">{about.lineage.caption}</p>
          </div>
        </div>
      </section>

      {/* 03 · Mission */}
      <section id="mission" data-nav-theme="dark" aria-labelledby="mission-title" className="bg-ink px-page py-(--space-section) text-cream">
        <ChapterMark index="03" label={about.mission.eyebrow} tone="dark" />
        <h2 id="mission-title" className="mt-10" aria-label={about.mission.statement.join(' ')}>
          <RevealText as="span" className="type-xl block">
            {about.mission.statement[0]}
          </RevealText>
          <RevealText as="span" delay={0.12} className="type-xl block pl-[12vw] italic">
            {about.mission.statement[1]}
          </RevealText>
        </h2>
        <div className="grid-page mt-16">
          <KineticText className="type-lede col-span-4 text-cream md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">{about.mission.text}</KineticText>
        </div>
      </section>

      {/* 04 · Approach */}
      <section id="approach" data-nav-theme="light" aria-labelledby="approach-title" className="px-page py-(--space-section)">
        <div className="grid-page items-start gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <SectionHeading id="approach-title" index="04" eyebrow={about.approach.eyebrow} title={whyAvana.heading} size="l" />
            <EditorialImage
              src={about.approach.image.src}
              alt={about.approach.image.alt}
              position={about.approach.image.position}
              ratio="2 / 3"
              sizes="(min-width: 1024px) 26vw, (min-width: 768px) 50vw, 90vw"
              parallax={6}
              className="mt-14 w-[82%] md:w-[60%] lg:w-[82%]"
            />
          </div>
          <RevealList as="ol" className="col-span-4 border-t border-(--line) md:col-span-8 lg:col-span-7 lg:col-start-6">
            {whyAvana.pillars.map((pillar, index) => (
              <li key={pillar.title} className="grid gap-4 border-b border-(--line) py-10 md:grid-cols-[5rem_1fr]">
                <span className="eyebrow nums-old pt-2 opacity-55">{padIndex(index + 1)}</span>
                <div>
                  <h3 className="type-m max-w-[18ch]">{pillar.title}</h3>
                  <p className="type-body-l mt-5 text-ink/75">{pillar.text}</p>
                </div>
              </li>
            ))}
          </RevealList>
        </div>
      </section>

      {/* 05 · Teachers */}
      <section id="teachers" data-nav-theme="light" aria-labelledby="teachers-title" className="px-page pb-(--space-section)">
        <div className="border-t border-(--line) pt-(--space-block)">
          <SectionHeading id="teachers-title" index="05" eyebrow={about.teachers.eyebrow} title={about.teachers.heading} size="xl" />
        </div>
        <div className="mt-14">
          {principal.map((teacher, index) => (
            <TeacherProfile key={teacher.slug} teacher={teacher} index={index + 1} flip={index % 2 === 1} />
          ))}
        </div>
        <div className="border-t border-(--line) pt-(--space-block)">
          <SectionHeading eyebrow={about.teachers.facultyEyebrow} title={about.teachers.facultyHeading} size="m" as="h3" />
          <TeacherIndex teachers={faculty} context={about.teachers.facultyEyebrow} size="m" className="mt-12" />
        </div>
      </section>

      {/* 06 · Global presence */}
      <section id="presence" data-nav-theme="light" aria-labelledby="presence-title" className="px-page pb-(--space-section)">
        <div className="grid-page gap-y-12 border-t border-(--line) pt-(--space-block)">
          <SectionHeading
            id="presence-title"
            index="06"
            eyebrow={about.presence.eyebrow}
            title={about.presence.heading}
            size="l"
            className="col-span-4 md:col-span-8 lg:col-span-4"
          />
          <HoverList
            className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6"
            size="m"
            items={about.presence.places.map((place) => ({ href: place.href, title: place.place, eyebrow: place.offering, meta: place.country }))}
          />
        </div>
      </section>

      <ClosingCall
        cta={{ label: 'Explore courses', href: '/courses/' }}
        links={[
          { label: 'Retreats', href: '/yoga-retreats/' },
          { label: 'Events', href: '/events/' },
          { label: 'Contact', href: '/contact/' },
        ]}
      />

      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Avana Yoga', url: `${site.url}/about/`, about: { '@id': organizationId } },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about/' },
          ]),
        ]}
      />
    </>
  );
}
