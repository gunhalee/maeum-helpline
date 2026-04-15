import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_NAME } from '@/lib/constants'
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
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
  keywords: SITE_KEYWORDS,
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
    card: 'summary_large_image',
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
  const organizationId = `${SITE_URL}#organization`
  const websiteId = `${SITE_URL}#website`
  const siteGraphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        alternateName: ['Helpline Korea', '헬프라인'],
        url: SITE_URL,
        email: 'helplinekorea@gmail.com',
        areaServed: 'KR',
        knowsLanguage: ['ko', 'en'],
        description: SITE_DESCRIPTION,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_NAME,
        alternateName: ['Helpline Korea', '헬프라인'],
        url: SITE_URL,
        inLanguage: ['ko', 'en'],
        description: SITE_DESCRIPTION,
        publisher: {
          '@id': organizationId,
        },
      },
    ],
  }

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} flex min-h-screen flex-col bg-stone-50 font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphJsonLd),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
