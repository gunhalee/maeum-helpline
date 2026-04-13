import type { MetadataRoute } from 'next'
import { CATEGORY_ORDER } from '@/lib/categories'
import { getLanguageAlternates, getLocalizedUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = ['/', '/about', ...CATEGORY_ORDER.map((category) => `/${category}`)]

  return pages.map((path) => ({
    url: getLocalizedUrl(path, 'ko'),
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/about' ? 0.9 : 0.8,
    alternates: {
      languages: getLanguageAlternates(path),
    },
  }))
}
