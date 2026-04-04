import Anthropic from '@anthropic-ai/sdk'
import { unstable_cache } from 'next/cache'
import { getServices } from '@/lib/notion'
import type { Service, Category } from '@/lib/types'
import type {
  MatchResult,
  MatchSerializedOrg,
  OrgRef,
} from '@/lib/helpline-types'

type SelectionRule = {
  categories?: Category[]
  keywords?: string[]
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
    categories: ['crisis', 'women', 'youth'],
    keywords: ['폭력', '피해', '학대', '성폭력', '스토킹', '범죄', '트라우마'],
  },
  '직장 문제': {
    categories: ['depression'],
    keywords: ['직장', '회사', '상사', '번아웃', '업무스트레스', '직장내괴롭힘'],
  },
  '술·도박·약물': {
    categories: ['addiction'],
    keywords: ['술', '알코올', '도박', '약물', '중독', '마약'],
  },
  '해당 없음': {
    categories: ['crisis', 'depression'],
    keywords: ['상담', '위기', '정신건강'],
  },
}

const SYSTEM_INSTRUCTIONS = `당신은 심리상담 핫라인 매핑 시스템입니다.

역할:
사용자의 버튼 선택과 위기 여부를 분석해 적합한 기관을 목록에서 골라 그룹화한다.
응답은 반드시 유효한 JSON만 반환한다. 설명, 인사, 마크다운, 코드블록 불가.

입력 의미:
- selections: 사용자가 선택한 상황. 예: 우울, 여성, 청소년, 성소수자, 이주민·외국인, 노인, 폭력·피해, 직장 문제, 술·도박·약물, 해당 없음. 복수 선택 가능.
- crisis=true, selections 빈 배열: 즉각 연결 가능한 위기 상담을 최우선 안내.
- crisis=true, selections 있음: 위기 가능성을 염두에 두되 선택 상황에 맞는 기관 안내.
- crisis=false: 선택한 상황에 맞는 기관만 안내.

service 필드 의미:
- category: 앱의 공식 분류. selections와 직접 대응한다.
- situation_keywords: 해당 기관이 강한 연관성을 갖는 표현 목록.
- contact_methods: phone, text, kakao, chat, online, in-person, video 등 상담 채널.
- region: all, seoul 등 지역 범위.
- hours_type: 24h, weekday, custom 등 운영 유형.
- languages, age_groups, exclusion_description: 세부 타겟 적합성 판단에 사용.

그룹 구성 규칙:
1. 각 service_id는 한 그룹에만 넣는다. 중복 불가.
2. 관련 기관은 제외 규칙만 지키면 모두 포함한다.
3. label은 10자 이내 한국어.
4. preview는 비워두거나 임의값이어도 된다. 서버가 재계산한다.
5. selections와 category가 직접 맞는 기관을 우선하고, 세부 적합성은 description/situation_keywords로 보정한다.

위기·긴급 그룹 (crisis=true, selections 빈 배열):
- 첫 번째 그룹 label을 정확히 "위기·긴급"으로 한다.
- 자살·자해 위기에 바로 연결 가능한 기관을 우선 포함한다.
- 전국 공통 번호(109, 119, 112, 1388, 생명의전화 등)를 먼저 고려한다.

반환 형식 (JSON만):
{
  "groups": [
    {
      "label": "그룹명",
      "org_ids": ["service_id", ...]
    }
  ]
}`

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

function computeServiceStatus(service: Service, referenceTime: Date): ServiceStatus {
  const hoursType = service.hoursType?.toLowerCase() ?? ''
  const hoursDetail = service.hoursDetail ?? service.operatingHours ?? ''

  if (hoursType === '24h') {
    return { note: '24시간', isOpen: true }
  }

  if (!hoursDetail) {
    if (hoursType === 'weekday') return { note: '평일 운영', isOpen: false }
    return { note: null, isOpen: null }
  }

  if (/상시|always/i.test(hoursDetail)) {
    return { note: hoursDetail, isOpen: true }
  }

  const now = toKst(referenceTime)
  const day = now.getDay()
  const hhmm = now.getHours() * 100 + now.getMinutes()
  const range = parseTimeRange(hoursDetail)

  if (!range) {
    return { note: hoursDetail, isOpen: null }
  }

  const onWeekday = day >= 1 && day <= 5
  if (hoursType === 'weekday' && !onWeekday) {
    return { note: hoursDetail || '평일 운영', isOpen: false }
  }

  return {
    note: hoursDetail,
    isOpen: hhmm >= range.start && hhmm < range.end,
  }
}

function buildPreview(orgs: OrgRef[], serviceMap: Record<string, Service>): string {
  const names = orgs
    .map((org) => serviceMap[org.id]?.name)
    .filter((name): name is string => Boolean(name))

  if (names.length <= 2) return names.join(', ')
  return `${names.slice(0, 2).join(', ')} 외 ${names.length - 2}곳`
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

function buildOrgRef(service: Service, referenceTime: Date): OrgRef {
  const status = computeServiceStatus(service, referenceTime)
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

  if (selections.includes('해당 없음')) {
    if (service.category.includes('depression')) score += 2
    if (service.category.includes('crisis')) score += 2
  }

  if (service.isFree) score += 1
  if (service.hoursType === '24h') score += 1

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
      return emergencyServices
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

  return scored.slice(0, 14).map(({ service }) => service)
}

function buildFallbackGroups(
  services: Service[],
  selections: string[],
  crisis: boolean,
  referenceTime: Date
): MatchResult {
  if (crisis && selections.length === 0) {
    const emergencyOrgs = sortOrgRefs(
      services
        .filter((service) => service.isEmergency)
        .map((service) => buildOrgRef(service, referenceTime))
    )

    return {
      groups: emergencyOrgs.length > 0
        ? [
            {
              label: '위기·긴급',
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
          label: crisis && selections.length === 0 ? '위기·긴급' : '우선 연결',
          preview: '',
          orgs: sortOrgRefs(primary.map((service) => buildOrgRef(service, referenceTime))),
        }
      : null,
    secondary.length > 0
      ? {
          label: '함께 보기',
          preview: '',
          orgs: sortOrgRefs(secondary.map((service) => buildOrgRef(service, referenceTime))),
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
    tags: service.tags,
    is_emergency: service.isEmergency,
    is_free: service.isFree ?? null,
    contact_methods: service.contactMethods,
    region: service.region ?? null,
    hours_type: service.hoursType ?? null,
    hours_detail: service.hoursDetail ?? service.operatingHours ?? null,
    languages: service.languages,
    age_groups: service.ageGroups,
    exclusion_description: service.exclusionDescription ?? null,
    situation_keywords: service.situationKeywords,
  }
}

async function llmMatch(
  client: Anthropic,
  services: Service[],
  selections: string[],
  crisis: boolean,
  referenceTime: Date
): Promise<MatchResult> {
  const serviceMap = Object.fromEntries(services.map((service) => [service.id, service]))
  const serviceSummaries = services.map(buildServiceSummary)

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
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
    ],
    messages: [
      {
        role: 'user',
        content: `사용자 선택: ${JSON.stringify(selections)}\n위기 여부(crisis): ${crisis}`,
      },
    ],
  })

  const textBlock = response.content[0]
  const rawText = (textBlock.type === 'text' ? textBlock.text : '').trim()
  const text = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  const parsed = JSON.parse(text) as {
    groups?: { label: string; org_ids?: string[] }[]
  }

  const groups = (parsed.groups ?? [])
    .map((group) => {
      const refs = sortOrgRefs(
        (group.org_ids ?? [])
          .map((id) => serviceMap[id])
          .filter((service): service is Service => Boolean(service))
          .map((service) => buildOrgRef(service, referenceTime))
      )

      return {
        label: group.label,
        preview: buildPreview(refs, serviceMap),
        orgs: refs,
      }
    })
    .filter((group) => group.orgs.length > 0)

  return { groups }
}

function validateAndDedup(result: MatchResult, serviceMap: Record<string, Service>): MatchResult {
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
    group.preview = buildPreview(group.orgs, serviceMap)
  }

  result.groups = result.groups.filter((group) => group.orgs.length > 0)
  return result
}

function errorResponse(
  type: 'org_fetch_failed' | 'llm_failed' | 'bad_request',
  status: number
) {
  return Response.json({ error: type, groups: [] }, { status })
}

export async function POST(request: Request) {
  let selections: string[]
  let crisis: boolean
  let currentTime: string | undefined

  try {
    const body = await request.json()
    selections = Array.isArray(body.selections) ? body.selections : []
    crisis = Boolean(body.crisis)
    currentTime =
      typeof body.current_time === 'string' ? body.current_time : undefined
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
  if (!apiKey) {
    result = buildFallbackGroups(candidateServices, selections, crisis, referenceTime)
  } else {
    try {
      const client = new Anthropic({ apiKey })
      result = await llmMatch(
        client,
        candidateServices,
        selections,
        crisis,
        referenceTime
      )
    } catch (error) {
      console.error('LLM match failed, using fallback groups:', error)
      result = buildFallbackGroups(candidateServices, selections, crisis, referenceTime)
    }
  }

  const deduped = validateAndDedup(result, serviceMap)
  const usedIds = new Set(deduped.groups.flatMap((group) => group.orgs.map((org) => org.id)))
  const orgData: Record<string, MatchSerializedOrg> = {}
  for (const id of usedIds) {
    const service = serviceMap[id]
    if (service) orgData[id] = serializeService(service)
  }

  return Response.json({ ...deduped, orgData })
}
