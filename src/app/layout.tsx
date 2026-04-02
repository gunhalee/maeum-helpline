import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import EmergencyBar from '@/components/EmergencyBar'
import NavBar from '@/components/NavBar'
import { SITE_DESC, SITE_NAME } from '@/lib/constants'
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

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const emergencyServices = await getEmergencyServices()

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} min-h-screen bg-stone-50 font-sans`}
      >
        <EmergencyBar services={emergencyServices} />
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
