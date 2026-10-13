import EmergencyText from '@/components/EmergencyText'
import TimeText from '@/components/TimeText'
import type { InformationItem } from '@/lib/description-format'

interface Props {
  items: readonly InformationItem[]
  emergencyLinks?: boolean
  wideLabels?: boolean
}

export default function StructuredInfo({ items, emergencyLinks = false, wideLabels = false }: Props) {
  return (
    <dl className="space-y-2.5 text-sm leading-[1.8]">
      {items.map(({ label, text }, index) => (
        <div key={`${label}-${index}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <dt className={`max-w-full shrink-0 break-words font-medium text-stone-600 sm:w-[7rem] ${wideLabels ? 'w-[6.5rem]' : 'w-[4.5rem]'}`}>{label}</dt>
          <dd className="min-w-0 flex-[1_1_9rem] text-stone-700">
            {emergencyLinks ? <EmergencyText text={text} /> : <TimeText text={text} />}
          </dd>
        </div>
      ))}
    </dl>
  )
}
