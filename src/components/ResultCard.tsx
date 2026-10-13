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
  const badgeColor = is24h || isOpen === true ? 'text-[#486853]' : 'text-stone-600'
  const hoursNote = is24h && /^(?:365일\s*)?24시간$|^24\/7$/.test(note?.trim() ?? '') ? null : note

  return (
    <article className="min-w-0 rounded-2xl border border-[#e2e7e3] bg-white p-5 sm:p-6 md:px-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
        <Heading className="min-w-0 break-words text-lg font-medium leading-relaxed tracking-[-0.025em] text-stone-900 [word-break:normal]">{name}</Heading>
        {(badgeText || metaParts.length > 0) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6">
            {badgeText && <span className={`font-medium ${badgeColor}`}>{badgeText}</span>}
            {metaParts.length > 0 && <span className="text-stone-600">{metaParts.join(' · ')}</span>}
          </div>
        )}
      </div>
      {description && <p className="mt-3 text-sm leading-[1.8] text-stone-600"><TimeText text={description} /></p>}
      {(hasPhoneNumber || url) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-100 pt-4">
          {hasPhoneNumber && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              aria-label={lang === 'en' ? `Call ${name}: ${phone}` : `${name} 전화 연결: ${phone}`}
              className={`inline-flex min-h-[44px] max-w-full flex-wrap items-center gap-x-2 rounded-lg border px-[12px] py-[8px] text-base font-semibold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 ${phoneOutsideHours ? 'border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100' : 'border-[#6f927d] bg-[#f3f7f4] text-[#245840] hover:bg-[#eaf2ed]'}`}
            >
              <span className="text-sm font-medium">{lang === 'en' ? 'Call' : '전화'}</span>
              <span className="tabular-nums">{phone}</span>
            </a>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === 'en' ? `${name} website (opens in a new tab)` : `${name} 사이트 (새 탭에서 열림)`}
              className="inline-flex min-h-[44px] max-w-full items-center rounded-lg py-[8px] text-sm font-medium leading-snug text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              {lang === 'en' ? 'Website' : '사이트 보기'}
            </a>
          )}
        </div>
      )}
      {hoursNote && <ServiceHours note={hoursNote} lang={lang} />}
    </article>
  )
}
