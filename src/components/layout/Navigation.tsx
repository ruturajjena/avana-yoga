'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { TransitionLink } from '@/components/motion/TransitionProvider';
import { primaryNav, type NavItem } from '@/data/navigation';
import { site } from '@/data/site';
import { ScrollTrigger } from '@/lib/gsap';
import { PAGE_REVEAL_EVENT } from '@/lib/page-ready';
import { cn, normalizePath } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { Logo } from './Logo';

export function Navigation() {
  const pathname = normalizePath(usePathname() ?? '/');
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const menuId = useId();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Theme follows the section under the bar; bar compresses and tucks away on fast downward scroll.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    let triggers: ScrollTrigger[] = [];

    const build = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
      root.dataset.navTheme = 'light';
      document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach((section) => {
        if (section === root) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'top 40px',
            end: 'bottom 40px',
            onToggle: (self) => {
              if (self.isActive) root.dataset.navTheme = section.dataset.navTheme ?? 'light';
            },
          }),
        );
      });
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll();
            header.dataset.compact = y > 48 ? 'true' : 'false';
            if (y < window.innerHeight * 0.75 || self.direction === -1) header.dataset.hidden = 'false';
            else if (self.getVelocity() > 350) header.dataset.hidden = 'true';
          },
        }),
      );
    };

    const frame = requestAnimationFrame(build);
    document.addEventListener(PAGE_REVEAL_EVENT, build);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener(PAGE_REVEAL_EVENT, build);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <header ref={headerRef} className="site-header" data-compact="false" data-hidden="false" data-menu-open={menuOpen ? 'true' : 'false'}>
      <div className="site-header__backdrop" aria-hidden="true" />
      <div className="site-header__bar relative z-20 flex items-center justify-between gap-6 px-page">
        <TransitionLink href="/" aria-label="Avana Yoga, home" className="flex items-center gap-3.5" onClick={closeMenu}>
          <Logo className="size-9 lg:size-10" preload />
          <span aria-hidden="true" className="site-wordmark hidden sm:block" />
        </TransitionLink>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-7 xl:gap-10">
            {primaryNav.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  open={dropdown === item.href}
                  onOpen={() => setDropdown(item.href)}
                  onClose={() => setDropdown((current) => (current === item.href ? null : current))}
                />
              ) : (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="eyebrow block py-3" aria-current={pathname === item.href ? 'page' : undefined}>
                    <span className="link-underline" data-active={pathname === item.href ? 'true' : undefined}>
                      {item.label}
                    </span>
                  </TransitionLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.links.enroll} target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:inline-flex">
            Enroll
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="flex h-11 items-center gap-3 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="eyebrow">{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="burger" data-open={menuOpen ? 'true' : 'false'} aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu id={menuId} open={menuOpen} onClose={closeMenu} pathname={pathname} burgerRef={burgerRef} />
    </header>
  );
}

type NavDropdownProps = { item: NavItem; pathname: string; open: boolean; onOpen: () => void; onClose: () => void };

function NavDropdown({ item, pathname, open, onOpen, onClose }: NavDropdownProps) {
  const panelId = useId();
  const active = pathname === item.href || Boolean(item.children?.some((child) => child.href === pathname));

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          onClose();
          event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus();
        }
      }}
    >
      <div className="flex items-center gap-1">
        <TransitionLink href={item.href} className="eyebrow block py-3" aria-current={pathname === item.href ? 'page' : undefined} onClick={onClose}>
          <span className="link-underline" data-active={active ? 'true' : undefined}>
            {item.label}
          </span>
        </TransitionLink>
        <button
          type="button"
          className="grid size-7 place-items-center"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Hide' : 'Show'} ${item.label} menu`}
          onClick={() => (open ? onClose() : onOpen())}
        >
          <svg aria-hidden="true" viewBox="0 0 10 6" className={cn('w-2.5 transition-transform duration-500', open && 'rotate-180')}>
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <div id={panelId} className="nav-panel absolute left-1/2 top-full -translate-x-1/2 pt-3" data-open={open ? 'true' : 'false'}>
        <div className="w-[27rem] border border-(--line) bg-cream p-3 text-ink">
          <ul>
            {item.children?.map((child, index) => (
              <li key={child.href}>
                <TransitionLink
                  href={child.href}
                  onClick={onClose}
                  aria-current={pathname === child.href ? 'page' : undefined}
                  className="flex items-baseline gap-5 px-4 py-4 transition-colors duration-500 hover:bg-sand/70 focus-visible:bg-sand/70"
                >
                  <span className="eyebrow nums-old text-ink/55">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.45rem] leading-tight">{child.label}</span>
                    <span className="mt-1 block text-[0.8rem] leading-snug text-ink/70">{child.meta}</span>
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
          <TransitionLink
            href={item.href}
            onClick={onClose}
            className="arrow-link eyebrow mt-2 flex items-center justify-between border-t border-(--line) px-4 pb-2 pt-4"
          >
            <span>All {item.label.toLowerCase()}</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </TransitionLink>
        </div>
      </div>
    </li>
  );
}
