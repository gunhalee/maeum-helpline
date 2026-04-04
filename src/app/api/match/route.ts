import { NextResponse } from 'next/server'
import { getOrgsWithDetails } from '@/lib/helpline-notion'
import type { MatchResult, OrgRef, OrgWithDetails } from '@/lib/helpline-types'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ''

const SYSTEM_PROMPT = `당신은 심리상담 핫라인 매핑 시스템입니다.

역할:
사용자의 버튼 선택 조합을 분석해 DB에서 적합한 기관을 찾아 그룹화한다.
응답은 반드시 유효한 JSON만 반환한다. 설명, 인사, 마크다운, 코드블록 불가.

그룹 구성 규칙:
1. 각 기관은 가장 관련 높은 그룹 하나에만 배치한다. 동일 기관이 여러 그룹에 중복 등장하면 안 된다.
2. exclusion_description에 해당하는 기관은 반드시 제외한다.
3. opening_fixed=true인 기관은 결과에 포함하지 않는다.
4. 그룹은 최대 3개, 각 그룹당 기관은 최대 4개.
5. label은 10자 이내의 한국어.
6. preview는 collapsed 상태에서 보여줄 기관 예고 텍스트.
   형식: "기관명1, 기관명2 외 N곳" 또는 "기관명1, 기관명2"

기본 그룹 규칙 (선택이 없거나 위기 버튼만 선택하거나 레이어2만 선택한 경우):
- 그룹 1: "위기·긴급" — org_id 1(자살위기 헬프라인), 2(생명의전화)
- 그룹 2: "우울·심리상담" — org_id 4(지역 정신건강복지센터), 3(보건복지 콜센터), 21(심리상담포털)

위기 규칙 (crisis=true):
- 반드시 첫 번째 그룹을 "위기·긴급"으로 구성한다.
- org_id 1(자살위기 헬프라인)을 해당 그룹의 첫 번째에 배치한다.
- 나머지 선택 항목의 결과 그룹은 그 아래에 추가한다.

선택 버튼 → 그룹 매핑 가이드:
- 좀 힘든 것 같아요 → "우울·심리상담" (지역 정신건강복지센터, 보건복지 콜센터, 심리상담포털)
- 폭력이나 피해를 당했어요 → "폭력·피해 지원" (1366, 범죄피해자지원센터, 디지털성범죄)
- 술·도박·약물 → "중독 지원" (도박 헬프라인, 중독관리통합지원센터)
- 직장에서 힘들어요 → "직장 스트레스" (EAP)
- 성소수자 → "성소수자 지원" (띵동, 퀴어건강, 행성인)
- 외국인 → "이주민 지원" (외국인종합안내센터, 이주여성 긴급상담)
- 청소년 → "청소년 지원" (청소년1388, 학교폭력 117)
- 노인 → "노인 지원" (노인학대, 치매상담콜센터)

무료 상담 기관(바우처 org_id=5, 마음이음 org_id=6, EAP org_id=13)은 그룹 결과에 포함하지 않는다.
프론트엔드에서 우울·심리상담 그룹이 있을 때 별도 무료 상담 안내 카드로 자동 노출한다.

운영시간 규칙:
- 현재 시각 기준 운영 중인 기관을 그룹 내 앞쪽에 배치한다.
- 운영 중이 아닌 기관은 뒤쪽에 배치하고 해당 기관 앞에 "(운영 종료)" 표기를 note 필드로 전달한다.

반환 형식 (JSON만, 다른 텍스트 절대 없음):
{
  "groups": [
    {
      "label": "그룹명",
      "preview": "기관명1, 기관명2 외 N곳",
      "orgs": [
        { "id": org_id, "note": null },
        { "id": org_id, "note": "(운영 종료)" }
      ]
    }
  ]
}`

const FALLBACK_GROUPS: MatchResult = {
  groups: [
    {
      label: '위기·긴급',
      preview: '자살위기 헬프라인, 생명의전화',
      orgs: [
        { id: 1, note: null },
        { id: 2, note: null },
      ],
    },
    {
      label: '우울·심리상담',
      preview: '지역 정신건강복지센터, 보건복지 콜센터 외 1곳',
      orgs: [
        { id: 4, note: null },
        { id: 3, note: null },
        { id: 21, note: null },
      ],
    },
  ],
}

function buildOrgSummary(org: OrgWithDetails): object {
  return {
    org_id: org.id,
    name: org.name,
    phone: org.phone,
    opening_fixed: org.openingFixed,
    is_24h: org.contacts.some((c) => c.is24h),
    contact_types: [...new Set(org.contacts.map((c) => c.type))],
    is_free: org.cost?.isFree ?? null,
    cost_condition: org.cost?.condition ?? null,
    target_description: org.target?.targetDescription ?? '',
    exclusion_description: org.target?.exclusionDescription ?? '',
    age_group: org.target?.ageGroup ?? null,
    region: org.target?.region ?? null,
    schedule: org.contacts[0]?.schedule ?? null,
  }
}

function validateAndDedup(result: MatchResult): MatchResult {
  if (!result.groups || !Array.isArray(result.groups)) {
    return FALLBACK_GROUPS
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

  if (result.groups.length === 0) {
    return FALLBACK_GROUPS
  }

  return result
}

export async function POST(request: Request) {
  let allOrgs: OrgWithDetails[] = []

  try {
    allOrgs = await getOrgsWithDetails()
  } catch (error) {
    console.error('Failed to fetch orgs:', error)
    return NextResponse.json({ ...FALLBACK_GROUPS, orgMap: {} })
  }

  const orgMap: Record<number, OrgWithDetails> = {}
  for (const org of allOrgs) {
    orgMap[org.id] = org
  }

  try {
    const body = await request.json()
    const { selections, crisis } = body as {
      selections: string[]
      crisis: boolean
    }

    if (!ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json({ ...FALLBACK_GROUPS, orgMap })
    }

    const eligibleOrgs = allOrgs.filter((o) => !o.openingFixed)
    const orgSummaries = eligibleOrgs.map(buildOrgSummary)

    const currentTime = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `사용자 선택: ${JSON.stringify(selections)}
현재 시각: ${currentTime}
위기 여부: ${crisis}

기관 목록 (target_description 포함):
${JSON.stringify(orgSummaries, null, 2)}`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', response.status, errorText)
      return NextResponse.json({ ...FALLBACK_GROUPS, orgMap })
    }

    const data = await response.json()
    const text = (data.content?.[0]?.text ?? '').trim()

    let result: MatchResult
    try {
      result = JSON.parse(text)
    } catch {
      console.error('Failed to parse LLM response:', text)
      return NextResponse.json({ ...FALLBACK_GROUPS, orgMap })
    }

    result = validateAndDedup(result)

    return NextResponse.json({ ...result, orgMap })
  } catch (error) {
    console.error('Match API error:', error)
    return NextResponse.json({ ...FALLBACK_GROUPS, orgMap })
  }
}
