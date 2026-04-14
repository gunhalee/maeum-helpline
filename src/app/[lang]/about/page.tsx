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
      <section className="mx-auto w-[760px] max-w-full px-4 pb-12 pt-6 md:px-6">
        <header className="rounded-[2rem] border border-stone-200 bg-stone-50 px-5 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
            {isEnglish
              ? 'Korean crisis support directory'
              : '한국 위기 지원 디렉터리'}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
            {isEnglish
              ? 'Find the right Korean crisis helpline quickly'
              : '상황에 맞는 긴급상담 기관을 빠르게 찾으세요'}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
            {isEnglish
              ? 'Compare Korean helplines by topic, urgency, and hours. You can start with the chat screen or jump directly to crisis, youth, women, addiction, migrant, and older-adult support pages.'
              : '주제별, 긴급도별, 운영시간별로 한국 상담 기관을 비교해 보세요. 챗 화면에서 바로 시작하거나 위기, 청소년, 여성, 중독, 이주민, 노인 지원 페이지로 바로 이동할 수 있습니다.'}
          </p>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-stone-900">
              {isEnglish
                ? 'If there is immediate danger, call first'
                : '즉각적인 위험이 있으면 먼저 연락하세요'}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {emergencyNumbers.map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
                >
                  <p className="text-lg font-semibold text-stone-900">
                    {item.number}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>
      </section>

      <section className="mx-auto w-full max-w-[760px] px-4 pb-14 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEnglish ? 'Who this is for' : '누구를 위한 서비스인가요'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isEnglish
                ? 'People facing suicide risk, depression, violence, youth distress, addiction, migrant support needs, or urgent emotional crises in Korea.'
                : '자살 위기, 우울, 폭력 피해, 청소년 위기, 중독, 이주민 지원, 급한 정서 위기를 겪는 분들을 위한 안내입니다.'}
            </p>
          </article>

          <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEnglish ? 'What you can compare' : '무엇을 비교할 수 있나요'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isEnglish
                ? 'Each page helps you compare phone numbers, hours, multilingual availability, and the kind of support each organization provides.'
                : '각 페이지에서 전화번호, 운영시간, 다국어 지원 여부, 기관별 지원 내용을 한눈에 비교할 수 있습니다.'}
            </p>
          </article>

          <article className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              {isEnglish ? 'When to use emergency lines' : '긴급 번호를 먼저 써야 할 때'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isEnglish
                ? 'If there is immediate danger to life or safety, contact 109, 112, or 119 before browsing general counseling resources.'
                : '생명이나 안전에 즉각적인 위험이 있다면 일반 상담 목록보다 먼저 109, 112, 119에 연락해야 합니다.'}
            </p>
          </article>
        </div>
        <div className="mt-6 rounded-[2rem] border border-stone-200 bg-white px-5 py-5 shadow-sm md:px-6">
          <h2 className="text-lg font-semibold text-stone-900">
            {isEnglish ? 'Need practical next-step guides?' : '조금 더 구체적인 도움 요청 가이드가 필요하신가요?'}
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            {isEnglish
              ? 'Open the guide section for practical help on suicide warning signs, depression, violence safety planning, youth support, addiction, migrant support, and older-adult care.'
              : '자살 위험 신호, 우울 상담 시작, 폭력 피해 대응, 청소년 지원, 중독, 이주민 지원, 노년기 돌봄까지 상황별로 먼저 무엇을 하면 좋은지 가이드로 정리해 두었습니다.'}
          </p>
          <div className="mt-5">
            <Link
              href={withLang('/guide', currentLang)}
              className="inline-flex items-center rounded-full border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
            >
              {isEnglish ? 'Open guides' : '가이드 열기'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
