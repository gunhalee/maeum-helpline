import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/categories'
import { SITE_NAME } from '@/lib/constants'
import { translateCategoryLabel, type Lang, withLang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type SeoCopy = {
  title: string
  description: string
  keywords: string[]
}

type CategorySeoCopy = SeoCopy & {
  heading: string
  searchIntents: string[]
  primaryServices: string[]
}

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

type SitemapProfile = {
  changeFrequency: ChangeFrequency
  priority: number
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://helpline.or.kr'

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION
export const NAVER_SITE_VERIFICATION =
  process.env.NAVER_SITE_VERIFICATION ??
  'a1ca50b0cb5985926c31ef7d07966e591951215d'

export const SEO_CONTENT_UPDATED_AT = '2026-06-04T00:00:00+09:00'
export const SEO_CONTENT_UPDATED_DATE = new Date(SEO_CONTENT_UPDATED_AT)

export const SEO_INDEXED_PATHS = [
  '/',
  '/about',
  '/guide',
  '/notice',
  ...CATEGORY_ORDER.map((category) => `/${category}`),
] as const

export const SITE_TOPICS = [
  '109 자살예방상담전화',
  '119 긴급구조',
  '112 범죄신고',
  '1366 여성긴급전화',
  '1388 청소년상담',
  '성소수자 상담',
  '다누리콜센터',
  '노인학대 신고',
  '중독 상담',
  '범죄피해 지원',
  'Korean crisis hotline',
  'Korea counseling support',
] as const

const GLOBAL_KEYWORDS = {
  ko: [
    '긴급상담 전화번호',
    '위기상담',
    '상담전화 모음',
    '무료 상담전화',
    '24시간 상담',
    '109 자살예방상담',
    '1366 여성긴급전화',
    '1388 청소년상담',
    '스마일센터',
    '다누리콜센터',
    '성소수자 상담',
    '중독 상담전화',
    '노인학대 신고',
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
    'crime victim support Korea',
  ],
} as const

const HOME_COPY = {
  ko: {
    title: `${SITE_NAME} | 한국 상담전화·지원기관 안내`,
    description:
      '109 자살예방상담, 1366 여성긴급전화, 1388 청소년상담 등 한국의 위기상담 전화와 공공 지원기관을 상황별로 정리한 안내 서비스입니다.',
    keywords: [
      '긴급상담 헬프라인',
      '상담전화 안내',
      '한국 위기상담',
      '지원기관 찾기',
      ...GLOBAL_KEYWORDS.ko,
    ],
  },
  en: {
    title: 'Helpline Korea | Korean Counseling and Crisis Support Directory',
    description:
      'Find Korean crisis hotlines and public support services by situation, including 109, 1366, 1388, migrant support, addiction counseling, and crime victim support.',
    keywords: [
      'Helpline Korea',
      'Korean counseling directory',
      'Korea support services',
      ...GLOBAL_KEYWORDS.en,
    ],
  },
} as const satisfies Record<Lang, SeoCopy>

const CHAT_COPY = {
  ko: {
    title: `상담처 매칭 챗 | ${SITE_NAME}`,
    description:
      '몇 가지 선택만으로 위기·우울·폭력피해·청소년·성소수자·이주민·중독·범죄피해 상황에 맞는 상담처와 함께 볼 기관을 찾아보세요.',
    keywords: [
      '상담처 매칭',
      '상담전화 찾기',
      '지금 전화할 상담처',
      '위기상담 챗',
      ...GLOBAL_KEYWORDS.ko,
    ],
  },
  en: {
    title: `Helpline Matcher | ${SITE_NAME}`,
    description:
      'Answer short button-based questions and find Korean helplines that fit your urgency, situation, and support needs.',
    keywords: [
      'Korean helpline matcher',
      'find a helpline in Korea',
      'Korea crisis support chat',
      ...GLOBAL_KEYWORDS.en,
    ],
  },
} as const satisfies Record<Lang, SeoCopy>

const CATEGORY_COPY = {
  crisis: {
    ko: {
      title: `위기·긴급 상담전화 109·119 | ${SITE_NAME}`,
      heading: '위기·긴급 상담 기관',
      description:
        '자살생각, 자해 위험, 생명이나 신체 안전이 걱정될 때 먼저 연결할 109, 119, 112 및 24시간 위기상담 기관을 정리했습니다.',
      keywords: [
        '위기상담 전화',
        '109 자살예방상담',
        '119 긴급구조',
        '112 신고',
        '자살 생각 상담',
        '자해 위험 상담',
        '24시간 위기상담',
      ],
      searchIntents: [
        '죽고 싶을 때 어디에 전화해야 하는지',
        '자해 위험이 있을 때 109와 119 중 무엇이 먼저인지',
        '밤에도 연결되는 위기상담 기관이 있는지',
      ],
      primaryServices: ['109', '119', '112'],
    },
    en: {
      title: `Crisis Hotlines 109 and 119 | ${SITE_NAME}`,
      heading: 'Crisis Helplines',
      description:
        'Find Korean crisis numbers for suicidal thoughts, self-harm risk, or immediate danger, including 109, 119, 112, and 24/7 support lines.',
      keywords: [
        'crisis hotline Korea',
        '109 hotline Korea',
        'suicide prevention Korea',
        '119 emergency Korea',
        'self harm help Korea',
      ],
      searchIntents: [
        'which Korean number to call during suicidal thoughts',
        'whether 109 or 119 is first during immediate danger',
        '24/7 crisis counseling in Korea',
      ],
      primaryServices: ['109', '119', '112'],
    },
  },
  depression: {
    ko: {
      title: `우울·불안 상담전화와 무료 심리상담 | ${SITE_NAME}`,
      heading: '우울 상담 기관',
      description:
        '우울감, 불안, 번아웃으로 상담이 필요할 때 이용할 정신건강복지센터, 심리상담 바우처, 저비용 상담 기관을 비교합니다.',
      keywords: [
        '우울증 상담',
        '불안 상담',
        '무료 심리상담',
        '정신건강복지센터',
        '심리상담 바우처',
        '번아웃 상담',
      ],
      searchIntents: [
        '우울할 때 무료로 상담받을 수 있는 곳',
        '정신건강복지센터와 심리상담 바우처 차이',
        '진단 없이 상담을 시작할 수 있는지',
      ],
      primaryServices: ['정신건강복지센터', '심리상담 바우처'],
    },
    en: {
      title: `Depression and Anxiety Counseling | ${SITE_NAME}`,
      heading: 'Depression Helplines',
      description:
        'Compare Korean counseling options for depression, anxiety, burnout, community mental health centers, and low-cost psychological support.',
      keywords: [
        'depression counseling Korea',
        'free mental health support Korea',
        'anxiety counseling Korea',
        'mental health center Korea',
      ],
      searchIntents: [
        'free counseling for depression in Korea',
        'how to contact a mental health center in Korea',
        'low-cost therapy options in Korea',
      ],
      primaryServices: ['Community mental health centers', 'Counseling vouchers'],
    },
  },
  women: {
    ko: {
      title: `여성긴급전화 1366·폭력피해 상담 | ${SITE_NAME}`,
      heading: '여성 상담 기관',
      description:
        '가정폭력, 성폭력, 스토킹, 교제폭력 상황에서 1366과 여성폭력 피해 지원기관의 전화번호, 운영시간, 지원 내용을 확인하세요.',
      keywords: [
        '여성긴급전화 1366',
        '가정폭력 상담',
        '성폭력 상담',
        '스토킹 신고',
        '교제폭력 상담',
        '폭력피해 지원',
      ],
      searchIntents: [
        '1366에 전화하면 신고해야 하는지',
        '가정폭력이나 스토킹을 상담만 받을 수 있는지',
        '폭력피해 후 보호시설·법률·의료 지원을 받을 수 있는지',
      ],
      primaryServices: ['1366 여성긴급전화'],
    },
    en: {
      title: `Women Support Hotline 1366 | ${SITE_NAME}`,
      heading: 'Women Helplines',
      description:
        'Find Korean support lines for domestic violence, sexual violence, stalking, and dating violence, including the 1366 women support hotline.',
      keywords: [
        'women support hotline Korea',
        '1366 Korea',
        'domestic violence counseling Korea',
        'sexual violence helpline Korea',
        'stalking support Korea',
      ],
      searchIntents: [
        'whether calling 1366 requires a police report',
        'domestic violence counseling in Korea',
        'support after stalking or sexual violence in Korea',
      ],
      primaryServices: ['1366 Women Emergency Hotline'],
    },
  },
  youth: {
    ko: {
      title: `청소년상담 1388·학교폭력 도움 | ${SITE_NAME}`,
      heading: '청소년 상담 기관',
      description:
        '청소년 본인이 전화할 수 있는 1388, 학교폭력·가출·자해 위험·학업 스트레스 관련 상담과 지역 지원기관을 정리했습니다.',
      keywords: [
        '청소년상담 1388',
        '청소년 상담전화',
        '학교폭력 상담',
        '가출 청소년 상담',
        '청소년 자해 상담',
        '학업 스트레스 상담',
      ],
      searchIntents: [
        '청소년이 직접 1388에 전화해도 되는지',
        '학교폭력이나 가출 상황에서 어디에 연락하는지',
        '부모나 친구가 대신 상담을 요청할 수 있는지',
      ],
      primaryServices: ['1388 청소년상담'],
    },
    en: {
      title: `Youth Helpline 1388 and Teen Support | ${SITE_NAME}`,
      heading: 'Youth Helplines',
      description:
        'Find Korean support for teens and young people, including 1388, school violence counseling, runaway youth support, self-harm risk, and academic stress.',
      keywords: [
        'youth helpline Korea',
        '1388 Korea',
        'teen crisis support Korea',
        'school violence counseling Korea',
        'runaway youth Korea',
      ],
      searchIntents: [
        'whether teenagers can call 1388 themselves',
        'school violence support in Korea',
        'runaway youth or teen self-harm support in Korea',
      ],
      primaryServices: ['1388 Youth Counseling'],
    },
  },
  queer: {
    ko: {
      title: `성소수자 상담·띵동 등 퀴어 지원 | ${SITE_NAME}`,
      heading: '성소수자 상담 기관',
      description:
        '아웃팅 걱정, 커밍아웃, 차별, 정신건강 고민을 안전하게 이야기할 수 있는 성소수자 친화 상담기관과 지원단체를 안내합니다.',
      keywords: [
        '성소수자 상담',
        '퀴어 상담',
        '띵동',
        'LGBT 상담',
        '트랜스젠더 상담',
        '아웃팅 걱정 상담',
        '커밍아웃 상담',
      ],
      searchIntents: [
        '아웃팅 걱정 없이 상담할 수 있는 곳',
        '성소수자 친화적인 정신건강 상담기관',
        '커밍아웃이나 차별 경험을 이야기할 수 있는 단체',
      ],
      primaryServices: ['띵동'],
    },
    en: {
      title: `LGBTQ+ Counseling and Queer Support | ${SITE_NAME}`,
      heading: 'LGBTQ+ Helplines',
      description:
        'Find queer-friendly counseling and support in Korea for outing concerns, coming out, discrimination, transgender support, and mental health needs.',
      keywords: [
        'LGBTQ counseling Korea',
        'queer support Korea',
        'DDing Dong Korea',
        'coming out support Korea',
        'transgender counseling Korea',
      ],
      searchIntents: [
        'queer-friendly counseling in Korea',
        'support without outing risk',
        'LGBTQ mental health support in Korea',
      ],
      primaryServices: ['DDing Dong'],
    },
  },
  migrant: {
    ko: {
      title: `이주민·외국인 상담전화와 다누리콜센터 | ${SITE_NAME}`,
      heading: '이주민·외국인 상담 기관',
      description:
        '한국에 거주하는 이주민, 외국인, 결혼이주민, 이주노동자가 이용할 수 있는 다국어 상담전화와 공공 지원기관을 모았습니다.',
      keywords: [
        '이주민 상담전화',
        '외국인 상담전화',
        '다누리콜센터',
        '다국어 상담',
        '이주노동자 상담',
        '결혼이주민 상담',
        'foreigner helpline Korea',
      ],
      searchIntents: [
        '한국에서 외국어로 상담받을 수 있는 번호',
        '다누리콜센터에서 어떤 도움을 받을 수 있는지',
        '이주노동자나 결혼이주민이 위기 상황에서 연락할 곳',
      ],
      primaryServices: ['다누리콜센터'],
    },
    en: {
      title: `Foreigner and Migrant Helplines | ${SITE_NAME}`,
      heading: 'Migrants / Foreigners Helplines',
      description:
        'Find multilingual counseling and support numbers for foreigners, migrant workers, marriage migrants, and multicultural families living in Korea.',
      keywords: [
        'foreigner helpline Korea',
        'migrant support Korea',
        'multilingual counseling Korea',
        'Danuri call center',
        'crisis hotline Korea English',
      ],
      searchIntents: [
        'English or multilingual counseling in Korea',
        'support for migrant workers in Korea',
        'Danuri call center support',
      ],
      primaryServices: ['Danuri Call Center'],
    },
  },
  addiction: {
    ko: {
      title: `중독 상담전화·마약 용기한걸음센터 | ${SITE_NAME}`,
      heading: '중독 상담 기관',
      description:
        '도박, 알코올, 게임, 인터넷, 약물·마약 문제로 상담이 필요할 때 연락할 중독 상담기관과 회복 지원 경로를 비교합니다.',
      keywords: [
        '중독 상담전화',
        '마약 상담',
        '용기한걸음센터',
        '도박중독 상담',
        '알코올중독 상담',
        '게임중독 상담',
        '약물중독 상담',
      ],
      searchIntents: [
        '마약 문제를 익명으로 상담할 수 있는지',
        '도박·알코올·게임 중독 상담기관 차이',
        '중독 상담 후 치료나 회복 지원으로 연결되는지',
      ],
      primaryServices: ['용기한걸음센터', '중독관리통합지원센터'],
    },
    en: {
      title: `Addiction Counseling for Drugs, Gambling, Alcohol | ${SITE_NAME}`,
      heading: 'Addiction Helplines',
      description:
        'Compare Korean counseling services for drug use, gambling, alcohol, gaming, internet overuse, and addiction recovery support.',
      keywords: [
        'addiction counseling Korea',
        'drug counseling Korea',
        'gambling addiction help Korea',
        'alcohol counseling Korea',
        'gaming addiction counseling Korea',
      ],
      searchIntents: [
        'drug counseling hotline in Korea',
        'gambling or alcohol addiction support in Korea',
        'where addiction counseling can lead after the first call',
      ],
      primaryServices: ['Drug counseling center', 'Addiction management centers'],
    },
  },
  elder: {
    ko: {
      title: `노인 상담전화·노인학대 신고 1389 | ${SITE_NAME}`,
      heading: '노인 상담 기관',
      description:
        '노인학대 신고, 독거노인 돌봄, 고립·우울, 치매 가족상담이 필요할 때 연결할 노인보호전문기관과 공공 지원전화를 안내합니다.',
      keywords: [
        '노인 상담전화',
        '노인학대 신고',
        '1577-1389',
        '독거노인 지원',
        '노인 우울 상담',
        '치매 가족 상담',
      ],
      searchIntents: [
        '노인학대 의심 상황을 신고할 수 있는지',
        '독거노인 돌봄이나 고립 문제를 어디에 문의하는지',
        '노인 당사자 의사와 보호 조치가 어떻게 다뤄지는지',
      ],
      primaryServices: ['노인보호전문기관', '1577-1389'],
    },
    en: {
      title: `Older Adult Support and Elder Abuse Reporting | ${SITE_NAME}`,
      heading: 'Older Adults Helplines',
      description:
        'Find Korean support numbers for elder abuse reporting, older adult counseling, isolation, dementia family support, and public care services.',
      keywords: [
        'older adult support Korea',
        'elder abuse reporting Korea',
        '1577-1389 Korea',
        'senior counseling Korea',
        'lonely elderly support Korea',
      ],
      searchIntents: [
        'how to report suspected elder abuse in Korea',
        'support for isolated older adults in Korea',
        'older adult counseling and public care services',
      ],
      primaryServices: ['Elder Protection Agency', '1577-1389'],
    },
  },
  legal: {
    ko: {
      title: `범죄피해 지원·스마일센터 상담 | ${SITE_NAME}`,
      heading: '범죄피해 지원 기관',
      description:
        '범죄 피해 이후 스마일센터, 법률구조, 피해자 지원기관을 통해 심리상담, 치료비, 법률상담, 수사·재판 동행 정보를 확인하세요.',
      keywords: [
        '범죄피해 지원',
        '스마일센터',
        '범죄피해자 상담',
        '피해자 법률상담',
        '범죄피해 치료비',
        '수사 재판 동행',
        '112 이후 지원',
      ],
      searchIntents: [
        '범죄피해 후 스마일센터에서 무엇을 도와주는지',
        '경찰 신고 후 심리상담이나 치료비 지원을 받을 수 있는지',
        '피해자 법률상담과 수사·재판 동행이 가능한지',
      ],
      primaryServices: ['스마일센터', '범죄피해자 지원기관'],
    },
    en: {
      title: `Crime Victim and Legal Support Services | ${SITE_NAME}`,
      heading: 'Crime / Legal Support',
      description:
        'Find Korean support after crime victimization, including Smile Center counseling, legal aid, medical or living expense support, and investigation or court accompaniment.',
      keywords: [
        'crime victim support Korea',
        'Smile Center Korea',
        'legal support Korea',
        'victim support center Korea',
        'crime victim compensation Korea',
        'post-crime support Korea',
      ],
      searchIntents: [
        'what Smile Centers help with after crime victimization',
        'legal and counseling support after reporting a crime in Korea',
        'medical cost or accompaniment support for crime victims',
      ],
      primaryServices: ['Smile Center', 'Crime victim support centers'],
    },
  },
} as const satisfies Record<Category, Record<Lang, CategorySeoCopy>>

const GUIDE_KEYWORDS = {
  ko: [
    '상담전화 가이드',
    '전화하기 전에 확인',
    '109 전화하면',
    '1366 전화하면',
    '1388 전화하면',
    '스마일센터 이용',
    '상담 비밀보장',
    '신고 없이 상담',
  ],
  en: [
    'Korean helpline guide',
    'what happens when calling Korean hotlines',
    'Korea counseling confidentiality',
    'Korea emergency counseling numbers',
    'before calling a helpline in Korea',
  ],
} as const satisfies Record<Lang, readonly string[]>

const SITEMAP_PROFILES: Record<string, SitemapProfile> = {
  '/': { changeFrequency: 'daily', priority: 1 },
  '/about': { changeFrequency: 'monthly', priority: 0.75 },
  '/guide': { changeFrequency: 'weekly', priority: 0.9 },
  '/notice': { changeFrequency: 'monthly', priority: 0.55 },
}

for (const category of CATEGORY_ORDER) {
  SITEMAP_PROFILES[`/${category}`] = {
    changeFrequency: 'weekly',
    priority: category === 'crisis' ? 0.9 : 0.85,
  }
}

export const SITE_TITLE = HOME_COPY.ko.title
export const SITE_DESCRIPTION = HOME_COPY.ko.description
export const SITE_KEYWORDS = [...GLOBAL_KEYWORDS.ko, ...GLOBAL_KEYWORDS.en]

function getLocalizedPath(path: string, lang: Lang): string {
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

export function getHomeSeoCopy(lang: Lang): SeoCopy {
  return {
    ...HOME_COPY[lang],
    keywords: [...HOME_COPY[lang].keywords],
  }
}

export function getChatSeoCopy(lang: Lang): SeoCopy {
  return {
    ...CHAT_COPY[lang],
    keywords: [...CHAT_COPY[lang].keywords],
  }
}

export function getGuideSeoKeywords(lang: Lang): string[] {
  return [...GUIDE_KEYWORDS[lang]]
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
    searchIntents: [...copy.searchIntents],
    primaryServices: [...copy.primaryServices],
  }
}

export function getSitemapProfile(path: string): SitemapProfile {
  return SITEMAP_PROFILES[path] ?? {
    changeFrequency: 'weekly',
    priority: 0.7,
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
