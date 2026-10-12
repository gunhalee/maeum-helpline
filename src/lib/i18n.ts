export const SUPPORTED_LANGS = ['ko', 'en'] as const

export type Lang = (typeof SUPPORTED_LANGS)[number]

export function isLang(value: string | null | undefined): value is Lang {
  return value === 'ko' || value === 'en'
}

export function normalizeLang(value: string | null | undefined): Lang {
  return value?.toLowerCase() === 'en' ? 'en' : 'ko'
}

export function getPathWithoutLang(pathname: string): string {
  if (!pathname) return '/'

  const match = pathname.match(/^\/(ko|en)(\/.*)?$/)
  if (!match) {
    return pathname
  }

  return match[2] ?? '/'
}

export function withLang(path: string, lang: Lang): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const pathWithoutLang = getPathWithoutLang(normalizedPath)

  if (pathWithoutLang === '/') {
    return `/${lang}`
  }

  return `/${lang}${pathWithoutLang}`
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
    범죄피해: 'Crime / Legal Support',
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
    '술·도박·약물': 'Addictions',
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
    '운영시간 확인 필요': 'Check opening hours',
    '평일 09:00~11:50, 13:00~17:50': 'Weekdays 09:00–11:50, 13:00–17:50 KST',
    '평일 09:00~18:00': 'Weekdays 09:00–18:00 KST',
    '매일 07:00~22:00': 'Daily 07:00–22:00 KST',
    '매일 09:00~22:00': 'Daily 09:00–22:00 KST',
    '매일 09:00~18:00': 'Daily 09:00–18:00 KST',
    '평일 09:00~22:00, 공휴일 휴무': 'Weekdays 09:00–22:00 KST; closed on public holidays',
    '화요일~토요일 11:00~21:00, 일요일·월요일·공휴일 휴무': 'Tue–Sat 11:00–21:00 KST; closed Sun, Mon and public holidays',
    '일반상담 평일 09:00~18:00 · 긴급지원상담 24시간': 'General: weekdays 09:00–18:00 KST; emergency support: 24/7',
    '평일 10:00~13:00, 14:00~17:00': 'Weekdays 10:00–13:00, 14:00–17:00 KST',
    '평일 08:00~22:00, 주말·공휴일 09:00~18:00': 'Weekdays 08:00–22:00; weekends and public holidays 09:00–18:00 KST',
    '평일 10:00~19:00': 'Weekdays 10:00–19:00 KST',
    '평일 09:00~20:00 (점심시간 12:00~13:00), 토요일 09:00~13:00, 일요일·공휴일 휴무': 'Weekdays 09:00–20:00 (break 12:00–13:00), Sat 09:00–13:00 KST; closed Sun and public holidays',
    '평일 09:00~18:00, 주말·공휴일 휴무': 'Weekdays 09:00–18:00 KST; closed weekends and public holidays',
    '제공기관별 상담시간 상이': 'Counseling hours vary by provider',
    '지역 센터별 상담시간 확인': 'Check counseling hours with your local center',
    '정보 검색 서비스 · 상담시간은 기관별 확인': 'Directory; check counseling hours with each provider',
    '돌봄서비스 이용·신청은 지역 수행기관에 확인': 'Contact your local provider for care services and applications',
    '정보 검색 서비스 · 기관별 최신 안내 확인': 'Information directory; check current details with each provider',
    '신청서 접수 후 상담 일정 조율': 'Counseling by appointment after application',
    '공식 시간표가 서로 달라 사전 확인 필요': 'Official schedules differ; confirm hours before contacting',
    '지역 Wee 센터별 상담시간·예약 확인': 'Check hours and appointments with your local Wee Center',
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
