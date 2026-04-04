import type { HelplineOrg } from '@/lib/helpline-types'

interface Props {
  orgs: HelplineOrg[]
}

export default function ChatbotBanner({ orgs }: Props) {
  const fallback: Pick<HelplineOrg, 'id' | 'name' | 'phone'>[] = [
    { id: 98, name: '구급 신고', phone: '119' },
    { id: 99, name: '경찰 신고', phone: '112' },
  ]

  const items = orgs.length > 0 ? orgs : fallback

  return (
    <div
      role="banner"
      aria-label="긴급 연락처"
      className="bg-[#FCEBEB] px-4 py-3 text-center"
    >
      <p className="mb-2 text-sm font-medium text-stone-700">
        지금 당장 위험한 상황이라면
      </p>
      <div className="flex items-center justify-center gap-3">
        {items.map((org) => (
          <a
            key={org.id}
            href={`tel:${org.phone.replace(/\s+/g, '')}`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-bold text-red-700 transition-colors hover:bg-red-50 active:bg-red-100"
          >
            {org.phone} {org.name}
          </a>
        ))}
      </div>
    </div>
  )
}
