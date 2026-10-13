import StructuredInfo from '@/components/StructuredInfo'
import TimeText from '@/components/TimeText'
import { getDescriptionDetails, translateInformationLabel } from '@/lib/description-format'
import { SERVICE_DESCRIPTION_LAYOUTS } from '@/lib/service-description-layouts'
import type { Lang } from '@/lib/i18n'

interface Props {
  description: string
  lang: Lang
}

export default function ServiceDescription({ description, lang }: Props) {
  const details = getDescriptionDetails(description, SERVICE_DESCRIPTION_LAYOUTS)

  return (
    <div className="mt-4">
      {details ? (
        <StructuredInfo items={details.map(({ label, text }) => ({
          label: translateInformationLabel(label, lang),
          text,
        }))} />
      ) : (
        <p className="whitespace-pre-line text-sm leading-[1.8] text-stone-600">
          <TimeText text={description} />
        </p>
      )}
    </div>
  )
}
