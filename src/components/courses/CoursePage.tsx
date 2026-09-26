import { MagneticButton } from '@/components/motion/MagneticButton';
import { EditorialImage } from '@/components/motion/EditorialImage';
import { RevealList } from '@/components/motion/RevealList';
import { RevealText } from '@/components/motion/RevealText';
import { ScrollVideo } from '@/components/motion/ScrollVideo';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { TeacherIndex } from '@/components/teachers/TeacherIndex';
import { TestimonialStage } from '@/components/testimonials/TestimonialStage';
import { Accordion } from '@/components/ui/Accordion';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ClosingCall } from '@/components/ui/ClosingCall';
import { DriftGallery } from '@/components/ui/DriftGallery';
import { FactList } from '@/components/ui/FactList';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BreathSection } from '@/components/webgl/BreathSection';
import type { Course } from '@/data/courses';
import { films } from '@/data/films';
import { site } from '@/data/site';
import { getTeachers } from '@/data/teachers';
import { breadcrumbSchema, courseSchema, faqSchema } from '@/lib/seo';
import { cn, padIndex } from '@/lib/utils';
import { CourseDates, RegistrationNotice } from './CourseDates';
import { CurriculumAreas } from './CurriculumAreas';
import { CurriculumModules } from './CurriculumModules';

type SectionProps = { course: Course; index: number };

/**
 * Course template. Narrative order:
 * title → what you will experience → curriculum → transformation → eligibility → certification →
 * teachers → voices → dates & enrolment → questions → gallery → invitation.
 * Sections render only when the live page publishes their content.
 */
export function CoursePage({ course }: { course: Course }) {
  const sections = [
    'intro',
    course.curriculum && 'curriculum',
    course.outcomes && 'outcomes',
    course.eligibility && 'eligibility',
    course.certification && 'certification',
    course.teachers && 'teachers',
    course.testimonials && 'testimonials',
    'enrolment',
    course.faq && 'faq',
  ].filter(Boolean);
  const indexOf = (key: string) => sections.indexOf(key) + 1;

  return (
    <>
      <CourseHero course={course} />
      <CourseIntro course={course} index={indexOf('intro')} />
      {course.curriculum ? <CourseCurriculum course={course} index={indexOf('curriculum')} /> : null}
      {course.outcomes ? <CourseOutcomes course={course} index={indexOf('outcomes')} /> : null}
      {course.eligibility ? <CourseEligibility course={course} index={indexOf('eligibility')} /> : null}
      {course.certification ? <CourseCertification course={course} index={indexOf('certification')} /> : null}
      {course.teachers ? <CourseTeachers course={course} index={indexOf('teachers')} /> : null}
      {course.testimonials ? <CourseVoices course={course} index={indexOf('testimonials')} /> : null}
      <CourseEnrolment course={course} index={indexOf('enrolment')} />
      {course.faq ? <CourseFaq course={course} index={indexOf('faq')} /> : null}
      {course.gallery ? (
        <section data-nav-theme="light" aria-label={`${course.title} gallery`} className="pb-(--space-section)">
          <DriftGallery photos={course.gallery} label={`${course.title}: graduation and training photographs`} />
        </section>
      ) : null}
      <ClosingCall
        eyebrow={course.shortTitle}
        cta={course.enrolment.cta}
        links={[
          { label: 'All courses', href: '/courses/' },
          { label: 'Contact us', href: '/contact/' },
        ]}
      />
      <JsonLd
        data={[
          courseSchema(course),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses/' },
            { name: course.title, path: course.href },
          ]),
          ...(course.faq ? [faqSchema(course.faq.items)] : []),
        ]}
      />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function CourseHero({ course }: { course: Course }) {
  const { hero, enrolment } = course;
  const media = hero.media;

  const content = (
    <div className="px-page pt-[calc(var(--nav-h)+clamp(2.5rem,8vh,6rem))]">
      <nav aria-label="Breadcrumb">
        <ol className="eyebrow flex flex-wrap items-center gap-x-3 text-ink/65 [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center">
          <li>
            <TransitionLink href="/">
              <span className="link-underline">Home</span>
            </TransitionLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <TransitionLink href="/courses/">
              <span className="link-underline">Courses</span>
            </TransitionLink>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {course.shortTitle}
          </li>
        </ol>
      </nav>

      <div className="grid-page mt-12 items-end gap-y-10 lg:mt-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="type-xl mt-6" aria-label={hero.title.join(' ')}>
            {hero.title.map((line, index) => (
              <RevealText key={line} as="span" trigger="load" delay={index * 0.08} className={cn('block', index === 1 && 'pl-[7vw] italic')}>
                {line}
              </RevealText>
            ))}
          </h1>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:pb-3">
          {hero.lines.length ? (
            <ul className="grid gap-2 text-[1.02rem] leading-relaxed text-ink/75">
              {hero.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <MagneticButton href={enrolment.cta.href} srSuffix={`: ${course.title}`}>
              {enrolment.cta.label}
            </MagneticButton>
            {enrolment.dates ? <RegistrationNotice items={enrolment.dates.items} /> : null}
            <ArrowLink href="#enrol">Dates &amp; details</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {media.kind === 'breath' ? (
        <BreathSection state="seed" center={[0.78, 0.4]} data-nav-theme="light" aria-label={course.title} className="pb-6">
          {content}
        </BreathSection>
      ) : (
        <section data-nav-theme="light" aria-label={course.title} className="pb-12">
          {content}
        </section>
      )}

      {media.kind === 'film' ? (
        <div className="px-page" data-nav-theme="dark">
          <ScrollVideo
            film={films[media.film]}
            start="top 85%"
            end="bottom top"
            className={cn('aspect-[4/5] w-full md:aspect-[16/9]', media.frame === 'full' ? 'lg:aspect-[16/9]' : 'lg:aspect-[21/9]')}
            sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
            portrait={false}
            priority
          />
        </div>
      ) : null}
      {media.kind === 'photo' ? (
        <div className="px-page" data-nav-theme="light">
          <EditorialImage
            src={media.photo.src}
            alt={media.photo.alt}
            position={media.photo.position}
            sizes="(min-width: 1024px) 92vw, (min-width: 768px) 100vw, 200vw"
            className="aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9]"
            reveal="horizon"
            revealOn="load"
            delay={0.3}
            parallax={6}
            priority
          />
        </div>
      ) : null}

      <div className="px-page pb-(--space-block) pt-10" data-nav-theme="light">
        <FactList facts={course.facts} />
      </div>
    </>
  );
}

/* ───────────────────────── What you will experience ───────────────────────── */
function CourseIntro({ course, index }: SectionProps) {
  const { intro } = course;
  const [lede, ...rest] = intro.paragraphs;
  return (
    <section id="experience" data-nav-theme="light" aria-labelledby="experience-title" className="px-page py-(--space-section)">
      <div className="grid-page items-start gap-y-12">
        <SectionHeading
          id="experience-title"
          index={padIndex(index)}
          eyebrow={intro.eyebrow}
          title={intro.heading}
          size="l"
          className="col-span-4 md:col-span-8 lg:col-span-6"
          titleClassName="max-w-[17ch]"
        />
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:pt-20">
          {lede ? <p className="type-lede text-ink">{lede}</p> : null}
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-[1.05rem] leading-relaxed text-ink/75">
              {paragraph}
            </p>
          ))}
        </div>
        {intro.image ? (
          <EditorialImage
            src={intro.image.src}
            alt={intro.image.alt}
            position={intro.image.position}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 58vw, 100vw"
            parallax={6}
            className="col-span-4 md:col-span-7 lg:col-span-7"
          />
        ) : null}
      </div>
    </section>
  );
}

/* ───────────────────────── Curriculum ───────────────────────── */
function CourseCurriculum({ course, index }: SectionProps) {
  const curriculum = course.curriculum!;
  const indexOnly = curriculum.modules.every((module) => module.items.length === 0);
  return (
    <section id="curriculum" data-nav-theme="light" aria-labelledby="curriculum-title" className="px-page pb-(--space-section)">
      <div className="border-t border-(--line) pt-(--space-block)">
        <SectionHeading
          id="curriculum-title"
          index={padIndex(index)}
          eyebrow={curriculum.eyebrow}
          title={curriculum.heading}
          size="l"
          lede={curriculum.intro}
          titleClassName="max-w-[20ch]"
        />

        {curriculum.overview ? (
          <RevealList as="ul" className="mt-14 grid border-t border-(--line) md:grid-cols-2 md:gap-x-(--gutter)">
            {curriculum.overview.map((item) => (
              <li key={item} className="border-b border-(--line) py-5 font-display text-[clamp(1.3rem,1.8vw,1.7rem)] leading-tight">
                {item}
              </li>
            ))}
          </RevealList>
        ) : null}

        {curriculum.expandable ? (
          <CurriculumAreas modules={curriculum.modules} className="mt-16" />
        ) : indexOnly ? (
          <RevealList as="ol" className="mt-16 grid border-t border-(--line) md:grid-cols-2 md:gap-x-(--gutter)">
            {curriculum.modules.map((module, moduleIndex) => (
              <li key={module.title} className="flex items-baseline gap-6 border-b border-(--line) py-6 md:py-8">
                <span className="eyebrow nums-old opacity-55">{padIndex(moduleIndex + 1)}</span>
                <span className="font-display text-[clamp(1.6rem,2.8vw,2.75rem)] font-light leading-[1.05]">{module.title}</span>
              </li>
            ))}
          </RevealList>
        ) : (
          <>
            {curriculum.overview ? <p className="eyebrow mt-(--space-block) text-ink/60">In depth</p> : null}
            <CurriculumModules modules={curriculum.modules} className={curriculum.overview ? 'mt-10' : 'mt-16'} />
          </>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Transformation (learning outcomes) ───────────────────────── */
function CourseOutcomes({ course, index }: SectionProps) {
  const outcomes = course.outcomes!;
  return (
    <section id="outcomes" data-nav-theme="dark" aria-labelledby="outcomes-title" className="bg-ink px-page py-(--space-section) text-cream">
      <div className="grid-page gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <SectionHeading id="outcomes-title" index={padIndex(index)} eyebrow="Transformation" title={outcomes.heading} size="l" />
          {outcomes.intro ? <p className="type-lede mt-8 text-cream/75">{outcomes.intro}…</p> : null}
        </div>
        <RevealList as="ol" className="col-span-4 border-t border-(--line-dark) md:col-span-8 lg:col-span-7 lg:col-start-6">
          {outcomes.items.map((item, itemIndex) => (
            <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-(--line-dark) py-6 md:grid-cols-[5rem_1fr] md:py-8">
              <span className="eyebrow nums-old pt-2 opacity-60">{padIndex(itemIndex + 1)}</span>
              <span className="type-s">{item}</span>
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}

/* ───────────────────────── Eligibility ───────────────────────── */
function CourseEligibility({ course, index }: SectionProps) {
  const eligibility = course.eligibility!;
  return (
    <section id="eligibility" data-nav-theme="light" aria-labelledby="eligibility-title" className="px-page py-(--space-section)">
      <div className="grid-page gap-y-12">
        <SectionHeading
          id="eligibility-title"
          index={padIndex(index)}
          eyebrow="Before you apply"
          title={eligibility.heading}
          size="m"
          lede={eligibility.intro}
          className="col-span-4 md:col-span-8 lg:col-span-4"
        />
        <RevealList as="ul" className="col-span-4 border-t border-(--line) md:col-span-8 lg:col-span-7 lg:col-start-6">
          {eligibility.items.map((item) => (
            <li key={item} className="type-body-l grid grid-cols-[1.75rem_1fr] gap-3 border-b border-(--line) py-6 text-charcoal">
              <span aria-hidden="true" className="mt-[0.85em] h-px w-4 bg-current opacity-50" />
              <span>{item}</span>
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}

/* ───────────────────────── Certification ───────────────────────── */
function CourseCertification({ course, index }: SectionProps) {
  const [first, ...others] = course.certification!;
  const image = course.certificationImage;
  return (
    <section id="certification" data-nav-theme="light" aria-labelledby="certification-title" className="px-page pb-(--space-section)">
      <div className="grid-page items-center gap-y-12 border-t border-(--line) pt-(--space-block)">
        {image ? (
          <EditorialImage
            src={image.src}
            alt={image.alt}
            position={image.position}
            ratio="4 / 3"
            sizes="(min-width: 1024px) 48vw, 100vw"
            reveal="center"
            parallax={5}
            className="col-span-4 md:col-span-8 lg:col-span-6"
          />
        ) : null}
        <div className={cn('col-span-4 md:col-span-8', image ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-8')}>
          <p className="eyebrow flex items-center gap-4">
            <span className="nums-old">{padIndex(index)}</span>
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
            <span>Certification</span>
          </p>
          <RevealText as="h2" id="certification-title" className="type-l mt-6">
            {first.heading}
          </RevealText>
          <div className="mt-6 grid gap-4 text-[1.05rem] leading-relaxed text-ink/80">
            {first.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {others.map((block) => (
            <div key={block.heading} className="mt-12 border-t border-(--line) pt-10">
              <h3 className="type-s">{block.heading}</h3>
              <div className="mt-5 grid gap-4 text-[1.02rem] leading-relaxed text-ink/75">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Teachers ───────────────────────── */
function CourseTeachers({ course, index }: SectionProps) {
  const teachers = course.teachers!;
  return (
    <section id="teachers" data-nav-theme="light" aria-labelledby="teachers-title" className="px-page py-(--space-section)">
      <SectionHeading id="teachers-title" index={padIndex(index)} eyebrow={teachers.eyebrow} title={teachers.heading} size="xl" />
      <TeacherIndex
        teachers={getTeachers(teachers.lineup)}
        variants={teachers.variants}
        context={`${course.shortTitle} · ${teachers.heading}`}
        size="m"
        className="mt-16"
      />
    </section>
  );
}

/* ───────────────────────── Voices ───────────────────────── */
function CourseVoices({ course, index }: SectionProps) {
  const voices = course.testimonials!;
  return (
    <section id="voices" data-nav-theme="dark" aria-labelledby="voices-title" className="bg-ink px-page py-(--space-section) text-cream">
      <div className="grid-page gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-3">
          <SectionHeading id="voices-title" index={padIndex(index)} eyebrow={voices.eyebrow} title={voices.heading} size="m" titleClassName="max-w-[10ch]" />
          {voices.intro ? <p className="mt-8 max-w-[40ch] text-cream/70">{voices.intro}</p> : null}
        </div>
        <TestimonialStage items={voices.items} tone="dark" className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5" />
      </div>
    </section>
  );
}

/* ───────────────────────── Dates & enrolment ───────────────────────── */
function CourseEnrolment({ course, index }: SectionProps) {
  const enrolment = course.enrolment;
  return (
    <section id="enrol" data-nav-theme="light" aria-labelledby="enrol-title" className="px-page py-(--space-section)">
      <div className="grid-page items-start gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <SectionHeading id="enrol-title" index={padIndex(index)} eyebrow={enrolment.eyebrow} title={enrolment.heading} size="l" titleClassName="max-w-[20ch]" />

          {enrolment.dates ? (
            <div className="mt-14">
              <h3 className="eyebrow text-ink/65">{enrolment.dates.heading}</h3>
              <CourseDates items={enrolment.dates.items} className="mt-6 sm:grid sm:grid-cols-2 sm:gap-x-(--gutter)" />
              {enrolment.dates.notes ? <p className="mt-6 text-ink/70">{enrolment.dates.notes.join(' ')}</p> : null}
            </div>
          ) : null}

          {enrolment.intakes ? (
            <ul className="mt-14 border-t border-(--line)" aria-label={`${course.title}: dates, status and locations`}>
              {enrolment.intakes.map((intake) => (
                <li
                  key={intake.location}
                  className="grid grid-cols-2 items-end gap-x-6 gap-y-5 border-b border-(--line) py-7 md:grid-cols-[1fr_1fr_1.4fr_auto]"
                >
                  <div>
                    <span className="eyebrow block text-ink/55">Date</span>
                    <span className="mt-2 block font-display text-[1.6rem] leading-tight">{intake.date}</span>
                  </div>
                  <div>
                    <span className="eyebrow block text-ink/55">Status</span>
                    <span className="mt-2 block text-[1.02rem]">{intake.status}</span>
                  </div>
                  <div>
                    <span className="eyebrow block text-ink/55">Location</span>
                    <span className="mt-2 block font-display text-[1.6rem] leading-tight">{intake.location}</span>
                  </div>
                  <div className="md:justify-self-end">
                    <ArrowLink href={enrolment.cta.href}>
                      {enrolment.cta.label}
                      <span className="sr-only">: {intake.location}</span>
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside aria-label="Course details and enrolment" className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-stretch">
          <div className="bg-ink p-8 text-cream md:p-10 lg:sticky lg:top-[calc(var(--nav-h)+4vh)]">
            {enrolment.fee ? (
              <>
                <h3 className="type-s">{enrolment.fee.heading}</h3>
                <ul className="mt-5 grid gap-2 text-[0.98rem] text-cream/80">
                  {enrolment.fee.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </>
            ) : (
              <h3 className="type-s">{course.shortTitle}</h3>
            )}
            {enrolment.details ? (
              <dl className="mt-8 grid gap-5 border-t border-(--line-dark) pt-8">
                {enrolment.details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="eyebrow text-cream/60">{detail.label}</dt>
                    <dd className="mt-2 font-display text-[1.45rem] leading-tight">
                      {detail.value}
                      {detail.note ? <span className="mt-1 block font-sans text-sm text-cream/70">{detail.note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <MagneticButton href={enrolment.cta.href} tone="cream" block className="mt-10" srSuffix={`: ${course.title}`}>
              {enrolment.cta.label}
            </MagneticButton>
            {enrolment.dates ? <RegistrationNotice items={enrolment.dates.items} tone="dark" className="mt-4" /> : null}
            {enrolment.confirmation ? <p className="mt-5 text-sm text-cream/70">{enrolment.confirmation}</p> : null}
            <p className="mt-8 border-t border-(--line-dark) pt-6 text-sm text-cream/70">
              Questions?{' '}
              <a href={`mailto:${site.email}`} className="text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream">
                {site.email}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
function CourseFaq({ course, index }: SectionProps) {
  const faq = course.faq!;
  return (
    <section id="faq" data-nav-theme="light" aria-labelledby="faq-title" className="px-page pb-(--space-section)">
      <div className="grid-page gap-y-12 border-t border-(--line) pt-(--space-block)">
        <SectionHeading id="faq-title" index={padIndex(index)} eyebrow="Questions" title={faq.heading} size="l" className="col-span-4 md:col-span-8 lg:col-span-4" />
        <Accordion
          className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6"
          items={faq.items.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </section>
  );
}
