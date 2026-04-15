import { CATEGORY_META } from '@/lib/categories'
import { translateCategoryLabel, type Lang, withLang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://helpline.or.kr'

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION

const GLOBAL_KEYWORDS = {
  ko: [
    '긴급상담 전화번호',
    '위기상담',
    '상담전화 모음',
    '심리상담 전화',
    '도움 전화번호',
    '자살예방',
    '무료 상담',
    '24시간 상담',
    '여성긴급전화',
    '청소년상담전화',
    '정신건강복지센터',
    '성소수자 상담',
    '외국인 상담전화',
    '중독 상담전화',
    '노인 상담전화',
  ],
  en: [
    'Korean crisis hotline',
    'Korea emergency counseling',
    'suicide prevention hotline Korea',
    'mental health hotline Korea',
    'women support hotline Korea',
    'youth hotline Korea',
    'LGBTQ counseling Korea',
    'migrant support hotline Korea',
    'addiction counseling Korea',
    'elder support hotline Korea',
  ],
} as const

const HOME_COPY = {
  ko: {
    title: '긴급상담 전화번호 디렉터리 | 자살예방·우울·폭력·중독 상담전화 모음',
    description:
      '자살예방 109, 여성긴급전화 1366, 청소년 1388 등 한국 긴급상담 전화번호를 상황별로 안내합니다. 24시간 무료 상담, 운영시간, 지원 대상을 한눈에 비교하세요.',
    keywords: [
      '긴급상담 전화번호',
      '상담전화 모음',
      '위기상담',
      '자살예방 109',
      '여성긴급전화 1366',
      '청소년 1388',
      ...GLOBAL_KEYWORDS.ko,
    ],
  },
  en: {
    title: 'Korean Crisis Helpline Directory | Emergency Support Numbers',
    description:
      'Browse Korean crisis hotlines for suicide risk, youth distress, violence, addiction, migrants, and older adults. Compare support numbers, hours, and access notes.',
    keywords: [
      'Korean crisis hotline directory',
      'emergency support numbers Korea',
      ...GLOBAL_KEYWORDS.en,
    ],
  },
} as const

const CHAT_COPY = {
  ko: {
    title: '긴급상담·위기상담 전화번호 찾기 | 헬프라인 챗',
    description:
      '긴급상담과 위기상담 전화번호를 빠르게 찾을 수 있는 헬프라인 챗입니다. 두 질문에 답하고 자살예방 109, 1366, 1388 등 맞는 상담기관을 확인하세요.',
    keywords: [
      '긴급상담',
      '위기상담 전화번호',
      '심리상담 전화',
      '도움 전화번호',
      '힘들때 전화할 곳',
      '지금 전화할 수 있는 상담',
    ],
  },
  en: {
    title: 'Find a Korean Crisis Helpline | Helpline Chat',
    description:
      'Answer two short questions and find Korean crisis helplines that fit your situation, urgency, and support needs.',
    keywords: [
      'Korean crisis helpline chat',
      'find a helpline in Korea',
      'Korea hotline directory',
      ...GLOBAL_KEYWORDS.en,
    ],
  },
} as const

const CATEGORY_COPY = {
  crisis: {
    ko: {
      title: '자살예방 상담전화 109 · 위기 긴급상담 기관 안내 | 헬프라인',
      heading: '위기·긴급 상담 기관',
      description:
        '죽고 싶거나 위험한 상황일 때 전화할 수 있는 곳을 안내합니다. 자살·자해 예방 상담전화 109, 생명의전화 등 24시간 정신건강 위기상담 기관의 전화번호와 운영시간을 확인하세요.',
      keywords: [
        '자살예방 상담전화',
        '109 전화번호',
        '자살 상담',
        '위기 상담',
        '생명의전화',
        '죽고싶을때 전화',
        '24시간 자살상담',
      ],
    },
    en: {
      title: 'Suicide Prevention Hotline 109 and Crisis Helplines in Korea | Helpline',
      heading: 'Crisis Helplines',
      description:
        'Find Korean mental health crisis hotlines you can call during suicidal thoughts or immediate danger, including 109 and other 24/7 emergency counseling services.',
      keywords: [
        'suicide prevention hotline Korea',
        '109 hotline Korea',
        'crisis hotline Korea',
        '24/7 suicide counseling Korea',
      ],
    },
  },
  depression: {
    ko: {
      title: '우울증 상담 · 무료 심리상담 전화번호 안내 | 헬프라인',
      heading: '우울 상담 기관',
      description:
        '우울할 때 전화할 수 있는 무료 심리상담 기관을 안내합니다. 정신건강복지센터, 심리상담 바우처, 직장인 EAP 등 상담 전화번호와 이용 방법을 비교하세요.',
      keywords: [
        '우울증 상담',
        '무료 심리상담',
        '우울할때 전화',
        '정신건강복지센터',
        '심리상담 바우처',
        '불안장애 상담 전화',
      ],
    },
    en: {
      title: 'Depression Counseling and Free Mental Health Support in Korea | Helpline',
      heading: 'Depression Helplines',
      description:
        'Compare Korean depression counseling options, mental health centers, and low-cost support lines when you need help with sadness, anxiety, or burnout.',
      keywords: [
        'depression counseling Korea',
        'free mental health support Korea',
        'mental health center Korea',
        'anxiety counseling Korea',
      ],
    },
  },
  women: {
    ko: {
      title: '여성긴급전화 1366 · 가정폭력·성폭력 상담 안내 | 헬프라인',
      heading: '여성 상담 기관',
      description:
        '가정폭력, 성폭력, 스토킹, 데이트폭력 피해 시 전화할 수 있는 기관을 안내합니다. 여성긴급전화 1366 등 여성 지원 상담기관의 전화번호와 운영시간을 확인하세요.',
      keywords: [
        '여성긴급전화 1366',
        '가정폭력 상담',
        '성폭력 상담',
        '스토킹 신고',
        '데이트폭력 상담',
        '성폭력 피해 무료상담',
      ],
    },
    en: {
      title: 'Women Support Hotline 1366 and Violence Counseling in Korea | Helpline',
      heading: 'Women Helplines',
      description:
        'Find Korean hotlines for domestic violence, sexual violence, stalking, and dating violence, including the 1366 women support line.',
      keywords: [
        'women support hotline Korea',
        '1366 Korea',
        'domestic violence counseling Korea',
        'sexual violence helpline Korea',
      ],
    },
  },
  youth: {
    ko: {
      title: '청소년 위기상담 1388 · 학교폭력·가출 상담 안내 | 헬프라인',
      heading: '청소년 상담 기관',
      description:
        '학교폭력, 가출, 학업 스트레스, 자해 등 청소년 위기상담 기관을 안내합니다. 1388 전화·카카오톡 상담과 청소년상담복지센터 이용 방법을 확인하세요.',
      keywords: [
        '청소년 상담전화 1388',
        '청소년 위기상담',
        '학교폭력 상담',
        '가출 상담',
        '학교폭력 신고 전화번호',
        '청소년 자해 상담',
      ],
    },
    en: {
      title: 'Youth Helpline 1388 and Teen Crisis Support in Korea | Helpline',
      heading: 'Youth Helplines',
      description:
        'Explore Korean support lines for school violence, runaway youth, academic stress, and teen self-harm, including hotline 1388.',
      keywords: [
        'youth helpline Korea',
        '1388 Korea',
        'teen crisis support Korea',
        'school violence counseling Korea',
      ],
    },
  },
  queer: {
    ko: {
      title: '성소수자(LGBTQ+) 상담 · 퀴어 친화 정신건강 지원 | 헬프라인',
      heading: '성소수자 상담 기관',
      description:
        '성소수자 친화 상담기관, 퀴어 정신건강 지원, 커밍아웃 상담 등 한국 LGBTQ+ 지원 기관을 안내합니다. 전화번호와 이용 방법을 확인하세요.',
      keywords: [
        '성소수자 상담',
        '퀴어 상담',
        'LGBT 상담 한국',
        '커밍아웃 상담',
        '성정체성 고민 상담',
        '성소수자 우울증 상담',
      ],
    },
    en: {
      title: 'LGBTQ+ Counseling and Queer-Friendly Support in Korea | Helpline',
      heading: 'LGBTQ+ Helplines',
      description:
        'Find queer-friendly counseling, coming-out support, and mental health resources for LGBTQ+ people in Korea.',
      keywords: [
        'LGBTQ counseling Korea',
        'queer friendly mental health Korea',
        'coming out support Korea',
        'transgender counseling Korea',
      ],
    },
  },
  migrant: {
    ko: {
      title: '외국인·이주민 상담전화 · Foreigner Helpline Korea | 헬프라인',
      heading: '이주민·외국인 상담 기관',
      description:
        '한국 거주 외국인, 이주노동자, 결혼이주여성을 위한 다국어 상담전화 안내입니다. 언어 지원과 상담 가능 기관을 빠르게 확인하세요.',
      keywords: [
        '외국인 상담전화',
        '이주민 지원',
        '다문화 상담',
        '외국인 노동자 상담',
        'foreigner helpline Korea',
        'crisis hotline Korea English',
      ],
    },
    en: {
      title: 'Foreigner and Migrant Helplines in Korea | Helpline',
      heading: 'Migrants / Foreigners Helplines',
      description:
        'Find multilingual counseling and crisis support numbers for foreigners, migrant workers, and marriage migrants living in Korea.',
      keywords: [
        'foreigner helpline Korea',
        'migrant support Korea',
        'multilingual counseling Korea',
        'crisis hotline Korea English',
      ],
    },
  },
  addiction: {
    ko: {
      title: '중독 상담전화 · 도박·알코올·게임·약물 중독 지원 | 헬프라인',
      heading: '중독 상담 기관',
      description:
        '도박, 알코올, 게임, 약물 중독 상담 기관을 안내합니다. 중독관리통합지원센터 등 전화번호와 이용 방법을 비교해 보세요.',
      keywords: [
        '중독 상담전화',
        '도박중독 상담',
        '알코올 중독 상담',
        '마약 상담',
        '게임중독 상담',
        '술 끊고 싶을때 전화',
      ],
    },
    en: {
      title: 'Addiction Counseling for Gambling, Alcohol, Drugs, and Gaming | Helpline',
      heading: 'Addiction Helplines',
      description:
        'Compare Korean addiction counseling services for gambling, alcohol, drugs, gaming, and internet overuse.',
      keywords: [
        'addiction counseling Korea',
        'gambling addiction help Korea',
        'alcohol counseling Korea',
        'gaming addiction counseling Korea',
      ],
    },
  },
  elder: {
    ko: {
      title: '노인 상담전화 · 노인학대 신고·독거노인 지원 안내 | 헬프라인',
      heading: '노인 상담 기관',
      description:
        '노인학대 신고, 독거노인 돌봄, 어르신 우울증 상담 등 노인 지원 기관 전화번호를 안내합니다. 보건복지콜센터와 노인보호전문기관 이용 방법을 확인하세요.',
      keywords: [
        '노인 상담전화',
        '노인학대 신고',
        '독거노인 지원',
        '노인 우울증 상담',
        '어르신 심리상담',
        '노인학대 신고 전화번호',
      ],
    },
    en: {
      title: 'Older Adult Support and Elder Abuse Reporting in Korea | Helpline',
      heading: 'Older Adults Helplines',
      description:
        'Find support numbers for elder abuse reporting, older adult counseling, loneliness, and care services in Korea.',
      keywords: [
        'older adult support Korea',
        'elder abuse reporting Korea',
        'senior counseling Korea',
        'lonely elderly support Korea',
      ],
    },
  },
} as const

export const SITE_TITLE = HOME_COPY.ko.title
export const SITE_DESCRIPTION = HOME_COPY.ko.description
export const SITE_KEYWORDS = [...GLOBAL_KEYWORDS.ko, ...GLOBAL_KEYWORDS.en]

export function getLocalizedPath(path: string, lang: Lang): string {
  return withLang(path || '/', lang)
}

export function getLocalizedUrl(path: string, lang: Lang): string {
  return `${SITE_URL}${getLocalizedPath(path, lang)}`
}

export function getLanguageAlternates(path: string): Record<string, string> {
  return {
    ko: getLocalizedUrl(path, 'ko'),
    en: getLocalizedUrl(path, 'en'),
    'x-default': getLocalizedUrl(path, 'ko'),
  }
}

export function getHomeSeoCopy(lang: Lang) {
  return {
    ...HOME_COPY[lang],
    keywords: [...HOME_COPY[lang].keywords],
  }
}

export function getChatSeoCopy(lang: Lang) {
  return {
    ...CHAT_COPY[lang],
    keywords: [...CHAT_COPY[lang].keywords],
  }
}

export function getCategorySeoCopy(category: Category, lang: Lang) {
  const sourceLabel = CATEGORY_META[category].label
  const label = translateCategoryLabel(sourceLabel, lang)
  const copy = CATEGORY_COPY[category][lang]

  return {
    label,
    title: copy.title,
    heading: copy.heading,
    description: copy.description,
    keywords: [...copy.keywords],
  }
}

export function getLocaleForMetadata(lang: Lang): 'ko_KR' | 'en_US' {
  return lang === 'en' ? 'en_US' : 'ko_KR'
}

export function getAlternateOpenGraphLocale(
  lang: Lang
): Array<'ko_KR' | 'en_US'> {
  return lang === 'en' ? ['ko_KR'] : ['en_US']
}
