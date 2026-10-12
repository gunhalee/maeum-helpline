'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { getPathWithoutLang, translateCategoryLabel, type Lang, withLang } from '@/lib/i18n'

export default function NavBar({ lang }: { lang: Lang }) {
  const pathname = usePathname()
  const currentPath = getPathWithoutLang(pathname)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const edgeRef = useRef<HTMLDivElement>(null)
  const links = [
    { path: '/', label: lang === 'en' ? 'Find support' : '상담처 찾기' },
    ...CATEGORY_ORDER.map(category => ({ path: `/${category}`, label: translateCategoryLabel(CATEGORY_META[category].label, lang) })),
    { path: '/guide', label: lang === 'en' ? 'Help guide' : '도움 요청 가이드' },
    { path: '/about', label: lang === 'en' ? 'About' : '소개' },
  ]

  useEffect(() => {
    const scroller = scrollerRef.current
    const edges = edgeRef.current
    if (!scroller || !edges) return
    const updateEdges = () => {
      edges.dataset.left = String(scroller.scrollLeft > 2)
      edges.dataset.right = String(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2)
    }
    const revealCurrent = () => {
      const active = scroller.querySelector<HTMLElement>('[aria-current="page"]')
      if (active) {
        const linkRect = active.getBoundingClientRect()
        const scrollRect = scroller.getBoundingClientRect()
        scroller.scrollLeft += linkRect.left - scrollRect.left - (scroller.clientWidth - linkRect.width) / 2
      }
      updateEdges()
    }
    revealCurrent()
    const observer = new ResizeObserver(revealCurrent)
    observer.observe(scroller)
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild)
    scroller.addEventListener('scroll', updateEdges, { passive: true })
    return () => {
      observer.disconnect()
      scroller.removeEventListener('scroll', updateEdges)
    }
  }, [pathname])

  return (
    <nav className="border-b border-stone-200 bg-white" aria-label={lang === 'en' ? 'Category navigation' : '상담 주제 메뉴'}>
      <div className="mx-auto flex max-w-5xl items-center gap-[8px] px-[8px]">
        <Link
          href={withLang(currentPath, lang === 'en' ? 'ko' : 'en')}
          replace
          className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center px-[6px] text-xs font-semibold text-stone-700 underline underline-offset-4 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          aria-label={lang === 'en' ? 'Switch to Korean' : 'Switch to English'}
        >
          {lang === 'en' ? 'KO' : 'EN'}
        </Link>
        <div ref={edgeRef} className="group relative min-w-0 flex-1">
          <div ref={scrollerRef} data-nav-scroll className="category-scroll overflow-x-auto">
            <div className="flex w-max min-w-full gap-[4px] px-[8px] py-[8px]">
              {links.map(link => (
                <Link
                  key={link.path}
                  href={withLang(link.path, lang)}
                  aria-current={currentPath === link.path ? 'page' : undefined}
                  className={`flex min-h-[44px] max-w-[calc(100vw-100px)] shrink-0 items-center justify-center border-b-2 px-[14px] py-[8px] text-center text-sm font-medium leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 ${currentPath === link.path ? 'border-green-700 text-green-800' : 'border-transparent text-stone-600 hover:text-stone-900'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[16px] bg-gradient-to-r from-white to-transparent opacity-0 group-data-[left=true]:opacity-100" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[16px] bg-gradient-to-l from-white to-transparent opacity-0 group-data-[right=true]:opacity-100" />
        </div>
      </div>
    </nav>
  )
}
