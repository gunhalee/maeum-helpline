import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import NavBar from '@/components/NavBar'
import LayoutShell from '@/components/LayoutShell'
import ChatbotBanner from '@/components/chatbot/ChatbotBanner'
import FooterNote from '@/components/FooterNote'
import LangRedirect from '@/components/LangRedirect'
import { SITE_NAME } from '@/lib/constants'
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/seo'
import './globals.css'

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
})

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    '정신건강',
    '자살예방',
    '심리상담',
    '위기상담',
    '여성',
    '청소년',
    '아동',
    '노인',
    '치매',
    '피해자',
    '위기',
    '긴급',
    '상담',
    '성소수자',
    '이주민',
    '외국인',
    '치료',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': 'a1ca50b0cb5985926c31ef7d07966e591951215d',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ko-KR',
    description: SITE_DESCRIPTION,
  }

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} flex min-h-screen flex-col bg-stone-50 font-sans`}
      >
        <Suspense fallback={null}>
          <LangRedirect />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <div className="sticky top-0 z-50">
          <Suspense fallback={<div className="bg-green-50 px-4 py-3" />}>
            <ChatbotBanner />
          </Suspense>
        </div>
        <LayoutShell
          nav={(
            <Suspense fallback={<div className="sticky top-0 z-40 border-b border-stone-200 bg-white py-6" />}>
              <NavBar />
            </Suspense>
          )}
        >
          {children}
        </LayoutShell>
        <footer className="border-t border-stone-200 bg-white/70 py-6">
          <div className="mx-auto max-w-5xl px-4 text-center text-sm leading-7 text-stone-500">
            <Suspense fallback={<p className="mt-1">helplinekorea@gmail.com</p>}>
              <FooterNote />
            </Suspense>
          </div>
        </footer>
      </body>
    </html>
  )
}
