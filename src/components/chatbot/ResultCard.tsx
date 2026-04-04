'use client'

import { useState } from 'react'
import type { OrgWithDetails } from '@/lib/helpline-types'

interface Props {
  org: OrgWithDetails
  note?: string | null
  alwaysExpanded?: boolean
  variant?: 'default' | 'crisis'
}

export default function ResultCard({
  org,
  note,
  alwaysExpanded = false,
  variant = 'default',
}: Props) {
  const [expanded, setExpanded] = useState(alwaysExpanded)
  const isCrisis = variant === 'crisis'

  const costLabel = org.cost
    ? org.cost.isFree
      ? org.cost.condition
        ? `무료 (${org.cost.condition})`
        : '무료'
      : org.cost.detail || '유료'
    : null

  const scheduleLabel = org.contacts.some((c) => c.is24h)
    ? '24시간'
    : null

  const contactTypes = [...new Set(org.contacts.map((c) => c.type))].join(
    '·'
  )

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        isCrisis ? 'border-red-100' : 'border-stone-100'
      }`}
    >
      <button
        type="button"
        onClick={() => !alwaysExpanded && setExpanded((v) => !v)}
        disabled={alwaysExpanded}
        className={`flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left ${
          alwaysExpanded ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-center gap-2">
          {note && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
              {note}
            </span>
          )}
          <span
            className={`text-sm font-semibold ${isCrisis ? 'text-red-800' : 'text-stone-800'}`}
          >
            {org.name}
          </span>
          {scheduleLabel && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              {scheduleLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {org.phone && (
            <a
              href={`tel:${org.phone.replace(/\s+/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-bold text-blue-700 underline-offset-2 hover:underline"
            >
              {org.phone}
            </a>
          )}
          {!alwaysExpanded && (
            <span className="text-xs text-stone-400">
              {expanded ? '▴' : '▾'}
            </span>
          )}
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t border-stone-100 px-4 pb-4 pt-3">
            {contactTypes && (
              <p className="text-xs text-stone-500">
                상담 방법: {contactTypes}
              </p>
            )}

            {org.contacts.length > 0 && (
              <div className="space-y-1">
                {org.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="rounded bg-stone-100 px-1.5 py-0.5">
                      {contact.type}
                    </span>
                    {contact.contactInfo && (
                      <a
                        href={
                          /^[0-9-]+$/.test(contact.contactInfo.replace(/\s/g, ''))
                            ? `tel:${contact.contactInfo.replace(/\s/g, '')}`
                            : undefined
                        }
                        className={
                          /^[0-9-]+$/.test(contact.contactInfo.replace(/\s/g, ''))
                            ? 'text-blue-700 underline-offset-2 hover:underline'
                            : ''
                        }
                      >
                        {contact.contactInfo}
                      </a>
                    )}
                    {contact.is24h && (
                      <span className="text-green-600">24시간</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {costLabel && (
              <p className="text-xs text-stone-500">비용: {costLabel}</p>
            )}

            {org.url && (
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-blue-700 underline-offset-2 hover:underline"
              >
                사이트 바로가기 →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
