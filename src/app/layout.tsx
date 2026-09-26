import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { Cursor } from '@/components/motion/Cursor';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { TransitionProvider } from '@/components/motion/TransitionProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreathFieldLoader } from '@/components/webgl/BreathFieldLoader';
import { site } from '@/data/site';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import './globals.css';

const display = Cormorant_Garamond({
  // Only the Latin files are preloaded; the extended-Latin faces (ā, ū, ṇ…) still load on demand via unicode-range.
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Avana Yoga: Yoga as it was always meant to be', template: '%s | Avana Yoga' },
  description: site.statement,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: site.name, locale: 'en_GB', type: 'website', images: [{ url: '/media/og/default.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#f8eada',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`} data-nav-theme="light" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main" className="skip-link" data-no-transition="">
          Skip to content
        </a>
        <SmoothScroll />
        <TransitionProvider>
          <Navigation />
          <BreathFieldLoader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
