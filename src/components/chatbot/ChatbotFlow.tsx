'use client'

import { useEffect, useRef, useState } from 'react'
import SelectionScreen from './SelectionScreen'
import type { CrisisAnswer } from './SelectionScreen'
import ResultScreen from './ResultScreen'
import type { MatchGroup, MatchSerializedOrg } from '@/lib/helpline-types'
import type { Lang } from '@/lib/i18n'

type Screen = 'selection' | 'result' | 'loading'

interface Props {
  lang: Lang
}

export default function ChatbotFlow({ lang }: Props) {
  const [screen, setScreen] = useState<Screen>('selection')
  const [groups, setGroups] = useState<MatchGroup[]>([])
  const [orgMap, setOrgMap] = useState<Record<string, MatchSerializedOrg>>({})
  const [screenType, setScreenType] = useState<'2A' | '2B'>('2A')
  const flowRef = useRef<HTMLDivElement>(null)
  const previousScreen = useRef(screen)

  useEffect(() => {
    if (previousScreen.current === screen) return
    previousScreen.current = screen

    const frame = requestAnimationFrame(() => {
      const heading = flowRef.current?.querySelector<HTMLElement>('[data-flow-heading]')
      heading?.focus({ preventScroll: true })
      heading?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })

    return () => cancelAnimationFrame(frame)
  }, [screen])

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

    setScreenType('2A')
    setScreen('loading')
    await runMatch(selections, crisisAnswer === 'skip')
    setScreen('result')
  }

  const handleBack = () => {
    setScreen('selection')
    setGroups([])
    setOrgMap({})
  }

  return (
    <div
      ref={flowRef}
      className={`mx-auto w-full pb-8 pt-6 md:pt-8 ${screen === 'result'
        ? 'max-w-[860px] px-3 sm:px-4 md:px-6'
        : 'max-w-[460px] px-4 md:max-w-[620px] md:px-6 lg:max-w-[700px]'}`}
    >
      {screen === 'selection' && (
        <SelectionScreen lang={lang} onSubmit={handleSubmit} />
      )}

      {screen === 'loading' && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <h2 data-flow-heading tabIndex={-1} className="scroll-target text-base leading-7 text-stone-600 focus:outline-none">
            {lang === 'en' ? 'Finding support for you...' : '맞는 상담처를 찾고 있어요.'}
          </h2>
          <div aria-hidden="true" className="h-9 w-9 animate-spin rounded-full border-2 border-stone-300 border-t-green-700 motion-reduce:animate-none" />
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
