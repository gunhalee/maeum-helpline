import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { getGuidePageCopy, getGuides } from '@/lib/editorial'
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
          'Korean crisis guides',
          'help-seeking guide Korea',
          'depression support Korea',
          'violence safety guide Korea',
          'addiction support Korea',
        ]
      : [
          '도움 요청 가이드',
          '긴급상담 이용 방법',
          '우울 상담 가이드',
          '폭력 피해 대응 가이드',
          '중독 상담 가이드',
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
          description: guide.description,
          about: guide.categoryLabel,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <section
        lang={currentLang}
        className="mx-auto w-full max-w-[860px] px-4 pb-14 pt-6 md:px-6"
      >
        <header className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {currentLang === 'en' ? 'Help-seeking guides' : '도움 요청 가이드'}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            {copy.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-stone-700">
            {copy.focusPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-6 space-y-5">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              id={guide.slug}
              className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">
                  {guide.categoryLabel}
                </span>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-600">
                  {currentLang === 'en' ? 'Practical guide' : '실전 가이드'}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-stone-900">
                {guide.title}
              </h2>
              <p className="mt-3 text-base leading-8 text-stone-600">
                {guide.description}
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700 md:text-[15px]">
                {guide.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <h3 className="text-sm font-semibold text-stone-900">
                  {currentLang === 'en' ? 'What to do first' : '먼저 해볼 일'}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-700">
                  {guide.checklist.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href={withLang(`/${guide.category}`, currentLang)}
                  className="inline-flex items-center rounded-full border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
                >
                  {currentLang === 'en'
                    ? `Open ${guide.categoryLabel} directory`
                    : `${guide.categoryLabel} 디렉터리 보기`}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
