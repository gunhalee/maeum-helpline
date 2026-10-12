interface Props {
  text: string
}

const TIME_RANGE = /(\d{1,2}:\d{2}\s*[~～〜–—-]\s*\d{1,2}:\d{2})/g

export default function TimeText({ text }: Props) {
  return text.split(TIME_RANGE).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="inline-block whitespace-nowrap tabular-nums">
        {part.replace(/\s*[~～〜–—-]\s*/g, '–')}
      </span>
    ) : part
  )
}
