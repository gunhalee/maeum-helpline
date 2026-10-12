import ServiceHours from '@/components/ServiceHours'
import TimeText from '@/components/TimeText'

interface Props {
  name: string
  phone: string
  url?: string
  description?: string
  is24h?: boolean
  metaParts?: string[]
  note?: string | null
  isOpen?: boolean | null
  lang?: 'ko' | 'en'
}

const footerLinkClass =
  'inline-flex min-h-[44px] shrink-0 items-center text-sm font-medium text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600'

const phoneLinkMutedClass =
  'inline-flex min-h-[44px] shrink-0 items-center text-sm font-medium text-stone-400 underline-offset-2 hover:text-stone-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300'

export default function ResultCard({
  name,
  phone,
  url,
  description,
  is24h = false,
  metaParts = [],
  note,
  isOpen,
  lang = 'ko',
}: Props) {
  const isTel = (p: string) => /^[0-9-]+$/.test(p.replace(/\s+/g, ''))

  const badgeText = is24h
    ? lang === 'en' ? '24/7' : '24시간'
    : isOpen === true
      ? lang === 'en' ? 'Open now' : '운영 중'
      : isOpen === false
        ? lang === 'en' ? 'Outside hours' : '운영시간 외'
        : null
  const hoursNote = is24h && /^(?:365일\s*)?24시간$|^24\/7$/.test(note?.trim() ?? '')
    ? null
    : note
  const badgeColor =
    is24h || isOpen === true
      ? 'bg-green-100 text-green-800'
      : isOpen === false
        ? 'bg-amber-100 text-amber-700'
        : 'bg-stone-100 text-stone-600'

  const hasPhoneNumber = phone && isTel(phone)

  let linkLabel = lang === 'en' ? 'Open website' : '사이트 보기'
  if (!hasPhoneNumber && url) {
    try {
      linkLabel = new URL(url).hostname.replace(/^www\./, '')
    } catch {
      /* keep default */
    }
  }

  const hasFooter = Boolean(url || hasPhoneNumber)

  const phoneOutsideHours = !is24h && isOpen === false
  const primaryHref =
    hasPhoneNumber && !phoneOutsideHours
      ? `tel:${phone.replace(/\s+/g, '')}`
      : url
  const primaryTarget =
    primaryHref && !primaryHref.startsWith('tel:') ? '_blank' : undefined
  const primaryRel =
    primaryHref && !primaryHref.startsWith('tel:')
      ? 'noopener noreferrer'
      : undefined
  const primaryAriaLabel = primaryHref
    ? primaryHref.startsWith('tel:')
      ? lang === 'en'
        ? `Call ${name}`
        : `${name} 전화 연결`
      : lang === 'en'
        ? `${name} website (opens in a new tab)`
        : `${name} 사이트 (새 탭에서 열림)`
    : undefined

  const metaLine =
    metaParts.length > 0 ? metaParts.join(' \u00b7 ') : null

  const content = (
    <>
      <h3 className="break-words text-lg font-semibold leading-snug text-stone-900 [word-break:normal]">{name}</h3>
      {(metaLine || badgeText) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {badgeText && (
            <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${badgeColor}`}>
              {badgeText}
            </span>
          )}
          {metaLine && <span className="text-sm leading-6 text-stone-500">{metaLine}</span>}
        </div>
      )}
      {hoursNote && <ServiceHours note={hoursNote} lang={lang} />}
      {description && (
        <p className="mt-4 text-[15px] leading-7 text-stone-600">
          <TimeText text={description} />
        </p>
      )}
    </>
  )

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-stone-200 bg-white p-5">
      {primaryHref ? (
        <a
          href={primaryHref}
          target={primaryTarget}
          rel={primaryRel}
          aria-label={primaryAriaLabel}
          className="block rounded-lg transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        >
          {content}
        </a>
      ) : (
        content
      )}

      {hasFooter && (
        <div className="mt-5 flex flex-wrap items-center justify-end gap-4 border-t border-stone-100 pt-3">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                lang === 'en'
                  ? `${name} website (opens in a new tab)`
                  : `${name} 사이트 (새 탭에서 열림)`
              }
              className={footerLinkClass}
            >
              {linkLabel} &rarr;
            </a>
          )}
          {hasPhoneNumber && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              aria-label={lang === 'en' ? `Call ${name}` : `${name} 전화 연결`}
              className={
                phoneOutsideHours ? phoneLinkMutedClass : footerLinkClass
              }
            >
              {lang === 'en' ? 'Call' : '전화하기'} &rarr;
            </a>
          )}
        </div>
      )}
    </article>
  )
}
