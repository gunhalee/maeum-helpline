import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ServiceGrid from '@/components/ServiceGrid'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import { normalizeLang, translateCategoryLabel } from '@/lib/i18n'
import { getServices } from '@/lib/notion'
import {
  getAlternateOpenGraphLocale,
  getCategorySeoCopy,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/seo'
import type { Category } from '@/lib/types'

interface Props {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ lang?: string }>
}

function isCategory(value: string): value is Category {
  return CATEGORY_ORDER.includes(value as Category)
}

export const revalidate = 3600

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((cat) => ({ category: cat }))
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category } = await params
  const lang = normalizeLang((await searchParams)?.lang)

  if (!isCategory(category)) {
    return {
      title: SITE_NAME,
      description:
        lang === 'en'
          ? 'Directory of Korean crisis helplines'
          : '한국 긴급상담 헬프라인 정보 모음',
    }
  }

  const { title, description } = getCategorySeoCopy(category, lang)
  const url = getLocalizedUrl(`/${category}`, lang)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(`/${category}`),
    },
    openGraph: {
      type: 'website',
      locale: getLocaleForMetadata(lang),
      alternateLocale: getAlternateOpenGraphLocale(lang),
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const lang = normalizeLang((await searchParams)?.lang)

  if (!isCategory(category)) {
    notFound()
  }

  const services = await getServices()
  const filtered = services.filter((service) => service.category.includes(category))
  const meta = CATEGORY_META[category]
  const { heading, description } = getCategorySeoCopy(category, lang)
  const canonicalUrl = getLocalizedUrl(`/${category}`, lang)
  const categoryLabel = translateCategoryLabel(meta.label, lang)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: `${SITE_URL}/`,
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
    inLanguage: lang === 'en' ? 'en' : 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filtered.length,
      itemListElement: filtered.slice(0, 12).map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Organization',
          name: service.name,
          description: service.description,
          url: service.url,
          telephone: service.phone,
        },
      })),
    },
  }
  const homeHref = lang === 'en' ? '/?lang=en' : '/'

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
      <section
        lang={lang}
        className="mx-auto w-[760px] max-w-full px-4 pb-12 pt-6 md:px-6"
      >
        <header className="rounded-[2rem] border border-stone-200 bg-stone-50 px-5 py-6 shadow-sm md:px-8 md:py-8">
          <Link
            href={homeHref}
            className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-800"
          >
            {lang === 'en' ? '← Back to home' : '← 홈으로'}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {lang === 'en'
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
              {lang === 'en'
                ? `${filtered.length} services listed`
                : `${filtered.length}개 기관 안내`}
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {lang === 'en'
                ? 'Phone numbers and hours'
                : '전화번호와 운영시간 확인'}
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2">
              {lang === 'en'
                ? 'Support scope and access notes'
                : '지원 대상과 이용 안내'}
            </span>
          </div>
        </header>
        <ServiceGrid services={filtered} groupByCategory={false} lang={lang} />
      </section>
    </>
  )
}
