'use client'

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
  const links = [
    {
      href: withLang('/', lang),
      label: lang === 'en' ? 'Chat' : '챗',
      isActive: pathname === '/',
      inactiveClass:
        'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700',
    },
    {
      href: withLang('/about', lang),
      label: lang === 'en' ? 'About' : '소개',
      isActive: pathname === '/about',
      inactiveClass: 'text-stone-500 hover:bg-stone-100 hover:text-stone-800',
    },
    ...CATEGORY_ORDER.map((category) => ({
      href: withLang(`/${category}`, lang),
      label: translateCategoryLabel(CATEGORY_META[category].label, lang),
      isActive: pathname === `/${category}`,
      inactiveClass: 'text-stone-500 hover:bg-stone-100 hover:text-stone-800',
    })),
  ]

  return (
    <nav
      className="sticky top-0 z-40 border-b border-stone-200 bg-white"
      aria-label={lang === 'en' ? 'Category navigation' : '카테고리 네비게이션'}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-1 px-4 py-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${tabBaseClass} ${
              link.isActive ? 'bg-green-700 text-white' : link.inactiveClass
            }`}
            aria-current={link.isActive ? 'page' : undefined}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
