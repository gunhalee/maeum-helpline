import 'server-only'

import { Client } from '@notionhq/client'
import { unstable_cache } from 'next/cache'
import { CATEGORY_ORDER } from '@/lib/categories'
import { isServiceAlwaysOpen } from '@/lib/service-hours'
import type { Category, Service } from '@/lib/types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28',
  // Cache mapped services below, not the SDK's raw HTTP response as well.
  fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' }),
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''
type RichTextItem = { plain_text?: string }
type MultiSelectTag = { name?: string }
interface NotionQueryResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[]
  has_more: boolean
  next_cursor: string | null
}

type NotionPage = {
  id?: string
  properties?: Record<string, unknown>
}

function getRichText(richText: unknown): string {
  return (Array.isArray(richText) ? (richText as RichTextItem[]) : [])
    .map((item) => item?.plain_text ?? '')
    .join('')
    .trim()
}

function getTitle(title: unknown): string {
  return getRichText(title)
}

function getMultiSelectNames(value: unknown): string[] {
  return Array.isArray(value)
    ? (value as MultiSelectTag[])
        .map((item) => item?.name?.trim() ?? '')
        .filter(Boolean)
    : []
}

function splitPipeList(value: string): string[] {
  return value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
}

function getPropertyText(property: unknown): string {
  if (!property || typeof property !== 'object') return ''

  const record = property as Record<string, unknown>
  if ('rich_text' in record) return getRichText(record.rich_text)
  if ('title' in record) return getTitle(record.title)
  if ('phone_number' in record) return String(record.phone_number ?? '').trim()
  if ('url' in record) return String(record.url ?? '').trim()
  if ('select' in record) {
    const select = record.select as { name?: string } | null | undefined
    return select?.name?.trim() ?? ''
  }

  return ''
}

function getPropertyCheckbox(property: unknown): boolean | undefined {
  if (!property || typeof property !== 'object') return undefined
  if (!('checkbox' in (property as Record<string, unknown>))) return undefined
  return Boolean((property as { checkbox?: unknown }).checkbox)
}

function getPropertyDate(property: unknown): string | undefined {
  if (!property || typeof property !== 'object') return undefined
  const record = property as Record<string, unknown>
  if (!('date' in record)) return undefined

  const date = record.date as { start?: string | null } | null | undefined
  return date?.start ?? undefined
}

function getPropertyMultiValues(property: unknown): string[] {
  if (!property || typeof property !== 'object') return []

  const record = property as Record<string, unknown>
  if ('multi_select' in record) return getMultiSelectNames(record.multi_select)

  const text = getPropertyText(property)
  return text ? splitPipeList(text) : []
}

function normalizeHoursType(rawHoursType: string, operatingHours: string, hoursDetail: string, tags: string[]): string | undefined {
  const normalizedHoursType = rawHoursType.trim().toLowerCase()
  if (isServiceAlwaysOpen({ hoursType: normalizedHoursType, operatingHours, hoursDetail, tags })) return '24h'
  // Keep compound schedules intact instead of inferring 24h from a mention of another hotline.
  if (hoursDetail || operatingHours) return normalizedHoursType === 'weekday' || normalizedHoursType === 'weekdays' ? 'weekday' : 'custom'
  if (normalizedHoursType === 'weekdays') return 'weekday'
  if (normalizedHoursType) return normalizedHoursType
  return undefined
}

function inferLanguages(tags: string[], explicitLanguages: string[]): string[] {
  if (explicitLanguages.length > 0) return explicitLanguages
  return tags.some((tag) => tag.includes('다국어')) ? ['다국어'] : []
}

function hasConfiguredNotionEnv(): boolean {
  const apiKey = process.env.NOTION_API_KEY ?? ''
  if (!DATABASE_ID || !apiKey) {
    return false
  }

  if (
    apiKey.includes('여기에_') ||
    DATABASE_ID.includes('여기에_') ||
    /[^\u0000-\u007F]/.test(apiKey) ||
    /[^\u0000-\u007F]/.test(DATABASE_ID)
  ) {
    return false
  }

  return true
}

async function queryDatabase(payload: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any
  sorts: Array<{ property: string; direction: 'ascending' | 'descending' }>
  start_cursor?: string
}): Promise<NotionQueryResponse> {
  return notion.request<NotionQueryResponse>({
    path: `databases/${DATABASE_ID}/query`,
    method: 'post',
    body: {
      ...payload,
      page_size: 100,
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNotionToService(page: any): Service | null {
  const typedPage = page as NotionPage
  const properties = typedPage.properties ?? {}
  const categories = getPropertyMultiValues(properties['category']).filter(
    (value): value is Category => CATEGORY_ORDER.includes(value as Category)
  )
  if (categories.length === 0) {
    return null
  }

  const isActive = getPropertyCheckbox(properties['is_active']) ?? false
  if (!isActive) {
    return null
  }

  const name = getPropertyText(properties['name'])
  if (!name) {
    return null
  }

  const tags = getPropertyMultiValues(properties['tags'])
  const operatingHours = getPropertyText(properties['operating_hours'])
  const hoursDetail = getPropertyText(properties['hours_detail']) || operatingHours
  const contactMethods = getPropertyMultiValues(properties['contact_method'])
  const region = getPropertyText(properties['region']) || undefined
  const rawHoursType = getPropertyText(properties['hours_type'])
  const hoursType = normalizeHoursType(rawHoursType, operatingHours, hoursDetail, tags)
  const situationKeywords = getPropertyMultiValues(
    properties['situation_keywords']
  )
  const languages = inferLanguages(
    tags,
    getPropertyMultiValues(properties['languages'])
  )
  const ageGroups = getPropertyMultiValues(properties['age_group'])
  const exclusionDescription =
    getPropertyText(properties['exclusion_description']) || undefined
  const seoDescription = getPropertyText(properties['seo_summary']) || undefined
  const searchIntents = getPropertyMultiValues(properties['search_intent'])
  const lastVerified = getPropertyDate(properties['last_verified'])
  const sourcePriority = getPropertyText(properties['source_priority']) || undefined
  const sourceType = getPropertyText(properties['source_type']) || undefined

  return {
    id: typedPage.id ?? '',
    name,
    phone: getPropertyText(properties['phone']),
    category: categories,
    description: getPropertyText(properties['description']),
    tags,
    isEmergency: getPropertyCheckbox(properties['is_emergency']) ?? false,
    isActive,
    url: getPropertyText(properties['url']) || undefined,
    operatingHours: operatingHours || undefined,
    isFree: getPropertyCheckbox(properties['is_free']) ?? tags.includes('무료'),
    contactMethods,
    region,
    hoursType,
    hoursDetail: hoursDetail || undefined,
    situationKeywords,
    languages,
    ageGroups,
    exclusionDescription,
    seoDescription,
    searchIntents,
    lastVerified,
    sourcePriority,
    sourceType,
  }
}

async function fetchServices(): Promise<Service[]> {
  if (!hasConfiguredNotionEnv()) {
    console.error('Notion environment variables are missing or invalid.')
    return []
  }

  try {
    const services: Service[] = []
    let hasMore = true
    let cursor: string | undefined = undefined

    while (hasMore) {
      const response = await queryDatabase({
        filter: {
          property: 'is_active',
          checkbox: { equals: true },
        },
        sorts: [
          {
            property: 'name',
            direction: 'ascending',
          },
        ],
        start_cursor: cursor,
      })

      const mapped = response.results
        .map((page) => mapNotionToService(page))
        .filter((service): service is Service => service !== null)

      services.push(...mapped)
      hasMore = response.has_more
      cursor = response.next_cursor ?? undefined
    }

    return services
  } catch (error) {
    console.error('Failed to fetch services from Notion:', error)
    return []
  }
}

// Pages and recommendations share one bounded cache. The version separates it
// from responses stored before the hours normalization and content refresh.
export const getServices = unstable_cache(
  fetchServices,
  ['helpline-services-v3', DATABASE_ID],
  { revalidate: 300 }
)
