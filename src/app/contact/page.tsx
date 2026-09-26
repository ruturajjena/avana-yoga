import { MagneticButton } from '@/components/motion/MagneticButton';
import { RevealText } from '@/components/motion/RevealText';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { BreathSection } from '@/components/webgl/BreathSection';
import { site } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact: Begin Your Journey',
  description: 'Get in touch with Avana Yoga by email, phone or WhatsApp. We look forward to taking care of you with loving attention.',
  path: '/contact/',
  image: '/media/og/community.jpg',
});

export default function ContactPage() {
  return (
    <>
      <BreathSection
        state="seed"
        center={[0.76, 0.45]}
        data-nav-theme="light"
        className="px-page pb-(--space-block) pt-[calc(var(--nav-h)+clamp(3rem,10vh,8rem))]"
      >
        <p className="eyebrow">Our Contact</p>
        <h1 className="mt-6" aria-label="Begin your journey.">
          <RevealText as="span" trigger="load" className="type-mega block">
            Begin
          </RevealText>
          <RevealText as="span" trigger="load" delay={0.1} className="type-mega block pl-[14vw] italic">
            your
          </RevealText>
          <RevealText as="span" trigger="load" delay={0.2} className="type-mega block">
            journey.
          </RevealText>
        </h1>
        <div className="grid-page mt-14">
          <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-8">
            <h2 className="type-s">Get in touch.</h2>
            <p className="type-body-l mt-4 text-ink/75">We look forward to taking care of you with loving attention.</p>
          </div>
        </div>
      </BreathSection>

      <section className="px-page pb-(--space-section)" data-nav-theme="light" aria-labelledby="contact-form-title">
        <div className="grid-page gap-y-20 border-t border-(--line) pt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 id="contact-form-title" className="eyebrow">
              Contact Us
            </h2>
            <p className="type-l mt-8 max-w-[18ch]">
              Send us <em className="italic">an enquiry</em>
            </p>
            <p className="type-body-l mt-8 max-w-[44ch] text-ink/75">
              Whether you are curious about a class, a retreat or beginning your teacher training, tell us a little about
              yourself and we will take it from there.
            </p>
            <div className="mt-12">
              <MagneticButton href={site.forms.enquiry}>Open the enquiry form</MagneticButton>
            </div>
          </div>

          <aside className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9" aria-label="Direct contact details">
            <h2 className="eyebrow">Speak with us</h2>
            <ContactChannels layout="stack" className="mt-6" />
            <dl className="mt-10">
              <ContactLine term="Call" value={site.phone.display} href={site.phone.href} note={site.phone.label} />
            </dl>
            <div className="mt-16 border-t border-(--line) pt-10">
              <h2 className="eyebrow">Connect With Us</h2>
              <SocialLinks className="mt-6" />
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Avana Yoga',
            url: `${site.url}/contact/`,
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact/' },
          ]),
        ]}
      />
    </>
  );
}

function ContactLine({ term, value, href, note, external }: { term: string; value: string; href: string; note?: string; external?: boolean }) {
  return (
    <div>
      <dt className="eyebrow text-ink/60">{term}</dt>
      <dd className="mt-3">
        <a href={href} className="font-display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-tight" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <span className="link-underline">{value}</span>
          {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
        {note ? <p className="mt-1 text-sm text-ink/65">{note}</p> : null}
      </dd>
    </div>
  );
}
