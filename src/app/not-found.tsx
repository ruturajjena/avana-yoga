import type { Metadata } from 'next';
import { RevealText } from '@/components/motion/RevealText';
import { HoverList } from '@/components/ui/HoverList';
import { BreathSection } from '@/components/webgl/BreathSection';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <BreathSection
      state="seed"
      center={[0.78, 0.42]}
      data-nav-theme="light"
      aria-labelledby="not-found-title"
      className="flex min-h-svh flex-col justify-center px-page pb-(--space-block) pt-[calc(var(--nav-h)+4rem)]"
    >
      <p className="eyebrow">404</p>
      <RevealText as="h1" id="not-found-title" trigger="load" className="type-xl mt-6 max-w-[14ch]">
        This page could not be found.
      </RevealText>
      <HoverList
        className="mt-16 max-w-4xl"
        size="s"
        items={[
          { href: '/', title: 'Home' },
          { href: '/courses/', title: 'Courses' },
          { href: '/yoga-retreats/', title: 'Retreats' },
          { href: '/about/', title: 'About' },
          { href: '/contact/', title: 'Contact' },
        ]}
      />
    </BreathSection>
  );
}
