export type Category =
  | 'crisis'
  | 'women'
  | 'depression'
  | 'youth'
  | 'addiction'
  | 'queer'
  | 'elder'
  | 'migrant'
  | 'legal'

export interface Service {
  id: string
  name: string
  phone: string
  category: Category[]
  description: string
  tags: string[]
  isEmergency: boolean
  isActive: boolean
  url?: string
  operatingHours?: string
  isFree?: boolean
  contactMethods: string[]
  region?: string
  hoursType?: string
  hoursDetail?: string
  situationKeywords: string[]
  languages: string[]
  ageGroups: string[]
  exclusionDescription?: string
  seoDescription?: string
  searchIntents: string[]
  lastVerified?: string
  sourcePriority?: string
  sourceType?: string
}
