import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import NavBar from '@/components/NavBar'
import LayoutShell from '@/components/LayoutShell'
import { SITE_NAME } from '@/lib/constants'
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://helpline.or.kr'
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const siteMetaTitle = '긴급상담 헬프라인 — 자살·위기 상담 기관 안내'
const siteMetaDescription =
  '자살, 가정폭력, 청소년 위기 등 다양한 긴급 상황에 맞는 상담 기관을 빠르게 안내해드립니다. 109, 119, 112.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteMetaTitle,
  description: siteMetaDescription,
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: siteMetaTitle,
    description: siteMetaDescription,
    url: 'https://helpline.or.kr',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: siteMetaTitle,
    description: siteMetaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: googleSiteVerification,
    other: {
      'naver-site-verification': '5a952ff76bba27ed3f56d750a4e1e3f641913e2d',
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
    url: siteUrl,
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: 'ko-KR',
  }

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} flex min-h-screen flex-col bg-stone-50 font-sans`}
      >
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
        <LayoutShell nav={<NavBar />}>
          {children}
        </LayoutShell>
        <footer className="border-t border-stone-200 bg-white/70 py-6">
          <div className="mx-auto max-w-5xl px-4 text-center text-sm leading-7 text-stone-500">
            <p>
              본 페이지는 다양한 위기 상황에 대한 긴급상담 기관들을 소개하기 위해 제작되었습니다.
            </p>
            <p className="mt-1">어떤 개인정보도 저장하지 않습니다.</p>
            <p className="mt-1">helplinekorea@gmail.com</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
