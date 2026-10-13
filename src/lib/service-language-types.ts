export interface ServiceLanguageDisplay {
  label: string
  qualifier?: string
  referral?: { text: string; phone: string }
}

export interface ServiceLanguageProfile {
  name: string
  status: 'listed_languages' | 'multilingual' | 'unconfirmed' | 'korean_only'
  languages: string[]
  languageListComplete: boolean
  delivery: string
  sources: string[]
  sourceUrl?: string
  qualifier?: string
  referral?: ServiceLanguageDisplay['referral']
  multilingualBasis?: string
  partnerLanguageSets?: string[]
  classificationBasis?: string
  officialLanguageCount?: number
  routes?: {
    channel: 'phone' | 'written' | 'related-service'
    languages: string[]
    url?: string
    description?: string
    useServiceHours?: boolean
    hours?: { days: string[]; opens: string; closes: string }
  }[]
}
