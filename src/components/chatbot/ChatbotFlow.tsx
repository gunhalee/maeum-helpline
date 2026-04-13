'use client'

import { useState } from 'react'
import SelectionScreen from './SelectionScreen'
import type { CrisisAnswer } from './SelectionScreen'
import ResultScreen from './ResultScreen'
import type { MatchGroup, MatchSerializedOrg } from '@/lib/helpline-types'
import type { Lang } from '@/lib/i18n'

type Screen = 'selection' | 'result' | 'loading'

const SOLO_BUTTONS = new Set(['해당 없음'])

interface Props {
  lang: Lang
}

export default function ChatbotFlow({ lang }: Props) {
  const [screen, setScreen] = useState<Screen>('selection')
  const [groups, setGroups] = useState<MatchGroup[]>([])
  const [orgMap, setOrgMap] = useState<Record<string, MatchSerializedOrg>>({})
  const [screenType, setScreenType] = useState<'2A' | '2B' | '2C'>('2A')

  const runMatch = async (selections: string[], crisis: boolean) => {
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections,
          crisis,
          current_time: new Date().toISOString(),
          lang,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setGroups([])
        setOrgMap({})
        return
      }

      setGroups(data.groups ?? [])
      setOrgMap(data.orgData ?? {})
    } catch (err) {
      console.error('Match failed:', err)
      setGroups([])
      setOrgMap({})
    }
  }

  const handleSubmit = async (
    selections: string[],
    crisisAnswer: CrisisAnswer
  ) => {
    if (crisisAnswer === 'yes') {
      setScreenType('2B')
      setScreen('loading')
      await runMatch([], true)
      setScreen('result')
      return
    }

    const isSoloSelection =
      selections.length === 1 && SOLO_BUTTONS.has(selections[0])
    const isSkipNoneSelection =
      crisisAnswer === 'skip' &&
      selections.length === 1 &&
      selections[0] === '해당 없음'

    const effectiveSelections = isSkipNoneSelection ? ['우울'] : selections
    const sendCrisis = isSkipNoneSelection ? false : crisisAnswer === 'skip'

    setScreenType(isSoloSelection && crisisAnswer === 'no' ? '2C' : '2A')
    setScreen('loading')
    await runMatch(effectiveSelections, sendCrisis)
    setScreen('result')
  }

  const handleBack = () => {
    setScreen('selection')
    setGroups([])
    setOrgMap({})
  }

  return (
    <div className="mx-auto w-full max-w-[460px] px-4 pb-8 pt-10 md:max-w-[620px] md:px-6 md:pt-14 lg:max-w-[700px] lg:pt-18">
      {screen === 'selection' && (
        <SelectionScreen lang={lang} onSubmit={handleSubmit} />
      )}

      {screen === 'loading' && (
        <div className="flex flex-col items-center gap-4 py-14">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-stone-300 border-t-green-700" />
          <p className="text-base leading-7 text-stone-500">
            {lang === 'en' ? 'Finding the best match...' : '맞는 상담처를 찾고 있어요.'}
          </p>
        </div>
      )}

      {screen === 'result' && (
        <ResultScreen
          groups={groups}
          orgMap={orgMap}
          screenType={screenType}
          onBack={handleBack}
          lang={lang}
        />
      )}
    </div>
  )
}
