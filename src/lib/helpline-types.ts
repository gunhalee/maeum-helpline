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

export interface MatchSerializedOrg {
  id: string
  name: string
  phone: string | null
  url: string | null
  description: string | null
  languages: string[]
  contacts: {
    type: string
    contact_info: string | null
    is_24h: boolean
  }[]
}
