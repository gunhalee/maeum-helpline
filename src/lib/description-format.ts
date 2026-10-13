export interface InformationItem {
  label: string
  text: string
}

interface DescriptionLayout {
  source: string
  details: readonly InformationItem[]
}

function normalizeDescription(text: string): string {
  return text
    .replace(/(\d{1,2}:\d{2})\s*[~～〜–—-]\s*(\d{1,2}:\d{2})/g, '$1–$2')
    .replace(/\s+/g, ' ')
    .trim()
}

// Only use a reviewed layout for the same source text. Updated descriptions
// must remain visible instead of being replaced with an older local summary.
export function getDescriptionDetails(
  description: string,
  layouts: readonly DescriptionLayout[],
): readonly InformationItem[] | null {
  const source = normalizeDescription(description)
  return layouts.find((layout) => normalizeDescription(layout.source) === source)?.details ?? null
}

const ENGLISH_LABELS: Record<string, string> = {
  대상: 'Who it helps',
  상담: 'Counseling',
  지원: 'Support',
  언어: 'Languages',
  이용: 'Access',
  연락: 'Contact',
  신청: 'How to apply',
  비용: 'Costs',
  시간: 'Hours',
  야간: 'At night',
  확인: 'Check first',
}

export function translateInformationLabel(label: string, lang: 'ko' | 'en'): string {
  return lang === 'en' ? ENGLISH_LABELS[label] ?? label : label
}

const ENGLISH_INFORMATION_LABELS = new Set(Object.values(ENGLISH_LABELS))

// Notion's description_en uses one editable "Label: Text" item per line.
// Parse only complete, recognized rows; ordinary prose or an unfamiliar edit
// stays visible in full rather than silently losing part of the description.
export function parseEnglishDescription(description: string): InformationItem[] | null {
  const lines = description.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (lines.length === 0) return null
  const items: InformationItem[] = []
  for (const line of lines) {
    const separator = line.indexOf(':')
    const label = line.slice(0, separator).trim()
    const text = line.slice(separator + 1).trim()
    if (separator < 0 || !ENGLISH_INFORMATION_LABELS.has(label) || !text) return null
    items.push({ label, text })
  }
  return items
}
