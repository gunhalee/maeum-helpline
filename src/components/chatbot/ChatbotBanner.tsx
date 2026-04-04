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
      className="flex items-center justify-center gap-1.5 bg-green-50 px-4 py-2 text-sm"
    >
      <span className="text-stone-500">위급 시</span>
      {EMERGENCY_ITEMS.map((item, i) => (
        <span key={item.id} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-stone-300">·</span>}
          <a
            href={`tel:${item.phone}`}
            className="font-semibold text-green-700 hover:text-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            {item.phone}
          </a>
        </span>
      ))}
    </div>
  )
}
