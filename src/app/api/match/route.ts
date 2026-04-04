import Anthropic from '@anthropic-ai/sdk'
import {
  getOrgsWithDetails,
  computeScheduleStatus,
} from '@/lib/helpline-notion'
import type { MatchResult, OrgRef, OrgWithDetails } from '@/lib/helpline-types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// --------------- Notion 데이터 캐시 (5분 TTL) ---------------

let cachedOrgs: OrgWithDetails[] | null = null
let cachedOrgMap: Record<number, OrgWithDetails> | null = null
let cachedAt = 0
const CACHE_TTL = 5 * 60 * 1000

async function getCachedOrgs() {
  if (cachedOrgs && cachedOrgMap && Date.now() - cachedAt < CACHE_TTL) {
    return { allOrgs: cachedOrgs, orgMap: cachedOrgMap }
  }
  const allOrgs = await getOrgsWithDetails()
  const orgMap: Record<number, OrgWithDetails> = {}
  for (const org of allOrgs) orgMap[org.id] = org
  cachedOrgs = allOrgs
  cachedOrgMap = orgMap
  cachedAt = Date.now()
  return { allOrgs, orgMap }
}

// --------------- 정적 매핑 테이블 ---------------

const SELECTION_MAP: Record<string, { label: string; orgIds: number[] }> = {
  '우울':          { label: '우울·심리상담', orgIds: [4, 3, 21] },
  '여성':          { label: '여성 지원',     orgIds: [7, 19, 8] },
  '청소년':        { label: '청소년 지원',   orgIds: [11, 9] },
  '성소수자':      { label: '성소수자 지원', orgIds: [14, 15, 16] },
  '이주민·외국인': { label: '이주민 지원',   orgIds: [18, 19] },
  '노인':          { label: '노인 지원',     orgIds: [10, 17] },
  '폭력·피해':     { label: '폭력·피해 지원', orgIds: [7, 22, 8] },
  '직장 문제':     { label: '직장 스트레스', orgIds: [13] },
  '술·도박·약물':  { label: '중독 지원',     orgIds: [12, 20] },
}

const CRISIS_GROUP = { label: '위기·긴급', orgIds: [1, 2] }
const DEFAULT_GROUPS = [
  { label: '위기·긴급', orgIds: [1, 2] },
  { label: '우울·심리상담', orgIds: [4, 3, 21] },
]

// --------------- OrgRef 생성 (is_open 서버 계산) ---------------

function toOrgRef(orgId: number, orgMap: Record<number, OrgWithDetails>): OrgRef {
  const org = orgMap[orgId]
  if (!org) return { id: orgId, note: null, is_open: null }
  const status = computeScheduleStatus(org.contacts)
  return { id: orgId, note: status.note, is_open: status.isOpen }
}

function buildGroup(
  label: string,
  orgIds: number[],
  orgMap: Record<number, OrgWithDetails>
): { label: string; preview: string; orgs: OrgRef[] } {
  const refs = orgIds.map((id) => toOrgRef(id, orgMap))
  const openFirst = [...refs].sort((a, b) => {
    if (a.is_open === true && b.is_open !== true) return -1
    if (a.is_open !== true && b.is_open === true) return 1
    return 0
  })
  const names = orgIds
    .map((id) => orgMap[id]?.name)
    .filter(Boolean)
  const preview =
    names.length <= 2
      ? names.join(', ')
      : `${names.slice(0, 2).join(', ')} 외 ${names.length - 2}곳`
  return { label, preview, orgs: openFirst }
}

// --------------- 결정론적 매핑 (단일 선택, 위기, 기본) ---------------

function staticMatch(
  selections: string[],
  crisis: boolean,
  orgMap: Record<number, OrgWithDetails>
): MatchResult | null {
  if (crisis && selections.length === 0) {
    return {
      groups: [buildGroup(CRISIS_GROUP.label, CRISIS_GROUP.orgIds, orgMap)],
    }
  }

  if (selections.length === 0 || selections[0] === '해당 없음') {
    const groups = DEFAULT_GROUPS.map((g) =>
      buildGroup(g.label, g.orgIds, orgMap)
    )
    return { groups }
  }

  if (selections.length === 1) {
    const mapping = SELECTION_MAP[selections[0]]
    if (!mapping) {
      return {
        groups: DEFAULT_GROUPS.map((g) =>
          buildGroup(g.label, g.orgIds, orgMap)
        ),
      }
    }

    const groups = []
    if (crisis) {
      groups.push(buildGroup(CRISIS_GROUP.label, CRISIS_GROUP.orgIds, orgMap))
    }
    groups.push(buildGroup(mapping.label, mapping.orgIds, orgMap))
    return { groups }
  }

  return null
}

// --------------- LLM 매핑 (복합 선택) ---------------

const SYSTEM_PROMPT = `당신은 심리상담 핫라인 매핑 시스템입니다.

역할:
사용자의 버튼 선택 조합을 분석해 적합한 기관을 찾아 그룹화한다.
응답은 반드시 유효한 JSON만 반환한다. 설명, 인사, 마크다운, 코드블록 불가.

그룹 구성 규칙:
1. 각 기관은 가장 관련 높은 그룹 하나에만 배치한다. 중복 불가.
2. exclusion_description에 해당하는 기관은 제외한다.
3. opening_fixed=true인 기관은 제외한다.
4. 그룹은 최대 3개, 각 그룹당 기관은 최대 4개.
5. label은 10자 이내 한국어.
6. preview 형식: "기관명1, 기관명2 외 N곳"

위기 규칙 (crisis=true):
- 첫 번째 그룹을 "위기·긴급"으로 구성, org_id 1을 첫 번째에 배치.

무료 상담 기관(org_id 5, 6, 13)은 결과에 포함하지 않는다.

반환 형식 (JSON만):
{
  "groups": [
    {
      "label": "그룹명",
      "preview": "기관명1, 기관명2",
      "org_ids": [org_id, ...]
    }
  ]
}`

function buildOrgSummary(org: OrgWithDetails): object {
  return {
    org_id: org.id,
    name: org.name,
    opening_fixed: org.openingFixed,
    is_24h: org.contacts.some((c) => c.is24h),
    contact_types: [...new Set(org.contacts.map((c) => c.type))],
    is_free: org.isFree,
    target_description: org.target?.targetDescription ?? '',
    exclusion_description: org.target?.exclusionDescription ?? '',
  }
}

async function llmMatch(
  selections: string[],
  crisis: boolean,
  allOrgs: OrgWithDetails[],
  orgMap: Record<number, OrgWithDetails>
): Promise<MatchResult> {
  const eligibleOrgs = allOrgs.filter((o) => !o.openingFixed)
  const orgSummaries = eligibleOrgs.map(buildOrgSummary)

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    system: [
      {
        type: 'text' as const,
        text: SYSTEM_PROMPT + '\n\n기관 목록:\n' + JSON.stringify(orgSummaries),
        cache_control: { type: 'ephemeral' as const },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `사용자 선택: ${JSON.stringify(selections)}\n위기 여부: ${crisis}`,
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
    groups: { label: string; preview: string; org_ids: number[] }[]
  }

  const groups = parsed.groups.map((g) => ({
    label: g.label,
    preview: g.preview,
    orgs: (g.org_ids ?? []).map((id: number) => toOrgRef(id, orgMap)),
  }))

  return { groups }
}

// --------------- 검증 ---------------

function validateAndDedup(result: MatchResult): MatchResult {
  if (!result.groups || !Array.isArray(result.groups)) {
    return result
  }

  const seen = new Set<number>()
  for (const group of result.groups) {
    if (!Array.isArray(group.orgs)) continue
    group.orgs = group.orgs.filter((org: OrgRef) => {
      if (seen.has(org.id)) return false
      seen.add(org.id)
      return true
    })
  }

  result.groups = result.groups.filter((g) => g.orgs.length > 0)
  return result
}

// --------------- POST 핸들러 ---------------

export async function POST(request: Request) {
  let allOrgs: OrgWithDetails[] = []
  let orgMap: Record<number, OrgWithDetails> = {}

  try {
    const cached = await getCachedOrgs()
    allOrgs = cached.allOrgs
    orgMap = cached.orgMap
  } catch (error) {
    console.error('Failed to fetch orgs:', error)
    const fallback = {
      groups: DEFAULT_GROUPS.map((g) => ({
        label: g.label,
        preview: '',
        orgs: g.orgIds.map((id) => ({ id, note: null, is_open: null })),
      })),
    }
    return Response.json({ ...fallback, orgMap: {} })
  }

  try {
    const body = await request.json()
    const { selections, crisis } = body as {
      selections: string[]
      crisis: boolean
    }

    const staticResult = staticMatch(selections, crisis, orgMap)
    if (staticResult) {
      const result = validateAndDedup(staticResult)
      return Response.json({ ...result, orgMap })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      const fallback = {
        groups: DEFAULT_GROUPS.map((g) => buildGroup(g.label, g.orgIds, orgMap)),
      }
      return Response.json({ ...fallback, orgMap })
    }

    const llmResult = await llmMatch(selections, crisis, allOrgs, orgMap)
    const result = validateAndDedup(llmResult)
    return Response.json({ ...result, orgMap })
  } catch (error) {
    console.error('Match API error:', error)
    const fallback = {
      groups: DEFAULT_GROUPS.map((g) => buildGroup(g.label, g.orgIds, orgMap)),
    }
    return Response.json({ ...fallback, orgMap })
  }
}
