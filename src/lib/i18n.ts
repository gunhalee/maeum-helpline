export type Lang = 'ko' | 'en'

export function normalizeLang(value: string | null | undefined): Lang {
  return value?.toLowerCase() === 'en' ? 'en' : 'ko'
}

export function withLang(path: string, lang: Lang): string {
  return lang === 'en' ? `${path}?lang=en` : path
}

export function translateCategoryLabel(label: string, lang: Lang): string {
  if (lang === 'ko') return label

  const map: Record<string, string> = {
    '위기·긴급': 'Crisis',
    여성: 'Women',
    우울: 'Depression',
    청소년: 'Youth',
    중독: 'Addiction',
    성소수자: 'LGBTQ+',
    노인: 'Older Adults',
    '이주민·외국인': 'Migrants / Foreigners',
  }

  return map[label] ?? label
}

export function translateSelectionLabel(label: string, lang: Lang): string {
  if (lang === 'ko') return label

  const map: Record<string, string> = {
    우울: 'Depression',
    여성: 'Women',
    청소년: 'Youth',
    성소수자: 'LGBTQ+',
    '이주민·외국인': 'Migrants / Foreigners',
    노인: 'Older Adults',
    '폭력·피해': 'Victim Support',
    '직장 문제': 'Work Issues',
    '술·도박·약물': 'Addictions',
    '해당 없음': 'None of these',
  }

  return map[label] ?? label
}

export function translateGroupLabel(label: string, lang: Lang): string {
  if (lang === 'ko') return label

  const map: Record<string, string> = {
    '위기·긴급': 'Crisis / Emergency',
    '우선 연결': 'Recommended First',
    '함께 보기': 'Also Consider',
  }

  return map[label] ?? label
}

export function translateStatusNote(note: string | null | undefined, lang: Lang): string | null {
  if (!note) return null
  if (lang === 'ko') return note

  const normalized = note.trim()
  const exactMap: Record<string, string> = {
    '24시간': '24/7',
    '평일 운영': 'Weekdays only',
    상시운영: 'Always available',
    상시: 'Always available',
  }

  if (exactMap[normalized]) {
    return exactMap[normalized]
  }

  return normalized
    .replace(/24시간/g, '24/7')
    .replace(/평일 운영/g, 'Weekdays only')
    .replace(/상시운영/g, 'Always available')
    .replace(/상시/g, 'Always available')
}

export function translatePreview(preview: string, lang: Lang): string {
  if (lang === 'ko' || preview.length === 0) return preview
  return preview.replace(/ 외 (\d+)곳$/, (_match, count: string) => ` and ${count} more`)
}
