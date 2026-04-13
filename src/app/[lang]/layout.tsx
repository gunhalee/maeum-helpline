import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
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

  return children
}
