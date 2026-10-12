import TimeText from '@/components/TimeText'
import { formatServiceHours } from '@/lib/service-hours-display'
import type { Lang } from '@/lib/i18n'

interface Props {
  note: string
  lang: Lang
}

export default function ServiceHours({ note, lang }: Props) {
  const { rows, notes, timeZone } = formatServiceHours(note)
  const label = rows.length > 0
    ? lang === 'en' ? 'Contact hours' : '연락 가능 시간'
    : lang === 'en' ? 'Before contacting' : '이용 안내'

  return (
    <div className="mt-4 text-sm leading-6">
      <p className="mb-1.5 text-xs font-medium text-stone-500">
        {label}{timeZone ? ` (${timeZone})` : ''}
      </p>
      {rows.length > 0 && (
        <dl className="space-y-2">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-0.5">
              <dt className="text-stone-600">{row.label}</dt>
              <dd className="text-right font-medium text-stone-800">
                {row.periods.map((period, periodIndex) => (
                  <div key={periodIndex}><TimeText text={period} /></div>
                ))}
              </dd>
              {row.detail && (
                <dd className="col-span-2 text-xs text-stone-500">
                  {row.label} <TimeText text={row.detail} />
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}
      {notes.length > 0 && (
        <div className={rows.length > 0 ? 'mt-2 space-y-1 text-stone-600' : 'space-y-1 text-stone-600'}>
          {notes.map((text, index) => <p key={index}><TimeText text={text} /></p>)}
        </div>
      )}
    </div>
  )
}
