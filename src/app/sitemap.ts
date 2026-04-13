import type { MetadataRoute } from 'next'
import { CATEGORY_ORDER } from '@/lib/categories'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n'
import { getLanguageAlternates, getLocalizedUrl } from '@/lib/seo'

const STATIC_PAGES = ['/', '/about', ...CATEGORY_ORDER.map((category) => `/${category}`)]

function getPriority(path: string): number {
  if (path === '/') {
    return 1
  }

  if (path === '/about') {
    return 0.9
  }

  return 0.8
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return STATIC_PAGES.flatMap((path) =>
    SUPPORTED_LANGS.map((lang) => ({
      url: getLocalizedUrl(path, lang as Lang),
      lastModified: now,
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: getPriority(path),
      alternates: {
        languages: getLanguageAlternates(path),
      },
    }))
  )
}
