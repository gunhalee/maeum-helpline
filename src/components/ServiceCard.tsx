import { DEFAULT_TAG_STYLE, TAG_STYLES } from '@/lib/constants'
import type { Service } from '@/lib/types'

interface Props {
  service: Service
}

export default function ServiceCard({ service }: Props) {
  const normalizeText = (value: string) => value.replace(/\s+/g, '').toLowerCase()
  const isTel = (phone: string) => /^[0-9-]+$/.test(phone.replace(/\s+/g, ''))

  const operatingHours = service.operatingHours?.trim() ?? ''
  const normalizedOperatingHours = normalizeText(operatingHours)
  const isAlwaysOpen =
    service.tags.some((tag) => {
      const normalizedTag = normalizeText(tag)
      return (
        normalizedTag.includes('24시간') ||
        normalizedTag.includes('24h') ||
        normalizedTag.includes('상시운영')
      )
    }) ||
    normalizedOperatingHours.includes('24시간') ||
    normalizedOperatingHours.includes('24h') ||
    normalizedOperatingHours.includes('상시운영')

  const hasOperatingHoursDuplicate = operatingHours
    ? service.tags.some((tag) => {
        const normalizedTag = normalizeText(tag)
        return (
          normalizedTag.includes(normalizedOperatingHours) ||
          normalizedOperatingHours.includes(normalizedTag)
        )
      })
    : false

  const shouldHighlightBorder = service.isEmergency || isAlwaysOpen
  const cardBorderClass = shouldHighlightBorder
    ? 'border-2 border-yellow-300'
    : 'border-stone-200'

  return (
    <article
      className={`rounded-xl border bg-white p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${cardBorderClass}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-stone-900">{service.name}</h3>
        <p className="text-right text-sm font-bold text-stone-900">
          {isTel(service.phone) ? (
            <a
              href={`tel:${service.phone.replace(/\s+/g, '')}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {service.phone}
            </a>
          ) : (
            service.phone
          )}
        </p>
      </div>

      <p className="line-clamp-2 text-sm text-stone-600">{service.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${TAG_STYLES[tag] ?? DEFAULT_TAG_STYLE}`}
          >
            {tag}
          </span>
        ))}

        {operatingHours && !hasOperatingHoursDuplicate ? (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              TAG_STYLES[operatingHours] ?? DEFAULT_TAG_STYLE
            }`}
          >
            {operatingHours}
          </span>
        ) : null}

        {service.url ? (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${service.name} 공식 사이트 (새 탭에서 열림)`}
            className="ml-auto text-sm font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            공식사이트 →
          </a>
        ) : null}
      </div>
    </article>
  )
}
