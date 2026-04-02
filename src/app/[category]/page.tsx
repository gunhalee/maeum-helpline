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

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  if (!isCategory(category)) {
    return {
      title: SITE_NAME,
      description: '한국 정신건강 헬프라인 정보 모음',
    }
  }

  const meta = CATEGORY_META[category]
  return {
    title: `${meta.label} — ${SITE_NAME}`,
    description: `${meta.label} 관련 한국 정신건강 헬프라인 정보 모음`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!isCategory(category)) {
    notFound()
  }

  const services = await getServices()
  const filtered = services.filter((service) => service.category.includes(category))
  const meta = CATEGORY_META[category]

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-8">
        <header>
          <h1 className="text-3xl font-semibold md:text-4xl">{meta.label}</h1>
          <div className="mt-3 h-px w-full bg-stone-200" />
        </header>

        <ServiceGrid services={filtered} groupByCategory={false} />
      </section>

      <footer className="border-t border-stone-200 bg-white/70 py-6">
        <div className="mx-auto max-w-5xl px-4 text-sm text-stone-500">
          <p>이 페이지는 공개 정보를 바탕으로 한 비공식 안내 자료입니다.</p>
          <p className="mt-1">
            긴급 위기 시 <span className="font-semibold text-red-600">109</span> 또는 119에
            전화하세요.
          </p>
        </div>
      </footer>
    </>
  )
}
