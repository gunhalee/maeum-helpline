import 'server-only'

import { Client } from '@notionhq/client'
import { CATEGORY_ORDER } from '@/lib/categories'
import type { Category, Service } from '@/lib/types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28',
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
export function mapNotionToService(page: any): Service | null {
  const getRichText = (richText: unknown) =>
    (Array.isArray(richText) ? (richText as RichTextItem[]) : [])
      .map((item) => item?.plain_text ?? '')
      .join('')
      .trim()

  const getTitle = (title: unknown) =>
    (Array.isArray(title) ? (title as RichTextItem[]) : [])
      .map((item) => item?.plain_text ?? '')
      .join('')
      .trim()

  const categories = Array.isArray(page?.properties?.category?.multi_select)
    ? (page.properties.category.multi_select as MultiSelectTag[])
        .map((item) => item?.name ?? '')
        .filter((value): value is Category =>
          CATEGORY_ORDER.includes(value as Category)
        )
    : []
  if (categories.length === 0) {
    return null
  }

  const isActive = page?.properties?.is_active?.checkbox ?? false
  if (!isActive) {
    return null
  }

  const name = getTitle(page?.properties?.name?.title)
  if (!name) {
    return null
  }

  return {
    id: page?.id ?? '',
    name,
    phone: getRichText(page?.properties?.phone?.rich_text),
    category: categories,
    description: getRichText(page?.properties?.description?.rich_text),
    tags:
      (Array.isArray(page?.properties?.tags?.multi_select)
        ? (page.properties.tags.multi_select as MultiSelectTag[]).map(
            (tag) => tag?.name ?? ''
          )
        : []) ??
      [],
    isEmergency: page?.properties?.is_emergency?.checkbox ?? false,
    isActive,
    url: page?.properties?.url?.url ?? undefined,
    operatingHours:
      getRichText(page?.properties?.operating_hours?.rich_text) || undefined,
  }
}

export async function getServices(): Promise<Service[]> {
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
            property: 'title',
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

