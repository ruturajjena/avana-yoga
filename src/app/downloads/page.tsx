import { cookies } from 'next/headers';
import { DownloadsGate } from '@/components/forms/DownloadsGate';
import { PageHero } from '@/components/templates/PageHero';
import { DOWNLOADS_COOKIE, downloads, downloadsToken } from '@/lib/downloads';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Downloads',
  description: 'Course materials for Avana Yoga students.',
  path: '/downloads/',
  noindex: true,
});

export default async function DownloadsPage() {
  const secret = process.env.DOWNLOADS_PASSWORD;
  const token = (await cookies()).get(DOWNLOADS_COOKIE)?.value;
  const unlocked = Boolean(secret && token && token === downloadsToken(secret));

  return (
    <>
      <PageHero eyebrow="Students" title="Downloads" />
      <section className="px-page pb-(--space-section)" data-nav-theme="light">
        <div className="border-t border-(--line) pt-14">
          {unlocked ? (
            downloads.length ? (
              <ul className="border-t border-(--line)">
                {downloads.map((file) => (
                  <li key={file.href} className="border-b border-(--line)">
                    <a href={file.href} download className="arrow-link flex items-center justify-between gap-6 py-7">
                      <span>
                        <span className="type-s block">{file.title}</span>
                        {file.description ? <span className="mt-1 block text-ink/70">{file.description}</span> : null}
                      </span>
                      <span className="eyebrow flex items-center gap-3">
                        {file.size}
                        <span className="arrow" aria-hidden="true">
                          ↓
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="type-body-l max-w-[52ch] text-ink/75">
                There are no files published here yet. Please email info@avanayoga.com and we will share your course materials directly.
              </p>
            )
          ) : (
            <DownloadsGate />
          )}
        </div>
      </section>
    </>
  );
}
