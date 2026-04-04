interface Props {
  name: string
  phone: string
  url?: string
  description?: string
  is24h?: boolean
  metaParts?: string[]
  note?: string | null
  isOpen?: boolean | null
  variant?: 'default' | 'crisis'
}

export default function ResultCard({
  name,
  phone,
  url,
  description,
  is24h = false,
  metaParts = [],
  note,
  isOpen,
  variant = 'default',
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

  const hasFooter = metaParts.length > 0 || url

  return (
    <article className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight text-stone-900">
          {name}
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
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="text-xl font-bold text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {phone}
            </a>
          )}
        </div>
      </div>

      {description && (
        <p className="mt-1 line-clamp-2 text-sm text-stone-600">
          {description}
        </p>
      )}

      {hasFooter && (
        <>
          <div className="min-h-3 flex-1" />
          <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-3">
            {metaParts.length > 0 && (
              <p className="text-sm text-stone-500">
                {metaParts.join(' \u00b7 ')}
              </p>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} 사이트 (새 탭에서 열림)`}
                className="ml-auto shrink-0 text-sm font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                {linkLabel} &rarr;
              </a>
            )}
          </div>
        </>
      )}
    </article>
  )
}
