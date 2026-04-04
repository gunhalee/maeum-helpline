import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceGrid from '@/components/ServiceGrid'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import { getServices } from '@/lib/notion'
import type { Category } from '@/lib/types'

interface Props {
  params: Promise<{ category: string }>
}

function isCategory(value: string): value is Category {
  return CATEGORY_ORDER.includes(value as Category)
}

export const revalidate = 3600

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((cat) => ({ category: cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://helpline.or.kr'
  const { category } = await params
  if (!isCategory(category)) {
    return {
      title: SITE_NAME,
      description: '한국 긴급상담 헬프라인 정보 모음',
    }
  }

  const meta = CATEGORY_META[category]
  const title = `${SITE_NAME} | ${meta.label}`
  const description = `${meta.label} 관련 한국 정신건강 서비스 모음. 전화번호, 운영시간, 이용 방법을 확인하세요.`
  const url = `${siteUrl}/${category}`

  return {
    title,
    description,
    alternates: {
      canonical: `/${category}`,
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
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

export default async function CategoryPage({ params }: Props) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://helpline.or.kr'
  const { category } = await params
  if (!isCategory(category)) {
    notFound()
  }

  const services = await getServices()
  const filtered = services.filter((service) => service.category.includes(category))
  const meta = CATEGORY_META[category]
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.label,
        item: `${siteUrl}/${category}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <section className="mx-auto w-[640px] max-w-full px-4 pb-12 pt-6">
        <ServiceGrid services={filtered} groupByCategory={false} />
      </section>
    </>
  )
}
