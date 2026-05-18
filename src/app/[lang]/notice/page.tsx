import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'
import { isLang, type Lang } from '@/lib/i18n'
import {
  getAlternateOpenGraphLocale,
  getLanguageAlternates,
  getLocaleForMetadata,
  getLocalizedUrl,
} from '@/lib/seo'

interface Props {
  params: Promise<{ lang: string }>
}

const NOTICE_COPY = {
  ko: {
    title: '사용 안내 및 면책 고지 | Helpline Korea',
    description:
      'Helpline Korea 이용 방법, 제공 범위, 이메일 안내 범위, 그리고 면책 고지를 확인하세요.',
    eyebrow: '사용 안내 및 면책 고지',
    heading: '서비스 이용 전에 꼭 확인해 주세요',
    intro:
      'Helpline Korea는 상담기관과 공공 지원 정보를 빠르게 찾을 수 있도록 돕는 안내 사이트입니다. 아래 내용을 확인하시면 서비스의 성격과 한계를 보다 정확히 이해할 수 있습니다.',
    sections: [
      {
        title: '서비스의 목적',
        body: '이 사이트는 한국의 상담기관 및 공공 지원 정보를 정리해 안내하는 정보 제공 서비스입니다. 상황에 맞는 기관을 찾는 출발점으로 활용해 주세요.',
      },
      {
        title: '이메일 안내 범위',
        body: '이메일 문의 시 제한적인 일반 정보 안내를 제공할 수 있습니다. 다만 개별 사안에 대한 맞춤형 판단이나 심층 상담은 제공하지 않습니다.',
      },
      {
        title: '중요한 면책 고지',
        body: '이 사이트와 이메일 답변은 전문 상담, 진단, 치료, 법률 자문, 긴급 구조를 대체하지 않습니다. 즉각적인 위험이 있거나 전문적 판단이 필요한 경우 관련 전문기관 또는 긴급번호에 즉시 연락해 주세요.',
      },
    ],
    emergencyTitle: '긴급 상황이라면 먼저 연락하세요',
    emergencyItems: [
      '109: 자살 위기 상담',
      '112: 경찰 긴급 신고',
      '119: 응급 구조 및 구급',
    ],
  },
  en: {
    title: 'Usage Guide & Disclaimer | Helpline Korea',
    description:
      'Read how to use Helpline Korea, what information we provide, and important disclaimer details.',
    eyebrow: 'Usage Guide & Disclaimer',
    heading: 'Please read before using this service',
    intro:
      'Helpline Korea helps people quickly find counseling agencies and public support resources. The notes below explain the scope and limits of this service.',
    sections: [
      {
        title: 'Purpose of this service',
        body: 'This website is an informational directory of Korean counseling agencies and public support resources. Use it as a starting point for finding appropriate support.',
      },
      {
        title: 'Scope of email guidance',
        body: 'We may provide limited general information by email. However, we do not provide individualized judgment or in-depth counseling for specific personal cases.',
      },
      {
        title: 'Important disclaimer',
        body: 'This website and email responses do not replace professional counseling, diagnosis, treatment, legal advice, or emergency rescue services. If there is immediate danger or you need professional judgment, contact the relevant professionals or emergency numbers right away.',
      },
    ],
    emergencyTitle: 'In urgent situations, call first',
    emergencyItems: [
      '109: Suicide crisis counseling',
      '112: Police emergency line',
      '119: Emergency rescue and ambulance',
    ],
  },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const copy = NOTICE_COPY[currentLang]
  const url = getLocalizedUrl('/notice', currentLang)

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('/notice'),
    },
    openGraph: {
      type: 'website',
      locale: getLocaleForMetadata(currentLang),
      alternateLocale: getAlternateOpenGraphLocale(currentLang),
      url,
      siteName: SITE_NAME,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
  }
}

export default async function LocalizedNoticePage({ params }: Props) {
  const { lang } = await params
  const currentLang: Lang = isLang(lang) ? lang : 'ko'
  const copy = NOTICE_COPY[currentLang]

  return (
    <section
      lang={currentLang}
      className="mx-auto w-full max-w-[860px] px-4 pb-14 pt-6 md:px-6"
    >
      <header className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
          {copy.intro}
        </p>
      </header>

      <div className="mt-6 space-y-5">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8"
          >
            <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
            <p className="mt-3 text-base leading-8 text-stone-600">{section.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[2rem] border border-stone-200 bg-stone-50 px-5 py-6 shadow-sm md:px-8">
        <h2 className="text-lg font-semibold text-stone-900">{copy.emergencyTitle}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-700">
          {copy.emergencyItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
