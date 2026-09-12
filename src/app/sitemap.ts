import type { MetadataRoute } from 'next'
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n'
import {
  getContentUpdatedAt,
  SEO_INDEXED_PATHS,
  getLanguageAlternates,
  getLocalizedUrl,
  getSitemapProfile,
} from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_INDEXED_PATHS.flatMap((path) => {
    const profile = getSitemapProfile(path)

    return SUPPORTED_LANGS.map((lang) => ({
      url: getLocalizedUrl(path, lang as Lang),
      lastModified: new Date(getContentUpdatedAt(path)),
      changeFrequency: profile.changeFrequency,
      priority: profile.priority,
      alternates: {
        languages: getLanguageAlternates(path),
      },
    }))
  })
}
