import { MagneticButton } from '@/components/motion/MagneticButton';
import { RevealText } from '@/components/motion/RevealText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { BreathSection } from '@/components/webgl/BreathSection';

type ClosingCallProps = {
  eyebrow?: string;
  /** Defaults to the site's own line: “Your journey begins here.” */
  heading?: string;
  text?: string;
  cta: { label: string; href: string };
  links?: { label: string; href: string }[];
  id?: string;
};

/** End-of-page invitation: rings contract to a point, one magnetic call to action. */
export function ClosingCall({ eyebrow, heading = 'Your journey begins here.', text, cta, links = [], id = 'closing-title' }: ClosingCallProps) {
  return (
    <BreathSection state="seed" center={[0.5, 0.48]} data-nav-theme="light" aria-labelledby={id} className="px-page pb-(--space-section)">
      <div className="flex flex-col items-center border-t border-(--line) pt-(--space-section) text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <RevealText as="h2" id={id} className="type-xl mx-auto mt-8 max-w-[12ch]">
          {heading}
        </RevealText>
        {text ? <p className="mx-auto mt-10 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink/75">{text}</p> : null}
        <div className="mt-14">
          <MagneticButton href={cta.href} size="lg">
            {cta.label}
          </MagneticButton>
        </div>
        {links.length ? (
          <ul className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <ArrowLink href={link.href}>{link.label}</ArrowLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </BreathSection>
  );
}
