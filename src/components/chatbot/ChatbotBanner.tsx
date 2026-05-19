'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPathWithoutLang, type Lang, withLang } from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { id: 1, koLabel: '자살위기', enLabel: 'Crisis', phone: '109' },
  { id: 98, koLabel: '응급', enLabel: 'EMS', phone: '119' },
  { id: 99, koLabel: '경찰', enLabel: 'Police', phone: '112' },
] as const

interface Props {
  lang: Lang
}

export default function ChatbotBanner({ lang }: Props) {
  const pathname = usePathname()
  const nextLang = lang === 'en' ? 'ko' : 'en'
  const toggleHref = withLang(getPathWithoutLang(pathname), nextLang)

  return (
    <div
      role="banner"
      aria-label={lang === 'en' ? 'Emergency contacts' : '긴급 연락처'}
      className="bg-green-50 px-4 py-3 text-center"
    >
      <div className="mx-auto mb-3 flex max-w-[460px] items-center justify-between gap-3">
        <p className="text-left text-sm font-semibold leading-5 text-stone-800">
          {lang === 'en' ? 'If you are in danger, call now' : '위험하면 지금 바로 전화하세요'}
        </p>
        <Link
          href={toggleHref}
          replace
          className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-green-700 px-3 text-xs font-semibold tracking-[0.08em] text-green-800 transition-colors hover:bg-white"
          aria-label={lang === 'en' ? 'Switch to Korean' : 'Switch to English'}
        >
          {lang === 'en' ? 'KO' : 'EN'}
        </Link>
      </div>
      <div className="mx-auto grid max-w-[460px] grid-cols-3 gap-2 min-[380px]:gap-3">
        {EMERGENCY_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`tel:${item.phone}`}
            className="inline-flex min-h-[58px] w-full flex-col items-center justify-center rounded-xl border border-green-700 bg-white px-2 py-2 text-green-700 transition-colors hover:bg-green-50 active:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            <span className="text-lg font-bold leading-tight">{item.phone}</span>
            <span className="text-xs font-medium leading-tight">
              {lang === 'en' ? item.enLabel : item.koLabel}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
