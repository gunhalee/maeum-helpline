import type { Metadata } from 'next'
import EmergencyText from '@/components/EmergencyText'
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
    title: '사용 안내 및 면책 고지 | 긴급상담 헬프라인',
    description:
      '이 사이트의 이용 범위와 긴급 연락처를 확인하세요. 이 사이트는 전문 상담, 의료, 법률 자문을 대신하지 않습니다. 자세한 내용은 면책 고지에서 확인하세요.',
    eyebrow: '사용 안내 및 면책 고지',
    heading: '이 사이트는 이렇게 도와드려요',
    intro:
      '여기까지 찾아오느라 많이 힘드셨을 수 있습니다. Helpline Korea는 한국의 상담전화와 긴급 신고 번호를 안내합니다. 도움을 받을 수 있는 공공 지원기관도 안내합니다.',
    subIntro: '상황에 맞는 기관을 찾는 데 이 사이트가 작은 도움이 되기를 바랍니다.',
    sections: [
      {
        title: '지금 위험한 상황이라면',
        paragraphs: [
          '지금 생명이나 몸의 안전이 걱정되나요? 폭력, 범죄 또는 응급상황이 벌어지고 있나요? 이런 경우에는 아래 번호가 이 사이트보다 더 빠른 도움이 될 수 있습니다.',
        ],
        bullets: [
          '112 범죄, 폭력, 위협, 스토킹, 신변 위험',
          '119 응급환자, 부상, 화재, 구조, 구급차',
          '109 자살위기 상담',
        ],
      },
      {
        title: '이 사이트가 도울 수 있는 것',
        paragraphs: ['Helpline Korea는 다음과 같은 도움을 드릴 수 있습니다.'],
        bullets: [
          '상황에 맞는 상담기관이나 지원기관 찾기',
          '먼저 연락할 번호 정리하기',
          '기관에 연락하기 전에 물어볼 내용 정리하기',
          '상담전화, 운영시간, 지원 대상 확인하기',
          '잘못된 번호나 연결되지 않는 링크 고치기',
        ],
        notes: [
          '긴급하지 않은 문의는 이메일로 보내셔도 됩니다. 가능한 범위에서 일반적인 정보를 안내해 드릴 수 있습니다.',
        ],
      },
      {
        title: '이 사이트의 역할과 한계',
        paragraphs: [
          'Helpline Korea는 정보를 안내하는 사이트입니다. 아래 서비스는 해당 전문기관이나 긴급기관에 직접 요청해야 합니다.',
        ],
        bullets: [
          '전문 심리상담',
          '의료적 진단이나 치료',
          '약 복용이나 입원 여부 판단',
          '법률 자문',
          '경찰 신고',
          '긴급 구조 요청',
          '지속적인 사례관리',
        ],
      },
      {
        title: '이메일로 문의할 때',
        paragraphs: [
          '이메일 문의는 바로 답장이 오지 않을 수 있습니다.',
          '문의에 민감한 내용이 포함될 수 있습니다. 안전한 기기와 장소에서 이메일을 작성해 주세요.',
        ],
      },
      {
        title: '정보를 확인하고 수정합니다',
        paragraphs: [
          'Helpline Korea는 공식 기관 자료와 공개 안내를 바탕으로 정보를 정리하려고 노력합니다.',
          '기관의 전화번호, 운영시간, 지원 내용은 바뀔 수 있습니다. 중요한 결정을 하기 전에 해당 기관의 공식 홈페이지나 전화로 최신 정보를 확인해 주세요.',
          '잘못된 정보, 바뀐 번호, 연결되지 않는 링크를 발견하면 알려주세요. 확인한 뒤 수정하겠습니다.',
        ],
      },
    ],
  },
  en: {
    title: 'Usage Guide and Disclaimer | Helpline Korea',
    description:
      'Read the usage guide, emergency contacts, and disclaimer. Helpline Korea does not replace professional counseling, medical care, legal advice, or emergency rescue.',
    eyebrow: 'Usage Guide & Disclaimer',
    heading: 'How this website may help',
    intro:
      'It may have taken a lot of strength to get here. Helpline Korea helps you find counseling helplines, emergency numbers, and public support services in Korea.',
    subIntro:
      'We hope this site helps you find support for your needs.',
    sections: [
      {
        title: 'If you are in danger right now',
        paragraphs: [
          'Is someone\'s life or physical safety at risk? Is violence, a crime, or a medical emergency happening now? In these situations, the numbers below may help faster than this site.',
        ],
        bullets: [
          '112 Crime, violence, threats, stalking, immediate personal danger',
          '119 Medical emergency, injury, fire, rescue, ambulance',
          '109 Suicide crisis counseling',
        ],
      },
      {
        title: 'What this site can help with',
        paragraphs: ['Helpline Korea can help with the following:'],
        bullets: [
          'Find counseling or support organizations for your situation',
          'Choose which number to call first',
          'Prepare questions before you contact an organization',
          'Check helpline numbers, hours, and eligibility requirements',
          'Correct wrong numbers or links that do not work',
        ],
        notes: [
          'For questions that are not urgent, you can email us. We may provide general information within the scope of this site.',
        ],
      },
      {
        title: 'Scope and limits of this site',
        paragraphs: [
          'Helpline Korea provides information. For the services below, contact a professional service or an emergency service directly.',
        ],
        bullets: [
          'Professional psychological counseling',
          'Medical diagnosis or treatment',
          'Clinical decisions about medication or hospitalization',
          'Legal advice',
          'Police reporting',
          'Emergency rescue requests',
          'Ongoing case management',
        ],
      },
      {
        title: 'When you email us',
        paragraphs: [
          'You may not receive an immediate reply to your email.',
          'Your message may include sensitive details. Please use a safe device and place to write your email.',
        ],
      },
      {
        title: 'We review and correct information',
        paragraphs: [
          'Helpline Korea tries to use official sources and public guidance to prepare this information.',
          'Phone numbers, hours, and support details can change. Before an important decision, confirm the latest information on the organization\'s official website or by phone.',
          'If you find wrong information, changed numbers, or links that do not work, please tell us. We will check and correct the information.',
        ],
      },
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
      <header className="rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-tight text-stone-900">
          {copy.heading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
          {copy.intro}
        </p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">
          {copy.subIntro}
        </p>
      </header>

      <div className="mt-6 space-y-5">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8"
          >
            <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
            <div className="mt-3 space-y-3 text-base leading-8 text-stone-600">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <EmergencyText text={paragraph} />
                </p>
              ))}
            </div>
            {'bullets' in section ? (
              <ul className="mt-4 space-y-2 text-[15px] leading-7 text-stone-700">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-700" />
                    <span>
                      <EmergencyText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {'notes' in section ? (
              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-700">
                {section.notes.map((note) => (
                  <p key={note}>
                    <EmergencyText text={note} />
                  </p>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

    </section>
  )
}
