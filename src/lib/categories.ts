import type { Category, CategoryMeta } from '@/lib/types'

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  crisis: {
    label: '위기·긴급',
    icon: '',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
  },
  victim: {
    label: '피해자 보호',
    icon: '',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
  },
  women: {
    label: '여성',
    icon: '',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
  },
  depression: {
    label: '우울',
    icon: '',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
  youth: {
    label: '청소년·아동',
    icon: '',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  addiction: {
    label: '중독',
    icon: '',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
  work: {
    label: '직장인',
    icon: '',
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-700',
  },
  queer: {
    label: '성소수자',
    icon: '',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
  },
  elder: {
    label: '치매·노인',
    icon: '',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
  },
  migrant: {
    label: '이주민·외국인',
    icon: '',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
  },
}

export const CATEGORY_ORDER: Category[] = [
  'crisis',
  'depression',
  'victim',
  'women',
  'youth',
  'queer',
  'migrant',
  'addiction',
  'elder',
  'work',
]
