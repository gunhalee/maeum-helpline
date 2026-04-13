'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SelectionScreen from './SelectionScreen'
import type { CrisisAnswer } from './SelectionScreen'
import ResultScreen from './ResultScreen'
import type { MatchGroup, MatchSerializedOrg } from '@/lib/helpline-types'
import { normalizeLang } from '@/lib/i18n'

type Screen = 'selection' | 'result' | 'loading'

const SOLO_BUTTONS = new Set([
  '해당 없음',
])

export default function ChatbotFlow() {
  const searchParams = useSearchParams()
  const lang = normalizeLang(searchParams.get('lang'))
  const containerRef = useRef<HTMLDivElement>(null)
  const [screen, setScreen] = useState<Screen>('selection')
  const [groups, setGroups] = useState<MatchGroup[]>([])
  const [orgMap, setOrgMap] = useState<Record<string, MatchSerializedOrg>>({})
  const [screenType, setScreenType] = useState<'2A' | '2B' | '2C'>('2A')

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      const banner = document.querySelector('[role="banner"]')
      const bannerHeight = banner instanceof HTMLElement ? banner.offsetHeight : 0
      const targetTop =
        container.getBoundingClientRect().top + window.scrollY - bannerHeight - 16

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [])

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
          body: JSON.stringify({
            selections: [],
            crisis: true,
            current_time: new Date().toISOString(),
            lang,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          setGroups([])
          setOrgMap({})
        } else {
          setGroups(data.groups ?? [])
          setOrgMap(data.orgData ?? {})
        }
      } catch {
        setGroups([])
        setOrgMap({})
      }

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

    if (isSoloSelection && crisisAnswer === 'no') {
      setScreenType('2C')
    } else if (crisisAnswer === 'skip') {
      setScreenType('2A')
    } else {
      setScreenType('2A')
    }

    setScreen('loading')

    const sendCrisis = isSkipNoneSelection ? false : crisisAnswer === 'skip'

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections: effectiveSelections,
          crisis: sendCrisis,
          current_time: new Date().toISOString(),
          lang,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGroups([])
        setOrgMap({})
      } else {
        setGroups(data.groups ?? [])
        setOrgMap(data.orgData ?? {})
      }
    } catch (err) {
      console.error('Match failed:', err)
      setGroups([])
      setOrgMap({})
    }

    setScreen('result')
  }

  const handleBack = () => {
    setScreen('selection')
    setGroups([])
    setOrgMap({})
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[460px] px-4 pt-10 pb-8 md:max-w-[620px] md:px-6 md:pt-14 lg:max-w-[700px] lg:pt-18"
    >
      {screen === 'selection' && (
        <SelectionScreen lang={lang} onSubmit={handleSubmit} />
      )}

      {screen === 'loading' && (
        <div className="flex flex-col items-center gap-4 py-14">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-stone-300 border-t-green-700" />
          <p className="text-base leading-7 text-stone-500">
            {lang === 'en' ? 'Finding the best match…' : '맞는 상담을 찾고 있어요…'}
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
