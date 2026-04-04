import type { OrgWithDetails } from '@/lib/helpline-types'

interface Props {
  org: OrgWithDetails
  note?: string | null
  isOpen?: boolean | null
  variant?: 'default' | 'crisis'
}

export default function ResultCard({
  org,
  note,
  isOpen,
  variant = 'default',
}: Props) {
  const isCrisis = variant === 'crisis'
  const isTel = (phone: string) => /^[0-9-]+$/.test(phone.replace(/\s+/g, ''))

  const costLabel = org.cost
    ? org.cost.isFree
      ? org.cost.condition
        ? `무료 (${org.cost.condition})`
        : '무료'
      : org.cost.detail || '유료'
    : null

  const is24h = org.contacts.some((c) => c.is24h)
  const contactTypes = [...new Set(org.contacts.map((c) => c.type))].join('·')

  const languages = org.target?.language ?? []
  const hasNonKorean = languages.some((l) => l !== '한국어' && l !== 'ko')
  const languageLabel = hasNonKorean ? '다국어' : null

  const metaParts = [contactTypes, costLabel, languageLabel].filter(Boolean)

  const badgeText = note ?? (is24h ? '24시간' : null)
  const badgeColor =
    is24h || isOpen !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-amber-100 text-amber-700'

  const hasPhoneNumber = org.phone && isTel(org.phone)

  let linkLabel = '사이트'
  if (!hasPhoneNumber && org.url) {
    try {
      linkLabel = new URL(org.url).hostname.replace(/^www\./, '')
    } catch {
      /* keep default */
    }
  }

  const borderClass = isCrisis ? 'border-red-200' : 'border-stone-200'

  return (
    <article className={`rounded-xl border bg-white p-4 ${borderClass}`}>
      {/* Header — 기관명 + 운영시간 배지 + 전화번호 */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-lg font-semibold leading-tight ${
            isCrisis ? 'text-red-900' : 'text-stone-900'
          }`}
        >
          {org.name}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          {badgeText && (
            <span
              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${badgeColor}`}
            >
              {badgeText}
            </span>
          )}
          {hasPhoneNumber && (
            <a
              href={`tel:${org.phone.replace(/\s+/g, '')}`}
              className="text-xl font-bold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {org.phone}
            </a>
          )}
        </div>
      </div>

      {/* Footer — 메타 정보 + 사이트 링크 */}
      {(metaParts.length > 0 || org.url) && (
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-stone-100 pt-3">
          {metaParts.length > 0 && (
            <p className="text-sm text-stone-500">
              {metaParts.join(' \u00b7 ')}
            </p>
          )}
          {org.url && (
            <a
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${org.name} 사이트 (새 탭에서 열림)`}
              className="ml-auto shrink-0 text-sm font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {linkLabel} &rarr;
            </a>
          )}
        </div>
      )}
    </article>
  )
}
