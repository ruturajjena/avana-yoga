import type { Metadata } from 'next';
import type { Course } from '@/data/courses';
import type { Retreat } from '@/data/retreats';
import { site } from '@/data/site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  canonical?: string;
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = '/media/og/default.jpg',
  imageAlt = 'Avana Yoga',
  noindex = false,
  canonical,
  absoluteTitle = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = canonical ?? path;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];
  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? { type: 'article', url, title, description, siteName: site.name, locale: 'en_GB', images, publishedTime, modifiedTime }
      : { type: 'website', url, title, description, siteName: site.name, locale: 'en_GB', images };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export const organizationId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/media/brand/avana-yoga-logo.png`,
    description: site.statement,
    email: site.email,
    telephone: '+44 7514 196466',
    sameAs: site.socials.map((s) => s.href),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer service', email: site.email, telephone: '+44 7514 196466', areaServed: 'GB' },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    publisher: { '@id': organizationId },
    inLanguage: 'en-GB',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}

/** Course schema built only from published facts: no invented dates, modes or prices. */
export function courseSchema(course: Course) {
  const url = `${site.url}${course.href}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.seo.description,
    url,
    inLanguage: 'en',
    provider: { '@id': organizationId },
    hasCourseInstance: course.schema.locations.map((location) => ({
      '@type': 'CourseInstance',
      location: { '@type': 'Place', name: location },
      ...(course.schema.startDate ? { startDate: course.schema.startDate } : {}),
    })),
    ...(course.schema.price
      ? { offers: { '@type': 'Offer', price: course.schema.price, priceCurrency: 'GBP', category: 'Paid', url } }
      : {}),
  };
}

/** Retreats have no published dates, so they are described as a TouristTrip with their published packages. */
export function tripSchema(retreat: Retreat) {
  const url = `${site.url}${retreat.href}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: retreat.title,
    description: retreat.seo.description,
    url,
    provider: { '@id': organizationId },
    itinerary: { '@type': 'Place', name: retreat.region.replace(' · ', ', ') },
    offers: retreat.booking.packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: Number(pkg.price.replace(/[^\d.]/g, '')),
      priceCurrency: 'GBP',
      url: retreat.booking.href,
    })),
  };
}
