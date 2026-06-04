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
  const languageLabel = hasNonKorean ? (lang === 'en' ? 'Multilingual' : '다국어') : null

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
            {...orgToCardProps(org, lang)}
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
        ? 'You can reach support now'
        : '지금 연결할 수 있어요'
      : lang === 'en'
        ? 'Here are the best matches'
        : '맞는 상담을 찾았어요'

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
      <button
        type="button"
        onClick={onBack}
        className="flex min-h-[44px] items-center gap-1 self-start text-base text-stone-500 transition-colors hover:text-stone-700"
      >
        {lang === 'en' ? '← Start over' : '← 다시 선택'}
      </button>

      <div className="space-y-1">
        <p className="font-serif text-[clamp(1.45rem,1.2rem+1vw,1.95rem)] font-semibold leading-tight text-stone-800">
          {heading}
        </p>
      </div>

      {crisisGroups.length > 0 && (
        <div className="space-y-3">
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
        <div className="space-y-3">
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
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-center text-base leading-7 text-stone-500">
          {lang === 'en'
            ? 'We could not find a clear match. You can check the guide page for common support options.'
            : '적합한 기관을 찾지 못했습니다. 가이드에서 주요 상담처를 다시 확인할 수 있습니다.'}
        </div>
      )}

      <div className="mt-2 text-center">
        <Link
          href={withLang('/guide', lang)}
          className="inline-block text-sm text-stone-900 underline-offset-2 hover:text-stone-600 hover:underline"
        >
          {lang === 'en' ? 'Open the guide page →' : '가이드에서 보기 →'}
        </Link>
      </div>
    </div>
  )
}
