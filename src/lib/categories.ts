import type { Category } from '@/lib/types'

export const CATEGORY_META: Record<Category, { label: string }> = {
  crisis: { label: '위기·긴급' },
  women: { label: '여성' },
  depression: { label: '우울' },
  youth: { label: '청소년' },
  addiction: { label: '중독' },
  queer: { label: '성소수자' },
  elder: { label: '노인' },
  migrant: { label: '이주민·외국인' },
}

export const CATEGORY_ORDER: Category[] = [
  'crisis',
  'depression',
  'women',
  'youth',
  'queer',
  'migrant',
  'addiction',
  'elder',
]
