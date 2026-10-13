import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StructuredInfo from '@/components/StructuredInfo'
import ServiceGrid from '@/components/ServiceGrid'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import { getCategoryEditorial } from '@/lib/editorial'
import { getGuideAnchorForCategory } from '@/lib/guides'
import {
  getContentUpdatedAt,
  getLanguageAlternates,
  getAlternateOpenGraphLocale,
  getCategorySeoCopy,
  getLocaleForMetadata,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/seo'
import { getServices } from '@/lib/notion'
import { isServiceAlwaysOpen } from '@/lib/service-hours'
import {
  isLang,
  SUPPORTED_LANGS,
  translateCategoryLabel,
  type Lang,
  withLang,
} from '@/lib/i18n'
import type { Category, Service } from '@/lib/types'

interface Props {
  params: Promise<{ lang: string; category: string }>
}

const ALL_DAYS = [
  'https://schema.org/Monday',
  'https://schema.org/Tuesday',
  'https://schema.org/Wednesday',
  'https://schema.org/Thursday',
  'https://schema.org/Friday',
  'https://schema.org/Saturday',
  'https://schema.org/Sunday',
] as const

function isCategory(value: string): value is Category {
  return CATEGORY_ORDER.includes(value as Category)
}

function getAvailableLanguages(service: Service): string[] | undefined {
  const normalized = service.languages
    .map((language) => {
      const value = language.trim()

      if (!value || value === '다국어') return null
      if (value === 'ko' || value === '한국어') return 'Korean'
      if (value === 'en' || value === '영어') return 'English'

      return value
    })
    .filter((value): value is string => Boolean(value))

  return normalized.length > 0 ? [...new Set(normalized)] : undefined
}

function getHoursAvailable(service: Service) {
  if (!isServiceAlwaysOpen(service)) {
    return undefined
  }

  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ALL_DAYS,
      opens: '00:00',
      closes: '23:59',
    },
  ]
}

function buildOrganizationSchema(
  service: Service,
  index: number,
  categoryLabel: string,
  categoryUrl: string,
  lang: Lang
) {
  const organizationId = `${categoryUrl}#org-${service.id || index + 1}`
  const availableLanguage = getAvailableLanguages(service) ?? ['Korean']
  const hoursAvailable = getHoursAvailable(service)
  const areaServed = service.region || 'KR'
  const keywords = [
    ...new Set([...service.situationKeywords, ...service.searchIntents]),
  ]
  const additionalProperty = [
    service.sourceType
      ? {
          '@type': 'PropertyValue',
          name: 'source type',
          value: service.sourceType,
        }
      : null,
    service.sourcePriority
      ? {
          '@type': 'PropertyValue',
          name: 'source priority',
          value: service.sourcePriority,
        }
      : null,
  ].filter(Boolean)
  const contactType =
    lang === 'en' ? `${categoryLabel} counseling` : `${categoryLabel} 상담`

  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: service.name,
    description: service.seoDescription || service.description || undefined,
    url: service.url || undefined,
    telephone: service.phone || undefined,
    areaServed,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    knowsAbout: keywords.length > 0 ? keywords : undefined,
    dateModified: service.lastVerified,
    additionalProperty:
      additionalProperty.length > 0 ? additionalProperty : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType,
        telephone: service.phone || undefined,
        url: service.url || undefined,
        areaServed,
        availableLanguage,
        hoursAvailable,
      },
    ],
  }
}

export const revalidate = 300

export async function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    CATEGORY_ORDER.map((category) => ({ lang, category }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'

  if (!isCategory(category)) {
    return {
      title: SITE_NAME,
      description:
        currentLang === 'en'
          ? 'Directory of Korean crisis helplines'
          : '한국 긴급상담 헬프라인 정보 모음',
    }
  }

  const { title, description, keywords } = getCategorySeoCopy(category, currentLang)
  const url = getLocalizedUrl(`/${category}`, currentLang)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(`/${category}`),
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

export default async function LocalizedCategoryPage({ params }: Props) {
  const { lang, category } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'

  if (!isCategory(category)) {
    notFound()
  }

  const services = await getServices()
  const filtered = services.filter((service) => service.category.includes(category))
  const meta = CATEGORY_META[category]
  const {
    heading,
    description,
    keywords,
    searchIntents,
    primaryServices,
  } = getCategorySeoCopy(category, currentLang)
  const editorial = getCategoryEditorial(category, currentLang)
  const canonicalUrl = getLocalizedUrl(`/${category}`, currentLang)
  const categoryLabel = translateCategoryLabel(meta.label, currentLang)
  const organizationSchemas = filtered.map((service, index) =>
    buildOrganizationSchema(
      service,
      index,
      categoryLabel,
      canonicalUrl,
      currentLang
    )
  )
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
        name: categoryLabel,
        item: canonicalUrl,
      },
    ],
  }
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heading,
    description,
    url: canonicalUrl,
    inLanguage: currentLang === 'en' ? 'en' : 'ko-KR',
    dateModified: getContentUpdatedAt(`/${category}`),
    keywords: keywords.join(', '),
    about: primaryServices.map((name) => ({
      '@type': 'Thing',
      name,
    })),
    audience: {
      '@type': 'Audience',
      audienceType:
        currentLang === 'en'
          ? `${categoryLabel} support seekers in Korea`
          : `${categoryLabel} 지원이 필요한 사람`,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filtered.length,
      itemListElement: organizationSchemas.slice(0, 12).map((organization, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': organization['@id'],
        },
      })),
    },
  }
  const organizationGraphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': organizationSchemas.map((organization) => {
      const knowsAbout = [
        ...new Set([...(organization.knowsAbout ?? []), ...searchIntents]),
      ]

      return {
        ...organization,
        knowsAbout,
      }
    }),
  }

  return (
    <>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationGraphJsonLd),
        }}
      />
      <section
        lang={currentLang}
        className="mx-auto w-full max-w-[860px] px-3 pb-12 pt-7 sm:px-4 md:px-6 md:pt-9"
      >
        <header>
          <h1 className="text-2xl font-bold leading-snug tracking-[-0.035em] text-stone-900 md:text-3xl">
            {editorial.title ?? heading}
          </h1>
          <div className="mt-5">
            <StructuredInfo items={editorial.summary} emergencyLinks wideLabels />
          </div>
        </header>
        <ServiceGrid
          services={filtered}
          groupByCategory={false}
          lang={currentLang}
        />
        <div className="mt-6 border-t border-stone-200 pt-4">
          {editorial.paragraphs.length > 0 ? (
            <section>
              <h2 className="text-base font-semibold leading-relaxed text-stone-900">
                {editorial.detailsHeading}
              </h2>
              <div className="mt-4">
                <StructuredInfo items={editorial.paragraphs} emergencyLinks wideLabels />
              </div>
            </section>
          ) : null}
          <Link
            href={withLang(
              `/guide#${getGuideAnchorForCategory(category)}`,
              currentLang
            )}
            scroll={false}
            className="mt-3 inline-flex min-h-11 items-center rounded-lg py-2 text-base font-medium text-green-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            {currentLang === 'en'
              ? 'Help with contacting a service'
              : '연락하기 전 도움 요청 가이드'}
          </Link>
        </div>
      </section>
    </>
  )
}
