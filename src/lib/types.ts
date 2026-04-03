export type Category =
  | 'crisis'
  | 'public'
  | 'victim'
  | 'women'
  | 'depression'
  | 'youth'
  | 'addiction'
  | 'work'
  | 'queer'
  | 'elder'
  | 'migrant'

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
}

export interface CategoryMeta {
  label: string
  icon: string
  bgColor: string
  textColor: string
}
