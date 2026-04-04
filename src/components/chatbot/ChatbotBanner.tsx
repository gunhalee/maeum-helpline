const EMERGENCY_ITEMS = [
  { id: 1, name: '자살 위기', phone: '109' },
  { id: 98, name: '구급 신고', phone: '119' },
  { id: 99, name: '경찰 신고', phone: '112' },
] as const

export default function ChatbotBanner() {
  return (
    <div
      role="banner"
      aria-label="긴급 연락처"
      className="bg-green-50 px-4 py-3 text-center"
    >
      <p className="mb-2 text-sm font-medium text-stone-700">
        지금 당장 위험한 상황이라면
      </p>
      <div className="flex items-center justify-center gap-3">
        {EMERGENCY_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`tel:${item.phone}`}
            className="inline-flex min-h-[44px] flex-col items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-green-700 transition-colors hover:bg-green-50 active:bg-green-100"
          >
            <span className="text-base font-bold leading-tight">{item.phone}</span>
            <span className="text-[10px] leading-tight">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
