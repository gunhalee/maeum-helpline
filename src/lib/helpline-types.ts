export interface HelplineOrg {
  id: number
  pageId: string
  name: string
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

export interface CostInfo {
  id: number
  orgId: number
  isFree: boolean
  condition: string
  detail: string
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

export interface CopingGuide {
  id: number
  title: string
  triggerSituation: string
  steps: string[]
  isPublished: boolean
}

export interface OrgRef {
  id: number
  note: string | null
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
  cost: CostInfo | null
  target: TargetInfo | null
}
