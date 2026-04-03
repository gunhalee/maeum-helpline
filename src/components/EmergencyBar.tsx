import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
}

function isTel(phone: string): boolean {
  const compact = phone.replace(/\s+/g, '')
  return /^[0-9-]+$/.test(compact)
}

export default function EmergencyBar({ services }: Props) {
  const fallbackServices: Service[] = [
    {
      id: 'fallback-109',
      name: '정신건강 위기상담',
      phone: '109',
      category: ['crisis'],
      description: '',
      tags: [],
      isEmergency: true,
      isActive: true,
    },
    {
      id: 'fallback-119',
      name: '긴급신고',
      phone: '119',
      category: ['crisis'],
      description: '',
      tags: [],
      isEmergency: true,
      isActive: true,
    },
  ]

  const items = services.length > 0 ? services : fallbackServices

  return (
    <div
      role="banner"
      aria-label="긴급 연락처"
      className="sticky top-0 z-50 h-11 bg-green-700 text-white"
    >
      <div className="mx-auto flex h-full w-max min-w-full items-center justify-center gap-2 overflow-x-auto whitespace-nowrap px-4 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:max-w-5xl">
        {items.map((service) => {
          const compactPhone = service.phone.replace(/\s+/g, '')
          const content = `${service.name} | ${service.phone}`

          return (
            <span
              key={service.id}
              className="inline-flex items-center rounded-full bg-white/20 px-3 py-1"
            >
              {isTel(service.phone) ? (
                <a
                  href={`tel:${compactPhone}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
