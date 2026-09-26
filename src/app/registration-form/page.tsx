import { MagneticButton } from '@/components/motion/MagneticButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/templates/PageHero';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Registration Form',
  description: 'Apply for an Avana Yoga teacher training course or retreat. Once you are accepted you will receive an email from us to confirm your reservation.',
  path: '/registration-form/',
  image: '/media/og/training.jpg',
});

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Registration Form"
        lede="To register our course please fill out the application form. Once you are accepted you will receive an email from us to confirm your reservation."
      />
      <section className="px-page pb-(--space-section)" data-nav-theme="light" aria-label="Registration form">
        <div className="grid-page gap-y-16 border-t border-(--line) pt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <p className="type-l max-w-[20ch]">
              Apply for <em className="italic">your training</em>
            </p>
            <p className="type-body-l mt-8 max-w-[46ch] text-ink/75">
              The form asks about you, your practice and the training you have in mind. It takes a few minutes, and you can
              pay your deposit as you apply or once your place is confirmed.
            </p>
            <div className="mt-12">
              <MagneticButton href={site.forms.teacherTraining}>Open the application form</MagneticButton>
            </div>
          </div>
          <aside className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10">
            <div className="grid gap-6 lg:sticky lg:top-32">
              <p className="eyebrow text-ink/60">Questions first?</p>
              <p className="text-ink/75">
                If you are unsure of your eligibility to book onto a training, please contact us for advice.
              </p>
              <a href={`mailto:${site.email}`} className="font-display text-[1.6rem] leading-tight">
                <span className="link-underline">{site.email}</span>
              </a>
              <ArrowLink href="/courses/">Explore courses</ArrowLink>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Registration Form', path: '/registration-form/' },
        ])}
      />
    </>
  );
}
