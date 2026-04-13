'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPathWithoutLang, type Lang, withLang } from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { id: 1, name: '자살 위기', phone: '109' },
  { id: 98, name: '응급 구조', phone: '119' },
  { id: 99, name: '경찰 신고', phone: '112' },
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
      <div className="relative mb-2">
        <p className="px-10 text-sm font-medium text-stone-700">
          {lang === 'en' ? 'If you are in immediate danger' : '지금 당장 위험한 상황이라면'}
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Link
            href={toggleHref}
            replace
            className="inline-flex items-center text-xs font-semibold tracking-[0.08em] text-stone-600 underline underline-offset-4 transition-colors hover:text-green-700"
            aria-label={lang === 'en' ? 'Switch to Korean' : 'Switch to English'}
          >
            {lang === 'en' ? 'KO' : 'EN'}
          </Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-3">
        {EMERGENCY_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`tel:${item.phone}`}
            className="inline-flex min-h-[44px] w-full flex-col items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-green-700 transition-colors hover:bg-green-50 active:bg-green-100"
          >
            <span className="text-base font-bold leading-tight">{item.phone}</span>
            <span className="text-[10px] leading-tight">
              {lang === 'en'
                ? item.id === 1
                  ? 'Suicide crisis'
                  : item.id === 98
                    ? 'Emergencies'
                    : 'Police'
                : item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
