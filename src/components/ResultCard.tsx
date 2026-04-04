interface Props {
  name: string
  phone: string
  url?: string
  description?: string
  is24h?: boolean
  metaParts?: string[]
  note?: string | null
  isOpen?: boolean | null
}

const footerLinkClass =
  'shrink-0 text-base font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600'

const phoneLinkMutedClass =
  'shrink-0 text-base font-medium text-stone-400 underline-offset-2 hover:text-stone-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300'

export default function ResultCard({
  name,
  phone,
  url,
  description,
  is24h = false,
  metaParts = [],
  note,
  isOpen,
}: Props) {
  const isTel = (p: string) => /^[0-9-]+$/.test(p.replace(/\s+/g, ''))

  const badgeText = note ?? (is24h ? '24시간' : null)
  const badgeColor =
    is24h || isOpen !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-amber-100 text-amber-700'

  const hasPhoneNumber = phone && isTel(phone)

  let linkLabel = '사이트'
  if (!hasPhoneNumber && url) {
    try {
      linkLabel = new URL(url).hostname.replace(/^www\./, '')
    } catch {
      /* keep default */
    }
  }

  const hasLinkRow = Boolean(url || hasPhoneNumber)
  const hasFooter = hasLinkRow

  const phoneOutsideHours = !is24h && isOpen === false

  const metaLine =
    metaParts.length > 0 ? metaParts.join(' \u00b7 ') : null

  return (
    <article className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
        <h3 className="min-w-0 break-words text-lg font-semibold leading-snug text-stone-900 sm:text-xl">
          {name}
        </h3>
        {metaLine && (
          <span className="min-w-0 text-base leading-snug text-stone-500">
            {metaLine}
          </span>
        )}
        {badgeText && (
          <span
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600 sm:line-clamp-3 sm:text-base">
          {description}
        </p>
      )}

      {hasFooter && (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-4 border-t border-stone-100 pt-4 sm:mt-auto">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} 사이트 (새 탭에서 열림)`}
              className={footerLinkClass}
            >
              {linkLabel} &rarr;
            </a>
          )}
          {hasPhoneNumber && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              aria-label={`${name} 전화 연결`}
              className={
                phoneOutsideHours ? phoneLinkMutedClass : footerLinkClass
              }
            >
              전화 &rarr;
            </a>
          )}
        </div>
      )}
    </article>
  )
}
