'use client'

import Link from 'next/link'
import type {
  MatchGroup,
  MatchSerializedOrg,
  OrgRef,
} from '@/lib/helpline-types'
import ResultCard from '@/components/ResultCard'

function orgToCardProps(org: MatchSerializedOrg) {
  const is24h = org.contacts.some((c) => c.is_24h)

  const languages = org.languages
  const hasNonKorean = languages.some((l) => l !== '한국어' && l !== 'ko')
  const languageLabel = hasNonKorean ? '다국어' : null

  const metaParts = [languageLabel].filter(Boolean) as string[]

  return {
    name: org.name,
    phone: org.phone ?? '',
    url: org.url ?? undefined,
    description: org.description ?? undefined,
    is24h,
    metaParts,
  }
}

interface Props {
  groups: MatchGroup[]
  orgMap: Record<string, MatchSerializedOrg>
  screenType: '2A' | '2B' | '2C'
  onBack: () => void
}

function GroupSection({
  group,
  orgMap,
}: {
  group: MatchGroup
  orgMap: Record<string, MatchSerializedOrg>
}) {
  const resolvedOrgs: { org: MatchSerializedOrg; ref: OrgRef }[] = group.orgs
    .map((ref) => ({ org: orgMap[ref.id], ref }))
    .filter(
      (item): item is { org: MatchSerializedOrg; ref: OrgRef } => !!item.org
    )

  if (resolvedOrgs.length === 0) return null

  return (
    <section>
      <div className="px-1 pb-3">
        <p
          className="text-base font-semibold text-stone-800"
        >
          {group.label}
        </p>
        <p className="mt-1 text-sm leading-6 text-stone-500">{group.preview}</p>
      </div>

      <div className="space-y-3">
        {resolvedOrgs.map(({ org, ref }) => (
          <ResultCard
            key={org.id}
            {...orgToCardProps(org)}
            note={ref.note}
            isOpen={ref.is_open}
          />
        ))}
      </div>
    </section>
  )
}

export default function ResultScreen({
  groups,
  orgMap,
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

  const isCrisisLabel = (label: string) => /위기/.test(label)

  let crisisGroups: MatchGroup[] = []
  let normalGroups: MatchGroup[] = []

  if (!showCrisisExpanded) {
    normalGroups = groups
  } else if (screenType === '2B') {
    crisisGroups = groups
  } else {
    crisisGroups = groups.filter((g) => isCrisisLabel(g.label))
    normalGroups = groups.filter((g) => !isCrisisLabel(g.label))
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex min-h-[44px] items-center gap-1 self-start text-base text-stone-500 transition-colors hover:text-stone-700"
      >
        ← 다시 선택
      </button>

      <div className="space-y-1">
        <p className="font-serif text-[clamp(1.45rem,1.2rem+1vw,1.95rem)] font-semibold leading-tight text-stone-800">
          {heading}
        </p>
        {subheading && (
          <p className="text-base leading-7 text-stone-600">{subheading}</p>
        )}
      </div>

      {crisisGroups.length > 0 && (
        <div className="space-y-3">
          {crisisGroups.map((group, i) => (
            <GroupSection
              key={`crisis-${i}`}
              group={group}
              orgMap={orgMap}
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
            />
          ))}
        </div>
      )}

      {groups.length === 0 && (
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-center text-base leading-7 text-stone-500">
          적합한 기관을 찾지 못했습니다. 109(자살 위기 헬프라인)으로 전화해 주세요.
        </div>
      )}

      <div className="mt-2 text-center">
        <Link
          href="/crisis"
          className="inline-block text-sm text-stone-900 underline-offset-2 hover:text-stone-600 hover:underline"
        >
          상담 기관 목록 전체 →
        </Link>
      </div>
    </div>
  )
}
