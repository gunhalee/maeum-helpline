'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  getLangFromPathname,
  getPathWithoutLang,
  withLang,
} from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { id: 1, name: '자살 위기', phone: '109' },
  { id: 98, name: '구급 신고', phone: '119' },
  { id: 99, name: '경찰 신고', phone: '112' },
] as const

export default function ChatbotBanner() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  const currentLang = getLangFromPathname(pathname)
  const nextLang = currentLang === 'en' ? 'ko' : 'en'
  const nextParams = new URLSearchParams(searchParams.toString())

  nextParams.delete('lang')

  const localizedPath = withLang(getPathWithoutLang(pathname), nextLang)
  const toggleHref = nextParams.size > 0
    ? `${localizedPath}?${nextParams.toString()}`
    : localizedPath

  const updateWidth = () => {
    const widths = itemRefs.current.map((node) => node?.offsetWidth ?? 0)
    const maxWidth = Math.max(...widths, 0)
    setButtonWidth((prev) => (maxWidth > 0 && prev !== maxWidth ? maxWidth : prev))
  }

  useLayoutEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [currentLang])

  useEffect(() => {
    const observer = new ResizeObserver(() => updateWidth())
    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    const fonts = document.fonts
    if (fonts?.ready) {
      fonts.ready.then(() => updateWidth()).catch(() => {})
    }

    return () => observer.disconnect()
  }, [currentLang])

  return (
    <div
      role="banner"
      aria-label={currentLang === 'en' ? 'Emergency contacts' : '긴급 연락처'}
      className="bg-green-50 px-4 py-3 text-center"
    >
      <div className="relative mb-2">
        <p className="px-10 text-sm font-medium text-stone-700">
          {currentLang === 'en'
            ? 'If you are in immediate danger'
            : '지금 당장 위험한 상황이라면'}
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={() => router.replace(toggleHref)}
            className="inline-flex items-center text-xs font-semibold tracking-[0.08em] text-stone-600 underline underline-offset-4 transition-colors hover:text-green-700"
            aria-label={currentLang === 'en' ? 'Switch to Korean' : 'Switch to English'}
          >
            {currentLang === 'en' ? 'KO' : 'EN'}
          </button>
        </div>
      </div>
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
              {currentLang === 'en'
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
