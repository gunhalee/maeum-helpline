'use client'

import { useEffect, useRef } from 'react'
import type { Lang } from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { phone: '109', koLabel: '위기 상담', enLabel: 'Crisis', koFull: '자살위기 상담', enFull: 'Suicide crisis counseling' },
  { phone: '119', koLabel: '구급', enLabel: 'Rescue', koFull: '응급 구조·구급', enFull: 'Emergency rescue and ambulance' },
  { phone: '112', koLabel: '경찰', enLabel: 'Police', koFull: '경찰 신고', enFull: 'Police emergency' },
] as const

export default function ChatbotBanner({ lang }: { lang: Lang }) {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeight = () => {
      const height = header.getBoundingClientRect().height
      const sticky = window.innerHeight > 500 && height <= window.innerHeight * 0.3
      header.dataset.sticky = String(sticky)
      document.documentElement.style.setProperty('--sticky-header-height', `${sticky ? height : 0}px`)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    window.addEventListener('resize', updateHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
      document.documentElement.style.removeProperty('--sticky-header-height')
    }
  }, [])

  return (
    <header
      ref={headerRef}
      role="banner"
      className="emergency-header border-b border-stone-200 bg-white px-[12px] py-[8px]"
      aria-label={lang === 'en' ? 'Emergency contacts' : '긴급 연락처'}
    >
      <div className="mx-auto grid max-w-[460px] grid-cols-3 gap-[8px]">
        {EMERGENCY_ITEMS.map((item) => (
          <a
            key={item.phone}
            href={`tel:${item.phone}`}
            aria-label={`${lang === 'en' ? item.enFull : item.koFull} ${item.phone}`}
            className="flex min-h-[48px] min-w-0 flex-col items-center justify-center px-[6px] py-[6px] text-center text-green-800 hover:text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            <span className="whitespace-nowrap text-lg font-bold leading-tight underline underline-offset-4">{item.phone}</span>
            <span className="text-xs font-medium leading-snug">{lang === 'en' ? item.enLabel : item.koLabel}</span>
          </a>
        ))}
      </div>
    </header>
  )
}
