import Link from 'next/link'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import ResultCard from '@/components/ResultCard'
import type { Service } from '@/lib/types'
import { translateCategoryLabel, translateStatusNote, withLang, type Lang } from '@/lib/i18n'
import { isServiceAlwaysOpen } from '@/lib/service-hours'

interface Props {
  services: Service[]
  groupByCategory?: boolean
  lang?: Lang
}

function getPriority(service: Service): number {
  if (service.isEmergency) return 0
  if (isServiceAlwaysOpen(service)) return 1
  return 2
}

function sortByPriority(services: Service[]): Service[] {
  return [...services].sort((a, b) => {
    const priorityDiff = getPriority(a) - getPriority(b)
    if (priorityDiff !== 0) {
      return priorityDiff
    }
    return a.name.localeCompare(b.name, 'ko')
  })
}

function serviceToCardProps(service: Service, lang: Lang) {
  const is24h = isServiceAlwaysOpen(service)

  return {
    name: service.name,
    phone: service.phone,
    url: service.url,
    description: service.description,
    is24h,
    note: translateStatusNote(is24h ? '24시간' : service.hoursDetail || service.operatingHours || '운영시간 확인 필요', lang),
    metaParts: [],
    lang,
  }
}

export default function ServiceGrid({
  services,
  groupByCategory = true,
  lang = 'ko',
}: Props) {
  const orderedServices = sortByPriority(services)

  if (services.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-center text-stone-600">
        <p>
          {lang === 'en'
            ? 'No services are listed yet. You can use the guide to find support.'
            : '아직 등록된 상담기관이 없습니다. 가이드에서 상담처를 확인할 수 있습니다.'}
        </p>
        <Link
          href={withLang('/guide', lang)}
          className="mt-3 inline-flex min-h-[44px] items-center rounded-lg px-3 font-medium text-green-800 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          {lang === 'en' ? 'Open the guide →' : '가이드에서 보기 →'}
        </Link>
      </div>
    )
  }

  if (!groupByCategory) {
    return (
      <section className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-4">
        {orderedServices.map((service) => (
          <ResultCard key={service.id} {...serviceToCardProps(service, lang)} />
        ))}
      </section>
    )
  }

  return (
    <div className="mt-6 space-y-8">
      {CATEGORY_ORDER.map((category) => {
        const items = orderedServices.filter((service) =>
          service.category.includes(category)
        )
        if (items.length === 0) {
          return null
        }

        const meta = CATEGORY_META[category]
        return (
          <section key={category}>
            <h2 className="mb-3 text-xl font-semibold text-stone-800">
              {translateCategoryLabel(meta.label, lang)}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-4">
              {items.map((service) => (
                <ResultCard key={service.id} {...serviceToCardProps(service, lang)} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
