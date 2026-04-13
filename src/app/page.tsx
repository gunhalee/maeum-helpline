import type { Metadata } from 'next'
import { Suspense } from 'react'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'
import { SITE_NAME } from '@/lib/constants'
import { normalizeLang } from '@/lib/i18n'
import {
  getAlternateOpenGraphLocale,
  getChatSeoCopy,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
} from '@/lib/seo'

interface Props {
  searchParams?: Promise<{ lang?: string }>
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const lang = normalizeLang((await searchParams)?.lang)
  const { title, description } = getChatSeoCopy(lang)
  const url = getLocalizedUrl('/', lang)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      locale: getLocaleForMetadata(lang),
      alternateLocale: getAlternateOpenGraphLocale(lang),
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

export default async function Home({ searchParams }: Props) {
  const lang = normalizeLang((await searchParams)?.lang)

  return (
    <div lang={lang} className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 items-start justify-center">
        <Suspense fallback={<div className="mx-auto w-full max-w-[460px] px-4 pt-10 pb-8 md:max-w-[620px] md:px-6 md:pt-14 lg:max-w-[700px] lg:pt-18" />}>
          <ChatbotFlow />
        </Suspense>
      </div>
    </div>
  )
}
