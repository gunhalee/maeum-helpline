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
  const emergencyNumbers = [
    {
      number: '109',
      description: isEnglish
        ? 'Suicide crisis counseling'
        : '자살 위기 상담',
    },
    {
      number: '119',
      description: isEnglish
        ? 'Emergency rescue and ambulance'
        : '응급 구조 및 구급',
    },
    {
      number: '112',
      description: isEnglish ? 'Police emergency line' : '경찰 긴급 신고',
    },
  ]

  return (
    <div lang={currentLang} className="flex flex-1 flex-col bg-stone-50">
      <section className="mx-auto w-full max-w-[860px] px-4 pb-12 pt-6 md:px-6">
        <header className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {isEnglish
              ? 'Crisis support services in Korea'
              : '한국의 위기 지원기관 안내'}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {isEnglish
              ? 'Find crisis support in Korea'
              : '상황에 맞는 긴급상담 기관을 빠르게 찾으세요'}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            {isEnglish
              ? 'Compare helplines in Korea by topic, urgency, and hours. Start with Find support. You can also open the crisis, youth, women, addiction, migrant, or older adult support pages.'
              : '상담 주제, 긴급도, 운영시간을 비교해 보세요. 상담처 찾기 화면에서 시작할 수 있습니다. 위기·청소년·여성·중독·이주민·노인 지원 페이지로 바로 이동할 수도 있습니다.'}
          </p>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-stone-900">
              {isEnglish
                ? 'If you are in danger, these numbers can help first'
                : '지금 안전이 걱정되면 먼저 연결할 수 있어요'}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {emergencyNumbers.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className="flex min-h-[76px] flex-col justify-center rounded-2xl border border-green-700 bg-white px-4 py-3 text-green-800 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                >
                  <p className="text-xl font-bold">
                    {item.number}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </header>
      </section>

      <section className="mx-auto w-full max-w-[860px] px-4 pb-14 md:px-6">
        <div className="grid grid-cols-1 gap-4">
          <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEnglish ? 'Who this is for' : '누구를 위한 서비스인가요'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isEnglish
                ? 'This site helps people in Korea who need support with suicide risk, depression, violence, youth distress, or addiction. It also helps people who need migrant support or urgent emotional support.'
                : '자살 위기, 우울, 폭력 피해, 청소년 위기, 중독으로 도움이 필요한 분들을 안내합니다. 이주민 지원이나 긴급한 정서적 도움이 필요한 분들도 이용할 수 있습니다.'}
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEnglish ? 'What you can compare' : '무엇을 비교할 수 있나요'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isEnglish
                ? 'Each page shows phone numbers, hours, and available languages. You can also compare the support that each organization provides.'
                : '각 페이지에서 전화번호와 운영시간을 비교할 수 있습니다. 지원 언어와 기관별 지원 내용도 확인할 수 있습니다.'}
            </p>
          </article>

        </div>
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white px-5 py-5 shadow-sm md:px-6">
          <h2 className="text-lg font-semibold text-stone-900">
            {isEnglish ? 'Need help with your next step?' : '도움을 요청하는 방법이 궁금한가요?'}
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            {isEnglish
              ? 'Open the guides for help with suicide warning signs, depression, violence safety planning, or youth support. The guides also cover addiction, migrant support, and care for older adults.'
              : '가이드에서 상황별로 먼저 할 일을 확인하세요. 자살 위험 신호, 우울 상담, 폭력 피해 대응, 청소년 지원을 다룹니다. 중독, 이주민 지원, 노년기 돌봄도 다룹니다.'}
          </p>
          <div className="mt-5">
            <Link
              href={withLang('/guide', currentLang)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
            >
              {isEnglish ? 'Open guides' : '가이드 열기'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
