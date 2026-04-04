import 'server-only'

import { Client } from '@notionhq/client'
import type {
  HelplineOrg,
  ContactMethod,
  TargetInfo,
  OrgWithDetails,
} from '@/lib/helpline-types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28',
})

const DB = {
  organizations: process.env.HELPLINE_DB_ORGANIZATIONS ?? '',
  contactInfo: process.env.HELPLINE_DB_CONTACT_INFO ?? '',
  targetInfo: process.env.HELPLINE_DB_TARGET_INFO ?? '',
  copingGuides: process.env.HELPLINE_DB_COPING_GUIDES ?? '',
} as const

type RichTextItem = { plain_text?: string }

function getRichText(richText: unknown): string {
  return (Array.isArray(richText) ? (richText as RichTextItem[]) : [])
    .map((item) => item?.plain_text ?? '')
    .join('')
    .trim()
}

function getTitle(title: unknown): string {
  return getRichText(title)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function queryAll(databaseId: string, filter?: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allResults: any[] = []
  let cursor: string | undefined

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await notion.request<any>({
      path: `databases/${databaseId}/query`,
      method: 'post',
      body: {
        page_size: 100,
        ...(filter ? { filter } : {}),
        ...(cursor ? { start_cursor: cursor } : {}),
      },
    })

    allResults.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return allResults
}

export function computeScheduleStatus(
  contacts: ContactMethod[]
): { note: string | null; isOpen: boolean | null } {
  if (contacts.some((c) => c.is24h)) {
    return { note: '24시간', isOpen: true }
  }

  const schedule = contacts[0]?.schedule
  if (!schedule) return { note: null, isOpen: null }

  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  )
  const day = now.getDay()
  const hhmm = now.getHours() * 100 + now.getMinutes()

  const dayKeys: Record<number, string[]> = {
    0: ['sunday', 'sun', 'holiday'],
    1: ['weekday', 'mon', 'all'],
    2: ['weekday', 'tue', 'all'],
    3: ['weekday', 'wed', 'all'],
    4: ['weekday', 'thu', 'all'],
    5: ['weekday', 'fri', 'all'],
    6: ['saturday', 'sat'],
  }

  const keys = dayKeys[day] ?? []
  let timeRange: string | null = null
  for (const key of keys) {
    if (key in schedule && schedule[key]) {
      timeRange = schedule[key]
      break
    }
  }

  if (!timeRange) {
    const weekdayRange = schedule['weekday'] ?? schedule['all'] ?? null
    const label = weekdayRange ? `평일 ${weekdayRange}` : '평일 운영'
    return { note: label, isOpen: false }
  }

  const match = timeRange.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/)
  if (!match) return { note: timeRange, isOpen: null }

  const start = parseInt(match[1]) * 100 + parseInt(match[2])
  const end = parseInt(match[3]) * 100 + parseInt(match[4])
  const isOpen = hhmm >= start && hhmm < end

  const label = `${match[1]}시-${match[3]}시`
  return { note: label, isOpen }
}

function tryParseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export async function getOrganizations(): Promise<HelplineOrg[]> {
  const pages = await queryAll(DB.organizations)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pages.map((page: any) => {
    const p = page.properties
    return {
      id: p.id?.number ?? 0,
      pageId: page.id,
      name: getTitle(p['이름']?.title),
      description: getRichText(p.description?.rich_text),
      phone: p.phone?.phone_number ?? '',
      url: p.url?.url ?? '',
      isActive: p.is_active?.checkbox ?? false,
      openingFixed: p.opening_fixed?.checkbox ?? false,
      lastVerified: p.last_verified?.date?.start ?? null,
      isFree: p.is_free?.checkbox ?? false,
      costCondition: getRichText(p.cost_condition?.rich_text),
      costDetail: getRichText(p.cost_detail?.rich_text),
    }
  })
}

export async function getContactMethods(): Promise<ContactMethod[]> {
  const pages = await queryAll(DB.contactInfo)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pages.map((page: any) => {
    const p = page.properties
    const scheduleStr = getRichText(p.schedule?.rich_text)
    return {
      id: p.id?.number ?? 0,
      orgId: p.org_id?.number ?? 0,
      type: getRichText(p.type?.rich_text),
      contactInfo: getRichText(p.contact_info?.rich_text),
      is24h: p.is_24h?.checkbox ?? false,
      schedule: scheduleStr
        ? tryParseJson<Record<string, string | null> | null>(scheduleStr, null)
        : null,
    }
  })
}

export async function getTargetInfos(): Promise<TargetInfo[]> {
  const pages = await queryAll(DB.targetInfo)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pages.map((page: any) => {
    const p = page.properties
    const langStr = p.language?.select?.name ?? '["ko"]'
    return {
      id: p.id?.number ?? 0,
      orgId: p.org_id?.number ?? 0,
      ageGroup: p.age_group?.select?.name ?? '',
      region: p.region?.select?.name ?? '',
      language: tryParseJson<string[]>(langStr, ['ko']),
      targetDescription: getRichText(p.target_description?.rich_text),
      exclusionDescription: getRichText(p.exclusion_description?.rich_text),
    }
  })
}

export async function getFixedBannerOrgs(): Promise<HelplineOrg[]> {
  const orgs = await getOrganizations()
  return orgs.filter((o) => o.openingFixed && o.isActive)
}

export async function getOrgsWithDetails(): Promise<OrgWithDetails[]> {
  const [orgs, contacts, targets] = await Promise.all([
    getOrganizations(),
    getContactMethods(),
    getTargetInfos(),
  ])

  const activeOrgs = orgs.filter((o) => o.isActive)

  return activeOrgs.map((org) => ({
    ...org,
    contacts: contacts.filter((c) => c.orgId === org.id),
    target: targets.find((t) => t.orgId === org.id) ?? null,
  }))
}
