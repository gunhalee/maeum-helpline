import Anthropic from '@anthropic-ai/sdk'
import { unstable_cache } from 'next/cache'
import { getServices } from '@/lib/notion'
import type { Service, Category } from '@/lib/types'
import type {
  MatchResult,
  MatchSerializedOrg,
  OrgRef,
} from '@/lib/helpline-types'
import {
  normalizeLang,
  translateGroupLabel,
  translatePreview,
  translateStatusNote,
  type Lang,
} from '@/lib/i18n'

type SelectionRule = {
  categories?: Category[]
  keywords?: string[]
}

type AudiencePenaltyRule = {
  selection: string
  keywords: string[]
  categories?: Category[]
}

type ServiceStatus = {
  note: string | null
  isOpen: boolean | null
}

const getCachedServices = unstable_cache(
  async () => getServices(),
  ['helpline-services'],
  { revalidate: 300 }
)

const SELECTION_RULES: Record<string, SelectionRule> = {
  우울: {
    categories: ['depression'],
    keywords: ['우울', '불안', '심리상담', '정신건강'],
  },
  여성: {
    categories: ['women'],
    keywords: ['여성', '가정폭력', '성폭력', '스토킹', '교제폭력'],
  },
  청소년: {
    categories: ['youth'],
    keywords: ['청소년', '학생', '학교', '가출', '학업'],
  },
  성소수자: {
    categories: ['queer'],
    keywords: ['성소수자', '퀴어', 'LGBT', '트랜스젠더', '커밍아웃'],
  },
  '이주민·외국인': {
    categories: ['migrant'],
    keywords: ['이주민', '외국인', '다문화', '이주여성', '통역', '다국어'],
  },
  노인: {
    categories: ['elder'],
    keywords: ['노인', '어르신', '치매', '돌봄', '노인학대'],
  },
  '폭력·피해': {
    categories: ['crisis', 'women', 'youth', 'legal'],
    keywords: ['폭력', '피해', '학대', '성폭력', '스토킹', '범죄', '트라우마'],
  },
  '술·도박·약물': {
    categories: ['addiction'],
    keywords: ['술', '알코올', '도박', '약물', '중독', '마약'],
  },
}

const AUDIENCE_PENALTY_RULES: AudiencePenaltyRule[] = [
  {
    selection: '청소년',
    categories: ['youth'],
    keywords: [
      '청소년',
      '학생',
      '학교',
      '1388',
      '가출',
      '학업',
      '고등학생',
      '중학생',
    ],
  },
  {
    selection: '성소수자',
    categories: ['queer'],
    keywords: ['성소수자', '퀴어', 'lgbt', '트랜스젠더', '커밍아웃'],
  },
  {
    selection: '이주민·외국인',
    categories: ['migrant'],
    keywords: ['이주민', '외국인', '다문화', '이주여성', '통역', '다국어'],
  },
  {
    selection: '노인',
    categories: ['elder'],
    keywords: ['노인', '어르신', '치매', '돌봄', '노인학대'],
  },
  {
    selection: '여성',
    categories: ['women'],
    keywords: ['여성', '이주여성', '가정폭력', '성폭력', '스토킹', '교제폭력'],
  },
]

const SYSTEM_INSTRUCTIONS = `당신은 버튼 선택 기반 상담기관 매칭 시스템이다. 설명 없이 JSON만 반환한다.

목표:
- 사용자가 지금 처음 연락해볼 만한 기관을 적게, 정확하게 고른다.
- 후보를 채우려고 하지 않는다. 직접 관련이 약하면 제외한다.
- 최대 12개는 상한일 뿐 목표 개수가 아니다.

입력:
- selections: 사용자가 누른 버튼 목록. 예: 우울, 여성, 청소년, 성소수자, 이주민·외국인, 폭력·피해, 술·도박·약물.
- crisis=true, selections=[]: 즉시 위기 연결이 필요하다.
- crisis=true, selections 있음: 위기 가능성은 고려하되, 선택한 문제와 대상도 함께 반영한다.

후보 해석:
- category와 description을 가장 신뢰한다.
- supporting_context는 보조 신호다.
- access(is_emergency, hours_type, contact_methods, region, languages, age_groups)는 직접성이 비슷할 때만 순서 보정에 쓴다.
- category: crisis=자살·자해/응급, depression=우울·불안, women=여성폭력, youth=청소년, queer=성소수자, migrant=이주민·외국인, addiction=중독, legal=범죄피해 법률·회복지원.

선택 전 제외:
- 이름이나 설명에 위기임산부, 임산부, 임신, 출산, 한부모가 있으면 결과에 절대 넣지 않는다. 이 서비스는 임신·출산 정보를 묻지 않는다.
- 이 제외는 category, 긴급성, 24시간 여부보다 우선한다.

고정 label:
- "위기·긴급", "우선 연결", "함께 보기"만 사용한다.

판단 순서:
1. 긴급도: crisis=true 또는 폭력·피해처럼 현재 안전, 신고, 보호, 자살·자해, 응급 대응과 직접 관련된 경우만 먼저 본다. 일반 우울/중독/대상자 선택만으로 응급기관을 넣지 않는다.
2. 문제 유형 직접성: 선택한 문제 자체를 직접 다루는 기관이 최우선이다. 문제 유형 직접성이 대상자 친화성보다 우선이다.
3. 대상자 적합도: 같은 문제 유형 안에서 청소년, 성소수자, 이주민·외국인, 여성 등 selections의 대상에 더 맞는 기관을 앞에 둔다.
4. 지원 단계: 바로 전화·상담·보호·치료 연결은 "우선 연결", 법률·회복·정보·커뮤니티·보조 지원은 "함께 보기"에 둔다.
5. 접근성: 위 기준이 비슷할 때만 24시간, 전화 가능, 전국, 무료 기관을 앞에 둔다. 접근성만 좋다는 이유로 직접성 낮은 기관을 포함하지 않는다.

그룹 의미:
- "위기·긴급": crisis=true 또는 즉시 안전·신고·응급 대응이 직접 필요한 경우만 만든다.
- "우선 연결": 사용자가 가장 먼저 연락할 직접 기관이다. 보통 2~4개, 많아도 5개를 넘기지 않는다.
- "함께 보기": 다음 단계나 보조 선택지다. 보통 0~5개다. 억지로 만들지 않는다.
- 전체 결과는 보통 3~7개가 적절하다. 모든 후보가 직접 관련될 때만 더 많이 고른다.

대상 전용 제한:
- 좁은 대상 전용 기관은 그 대상 selection이 있을 때만 "우선 연결" 가능하다. 아니면 제외한다.
- 청소년/학생/학교/Wee/1388 전용: "청소년" 없으면 제외한다.
- 성소수자/퀴어/LGBT/트랜스젠더 전용: "성소수자" 없으면 제외한다.
- 다누리/이주여성/외국인/외국인력/통역 전용: "이주민·외국인" 없으면 제외한다.
- 위기임산부/임신/출산/한부모 전용: 현재 선택지에 임신·출산 맥락이 없으므로 모든 그룹에서 제외한다. 여성 선택만으로 선택하지 않는다.
- 학교폭력/Wee/117/푸른나무처럼 학교·청소년 폭력 전용이면 "청소년" 없이는 제외한다.
- crisis=true여도 위 제한은 지킨다.
- 다누리콜센터/이주여성 긴급상담은 "이주민·외국인"과 함께 여성, 폭력·피해, crisis 중 하나가 있을 때 우선 연결 가능하다. 이주민·외국인만 있거나 성소수자+이주민 조합이면 외국인종합안내센터 같은 더 넓은 이주민 기관을 먼저 둔다.

하드 제외 예시:
- "청소년 성소수자 지원센터 띵동"처럼 청소년과 성소수자 모두에 좁게 특화된 기관은 "청소년"과 "성소수자"가 둘 다 있을 때만 선택한다. 둘 중 하나라도 없으면 모든 그룹에서 제외한다.
- "위기임산부 상담전화"처럼 임신·출산에 특화된 기관은 현재 버튼 조합으로는 선택하지 않는다.
- "자살위기상담 109", "생명의전화", "119", "112"는 crisis=true가 아니면 선택하지 않는다.
- 기관명에 긴급/위기라는 단어가 있어도, 여성긴급전화 1366은 여성폭력·폭력피해 맥락에서, 청소년 위기상담 1388은 청소년 맥락에서만 직접 기관으로 볼 수 있다.

선택별 기본 방향:
- 우울: 정신건강 초기 상담·상담센터를 우선한다. 자살예방·119·112 같은 위기기관은 crisis=true가 아니면 제외한다.
- 술·도박·약물: 중독·도박·마약 전문기관을 우선한다. 일반 응급·폭력·이주민 기관은 제외한다.
- 폭력·피해: 신고·보호·피해자 상담·범죄피해 회복지원을 우선한다. 법률·회복지원은 함께 보기로 둘 수 있다.
- 성소수자: 성소수자 직접 상담·지원은 우선 가능, 정보·커뮤니티 성격은 함께 보기다.
- 청소년: 청소년 상담·보호 기관을 우선한다.
- 이주민·외국인: 다국어·체류·통역·이주민 상담 기관을 우선한다.

조합 판단:
- 여러 selection이 있으면 모든 버튼을 각각 채우지 말고, 가장 직접적인 문제 기관을 먼저 고른다.
- 문제 버튼(우울, 폭력·피해, 술·도박·약물)이 있으면 그 문제를 직접 다루는 기관이 우선이다.
- 대상 버튼(여성, 청소년, 성소수자, 이주민·외국인)은 같은 문제를 다루는 기관 사이에서 적합도를 높이는 기준이다.
- 성소수자+폭력·피해: 폭력·범죄피해 대응기관을 먼저 둔다. 성소수자 일반 정보·커뮤니티는 함께 보기 또는 제외한다.
- 폭력·피해+술·도박·약물: 폭력피해 대응기관과 중독 전문기관을 각각 직접 기관으로 둔다. 임신·출산 전용 기관은 제외한다.
- 우울+대상자: 정신건강 초기 상담을 우선하고, 대상자 특화 기관은 직접 상담이면 우선, 정보·커뮤니티면 함께 보기다.
- 3개 조합에서도 같은 원칙을 따른다. 우선 연결을 5개 이상으로 늘리지 말고 직접성이 낮은 대상자·정보성 기관은 함께 보기나 제외로 보낸다.

출력 규칙:
- service_id는 전체 결과에서 한 번만 사용한다.
- 후보 중 일부만 선택해도 된다.
- org_ids에는 service_id만 넣는다.
- preview는 만들지 않는다.
- 반환 형식:
{"groups":[{"label":"우선 연결","org_ids":["service_id"]}]}`

const FINAL_SELECTION_CHECK = `최종 검수 후 JSON을 반환한다.
- 위기임산부/임산부/임신/출산/한부모 관련 후보는 모든 org_ids에서 제거한다.
- 청소년 성소수자/띵동 후보는 selections에 "청소년"과 "성소수자"가 모두 있을 때만 남긴다.
- "선택되지 않은 버튼"에 청소년이 있으면 청소년/학생/학교폭력/Wee/117/1388/띵동 후보를 제거한다.
- 다누리/이주여성 긴급상담 후보는 "이주민·외국인"과 함께 여성, 폭력·피해, crisis 중 하나가 있을 때만 우선 연결에 남긴다.
- 119, 112, 109, 생명의전화 후보는 crisis=true가 아닐 때 제거한다.
- 제거 후 빈자리를 억지로 채우지 않는다.`

function parseReferenceTime(currentTime: string | undefined): Date {
  if (currentTime) {
    const parsed = new Date(currentTime)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  console.warn('current_time not provided or invalid, using server time')
  return new Date()
}

function toKst(referenceTime: Date): Date {
  return new Date(
    referenceTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  )
}

function parseTimeRange(detail: string): { start: number; end: number } | null {
  const match = detail.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
  if (!match) return null

  const start = parseInt(match[1], 10) * 100 + parseInt(match[2], 10)
  const end = parseInt(match[3], 10) * 100 + parseInt(match[4], 10)
  return { start, end }
}

function computeServiceStatus(
  service: Service,
  referenceTime: Date,
  lang: Lang
): ServiceStatus {
  const hoursType = service.hoursType?.toLowerCase() ?? ''
  const hoursDetail = service.hoursDetail ?? service.operatingHours ?? ''
  const now = toKst(referenceTime)
  const day = now.getDay()
  const hhmm = now.getHours() * 100 + now.getMinutes()
  const onWeekday = day >= 1 && day <= 5

  if (hoursType === '24h') {
    return { note: translateStatusNote('24시간', lang), isOpen: true }
  }

  if (!hoursDetail) {
    if (hoursType === 'weekday') {
      return {
        note: translateStatusNote('평일 운영', lang),
        isOpen: onWeekday && hhmm >= 900 && hhmm < 1800,
      }
    }
    return { note: null, isOpen: null }
  }

  if (/상시|always/i.test(hoursDetail)) {
    return { note: translateStatusNote(hoursDetail, lang), isOpen: true }
  }

  const range = parseTimeRange(hoursDetail)

  if (!range) {
    return { note: hoursDetail, isOpen: null }
  }

  if (hoursType === 'weekday' && !onWeekday) {
    return {
      note: translateStatusNote(hoursDetail || '평일 운영', lang),
      isOpen: false,
    }
  }

  return {
    note: translateStatusNote(hoursDetail, lang),
    isOpen: hhmm >= range.start && hhmm < range.end,
  }
}

function buildPreview(orgs: OrgRef[], serviceMap: Record<string, Service>, lang: Lang): string {
  const names = orgs
    .map((org) => serviceMap[org.id]?.name)
    .filter((name): name is string => Boolean(name))

  if (names.length <= 2) return names.join(', ')
  return translatePreview(`${names.slice(0, 2).join(', ')} 외 ${names.length - 2}곳`, lang)
}

function serializeService(service: Service): MatchSerializedOrg {
  const contactMethods =
    service.contactMethods.length > 0
      ? service.contactMethods
      : [service.phone ? 'phone' : '', service.url ? 'online' : ''].filter(Boolean)

  return {
    id: service.id,
    name: service.name,
    phone: service.phone || null,
    url: service.url || null,
    description: service.description || null,
    languages: service.languages,
    contacts: contactMethods.map((type) => ({
      type,
      contact_info:
        type === 'phone'
          ? service.phone || null
          : type === 'online' || type === 'chat' || type === 'kakao'
            ? service.url || null
            : null,
      is_24h: service.hoursType === '24h',
    })),
  }
}

function buildOrgRef(service: Service, referenceTime: Date, lang: Lang): OrgRef {
  const status = computeServiceStatus(service, referenceTime, lang)
  return {
    id: service.id,
    note: status.note,
    is_open: status.isOpen,
  }
}

function sortOrgRefs(orgs: OrgRef[]): OrgRef[] {
  return [...orgs].sort((a, b) => {
    if (a.is_open === true && b.is_open !== true) return -1
    if (a.is_open !== true && b.is_open === true) return 1
    return 0
  })
}

function scoreService(service: Service, selections: string[], crisis: boolean): number {
  let score = 0
  const haystack = [
    service.name,
    service.description,
    ...service.tags,
    ...service.situationKeywords,
    ...service.languages,
    ...service.ageGroups,
  ]
    .join(' ')
    .toLowerCase()

  if (crisis) {
    if (service.category.includes('crisis')) score += 6
    if (service.isEmergency) score += 4
  }

  for (const selection of selections) {
    const rule = SELECTION_RULES[selection]
    if (!rule) continue

    if (rule.categories?.some((category) => service.category.includes(category))) {
      score += 5
    }

    if (
      rule.keywords?.some((keyword) => haystack.includes(keyword.toLowerCase()))
    ) {
      score += 3
    }
  }

  if (selections.length === 0 && crisis && service.category.includes('depression')) {
    score += 2
  }

  if (service.isFree) score += 1
  if (service.hoursType === '24h') score += 1

  const hasGeneralDepressionSelection =
    selections.length === 1 && selections[0] === '우울'

  if (hasGeneralDepressionSelection) {
    for (const rule of AUDIENCE_PENALTY_RULES) {
      if (selections.includes(rule.selection)) continue

      const categoryHit =
        rule.categories?.some((category) => service.category.includes(category)) ?? false
      const keywordHit = rule.keywords.some((keyword) =>
        haystack.includes(keyword.toLowerCase())
      )

      if (categoryHit) score -= 6
      else if (keywordHit) score -= 4
    }

    const isGeneralDepressionService =
      service.category.includes('depression') &&
      !AUDIENCE_PENALTY_RULES.some((rule) =>
        (rule.categories?.some((category) => service.category.includes(category)) ?? false) ||
        rule.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))
      )

    if (isGeneralDepressionService) score += 3
  }

  return score
}

function prefilterServices(services: Service[], selections: string[], crisis: boolean): Service[] {
  if (crisis && selections.length === 0) {
    const emergencyServices = services
      .filter((service) => service.isActive && service.isEmergency)
      .sort((a, b) => {
        if (a.hoursType === '24h' && b.hoursType !== '24h') return -1
        if (a.hoursType !== '24h' && b.hoursType === '24h') return 1
        return a.name.localeCompare(b.name, 'ko')
      })

    if (emergencyServices.length > 0) {
      return emergencyServices.slice(0, 12)
    }
  }

  const scored = services
    .map((service) => ({ service, score: scoreService(service, selections, crisis) }))
    .filter(({ service, score }) => service.isActive && (score > 0 || selections.length === 0))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.service.isEmergency !== b.service.isEmergency) {
        return a.service.isEmergency ? -1 : 1
      }
      return a.service.name.localeCompare(b.service.name, 'ko')
    })

  if (scored.length === 0) {
    return services.filter((service) => service.isActive).slice(0, 12)
  }

  return scored.slice(0, 12).map(({ service }) => service)
}

function buildFallbackGroups(
  services: Service[],
  selections: string[],
  crisis: boolean,
  referenceTime: Date,
  lang: Lang
): MatchResult {
  if (crisis && selections.length === 0) {
    const emergencyOrgs = sortOrgRefs(
      services
        .filter((service) => service.isEmergency)
        .map((service) => buildOrgRef(service, referenceTime, lang))
    )

    return {
      groups: emergencyOrgs.length > 0
        ? [
            {
              label: translateGroupLabel('위기·긴급', lang),
              preview: '',
              orgs: emergencyOrgs,
            },
          ]
        : [],
    }
  }

  const primary: Service[] = []
  const secondary: Service[] = []

  for (const service of services) {
    if (crisis && service.category.includes('crisis')) {
      primary.push(service)
      continue
    }

    if (
      selections.some((selection) =>
        SELECTION_RULES[selection]?.categories?.some((category) =>
          service.category.includes(category)
        )
      )
    ) {
      primary.push(service)
      continue
    }

    secondary.push(service)
  }

  const groups = [
    primary.length > 0
      ? {
          label: translateGroupLabel(
            crisis && selections.length === 0 ? '위기·긴급' : '우선 연결',
            lang
          ),
          preview: '',
          orgs: sortOrgRefs(primary.map((service) => buildOrgRef(service, referenceTime, lang))),
        }
      : null,
    secondary.length > 0
      ? {
          label: translateGroupLabel('함께 보기', lang),
          preview: '',
          orgs: sortOrgRefs(secondary.map((service) => buildOrgRef(service, referenceTime, lang))),
        }
      : null,
  ].filter(Boolean) as MatchResult['groups']

  return { groups }
}

function buildServiceSummary(service: Service): object {
  return {
    service_id: service.id,
    name: service.name,
    category: service.category,
    description: service.description,
    access: {
      is_emergency: service.isEmergency,
      is_free: service.isFree ?? null,
      contact_methods: service.contactMethods,
      region: service.region ?? null,
      hours_type: service.hoursType ?? null,
      hours_detail: service.hoursDetail ?? service.operatingHours ?? null,
      languages: service.languages,
      age_groups: service.ageGroups,
    },
    supporting_context: {
      tags: service.tags,
      situation_keywords: service.situationKeywords,
      exclusion_description: service.exclusionDescription ?? null,
    },
  }
}

function extractJsonObject(text: string): string {
  const start = text.indexOf('{')
  if (start === -1) return text

  let depth = 0
  let inString = false
  let escaped = false

  for (let index = start; index < text.length; index++) {
    const char = text[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === '"') {
        inString = false
      }
      continue
    }

    if (char === '"') {
      inString = true
    } else if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0) return text.slice(start, index + 1)
    }
  }

  return text
}

async function llmMatch(
  client: Anthropic,
  services: Service[],
  selections: string[],
  crisis: boolean,
  referenceTime: Date,
  lang: Lang
): Promise<MatchResult> {
  const serviceMap = Object.fromEntries(services.map((service) => [service.id, service]))
  const serviceSummaries = services.map(buildServiceSummary)
  const knownSelections = [
    '우울',
    '여성',
    '청소년',
    '성소수자',
    '이주민·외국인',
    '폭력·피해',
    '술·도박·약물',
  ]
  const missingSelections = knownSelections.filter(
    (selection) => !selections.includes(selection)
  )

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    temperature: 0,
    system: [
      {
        type: 'text' as const,
        text: SYSTEM_INSTRUCTIONS,
        cache_control: { type: 'ephemeral' as const },
      },
      {
        type: 'text' as const,
        text: `후보 기관 목록:\n${JSON.stringify(serviceSummaries)}`,
        cache_control: { type: 'ephemeral' as const },
      },
      {
        type: 'text' as const,
        text: FINAL_SELECTION_CHECK,
      },
    ],
    messages: [
      {
        role: 'user',
        content: `사용자 선택: ${JSON.stringify(selections)}\n선택되지 않은 버튼: ${JSON.stringify(missingSelections)}\n임신·출산 버튼: 없음\n위기 여부(crisis): ${crisis}`,
      },
    ],
  })

  const textBlock = response.content[0]
  const rawText = (textBlock.type === 'text' ? textBlock.text : '').trim()
  const text = extractJsonObject(
    rawText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()
  )

  const parsed = JSON.parse(text) as {
    groups?: { label: string; org_ids?: string[] }[]
  }

  const groups = (parsed.groups ?? [])
    .map((group) => {
      const refs = sortOrgRefs(
        (group.org_ids ?? [])
          .map((id) => serviceMap[id])
          .filter((service): service is Service => Boolean(service))
          .map((service) => buildOrgRef(service, referenceTime, lang))
      )

      return {
        label: translateGroupLabel(group.label, lang),
        preview: buildPreview(refs, serviceMap, lang),
        orgs: refs,
      }
    })
    .filter((group) => group.orgs.length > 0)

  return { groups }
}

function validateAndDedup(
  result: MatchResult,
  serviceMap: Record<string, Service>,
  lang: Lang
): MatchResult {
  if (!Array.isArray(result.groups)) return result

  const seen = new Set<string>()
  for (const group of result.groups) {
    if (!Array.isArray(group.orgs)) continue
    group.orgs = group.orgs.filter((org) => {
      if (seen.has(org.id)) return false
      seen.add(org.id)
      return true
    })
    group.orgs = sortOrgRefs(group.orgs)
    group.label = translateGroupLabel(group.label, lang)
    group.preview = buildPreview(group.orgs, serviceMap, lang)
  }

  result.groups = result.groups.filter((group) => group.orgs.length > 0)
  return result
}

function errorResponse(
  type: 'org_fetch_failed' | 'bad_request',
  status: number
) {
  return Response.json({ error: type, groups: [] }, { status })
}

export async function POST(request: Request) {
  let selections: string[]
  let crisis: boolean
  let currentTime: string | undefined
  let lang: Lang

  try {
    const body = await request.json()
    selections = Array.isArray(body.selections) ? body.selections : []
    crisis = Boolean(body.crisis)
    currentTime =
      typeof body.current_time === 'string' ? body.current_time : undefined
    lang = normalizeLang(typeof body.lang === 'string' ? body.lang : undefined)
  } catch {
    return errorResponse('bad_request', 400)
  }

  const referenceTime = parseReferenceTime(currentTime)

  let allServices: Service[]
  try {
    allServices = await getCachedServices()
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return errorResponse('org_fetch_failed', 503)
  }

  const candidateServices = prefilterServices(allServices, selections, crisis)
  const serviceMap = Object.fromEntries(
    candidateServices.map((service) => [service.id, service])
  )

  let result: MatchResult
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (crisis && selections.length === 0) {
    result = buildFallbackGroups(candidateServices, selections, crisis, referenceTime, lang)
  } else if (!apiKey) {
    result = buildFallbackGroups(candidateServices, selections, crisis, referenceTime, lang)
  } else {
    try {
      const client = new Anthropic({ apiKey })
      result = await llmMatch(
        client,
        candidateServices,
        selections,
        crisis,
        referenceTime,
        lang
      )
    } catch (error) {
      console.error('LLM match failed, using fallback groups:', error)
      result = buildFallbackGroups(candidateServices, selections, crisis, referenceTime, lang)
    }
  }

  const deduped = validateAndDedup(result, serviceMap, lang)
  const usedIds = new Set(deduped.groups.flatMap((group) => group.orgs.map((org) => org.id)))
  const orgData: Record<string, MatchSerializedOrg> = {}
  for (const id of usedIds) {
    const service = serviceMap[id]
    if (service) orgData[id] = serializeService(service)
  }

  return Response.json({ ...deduped, orgData })
}
