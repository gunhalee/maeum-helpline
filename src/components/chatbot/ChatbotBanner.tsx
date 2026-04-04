'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { Lang } from '@/lib/i18n'
import { normalizeLang } from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { id: 1, name: '자살 위기', phone: '109' },
  { id: 98, name: '구급 신고', phone: '119' },
  { id: 99, name: '경찰 신고', phone: '112' },
] as const

export default function ChatbotBanner({ lang = 'ko' }: { lang?: Lang }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  const currentLang = normalizeLang(searchParams.get('lang') ?? lang)
  const nextParams = new URLSearchParams(searchParams.toString())
  const toggleLang = currentLang === 'en' ? 'ko' : 'en'

  if (toggleLang === 'en') {
    nextParams.set('lang', 'en')
  } else {
    nextParams.delete('lang')
  }

  const toggleHref = nextParams.size > 0
    ? `${pathname}?${nextParams.toString()}`
    : pathname

  useLayoutEffect(() => {
    const updateWidth = () => {
      const widths = itemRefs.current.map((node) => node?.offsetWidth ?? 0)
      const maxWidth = Math.max(...widths, 0)
      setButtonWidth(maxWidth > 0 ? maxWidth : null)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [currentLang])

  return (
    <div
      role="banner"
      aria-label={lang === 'en' ? 'Emergency contacts' : '긴급 연락처'}
      className="relative bg-green-50 px-4 py-3 text-center"
    >
      <div className="absolute right-4 top-3">
        <Link
          href={toggleHref}
          className="inline-flex min-h-[36px] items-center text-xs font-semibold tracking-[0.08em] text-stone-600 underline underline-offset-4 transition-colors hover:text-green-700"
          aria-label={currentLang === 'en' ? 'Switch to Korean' : 'Switch to English'}
        >
          {currentLang === 'en' ? 'KO' : 'EN'}
        </Link>
      </div>
      <p className="mb-2 text-sm font-medium text-stone-700">
        {currentLang === 'en'
          ? 'If you are in immediate danger'
          : '지금 당장 위험한 상황이라면'}
      </p>
      <div className="flex items-center justify-center gap-3">
        {EMERGENCY_ITEMS.map((item, index) => (
          <a
            key={item.id}
            href={`tel:${item.phone}`}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            className="inline-flex min-h-[44px] shrink-0 flex-col items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-green-700 transition-colors hover:bg-green-50 active:bg-green-100"
            style={buttonWidth ? { minWidth: `${buttonWidth}px` } : undefined}
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
