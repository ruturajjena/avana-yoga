import { RevealText } from '@/components/motion/RevealText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { BreathSection } from '@/components/webgl/BreathSection';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Thank You',
  description: 'Thank you for contacting Avana Yoga. We will get in touch soon.',
  path: '/thank-you/',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <BreathSection state="seed" data-nav-theme="light" className="flex min-h-svh flex-col justify-center px-page pb-(--space-block) pt-[calc(var(--nav-h)+4rem)]">
      <p className="eyebrow">Thank you</p>
      <RevealText as="h1" trigger="load" className="type-xl mt-6 max-w-[14ch]">
        We will get in touch soon
      </RevealText>
      <p className="type-lede mt-8 max-w-[40ch] text-ink/75">We look forward to taking care of you with loving attention.</p>

      <div className="mt-16 grid gap-10 border-t border-(--line) pt-10 md:grid-cols-3">
        <div>
          <p className="eyebrow text-ink/60">{site.phone.label}</p>
          <a href={site.phone.href} className="mt-3 inline-block font-display text-[1.8rem]">
            <span className="link-underline">{site.phone.display}</span>
          </a>
        </div>
        <div>
          <p className="eyebrow text-ink/60">Email</p>
          <a href={`mailto:${site.email}`} className="mt-3 inline-block font-display text-[1.8rem]">
            <span className="link-underline">{site.email}</span>
          </a>
        </div>
        <div>
          <p className="eyebrow text-ink/60">Connect With Us</p>
          <SocialLinks className="mt-5" />
        </div>
      </div>
      <ArrowLink href="/" className="mt-14">
        Return home
      </ArrowLink>
    </BreathSection>
  );
}
