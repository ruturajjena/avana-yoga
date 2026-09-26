import { TransitionLink } from "@/components/motion/TransitionProvider";
import { ContactChannels } from "@/components/ui/ContactChannels";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { FooterWordmark } from "./FooterWordmark";
import { HideOnPaths } from "./HideOnPaths";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer overflow-clip bg-ink text-cream"
      data-nav-theme="dark"
    >
      <div className="px-page pt-(--space-section)">
        <div className="grid-page gap-y-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Logo className="size-12" />
            <p className="type-lede mt-10 max-w-[30ch] text-cream/90">
              {site.statement}
            </p>
            <ul
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
              aria-label="Avana Yoga on social media"
            >
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link eyebrow inline-flex min-h-11 items-center gap-2"
                  >
                    <span className="link-underline">{social.label}</span>
                    <span
                      className="arrow arrow--diag inline-block"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-4 grid grid-cols-2 gap-x-8 gap-y-12 md:col-span-8 lg:col-span-6 lg:col-start-7"
          >
            <FooterColumn title="Quick links" links={footerNav.quickLinks} />
            <FooterColumn title="Courses" links={footerNav.courses} />
          </nav>
        </div>

        <HideOnPaths paths={["/contact/"]}>
          <section
            aria-labelledby="footer-contact-title"
            className="grid-page mt-20 gap-y-10 border-t border-(--line-dark) pt-14"
          >
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <p className="eyebrow text-cream/60">Get in touch</p>
              <h2 id="footer-contact-title" className="type-l mt-5">
                Speak <em className="italic">with us</em>
              </h2>
              <p className="mt-5 max-w-[34ch] text-[1.02rem] leading-relaxed text-cream/70">
                We look forward to taking care of you with loving attention.
              </p>
              <a
                href={site.phone.href}
                className="mt-8 inline-flex min-h-11 items-center gap-3 text-cream/80 transition-colors hover:text-cream"
              >
                <span className="eyebrow text-cream/55">Call</span>
                <span className="link-underline font-display text-[1.3rem]">
                  {site.phone.display}
                </span>
                <span className="sr-only">: {site.phone.label}</span>
              </a>
            </div>
            <ContactChannels
              tone="dark"
              className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5"
            />
          </section>
        </HideOnPaths>
      </div>

      <FooterWordmark />

      <div className="flex flex-col gap-4 border-t border-(--line-dark) px-page py-6 text-cream/70 md:flex-row md:items-center md:justify-between">
        <p className="eyebrow">© {year} Avana Yoga</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {footerNav.legal.map((link) => (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                className="eyebrow inline-flex min-h-11 items-center transition-colors hover:text-cream"
              >
                <span className="link-underline">{link.label}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h2 className="eyebrow text-cream/60">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 text-[0.98rem] text-cream/85 transition-colors hover:text-cream"
              >
                <span className="link-underline">{link.label}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <TransitionLink
                href={link.href}
                className="inline-block py-1 text-[0.98rem] text-cream/85 transition-colors hover:text-cream"
              >
                <span className="link-underline">{link.label}</span>
              </TransitionLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
