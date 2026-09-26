import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Preserve the WordPress URL shape (every live URL ends with "/").
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920, 2400],
    imageSizes: [96, 160, 240, 320, 480, 640],
    qualities: [60, 70, 75, 80, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // Live site: /course/ → 301 → /courses/
      { source: '/course', destination: '/courses/', permanent: true },
      { source: '/course/', destination: '/courses/', permanent: true },
      // Live /courses/ "Learn More" pointed at /cpd (404). Repair it.
      { source: '/cpd', destination: '/continuing-education/', permanent: true },
      { source: '/cpd/', destination: '/continuing-education/', permanent: true },
      // Online classes and courses withdrawn (2026-09): the client does not offer them.
      { source: '/online-yoga-courses', destination: '/courses/', permanent: true },
      { source: '/online-yoga-courses/', destination: '/courses/', permanent: true },
      { source: '/online-yoga-classes', destination: '/yoga-classes/', permanent: true },
      { source: '/online-yoga-classes/', destination: '/yoga-classes/', permanent: true },
      { source: '/online-yoga', destination: '/blogs/', permanent: true },
      { source: '/online-yoga/', destination: '/blogs/', permanent: true },
      // Yoga Styles and the Pregnancy Yoga pages withdrawn with them (2026-09).
      { source: '/yoga-styles', destination: '/yoga-classes/', permanent: true },
      { source: '/yoga-styles/', destination: '/yoga-classes/', permanent: true },
      { source: '/pregnancy-yoga', destination: '/courses/', permanent: true },
      { source: '/pregnancy-yoga/', destination: '/courses/', permanent: true },
      { source: '/pyc', destination: '/courses/', permanent: true },
      { source: '/pyc/', destination: '/courses/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
