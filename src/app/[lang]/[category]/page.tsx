import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceGrid from '@/components/ServiceGrid'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import {
  getLanguageAlternates,
  getAlternateOpenGraphLocale,
  getCategorySeoCopy,
  getLocaleForMetadata,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/seo'
import { getServices } from '@/lib/notion'
import {
  isLang,
  SUPPORTED_LANGS,
  translateCategoryLabel,
  type Lang,
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
  if (service.hoursType !== '24h') {
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
  const availableLanguage = getAvailableLanguages(service)
  const hoursAvailable = getHoursAvailable(service)
  const contactType =
    lang === 'en' ? `${categoryLabel} counseling` : `${categoryLabel} 상담`

  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: service.name,
    description: service.description || undefined,
    url: service.url || undefined,
    telephone: service.phone || undefined,
    areaServed: service.region || undefined,
    keywords:
      service.situationKeywords.length > 0
        ? service.situationKeywords.join(', ')
        : undefined,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType,
        telephone: service.phone || undefined,
        url: service.url || undefined,
        areaServed: service.region || undefined,
        availableLanguage,
        hoursAvailable,
      },
    ],
  }
}

export const revalidate = 3600

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

  const { title, description } = getCategorySeoCopy(category, currentLang)
  const url = getLocalizedUrl(`/${category}`, currentLang)

  return {
    title,
    description,
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
      card: 'summary',
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
  const { heading, description } = getCategorySeoCopy(category, currentLang)
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
    '@graph': organizationSchemas,
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
        className="mx-auto w-[760px] max-w-full px-4 pb-12 pt-6 md:px-6"
      >
        <header className="rounded-[2rem] border border-stone-200 bg-stone-50 px-5 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {currentLang === 'en'
              ? 'Korean crisis support directory'
              : '한국 위기 지원 디렉터리'}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {heading}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-stone-700">
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {currentLang === 'en'
                ? `${filtered.length} services listed`
                : `${filtered.length}개 기관 안내`}
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {currentLang === 'en'
                ? 'Phone numbers and hours'
                : '전화번호와 운영시간 확인'}
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {currentLang === 'en'
                ? 'Support scope and access notes'
                : '지원 대상과 이용 안내'}
            </span>
          </div>
        </header>
        <ServiceGrid
          services={filtered}
          groupByCategory={false}
          lang={currentLang}
        />
      </section>
    </>
  )
}
