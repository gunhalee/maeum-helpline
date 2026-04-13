import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import FooterNote from '@/components/FooterNote'
import NavBar from '@/components/NavBar'
import ChatbotBanner from '@/components/chatbot/ChatbotBanner'
import { isLang, SUPPORTED_LANGS } from '@/lib/i18n'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  if (!isLang(lang)) {
    notFound()
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <ChatbotBanner lang={lang} />
      </div>
      <NavBar lang={lang} />
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="border-t border-stone-200 bg-white/70 py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm leading-7 text-stone-500">
          <FooterNote lang={lang} />
        </div>
      </footer>
    </>
  )
}
