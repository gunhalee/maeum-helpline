import Link from 'next/link'
import type { Metadata } from 'next'
import EmergencyText from '@/components/EmergencyText'
import GuideHashScroller from '@/components/GuideHashScroller'
import { SITE_NAME } from '@/lib/constants'
import { getGuidePageCopy, getGuides } from '@/lib/guides'
import { isLang, type Lang, withLang } from '@/lib/i18n'
import {
  SEO_CONTENT_UPDATED_AT,
  getAlternateOpenGraphLocale,
  getGuideSeoKeywords,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
} from '@/lib/seo'

interface Props {
  params: Promise<{ lang: string }>
}

const GUIDE_PAGE_LABELS = {
  ko: {
    contents: '상황별 목차',
    backToContents: '목차로 돌아가기',
    starter: '처음엔 이렇게 말해도 돼요',
    checks: '상담원이 먼저 확인할 수 있는 내용',
    concerns: '걱정되는 점',
    details: '자세히 보기',
    sources: '출처',
  },
  en: {
    contents: 'Find a guide',
    backToContents: 'Back to contents',
    starter: 'You can start with this',
    checks: 'A counselor may first check',
    concerns: 'Common worries',
    details: 'More details',
    sources: 'Sources',
  },
} as const satisfies Record<Lang, Record<string, string>>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const { title, description } = getGuidePageCopy(currentLang)
  const url = getLocalizedUrl('/guide', currentLang)
  const keywords = getGuideSeoKeywords(currentLang)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('/guide'),
    },
    openGraph: {
      type: 'website',
      locale: getLocaleForMetadata(currentLang),
      alternateLocale: getAlternateOpenGraphLocale(currentLang),
      url,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function LocalizedGuidePage({ params }: Props) {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const copy = getGuidePageCopy(currentLang)
  const guides = getGuides(currentLang)
  const labels = GUIDE_PAGE_LABELS[currentLang]
  const canonicalUrl = getLocalizedUrl('/guide', currentLang)
  const keywords = getGuideSeoKeywords(currentLang)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: getLocalizedUrl('/', currentLang),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentLang === 'en' ? 'Guides' : '가이드',
        item: canonicalUrl,
      },
    ],
  }
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.title,
    description: copy.description,
    url: canonicalUrl,
    inLanguage: currentLang === 'en' ? 'en' : 'ko-KR',
    dateModified: SEO_CONTENT_UPDATED_AT,
    keywords: keywords.join(', '),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: getLocalizedUrl('/', currentLang),
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          '@id': `${canonicalUrl}#${guide.slug}`,
          headline: guide.title,
          description: guide.summary,
          about: guide.categoryLabel,
          inLanguage: currentLang === 'en' ? 'en' : 'ko-KR',
          isAccessibleForFree: true,
          dateModified: SEO_CONTENT_UPDATED_AT,
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: getLocalizedUrl('/', currentLang),
          },
        },
      })),
    },
  }

  return (
    <>
      <GuideHashScroller />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <section
        lang={currentLang}
        className="mx-auto w-full max-w-[920px] px-[12px] pb-12 pt-6 sm:px-6"
      >
        <header className="border-b border-stone-200 pb-6 pt-2">
          <h1 className="text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            <EmergencyText text={copy.intro} />
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-700">
            <EmergencyText text={copy.urgentNotice} />
          </p>
          <nav
            id="guide-contents"
            tabIndex={-1}
            aria-labelledby="guide-contents-title"
            className="scroll-target mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            <h2 id="guide-contents-title" className="text-base font-semibold text-stone-900">
              {labels.contents}
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-6">
              {guides.map((guide) => (
                <li key={guide.slug} className="max-w-full">
                  <a
                    href={`#${guide.slug}`}
                    data-guide-anchor
                    className="inline-flex min-h-[44px] items-center py-2 text-sm font-medium text-green-800 underline underline-offset-4 hover:text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                  >
                    {guide.categoryLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="divide-y divide-stone-200">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              id={guide.slug}
              tabIndex={-1}
              aria-labelledby={`${guide.slug}-title`}
              className="scroll-target py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              <p className="text-sm font-medium leading-6 text-stone-600">
                <EmergencyText text={guide.serviceName} />
              </p>
              <h2 id={`${guide.slug}-title`} className="mt-2 text-2xl font-semibold leading-tight text-stone-900">
                {guide.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-stone-700">
                <EmergencyText text={guide.summary} />
              </p>
              <Link
                href={withLang(`/${guide.category}`, currentLang)}
                className="mt-3 inline-flex min-h-[44px] max-w-full items-center py-2 text-sm font-medium text-green-800 underline underline-offset-4 hover:text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                {guide.ctaLabel}
              </Link>

              <section className="mt-5">
                <h3 className="text-sm font-semibold text-stone-950">
                  {labels.starter}
                </h3>
                <div className="mt-2 space-y-3 text-sm leading-6 text-stone-800">
                  {guide.starterPhrases.map((phrase) => (
                    <p key={phrase}>“<EmergencyText text={phrase} />”</p>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <h3 className="text-sm font-semibold text-stone-950">
                  {labels.concerns}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                  {guide.concerns.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                      <span>
                        <EmergencyText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-5">
                <h3 className="text-sm font-semibold text-stone-950">
                  {labels.checks}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                  {guide.counselorChecks.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                      <span><EmergencyText text={item} /></span>
                    </li>
                  ))}
                </ul>
              </section>

              <details className="mt-5 border-t border-stone-200">
                <summary className="cursor-pointer py-3 text-sm font-semibold text-stone-800 marker:text-green-700">
                  {labels.details}
                </summary>
                <div className="divide-y divide-stone-200 pb-3">
                  {guide.details.map((detail) => (
                    <section
                      key={detail.title}
                      className="py-4 first:pt-0 last:pb-0"
                    >
                      <h3 className="text-sm font-semibold text-stone-950">
                        {detail.title}
                      </h3>
                      {detail.body ? (
                        <div className="mt-2 space-y-2 text-sm leading-6 text-stone-700">
                          {detail.body.map((paragraph) => (
                            <p key={paragraph}>
                              <EmergencyText text={paragraph} />
                            </p>
                          ))}
                        </div>
                      ) : null}
                      {detail.list ? (
                        <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-700">
                          {detail.list.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                              <span>
                                <EmergencyText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </details>

              <div className="border-t border-stone-200 pt-3 text-sm text-stone-600">
                {guide.sourceLinks.length > 0 ? (
                  <section>
                    <h3 className="font-semibold">{labels.sources}</h3>
                    <ul className="mt-1">
                      {guide.sourceLinks.map((source) => (
                        <li key={source.href}>
                          <a
                            href={source.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block py-2 underline underline-offset-4 hover:text-green-700"
                          >
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                <a
                  href="#guide-contents"
                  data-guide-anchor
                  className="mt-2 flex min-h-[44px] w-fit max-w-full items-center py-2 font-medium text-green-800 underline underline-offset-4 hover:text-green-950"
                >
                  {labels.backToContents}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
