import { MagneticButton } from '@/components/motion/MagneticButton';
import { PageHero } from '@/components/templates/PageHero';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

/**
 * Unlisted: the client sends this link to students who have finished a course. It is deliberately
 * kept out of the navigation, the footer and the sitemap, and out of search results.
 */
export const metadata = buildMetadata({
  title: 'Course Feedback',
  description: 'Share your experience of your Avana Yoga course.',
  path: '/course-feedback/',
  noindex: true,
});

export default function CourseFeedbackPage() {
  return (
    <>
      <PageHero
        eyebrow="Students"
        title="Course feedback"
        lede="Thank you for studying with us. Your reflections help us teach better, and we read every one."
      />
      <section className="px-page pb-(--space-section)" data-nav-theme="light" aria-label="Course feedback form">
        <div className="grid-page gap-y-16 border-t border-(--line) pt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <p className="type-l max-w-[20ch]">
              Tell us <em className="italic">how it went</em>
            </p>
            <p className="type-body-l mt-8 max-w-[46ch] text-ink/75">
              A few questions about your course, your teachers and what you are taking away with you.
            </p>
            <div className="mt-12">
              <MagneticButton href={site.forms.courseFeedback}>Open the feedback form</MagneticButton>
            </div>
          </div>
          <aside className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10">
            <div className="grid gap-6 lg:sticky lg:top-32">
              <p className="eyebrow text-ink/60">Something else?</p>
              <p className="text-ink/75">If you would rather speak with us directly, we are always glad to hear from you.</p>
              <a href={`mailto:${site.email}`} className="font-display text-[1.6rem] leading-tight">
                <span className="link-underline">{site.email}</span>
              </a>
              <ArrowLink href="/courses/">Explore courses</ArrowLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
