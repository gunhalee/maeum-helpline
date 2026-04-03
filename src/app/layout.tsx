import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import EmergencyBar from '@/components/EmergencyBar'
import NavBar from '@/components/NavBar'
import { SITE_NAME } from '@/lib/constants'
import { getEmergencyServices } from '@/lib/notion'
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
const siteMetaDescription =
  '자살, 자살예방, 우울, 우울증, 정신건강 위기상담, 피해자 보호 지원체계 등 한국 정신건강 서비스를 한곳에 모았습니다.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_NAME,
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
    title: '긴급상담 헬프라인',
    description: '한국 정신건강 지원단체 모음집',
    url: 'https://helpline.or.kr',
    siteName: '긴급상담 헬프라인',
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description: siteMetaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: googleSiteVerification,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const emergencyServices = await getEmergencyServices()
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
        className={`${notoSans.variable} ${notoSerif.variable} min-h-screen bg-stone-50 font-sans`}
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
        <EmergencyBar services={emergencyServices} />
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
