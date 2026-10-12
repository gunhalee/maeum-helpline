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
  headingLevel?: 3 | 4
}

export default function ResultCard({ name, phone, url, description, is24h = false, metaParts = [], note, isOpen, lang = 'ko', headingLevel = 3 }: Props) {
  const Heading = headingLevel === 4 ? 'h4' : 'h3'
  const hasPhoneNumber = Boolean(phone && /^[0-9-]+$/.test(phone.replace(/\s+/g, '')))
  const phoneOutsideHours = !is24h && isOpen === false
  const badgeText = is24h
    ? lang === 'en' ? '24/7' : '24시간'
    : isOpen === true
      ? lang === 'en' ? 'Open now' : '운영 중'
      : phoneOutsideHours
        ? lang === 'en' ? 'Outside hours' : '운영시간 외'
        : null
  const badgeColor = is24h || isOpen === true ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
  const hoursNote = is24h && /^(?:365일\s*)?24시간$|^24\/7$/.test(note?.trim() ?? '') ? null : note

  return (
    <article className="min-w-0 rounded-xl border border-stone-200 bg-white p-[16px] sm:p-5">
      <Heading className="break-words text-lg font-semibold leading-snug text-stone-900 [word-break:normal]">{name}</Heading>
      {(badgeText || metaParts.length > 0) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {badgeText && <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeColor}`}>{badgeText}</span>}
          {metaParts.length > 0 && <span className="text-sm leading-6 text-stone-600">{metaParts.join(' · ')}</span>}
        </div>
      )}
      {(hasPhoneNumber || url) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {hasPhoneNumber && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              aria-label={lang === 'en' ? `Call ${name}: ${phone}` : `${name} 전화 연결: ${phone}`}
              className={`inline-flex min-h-[44px] max-w-full flex-wrap items-center gap-x-2 rounded-lg border px-[12px] py-[8px] text-base font-semibold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 ${phoneOutsideHours ? 'border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100' : 'border-green-700 bg-green-50 text-green-800 hover:bg-green-100'}`}
            >
              <span className="text-sm font-medium">{lang === 'en' ? 'Call' : '전화'}</span>
              <span>{phone}</span>
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === 'en' ? `${name} website (opens in a new tab)` : `${name} 사이트 (새 탭에서 열림)`}
              className="inline-flex min-h-[44px] max-w-full items-center rounded-lg py-[8px] text-sm font-medium leading-snug text-blue-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              {lang === 'en' ? 'Website' : '사이트 보기'}
            </a>
          )}
        </div>
      )}
      {hoursNote && <ServiceHours note={hoursNote} lang={lang} />}
      {description && <p className="mt-3 text-sm leading-7 text-stone-600"><TimeText text={description} /></p>}
    </article>
  )
}
