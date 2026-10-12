import type { Service } from './types'

type HoursInput = Pick<Service, 'hoursType' | 'hoursDetail' | 'operatingHours' | 'tags'>
type DayScope = { days: number[]; includeHolidays: boolean; excludeHolidays: boolean }
type HoursRule = { scope: DayScope; start: number; end: number; closed: boolean }

export type HolidayLookup = (kstDate: string) => boolean | undefined

const WEEKDAYS = [1, 2, 3, 4, 5]
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]
const DAY_NAMES = '일월화수목금토'
const MINUTES_PER_DAY = 1440
const DAY_MS = 24 * 60 * 60 * 1000
const KST_OFFSET_MS = 9 * 60 * 60 * 1000

function hoursText(service: HoursInput): string {
  return service.hoursDetail?.trim() || service.operatingHours?.trim() || ''
}

function isUnrestricted24Hours(value: string): boolean {
  return /^(?:(?:매일|365일|연중무휴|daily|everyday)\s*)*(?:24\s*(?:시간|h|hours)|24\/7|상시(?:운영)?|always(?:\s*open)?)(?:\s*(?:운영|상담))?$/i.test(value.trim())
}

export function isServiceAlwaysOpen(service: HoursInput): boolean {
  const detail = hoursText(service)
  // A detailed schedule overrides a broad type or tag (e.g. only emergency calls are 24h).
  if (detail) return isUnrestricted24Hours(detail)
  const type = service.hoursType?.trim().toLowerCase()
  if (type) return type === '24h' || type === '24시간'
  return service.tags.some(isUnrestricted24Hours)
}

function cleanClause(value: string): string {
  return value
    .replace(/(?:운영|상담)시간/g, '')
    .replace(/까지/g, '')
    .replace(/[\s,;·ㆍ/()\[\]:]/g, '')
}

function parseDays(value: string): DayScope | null {
  let remaining = cleanClause(value)
  const days = new Set<number>()
  let includeHolidays = false
  let excludeHolidays = false
  let found = false
  remaining = remaining.replace(/매일|연중무휴|365일|평일|주말|공휴일|휴일/g, (token) => {
    found = true
    if (token === '평일') {
      WEEKDAYS.forEach((day) => days.add(day))
      excludeHolidays = true
    } else if (token === '주말') {
      days.add(0).add(6)
    } else if (token === '공휴일' || token === '휴일') {
      includeHolidays = true
    } else {
      ALL_DAYS.forEach((day) => days.add(day))
      includeHolidays = true
    }
    return ''
  })
  remaining = remaining.replace(/([일월화수목금토])(?:요일)?(?:[~-]([일월화수목금토])(?:요일)?)?/g, (_token, from: string, to?: string) => {
    found = true
    const first = DAY_NAMES.indexOf(from)
    const last = DAY_NAMES.indexOf(to ?? from)
    for (let day = first; ; day = (day + 1) % 7) {
      days.add(day)
      if (day === last) break
    }
    return ''
  })
  if (!found || remaining) return null
  return { days: [...days], includeHolidays, excludeHolidays }
}

function toMinutes(period: string | undefined, hourText: string, minuteText: string | undefined): number | null {
  let hour = Number(hourText)
  const minute = Number(minuteText ?? 0)
  if (minute > 59 || hour > 24 || (hour === 24 && minute !== 0)) return null
  if (period) {
    if (hour < 1 || hour > 12) return null
    hour = (hour % 12) + (period === '오후' ? 12 : 0)
  }
  return hour * 60 + minute
}

function parseSchedule(detail: string, hoursType?: string): HoursRule[] | null {
  const text = detail.normalize('NFKC').replace(/[～〜–—−]/g, '~').replace(/부터/g, '~')
  const time = '(오전|오후)?\\s*(\\d{1,2})(?::(\\d{2})|시(?:\\s*(\\d{1,2})분)?)'
  const token = new RegExp(`${time}\\s*[~-]\\s*${time}(?:\\s*까지)?|휴무|휴관|휴업|제외`, 'g')
  const rules: HoursRule[] = []
  let offset = 0
  let inheritedScope = hoursType?.toLowerCase() === 'weekday' ? parseDays('평일') : null

  for (const match of text.matchAll(token)) {
    const prefix = text.slice(offset, match.index)
    const isBreak = /점심|휴게|휴식/.test(prefix)
    const scopeText = cleanClause(prefix.replace(/(?:점심|휴게|휴식)(?:시간)?/g, ''))
    const isClosure = /^(휴무|휴관|휴업|제외)$/.test(match[0])
    const scope = scopeText ? parseDays(scopeText) : (isClosure ? null : inheritedScope)
    if (!scope) return null

    let start = 0
    let end = MINUTES_PER_DAY
    if (!isClosure) {
      const parsedStart = toMinutes(match[1], match[2], match[3] ?? match[4])
      const parsedEnd = toMinutes(match[5], match[6], match[7] ?? match[8])
      if (parsedStart === null || parsedEnd === null || parsedStart >= MINUTES_PER_DAY || parsedStart === parsedEnd) return null
      start = parsedStart
      end = parsedEnd
    }
    rules.push({ scope, start, end, closed: isClosure || isBreak })
    if (!isClosure && !isBreak) inheritedScope = scope
    offset = match.index + match[0].length
  }

  // Unsupported qualifiers must not be silently discarded or treated as opening hours.
  if (cleanClause(text.slice(offset)) || !rules.some((rule) => !rule.closed)) return null
  return rules
}

function matchesDay(scope: DayScope, day: number, isHoliday: boolean): boolean {
  if (isHoliday && scope.includeHolidays) return true
  if (isHoliday && scope.excludeHolidays) return false
  return scope.days.includes(day)
}

function matchesRule(rule: HoursRule, day: number, minute: number, holiday: boolean, previousHoliday: boolean): boolean {
  if (rule.start < rule.end) {
    return matchesDay(rule.scope, day, holiday) && minute >= rule.start && minute < rule.end
  }
  // An overnight interval belongs to its starting day, including its holiday rules.
  return (
    (minute >= rule.start && matchesDay(rule.scope, day, holiday)) ||
    (minute < rule.end && matchesDay(rule.scope, (day + 6) % 7, previousHoliday))
  )
}

export function getServiceHoursStatus(
  service: HoursInput,
  referenceTime: Date,
  holidayLookup?: HolidayLookup
): { note: string; isOpen: boolean | null } {
  const detail = hoursText(service)
  const alwaysOpen = isServiceAlwaysOpen(service)
  const note = detail || (alwaysOpen ? '24시간' : '운영시간 확인 필요')
  if (!Number.isFinite(referenceTime.getTime())) return { note, isOpen: null }
  if (alwaysOpen) return { note: '24시간', isOpen: true }
  if (!detail) return { note, isOpen: null }

  const rules = parseSchedule(detail, service.hoursType)
  if (!rules) return { note, isOpen: null }

  // UTC accessors on a shifted instant avoid depending on the server's local timezone.
  const kst = new Date(referenceTime.getTime() + KST_OFFSET_MS)
  const previous = new Date(kst.getTime() - DAY_MS)
  const day = kst.getUTCDay()
  const minute = kst.getUTCHours() * 60 + kst.getUTCMinutes()
  const holiday = holidayLookup?.(kst.toISOString().slice(0, 10))
  const previousHoliday = holidayLookup?.(previous.toISOString().slice(0, 10))
  const outcomes = new Set<boolean>()

  // Without a verified holiday calendar, only decide when both possibilities agree.
  for (const current of holiday === undefined ? [false, true] : [holiday]) {
    for (const prior of previousHoliday === undefined ? [false, true] : [previousHoliday]) {
      const matches = (rule: HoursRule) => matchesRule(rule, day, minute, current, prior)
      outcomes.add(rules.some((rule) => !rule.closed && matches(rule)) && !rules.some((rule) => rule.closed && matches(rule)))
    }
  }
  return { note, isOpen: outcomes.size === 1 ? [...outcomes][0] : null }
}
