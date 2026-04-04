'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'

export default function NavBar() {
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const tabBaseClass =
    'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600'

  useEffect(() => {
    const updateOverflow = () => {
      if (!scrollRef.current) return
      setHasOverflow(scrollRef.current.scrollWidth > scrollRef.current.clientWidth)
    }

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0
    }
    updateOverflow()

    window.addEventListener('resize', updateOverflow)
    return () => window.removeEventListener('resize', updateOverflow)
  }, [pathname])

  return (
    <nav
      className="sticky top-[44px] z-40 border-b border-stone-200 bg-white"
      aria-label="카테고리 네비게이션"
    >
      <div ref={scrollRef} className="scrollbar-hide overflow-x-auto">
        <div
          className={`mx-auto flex max-w-5xl gap-1 px-4 py-2 ${
            hasOverflow ? 'justify-start' : 'justify-center'
          }`}
        >
          {CATEGORY_ORDER.map((category) => {
            const meta = CATEGORY_META[category]
            const href = `/${category}`
              const isActive = pathname === href
            return (
              <Link
                key={category}
                href={href}
                className={`${tabBaseClass} ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{meta.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
