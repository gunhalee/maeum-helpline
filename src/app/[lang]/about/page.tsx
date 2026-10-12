import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { isLang, type Lang } from '@/lib/i18n'
import { withLang } from '@/lib/i18n'
import {
  getAlternateOpenGraphLocale,
  getHomeSeoCopy,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
} from '@/lib/seo'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const { title, description, keywords } = getHomeSeoCopy(currentLang)
  const url = getLocalizedUrl('/about', currentLang)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('/about'),
    },
    openGraph: {
      type: 'website',
      locale: getLocaleForMetadata(currentLang),
      alternateLocale: getAlternateOpenGraphLocale(currentLang),
      url,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function LocalizedAboutPage({ params }: Props) {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const isEnglish = currentLang === 'en'

  return (
    <section
      lang={currentLang}
      className="mx-auto w-full max-w-[860px] px-3 pb-14 pt-6 sm:px-4 md:px-6"
    >
      <header>
        <h1 className="text-2xl font-bold leading-snug text-stone-900 md:text-3xl">
          {isEnglish ? 'About Helpline Korea' : 'Helpline Korea 소개'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-700">
          {isEnglish
            ? 'Find contact details and ways to use counseling and support services in Korea. Choose a topic or use Find support to get started.'
            : '상황에 맞는 상담기관의 연락처와 이용 방법을 안내합니다. 주제 메뉴를 선택하거나 상담처 찾기에서 시작하세요.'}
        </p>
      </header>
      <nav
        aria-label={isEnglish ? 'Find help' : '도움 찾기'}
        className="mt-6 flex flex-col items-start gap-3"
      >
        <Link
          href={withLang('/', currentLang)}
          className="inline-flex min-h-11 max-w-full items-center justify-center rounded-xl bg-green-800 px-5 py-3 text-base font-semibold leading-relaxed text-white transition-colors hover:bg-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          {isEnglish ? 'Find support' : '상담처 찾기'}
        </Link>
        <Link
          href={withLang('/guide', currentLang)}
          className="inline-flex min-h-11 max-w-full items-center rounded-lg py-2 text-base font-medium leading-relaxed text-green-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          {isEnglish ? 'Help with contacting a service' : '연락하기 전 도움 요청 가이드'}
        </Link>
      </nav>
      <p className="mt-8 border-t border-stone-200 pt-4 text-sm leading-relaxed text-stone-600">
        {isEnglish
          ? 'This site provides information. For professional counseling or emergency help, contact the service directly.'
          : '이 사이트는 정보를 안내합니다. 전문 상담이나 긴급한 도움이 필요하면 해당 기관에 직접 연락하세요.'}
        {' '}
        <Link
          href={withLang('/notice', currentLang)}
          className="text-green-800 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          {isEnglish ? 'Usage guide and disclaimer' : '이용안내 및 면책 고지'}
        </Link>
      </p>
    </section>
  )
}