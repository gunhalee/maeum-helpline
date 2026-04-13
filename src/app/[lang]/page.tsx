import type { Metadata } from 'next'
import { Suspense } from 'react'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'
import { SITE_NAME } from '@/lib/constants'
import { isLang, type Lang } from '@/lib/i18n'
import {
  getAlternateOpenGraphLocale,
  getChatSeoCopy,
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
  const { title, description } = getChatSeoCopy(currentLang)
  const url = getLocalizedUrl('/', currentLang)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('/'),
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
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function LocalizedHomePage({ params }: Props) {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'

  return (
    <div lang={currentLang} className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 items-start justify-center">
        <Suspense fallback={<div className="mx-auto w-full max-w-[460px] px-4 pt-10 pb-8 md:max-w-[620px] md:px-6 md:pt-14 lg:max-w-[700px] lg:pt-18" />}>
          <ChatbotFlow />
        </Suspense>
      </div>
    </div>
  )
}
