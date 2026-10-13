import type { Lang } from '@/lib/i18n'

const EMERGENCY_ITEMS = [
  { phone: '109', koLabel: '위기 상담', enLabel: 'Crisis', koFull: '자살위기 상담', enFull: 'Suicide crisis counseling' },
  { phone: '119', koLabel: '구급', enLabel: 'Rescue', koFull: '응급 구조·구급', enFull: 'Emergency rescue and ambulance' },
  { phone: '112', koLabel: '경찰', enLabel: 'Police', koFull: '경찰 신고', enFull: 'Police emergency' },
] as const

export default function ChatbotBanner({ lang }: { lang: Lang }) {
  return (
    <header
      role="banner"
      className="border-b border-stone-200 bg-white px-[12px] py-[8px]"
      aria-label={lang === 'en' ? 'Emergency contacts' : '긴급 연락처'}
    >
      <div className="mx-auto grid max-w-[460px] grid-cols-3 gap-[8px]">
        {EMERGENCY_ITEMS.map((item) => (
          <a
            key={item.phone}
            href={`tel:${item.phone}`}
            aria-label={`${lang === 'en' ? item.enFull : item.koFull} ${item.phone}`}
            className="flex min-h-[48px] min-w-0 flex-col items-center justify-center rounded-lg border border-green-700 bg-white px-[6px] py-[6px] text-center text-green-800 transition-colors hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
          >
            <span className="whitespace-nowrap text-lg font-bold leading-tight">{item.phone}</span>
            <span className="text-xs font-medium leading-snug">{lang === 'en' ? item.enLabel : item.koLabel}</span>
          </a>
        ))}
      </div>
    </header>
  )
}
