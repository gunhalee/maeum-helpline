export interface HoursRow {
  label: string
  periods: string[]
  detail?: string
}

export interface HoursDisplay {
  rows: HoursRow[]
  notes: string[]
  timeZone: 'KST' | null
}

const PERIOD = String.raw`\d{1,2}:\d{2}\s*[~～〜–—-]\s*\d{1,2}:\d{2}`
const ROW = new RegExp(`^(.+?)\\s+(${PERIOD}|24시간|24/7)(?:\\s+\\((점심시간|break)\\s+(${PERIOD})\\))?$`, 'i')
const CONTINUATION = new RegExp(`^${PERIOD}$`)

// Commas inside a lunch-break annotation or Korean day list are not row breaks.
function splitClauses(text: string): { text: string; separator: string }[] {
  const clauses: { text: string; separator: string }[] = []
  let depth = 0
  let start = 0
  let separator = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '(') depth++
    if (char === ')') depth--
    const spacedDot = char === '·' && /\s/.test(text[i - 1] ?? '') && /\s/.test(text[i + 1] ?? '')
    if (depth === 0 && (char === ',' || char === ';' || spacedDot)) {
      clauses.push({ text: text.slice(start, i).trim(), separator })
      separator = char === '·' ? ' · ' : `${char} `
      start = i + 1
    }
  }
  clauses.push({ text: text.slice(start).trim(), separator })
  return clauses
}

/** Presentation only: preserve qualifiers and never infer whether a service is open. */
export function formatServiceHours(note: string): HoursDisplay {
  const original = note.trim()
  const hasTimeZone = /\bKST\b/.test(original)
  const text = original.replace(/\s+KST\b/g, '')
  const rows: HoursRow[] = []
  const notes: string[] = []
  let previousWasRow = false

  for (const clause of splitClauses(text)) {
    const match = clause.text.match(ROW)
    if (match) {
      rows.push({
        label: match[1].replace(/:$/, ''),
        periods: [match[2]],
        ...(match[3] ? { detail: `${match[3]} ${match[4]}` } : {}),
      })
      previousWasRow = true
    } else if (previousWasRow && clause.separator === ', ' && CONTINUATION.test(clause.text)) {
      rows[rows.length - 1].periods.push(clause.text)
    } else {
      // Keep unrecognized content verbatim, including English closure day lists.
      if (!previousWasRow && notes.length > 0) {
        notes[notes.length - 1] += clause.separator + clause.text
      } else {
        notes.push(clause.text)
      }
      previousWasRow = false
    }
  }

  // Appointment instructions and unfamiliar formats remain readable prose.
  if (rows.length === 0) return { rows: [], notes: original ? [original] : [], timeZone: null }
  return { rows, notes, timeZone: hasTimeZone ? 'KST' : null }
}
