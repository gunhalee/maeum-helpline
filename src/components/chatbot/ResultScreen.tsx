'use client'

import Link from 'next/link'
import type {
  MatchGroup,
  MatchSerializedOrg,
  OrgRef,
} from '@/lib/helpline-types'
import ResultCard from '@/components/ResultCard'
import { withLang, type Lang } from '@/lib/i18n'

function orgToCardProps(org: MatchSerializedOrg, lang: Lang) {
  const is24h = org.contacts.some((c) => c.is_24h)

  const languages = org.languages
  const hasNonKorean = languages.some((l) => l !== '한국어' && l !== 'ko')
  const languageLabel = lang === 'ko' && hasNonKorean ? '다국어' : null

  const metaParts = [languageLabel].filter(Boolean) as string[]

  return {
    name: org.name,
    phone: org.phone ?? '',
    url: org.url ?? undefined,
    description: org.description ?? undefined,
    is24h,
    metaParts,
    languageSupport: org.languageSupport,
  }
}

interface Props {
  groups: MatchGroup[]
  orgMap: Record<string, MatchSerializedOrg>
  screenType: '2A' | '2B'
  onBack: () => void
  lang: Lang
}

function GroupSection({
  group,
  orgMap,
  lang,
}: {
  group: MatchGroup
  orgMap: Record<string, MatchSerializedOrg>
  lang: Lang
}) {
  const resolvedOrgs: { org: MatchSerializedOrg; ref: OrgRef }[] = group.orgs
    .map((ref) => ({ org: orgMap[ref.id], ref }))
    .filter(
      (item): item is { org: MatchSerializedOrg; ref: OrgRef } => !!item.org
    )

  if (resolvedOrgs.length === 0) return null

  return (
    <section>
      <div className="pb-3">
        <h3
          className="text-sm font-medium text-stone-600"
        >
          {group.label}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {resolvedOrgs.map(({ org, ref }) => (
          <ResultCard
            key={org.id}
            {...orgToCardProps(org, lang)}
            headingLevel={4}
            note={ref.note}
            isOpen={ref.is_open}
            lang={lang}
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
  lang,
}: Props) {
  const heading =
    screenType === '2B'
      ? lang === 'en'
        ? 'Support you can contact now'
        : '지금 연락할 수 있는 기관입니다'
      : lang === 'en'
        ? 'Support for your situation'
        : '상황에 맞는 상담기관입니다'

  const showCrisisExpanded = screenType === '2B'

  let crisisGroups: MatchGroup[] = []
  let normalGroups: MatchGroup[] = []

  if (showCrisisExpanded) {
    crisisGroups = groups
  } else {
    normalGroups = groups
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h2 data-flow-heading tabIndex={-1} className="scroll-target text-xl font-semibold leading-relaxed text-stone-800 focus:outline-none">
          {heading}
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[44px] items-center gap-1 text-base text-stone-500 transition-colors hover:text-stone-700"
        >
          {lang === 'en' ? '← Start over' : '← 다시 선택'}
        </button>
      </div>

      {crisisGroups.length > 0 && (
        <div className="space-y-6">
          {crisisGroups.map((group, i) => (
            <GroupSection
              key={`crisis-${i}`}
              group={group}
              orgMap={orgMap}
              lang={lang}
            />
          ))}
        </div>
      )}

      {normalGroups.length > 0 && (
        <div className="space-y-6">
          {normalGroups.map((group, i) => (
            <GroupSection
              key={`normal-${i}`}
              group={group}
              orgMap={orgMap}
              lang={lang}
            />
          ))}
        </div>
      )}

      {groups.length === 0 && (
        <div className="py-6 text-center text-base leading-7 text-stone-600">
          {lang === 'en'
            ? 'We could not find a suitable service. You can check the guide for common support options.'
            : '적합한 기관을 찾지 못했습니다. 가이드에서 주요 상담처를 다시 확인할 수 있습니다.'}
        </div>
      )}

      <div className="mt-2 text-center">
        <Link
          href={withLang('/guide', lang)}
          className="inline-block text-sm text-stone-900 underline-offset-2 hover:text-stone-600 hover:underline"
        >
          {lang === 'en' ? 'Open the guide →' : '가이드에서 보기 →'}
        </Link>
      </div>
    </div>
  )
}
