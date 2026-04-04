'use client'

import { useState } from 'react'
import SelectionScreen from './SelectionScreen'
import type { CrisisAnswer } from './SelectionScreen'
import ResultScreen from './ResultScreen'
import type { MatchGroup, OrgWithDetails } from '@/lib/helpline-types'

type Screen = 'selection' | 'result' | 'loading'

const SOLO_BUTTONS = new Set([
  '해당 없음',
])

const FALLBACK_GROUPS: MatchGroup[] = [
  {
    label: '위기·긴급',
    preview: '자살위기 헬프라인, 생명의전화',
    orgs: [
      { id: 1, note: null },
      { id: 2, note: null },
    ],
  },
  {
    label: '우울·심리상담',
    preview: '지역 정신건강복지센터, 보건복지 콜센터 외 1곳',
    orgs: [
      { id: 4, note: null },
      { id: 3, note: null },
      { id: 21, note: null },
    ],
  },
]

export default function ChatbotFlow() {
  const [screen, setScreen] = useState<Screen>('selection')
  const [groups, setGroups] = useState<MatchGroup[]>([])
  const [orgMap, setOrgMap] = useState<Record<number, OrgWithDetails>>({})
  const [screenType, setScreenType] = useState<'2A' | '2B' | '2C'>('2A')

  const handleSubmit = async (
    selections: string[],
    crisisAnswer: CrisisAnswer
  ) => {
    if (crisisAnswer === 'yes') {
      setScreenType('2B')
      setScreen('loading')

      try {
        const res = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selections: [], crisis: true }),
        })
        const data = await res.json()
        setGroups(data.groups ?? FALLBACK_GROUPS)
        setOrgMap(data.orgMap ?? {})
      } catch {
        setGroups(FALLBACK_GROUPS)
      }

      setScreen('result')
      return
    }

    const isSoloSelection =
      selections.length === 1 && SOLO_BUTTONS.has(selections[0])

    if (isSoloSelection && crisisAnswer === 'no') {
      setScreenType('2C')
    } else if (crisisAnswer === 'skip') {
      setScreenType('2A')
    } else {
      setScreenType('2A')
    }

    setScreen('loading')

    const sendCrisis = crisisAnswer === 'skip'

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections, crisis: sendCrisis }),
      })
      const data = await res.json()
      setGroups(data.groups ?? FALLBACK_GROUPS)
      setOrgMap(data.orgMap ?? {})
    } catch (err) {
      console.error('Match failed:', err)
      setGroups(FALLBACK_GROUPS)
    }

    setScreen('result')
  }

  const handleBack = () => {
    setScreen('selection')
    setGroups([])
    setOrgMap({})
  }

  return (
    <div className="mx-auto w-full max-w-[420px] px-4 pt-12 pb-6 md:max-w-[560px] md:pt-16 lg:max-w-[640px] lg:pt-20">
      {screen === 'selection' && <SelectionScreen onSubmit={handleSubmit} />}

      {screen === 'loading' && (
        <div className="flex flex-col items-center gap-3 py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-green-700" />
          <p className="text-sm text-stone-500">맞는 상담을 찾고 있어요…</p>
        </div>
      )}

      {screen === 'result' && (
        <ResultScreen
          groups={groups}
          orgMap={orgMap}
          crisis={screenType === '2B'}
          screenType={screenType}
          onBack={handleBack}
        />
      )}
    </div>
  )
}
