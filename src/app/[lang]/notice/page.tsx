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
    heading: '이용안내 및 면책 고지',
    intro:
      'Helpline Korea는 한국의 상담전화, 긴급 신고 번호, 공공 지원기관을 안내합니다.',
    sections: [
      {
        title: '지금 위험한 상황이라면',
        paragraphs: [
          '생명이나 몸의 안전이 위험하거나 폭력·범죄·응급상황이 벌어지고 있다면 아래 번호로 연락하세요.',
        ],
        bullets: [
          '112 범죄, 폭력, 위협, 스토킹, 신변 위험',
          '119 응급환자, 부상, 화재, 구조, 구급차',
          '109 자살위기 상담',
        ],
      },
      {
        title: '이 사이트가 도울 수 있는 것',
        paragraphs: [],
        bullets: [
          '상황에 맞는 기관과 연락 방법 찾기',
          '기관에 연락하기 전에 물어볼 내용 정리하기',
          '잘못된 정보나 연결되지 않는 링크 알리기',
        ],
      },
      {
        title: '이 사이트의 역할과 한계',
        paragraphs: [
          'Helpline Korea는 정보를 안내하는 사이트입니다. 아래 서비스는 해당 전문기관이나 긴급기관에 직접 요청해야 합니다.',
        ],
        bullets: [
          '전문 심리상담과 지속적인 사례관리',
          '의료적 진단·치료, 약 복용·입원 여부 판단',
          '법률 자문',
          '경찰 신고와 긴급 구조 요청',
        ],
      },
      {
        title: '이메일로 문의할 때',
        paragraphs: [
          '긴급하지 않은 문의는 이메일로 보내세요. 일반적인 정보를 안내할 수 있지만, 바로 답장이 오지 않을 수 있습니다.',
          '문의에 민감한 내용이 포함될 수 있습니다. 안전한 기기와 장소에서 이메일을 작성해 주세요.',
        ],
      },
      {
        title: '정보를 확인하고 수정합니다',
        paragraphs: [
          '공식 기관 자료와 공개 안내를 바탕으로 정보를 정리합니다. 전화번호, 운영시간, 지원 내용은 바뀔 수 있으므로 중요한 결정 전에 해당 기관에 확인하세요.',
          '잘못된 정보나 연결되지 않는 링크를 알려주시면 확인한 뒤 수정하겠습니다.',
        ],
      },
    ],
  },
  en: {
    title: 'Usage Guide and Disclaimer | Helpline Korea',
    description:
      'Read the usage guide, emergency contacts, and disclaimer. Helpline Korea does not replace professional counseling, medical care, legal advice, or emergency rescue.',
    heading: 'Usage guide and disclaimer',
    intro:
      'Helpline Korea lists counseling helplines, emergency numbers, and public support services in Korea.',
    sections: [
      {
        title: 'If you are in danger right now',
        paragraphs: [
          'If someone’s life or physical safety is at risk, or violence, a crime, or a medical emergency is happening now, call the numbers below.',
        ],
        bullets: [
          '112 Crime, violence, threats, stalking, immediate personal danger',
          '119 Medical emergency, injury, fire, rescue, ambulance',
          '109 Suicide crisis counseling',
        ],
      },
      {
        title: 'What this site can help with',
        paragraphs: [],
        bullets: [
          'Find services and contact methods for your situation',
          'Prepare questions before you contact an organization',
          'Report incorrect information or broken links',
        ],
      },
      {
        title: 'Scope and limits of this site',
        paragraphs: [
          'Helpline Korea provides information. For the services below, contact a professional service or an emergency service directly.',
        ],
        bullets: [
          'Professional psychological counseling and ongoing case management',
          'Medical diagnosis, treatment, and decisions about medication or hospitalization',
          'Legal advice',
          'Police reporting and emergency rescue',
        ],
      },
      {
        title: 'When you email us',
        paragraphs: [
          'You can email questions that are not urgent. We can provide general information, but you may not receive an immediate reply.',
          'Your message may include sensitive details. Please use a safe device and place to write your email.',
        ],
      },
      {
        title: 'We review and correct information',
        paragraphs: [
          'We use official sources and public guidance. Phone numbers, hours, and support details can change. Confirm the latest information with the organization before an important decision.',
          'Tell us about incorrect information or broken links. We will check and correct them.',
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
      className="mx-auto w-full max-w-[860px] px-3 pb-14 pt-6 sm:px-4 md:px-6"
    >
      <header>
        <h1 className="text-2xl font-bold leading-snug text-stone-900 md:text-3xl">
          {copy.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          {copy.intro}
        </p>
      </header>

      <div className="mt-6 divide-y divide-stone-200 border-t border-stone-200">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="py-5"
          >
            <h2 className="text-lg font-semibold leading-relaxed text-stone-900">{section.title}</h2>
            {section.paragraphs.length > 0 ? (
              <div className="mt-3 space-y-3 text-base leading-relaxed text-stone-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>
                    <EmergencyText text={paragraph} />
                  </p>
                ))}
              </div>
            ) : null}
            {'bullets' in section ? (
              <ul className="mt-3 space-y-2 text-base leading-relaxed text-stone-700">
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
          </article>
        ))}
      </div>

    </section>
  )
}
