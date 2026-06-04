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
    starter: '처음엔 이렇게 말해도 돼요',
    checks: '상담원이 먼저 확인할 수 있어요',
    concerns: '걱정되는 점',
    details: '더 자세히 알고 싶다면',
    sources: '출처',
  },
  en: {
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
        className="mx-auto w-full max-w-[920px] px-4 pb-16 pt-6 md:px-6"
      >
        <header className="border-b border-stone-200 pb-8 pt-2 md:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {currentLang === 'en' ? 'Before you call' : '전화하기 전 확인'}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            <EmergencyText text={copy.intro} />
          </p>
          <p className="mt-4 max-w-3xl border-l-4 border-green-700 bg-green-50 px-4 py-3 text-sm leading-7 text-green-950">
            <EmergencyText text={copy.urgentNotice} />
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-stone-700">
            {copy.focusPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-stone-200 bg-white px-4 py-2"
              >
                <EmergencyText text={item} />
              </span>
            ))}
          </div>
        </header>

        <div className="mt-8 space-y-10">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              id={guide.slug}
              tabIndex={-1}
              className="scroll-mt-28 rounded-lg border border-stone-200 bg-white px-5 py-6 shadow-sm transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 md:px-8 md:py-7"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
                <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-800">
                  {guide.categoryLabel}
                </span>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-600">
                  {guide.serviceName}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-stone-900">
                {guide.title}
              </h2>
              <p className="mt-4 border-l-4 border-green-700 bg-green-50 px-4 py-3 text-base font-medium leading-8 text-green-950">
                <EmergencyText text={guide.summary} />
              </p>

              <section className="mt-5 rounded-lg border border-green-100 bg-green-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-green-950">
                  {labels.starter}
                </h3>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  {guide.starterPhrases.map((phrase) => (
                    <p
                      key={phrase}
                      className="rounded-md bg-white px-3 py-2 text-sm leading-6 text-stone-800"
                    >
                      “<EmergencyText text={phrase} />”
                    </p>
                  ))}
                </div>
              </section>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <section className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-4">
                  <h3 className="text-sm font-semibold text-stone-950">
                    {labels.checks}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                    {guide.counselorChecks.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                        <span>
                          <EmergencyText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-4">
                  <h3 className="text-sm font-semibold text-stone-950">
                    {labels.concerns}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                    {guide.concerns.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                        <span>
                          <EmergencyText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <details className="mt-5 rounded-lg border border-stone-200 bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-stone-800 marker:text-green-700">
                  {labels.details}
                </summary>
                <div className="mt-4 divide-y divide-stone-200">
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
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
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

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={withLang(`/${guide.category}`, currentLang)}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                >
                  {guide.ctaLabel}
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-500">
                  <span className="font-medium text-stone-600">
                    {labels.sources}
                  </span>
                  {guide.sourceLinks.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-green-700"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
