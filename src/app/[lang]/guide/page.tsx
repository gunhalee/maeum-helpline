import Link from 'next/link'
import type { Metadata } from 'next'
import EmergencyText from '@/components/EmergencyText'
import GuideHashScroller from '@/components/GuideHashScroller'
import { SITE_NAME } from '@/lib/constants'
import { getGuidePageCopy, getGuides } from '@/lib/guides'
import { isLang, type Lang, withLang } from '@/lib/i18n'
import {
  getAlternateOpenGraphLocale,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
} from '@/lib/seo'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const { title, description } = getGuidePageCopy(currentLang)
  const url = getLocalizedUrl('/guide', currentLang)
  const keywords =
    currentLang === 'en'
      ? [
          'Korean helpline guide',
          'what happens when calling Korean hotlines',
          'Korea crisis support guide',
          'Korea counseling confidentiality',
          'Korea emergency counseling numbers',
        ]
      : [
          '상담 전화 가이드',
          '전화하기 전에 확인',
          '상담 비밀보장',
          '상담 비용 안내',
          '신고 없이 상담',
        ]

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
  const canonicalUrl = getLocalizedUrl('/guide', currentLang)
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.title,
    description: copy.description,
    url: canonicalUrl,
    inLanguage: currentLang === 'en' ? 'en' : 'ko-KR',
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
          description: guide.shortAnswer,
          about: guide.categoryLabel,
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
          <h1 className="mt-3 font-serif text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            <EmergencyText text={copy.intro} />
          </p>
          <p className="mt-4 max-w-3xl border-l-4 border-red-300 bg-red-50 px-4 py-3 text-sm leading-7 text-red-900">
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
          {guides.map((guide, index) => (
            <article
              key={guide.slug}
              id={guide.slug}
              tabIndex={-1}
              className="scroll-mt-28 rounded-lg border border-stone-200 bg-white px-5 py-6 shadow-sm transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 md:px-8 md:py-7"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
                <span className="font-mono text-xs font-semibold text-green-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
                <EmergencyText text={guide.shortAnswer} />
              </p>
              <p className="mt-5 text-base leading-8 text-stone-700">
                <EmergencyText text={guide.lead} />
              </p>

              <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
                {guide.sections.map((section) => (
                  <section key={section.id} className="py-5">
                    <h3 className="text-base font-semibold text-stone-950">
                      {section.title}
                    </h3>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-stone-700 md:text-[15px]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>
                          <EmergencyText text={paragraph} />
                        </p>
                      ))}
                      {section.list ? (
                        <ul className="space-y-2">
                          {section.list.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                              <span>
                                <EmergencyText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.example ? (
                        <div className="space-y-2 border-l-2 border-stone-300 pl-4 text-stone-600">
                          {section.example.map((item) => (
                            <p key={item}>
                              <EmergencyText text={item} />
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={withLang(`/${guide.category}`, currentLang)}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                >
                  {guide.ctaLabel}
                </Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-500">
                  <span className="font-medium text-stone-600">
                    {currentLang === 'en' ? 'Sources' : '출처'}
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
