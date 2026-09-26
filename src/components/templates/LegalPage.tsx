import { JsonLd } from '@/components/seo/JsonLd';
import type { LegalDocument } from '@/data/legal';
import { breadcrumbSchema } from '@/lib/seo';
import { padIndex } from '@/lib/utils';
import { PageHero } from './PageHero';

export function LegalPage({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} lede={doc.intro[0]} />
      <div className="px-page pb-(--space-section)">
        <div className="grid-page gap-y-14 border-t border-(--line) pt-14">
          <nav aria-label="On this page" className="col-span-4 md:col-span-8 lg:col-span-3">
            <ol className="grid gap-3 lg:sticky lg:top-32">
              {doc.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="flex gap-4 text-[0.95rem]">
                    <span className="nums-old text-ink/55">{padIndex(index + 1)}</span>
                    <span className="link-underline">{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="col-span-4 grid gap-14 md:col-span-8 lg:col-span-7 lg:col-start-5">
            {doc.intro.slice(1).map((paragraph) => (
              <p key={paragraph} className="type-body-l text-charcoal">
                {paragraph}
              </p>
            ))}
            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="border-b border-(--line) pb-14">
                <h2 id={`${section.id}-title`} className="type-s flex gap-5">
                  <span className="eyebrow nums-old pt-3 text-ink/55">{padIndex(index + 1)}</span>
                  <span>{section.heading}</span>
                </h2>
                <div className="prose-avana mt-7">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.listIntro ? <p>{section.listIntro}</p> : null}
                  {section.list ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: doc.title, path },
        ])}
      />
    </>
  );
}
