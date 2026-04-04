'use client'

import { useState } from 'react'
import type { MatchGroup, OrgRef, OrgWithDetails } from '@/lib/helpline-types'
import ResultCard from './ResultCard'

const FREE_COUNSELING_ORG_IDS = [5, 6, 13]
const COUNSELING_KEYWORDS = ['우울', '심리상담', '심리', '상담']

interface Props {
  groups: MatchGroup[]
  orgMap: Record<number, OrgWithDetails>
  crisis: boolean
  screenType: '2A' | '2B' | '2C'
  onBack: () => void
}

function GroupSection({
  group,
  orgMap,
  defaultExpanded,
  variant,
}: {
  group: MatchGroup
  orgMap: Record<number, OrgWithDetails>
  defaultExpanded: boolean
  variant: 'default' | 'crisis'
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const resolvedOrgs: { org: OrgWithDetails; ref: OrgRef }[] = group.orgs
    .map((ref) => ({ org: orgMap[ref.id], ref }))
    .filter((item): item is { org: OrgWithDetails; ref: OrgRef } => !!item.org)

  if (resolvedOrgs.length === 0) return null

  const isCrisis = variant === 'crisis'

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isCrisis ? 'border-red-100' : 'border-stone-100'
      }`}
    >
      <button
        type="button"
        onClick={() => !isCrisis && setExpanded((v) => !v)}
        className={`flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left ${
          isCrisis ? 'cursor-default' : 'cursor-pointer hover:bg-stone-50/50'
        }`}
      >
        <div>
          <p
            className={`text-sm font-semibold ${isCrisis ? 'text-red-800' : 'text-stone-800'}`}
          >
            {group.label}
          </p>
          <p className="mt-0.5 text-xs text-stone-500">{group.preview}</p>
        </div>
        {!isCrisis && (
          <span className="text-xs text-stone-400">
            {expanded ? '▴' : '▾'}
          </span>
        )}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          expanded || isCrisis ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 p-3">
            {resolvedOrgs.map(({ org, ref }) => (
              <ResultCard
                key={org.id}
                org={org}
                note={ref.note}
                isOpen={ref.is_open}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FreeCounselingSection({
  orgMap,
  shownOrgIds,
}: {
  orgMap: Record<number, OrgWithDetails>
  shownOrgIds: Set<number>
}) {
  const [expanded, setExpanded] = useState(false)
  const freeOrgs = FREE_COUNSELING_ORG_IDS
    .filter((id) => !shownOrgIds.has(id) && orgMap[id])
    .map((id) => orgMap[id])

  if (freeOrgs.length === 0) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-100">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left hover:bg-stone-50/50"
      >
        <div>
          <p className="text-sm font-semibold text-stone-800">
            정부 지원 심리상담 지원금
          </p>
          <p className="mt-0.5 text-xs text-stone-500">
            {freeOrgs.map((o) => o.name).join(', ')}
          </p>
        </div>
        <span className="text-xs text-stone-400">
          {expanded ? '▴' : '▾'}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 p-3">
            {freeOrgs.map((org) => (
              <ResultCard key={org.id} org={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultScreen({
  groups,
  orgMap,
  crisis,
  screenType,
  onBack,
}: Props) {
  const heading =
    screenType === '2B'
      ? '지금 바로 연결하세요'
      : screenType === '2C'
        ? '힘드신 거 맞아요'
        : '맞는 상담을 찾았어요'

  const subheading = screenType === '2C' ? '일단 이쪽으로 연락해 보세요' : null

  const showCrisisExpanded = screenType === '2B' || screenType === '2C'

  const crisisGroups = showCrisisExpanded
    ? groups.filter((g) => g.orgs.some((ref) => ref.id === 1))
    : []
  const normalGroups = showCrisisExpanded
    ? groups.filter((g) => !crisisGroups.includes(g))
    : groups

  const shownOrgIds = new Set(groups.flatMap((g) => g.orgs.map((ref) => ref.id)))

  const hasCounselingGroup =
    groups.some((g) =>
      COUNSELING_KEYWORDS.some((kw) => g.label.includes(kw))
    ) || screenType === '2C'

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 self-start text-sm text-stone-500 transition-colors hover:text-stone-700"
      >
        ← 다시 선택
      </button>

      <div className="space-y-1">
        <p className="font-serif text-xl font-semibold text-stone-800">
          {heading}
        </p>
        {subheading && (
          <p className="text-sm text-stone-600">{subheading}</p>
        )}
      </div>

      {crisisGroups.length > 0 && (
        <div className="space-y-3">
          {crisisGroups.map((group, i) => (
            <GroupSection
              key={`crisis-${i}`}
              group={group}
              orgMap={orgMap}
              defaultExpanded
              variant="crisis"
            />
          ))}
        </div>
      )}

      {normalGroups.length > 0 && (
        <div className="space-y-3">
          {normalGroups.map((group, i) => (
            <GroupSection
              key={`normal-${i}`}
              group={group}
              orgMap={orgMap}
              defaultExpanded={i === 0}
              variant="default"
            />
          ))}
        </div>
      )}

      {hasCounselingGroup && (
        <FreeCounselingSection orgMap={orgMap} shownOrgIds={shownOrgIds} />
      )}

      {groups.length === 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-center text-sm text-stone-500">
          적합한 기관을 찾지 못했습니다. 109(자살 위기 헬프라인)으로 전화해 주세요.
        </div>
      )}
    </div>
  )
}
