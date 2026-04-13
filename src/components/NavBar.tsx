'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { normalizeLang, translateCategoryLabel, withLang } from '@/lib/i18n'

export default function NavBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lang = normalizeLang(searchParams.get('lang'))
  const tabBaseClass =
    'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600'
  const isChatActive = pathname === '/'
  const isAboutActive = pathname === '/about'

  return (
    <nav
      className="sticky top-0 z-40 border-b border-stone-200 bg-white"
      aria-label={lang === 'en' ? 'Category navigation' : '카테고리 네비게이션'}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-1 px-4 py-2">
        {CATEGORY_ORDER.map((category, index) => {
          const meta = CATEGORY_META[category]
          const href = `/${category}`
          const isActive = pathname === href
          return (
            <Fragment key={category}>
              {index === 0 && (
                <>
                  <Link
                    href={withLang('/', lang)}
                    className={`${tabBaseClass} ${
                      isChatActive
                        ? 'bg-green-700 text-white'
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700'
                    }`}
                    aria-current={isChatActive ? 'page' : undefined}
                  >
                    <span>{lang === 'en' ? 'Chat' : '챗'}</span>
                  </Link>
                  <Link
                    href={withLang('/about', lang)}
                    className={`${tabBaseClass} ${
                      isAboutActive
                        ? 'bg-green-700 text-white'
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700'
                    }`}
                    aria-current={isAboutActive ? 'page' : undefined}
                  >
                    <span>{lang === 'en' ? 'About' : '소개'}</span>
                  </Link>
                </>
              )}
              <Link
                href={withLang(href, lang)}
                className={`${tabBaseClass} ${
                  isActive
                    ? 'bg-green-700 text-white'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{translateCategoryLabel(meta.label, lang)}</span>
              </Link>
            </Fragment>
          )
        })}
      </div>
    </nav>
  )
}
