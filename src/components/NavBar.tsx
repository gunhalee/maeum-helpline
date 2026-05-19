'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import {
  getPathWithoutLang,
  translateCategoryLabel,
  type Lang,
  withLang,
} from '@/lib/i18n'

interface Props {
  lang: Lang
}

export default function NavBar({ lang }: Props) {
  const pathname = usePathname()
  const currentPath = getPathWithoutLang(pathname)
  const tabBaseClass =
    'flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600'
  const links = [
    {
      href: withLang('/', lang),
      label: lang === 'en' ? 'Chat' : '챗',
      isActive: currentPath === '/',
      inactiveClass:
        'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700',
    },
    {
      href: withLang('/about', lang),
      label: lang === 'en' ? 'About' : '소개',
      isActive: currentPath === '/about',
      inactiveClass: 'text-stone-500 hover:bg-stone-100 hover:text-stone-800',
    },
    ...CATEGORY_ORDER.map((category) => ({
      href: withLang(`/${category}`, lang),
      label: translateCategoryLabel(CATEGORY_META[category].label, lang),
      isActive: currentPath === `/${category}`,
      inactiveClass: 'text-stone-500 hover:bg-stone-100 hover:text-stone-800',
    })),
  ]

  return (
    <nav
      className="border-b border-stone-200 bg-white"
      aria-label={lang === 'en' ? 'Category navigation' : '카테고리 네비게이션'}
    >
      <div className="scrollbar-hide mx-auto flex max-w-5xl flex-nowrap justify-start gap-1 overflow-x-auto px-4 py-2 md:justify-center">
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
