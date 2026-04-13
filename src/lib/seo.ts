import { CATEGORY_META } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import { translateCategoryLabel, type Lang, withLang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://helpline.or.kr'

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION

const HOME_COPY = {
  ko: {
    title: '긴급상담 헬프라인 — 자살·위기 상담 기관 안내',
    description:
      '자살 위기, 청소년 상담, 여성·피해 지원, 중독, 이주민 지원 등 한국의 긴급상담 기관을 빠르게 찾을 수 있습니다. 109, 119, 112.',
  },
  en: {
    title: 'Korean Crisis Helpline Directory',
    description:
      'Find Korean crisis helplines for suicide risk, youth distress, victim support, addiction, migrants, and more.',
  },
} as const

const CHAT_COPY = {
  ko: {
    title: '긴급상담 헬프라인 챗 — 상황별 상담 찾기',
    description:
      '두 가지 질문에 답하고 상황에 맞는 한국 긴급상담 기관을 빠르게 찾아보세요.',
  },
  en: {
    title: 'Korean Crisis Helpline Chat',
    description:
      'Answer two short questions and find Korean crisis helplines that fit your situation.',
  },
} as const

export const SITE_TITLE = HOME_COPY.ko.title
export const SITE_DESCRIPTION = HOME_COPY.ko.description

export function getLocalizedPath(path: string, lang: Lang): string {
  return withLang(path || '/', lang)
}

export function getLocalizedUrl(path: string, lang: Lang): string {
  return `${SITE_URL}${getLocalizedPath(path, lang)}`
}

export function getLanguageAlternates(path: string): Record<string, string> {
  return {
    ko: getLocalizedUrl(path, 'ko'),
    en: getLocalizedUrl(path, 'en'),
    'x-default': getLocalizedUrl(path, 'ko'),
  }
}

export function getHomeSeoCopy(lang: Lang) {
  return HOME_COPY[lang]
}

export function getChatSeoCopy(lang: Lang) {
  return CHAT_COPY[lang]
}

export function getCategorySeoCopy(category: Category, lang: Lang) {
  const sourceLabel = CATEGORY_META[category].label
  const label = translateCategoryLabel(sourceLabel, lang)

  if (lang === 'en') {
    return {
      label,
      title: `${label} Helplines in Korea | ${SITE_NAME}`,
      heading: `${label} Helplines`,
      description: `Explore Korean helplines for ${label}. Compare phone numbers, service hours, and support details before you call.`,
    }
  }

  return {
    label,
    title: `${sourceLabel} 상담 기관 안내 | ${SITE_NAME}`,
    heading: `${sourceLabel} 상담 기관`,
    description: `${sourceLabel} 관련 한국 상담 기관 목록입니다. 전화번호, 운영시간, 지원 대상과 이용 방법을 한 번에 확인하세요.`,
  }
}

export function getLocaleForMetadata(lang: Lang): 'ko_KR' | 'en_US' {
  return lang === 'en' ? 'en_US' : 'ko_KR'
}

export function getAlternateOpenGraphLocale(
  lang: Lang
): Array<'ko_KR' | 'en_US'> {
  return lang === 'en' ? ['ko_KR'] : ['en_US']
}
