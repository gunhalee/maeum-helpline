interface Props {
  text: string
  linkClassName?: string
}

const EMERGENCY_PHONE_RE = /(109|112|119)/g

export default function EmergencyText({ text, linkClassName }: Props) {
  const parts = text.split(EMERGENCY_PHONE_RE)

  return (
    <>
      {parts.map((part, index) => {
        if (part === '109' || part === '112' || part === '119') {
          return (
            <a
              key={`${part}-${index}`}
              href={`tel:${part}`}
              className={
                linkClassName ??
                'font-semibold text-green-800 underline underline-offset-2'
              }
            >
              {part}
            </a>
          )
        }

        return part
      })}
    </>
  )
}
