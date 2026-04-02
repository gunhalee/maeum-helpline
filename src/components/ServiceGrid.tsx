import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
  groupByCategory?: boolean
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase()
}

function isAlwaysOpen(service: Service): boolean {
  const operatingHours = normalizeText(service.operatingHours ?? '')
  const hasTag = service.tags.some((tag) => {
    const normalizedTag = normalizeText(tag)
    return (
      normalizedTag.includes('24시간') ||
      normalizedTag.includes('24h') ||
      normalizedTag.includes('상시운영')
    )
  })

  return (
    hasTag ||
    operatingHours.includes('24시간') ||
    operatingHours.includes('24h') ||
    operatingHours.includes('상시운영')
  )
}

function getPriority(service: Service): number {
  if (service.isEmergency) return 0
  if (isAlwaysOpen(service)) return 1
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

export default function ServiceGrid({ services, groupByCategory = true }: Props) {
  const orderedServices = sortByPriority(services)

  if (services.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-stone-200 bg-white p-6 text-center text-stone-500">
        등록된 서비스가 아직 없습니다. Notion 데이터베이스에 항목을 추가해 주세요.
      </p>
    )
  }

  if (!groupByCategory) {
    return (
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orderedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
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
              {meta.label}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
