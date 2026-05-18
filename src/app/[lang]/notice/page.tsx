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
      'Helpline Korea 이용 안내와 면책 고지를 확인하세요. 긴급 상황 연락처와 서비스 범위를 쉽게 안내합니다.',
    eyebrow: '사용 안내 및 면책 고지',
    heading: '이 사이트는 이렇게 도와드려요',
    intro:
      '여기까지 찾아오느라 많이 힘드셨을 수 있습니다. Helpline Korea는 한국에서 도움을 받을 수 있는 상담전화, 긴급 신고 번호, 공공 지원기관을 쉽게 찾을 수 있도록 만든 안내 사이트입니다.',
    subIntro: '상황에 맞는 기관을 찾는 데 이 사이트가 작은 도움이 되기를 바랍니다.',
    sections: [
      {
        title: '지금 위험한 상황이라면',
        paragraphs: [
          '지금 생명이나 몸의 안전이 위험하거나, 폭력·범죄·응급상황이 벌어지고 있다면 이 사이트를 더 살펴보거나 이메일 답변을 기다리지 말고 다음으로 바로 연락해 주세요.',
        ],
        bullets: [
          '112 범죄, 폭력, 위협, 스토킹, 신변 위험',
          '119 응급환자, 부상, 화재, 구조, 구급차',
          '109 자살위기 상담',
        ],
        notes: [
          '이메일은 실시간으로 확인되지 않을 수 있습니다.',
          '긴급한 상황에서는 이메일보다 112, 119, 109가 먼저입니다.',
        ],
      },
      {
        title: '이 사이트가 도울 수 있는 것',
        paragraphs: ['Helpline Korea는 다음과 같은 도움을 드릴 수 있습니다.'],
        bullets: [
          '상황에 맞는 상담기관이나 지원기관을 찾는 일',
          '어떤 번호에 먼저 연락하면 좋을지 정리하는 일',
          '기관에 연락하기 전에 물어볼 내용을 생각해 보는 일',
          '상담전화, 운영시간, 지원 대상 같은 정보를 확인하는 일',
          '잘못된 번호나 끊어진 링크를 고치는 일',
        ],
        notes: [
          '이메일로 문의를 주시면, 비긴급 상황에 한해 가능한 범위에서 일반적인 정보 안내를 드릴 수 있습니다.',
        ],
      },
      {
        title: '이 사이트가 대신할 수 없는 것',
        paragraphs: [
          'Helpline Korea는 전문 상담기관이 아닌 관계로, 본 사이트와 이메일 답변은 다음을 대신할 수 없습니다.',
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
          '또한 문의 내용에 민감한 이야기가 포함될 수 있으니, 안전한 기기와 환경에서 작성해 주세요.',
        ],
      },
      {
        title: '정보는 계속 확인하고 고치고 있습니다',
        paragraphs: [
          'Helpline Korea는 공식 기관 자료와 공개된 안내를 바탕으로 정보를 정리하려고 노력합니다.',
          '하지만 기관의 전화번호, 운영시간, 지원 내용은 바뀔 수 있습니다. 중요한 결정을 하기 전에는 해당 기관의 공식 홈페이지나 전화로 최신 정보를 한 번 더 확인해 주세요.',
          '잘못된 정보, 바뀐 번호, 끊어진 링크를 발견하셨다면 알려주세요. 확인 후 수정하겠습니다.',
        ],
      },
    ],
    closingTitle: '마지막으로',
    closingParagraphs: [
      '이 사이트는 도움을 찾는 길을 조금 더 쉽게 만들기 위한 안내 서비스입니다. 하지만 전문 상담, 진단, 치료, 법률 자문, 긴급 구조를 대신하지는 않습니다.',
      '지금 당장 위험하다면, 다음 전화로 바로 연락해 주세요.',
    ],
    closingEmergency: ['긴급상황 112·119', '자살위기 상담 109'],
    sectionLabel: '중요 안내',
  },
  en: {
    title: 'Usage Guide & Disclaimer | Helpline Korea',
    description:
      'Read the usage guide and disclaimer for Helpline Korea, including emergency contacts and service limits.',
    eyebrow: 'Usage Guide & Disclaimer',
    heading: 'How this website can help you',
    intro:
      'It may have taken a lot of strength to get here. Helpline Korea is a guidance website designed to help you quickly find counseling hotlines, emergency numbers, and public support resources in Korea.',
    subIntro:
      'We hope this site can be a small but practical help in finding support that fits your situation.',
    sections: [
      {
        title: 'If you are in danger right now',
        paragraphs: [
          'If your life or physical safety is at risk right now, or if violence, crime, or a medical emergency is happening, do not keep browsing this site and do not wait for an email reply. Contact the numbers below immediately.',
        ],
        bullets: [
          '112 Crime, violence, threats, stalking, immediate personal danger',
          '119 Medical emergency, injury, fire, rescue, ambulance',
          '109 Suicide crisis counseling',
        ],
        notes: [
          'Email may not be checked in real time.',
          'In urgent situations, 112, 119, and 109 come before email.',
        ],
      },
      {
        title: 'What this site can help with',
        paragraphs: ['Helpline Korea can help with the following:'],
        bullets: [
          'Finding counseling or support organizations relevant to your situation',
          'Organizing which number to call first',
          'Thinking through what to ask before contacting an organization',
          'Checking hotline numbers, service hours, and eligibility information',
          'Fixing incorrect numbers or broken links',
        ],
        notes: [
          'If you contact us by email, we may provide general information within a non-emergency scope.',
        ],
      },
      {
        title: 'What this site cannot replace',
        paragraphs: [
          'Because Helpline Korea is not a professional counseling provider, this website and email replies cannot replace the following:',
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
        title: 'When contacting by email',
        paragraphs: [
          'Email inquiries may not receive an immediate reply.',
          'Your message may include sensitive details, so please write from a safe device and environment.',
        ],
      },
      {
        title: 'We continuously review and correct information',
        paragraphs: [
          'Helpline Korea tries to organize information based on official sources and publicly available guidance.',
          'However, phone numbers, service hours, and support details can change. Before making important decisions, please confirm the latest information directly through the organization’s official website or phone line.',
          'If you find incorrect information, changed numbers, or broken links, please let us know. We will review and update it.',
        ],
      },
    ],
    closingTitle: 'Finally',
    closingParagraphs: [
      'This site is a guidance service to make the path to help a little easier. However, it does not replace professional counseling, diagnosis, treatment, legal advice, or emergency rescue.',
      'If you are in immediate danger, call the numbers below right away.',
    ],
    closingEmergency: ['Emergency 112 · 119', 'Suicide crisis counseling 109'],
    sectionLabel: 'Important guidance',
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
        <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">
          {copy.subIntro}
        </p>
      </header>

      <div className="mt-6 space-y-5">
        {copy.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[2rem] border border-stone-200 bg-white px-5 py-6 shadow-sm md:px-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
              {copy.sectionLabel}
            </p>
            <h2 className="text-xl font-semibold text-stone-900">{section.title}</h2>
            <div className="mt-3 space-y-3 text-base leading-8 text-stone-600">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {'bullets' in section ? (
              <ul className="mt-4 space-y-2 text-[15px] leading-7 text-stone-700">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {'notes' in section ? (
              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-700">
                {section.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[2rem] border border-green-200 bg-green-50 px-5 py-6 shadow-sm md:px-8">
        <h2 className="text-xl font-semibold text-stone-900">{copy.closingTitle}</h2>
        <div className="mt-3 space-y-3 text-base leading-8 text-stone-700">
          {copy.closingParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-5 space-y-1">
          {copy.closingEmergency.map((item) => (
            <p key={item} className="text-lg font-semibold text-green-800">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
