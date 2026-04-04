export interface HelplineOrg {
  id: number
  pageId: string
  name: string
  description: string
  phone: string
  url: string
  isActive: boolean
  openingFixed: boolean
  lastVerified: string | null
}

export interface ContactMethod {
  id: number
  orgId: number
  type: string
  contactInfo: string
  is24h: boolean
  schedule: Record<string, string | null> | null
}

export interface TargetInfo {
  id: number
  orgId: number
  ageGroup: string
  region: string
  language: string[]
  targetDescription: string
  exclusionDescription: string
}

export interface OrgRef {
  id: string
  note: string | null
  is_open: boolean | null
}

export interface MatchGroup {
  label: string
  preview: string
  orgs: OrgRef[]
}

export interface MatchResult {
  groups: MatchGroup[]
}

export interface OrgWithDetails extends HelplineOrg {
  contacts: ContactMethod[]
  target: TargetInfo | null
}

/** `/api/match` 성공 응답에만 포함되는 기관 요약 (전체 orgMap 미노출) */
export interface MatchSerializedOrg {
  id: string
  name: string
  phone: string | null
  url: string | null
  description: string | null
  /** target.language — 카드 뱃지용 */
  languages: string[]
  contacts: {
    type: string
    contact_info: string | null
    is_24h: boolean
  }[]
}
