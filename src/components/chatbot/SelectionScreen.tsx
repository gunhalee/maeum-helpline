'use client'

import { useState } from 'react'

export type CrisisAnswer = 'yes' | 'no' | 'skip'

interface Props {
  onSubmit: (selections: string[], crisisAnswer: CrisisAnswer) => void
}

const SITUATION_BUTTONS = [
  '우울',
  '여성',
  '청소년',
  '성소수자',
  '이주민·외국인',
  '노인',
  '폭력·피해',
  '직장 문제',
  '술·도박·약물',
] as const

const SOLO_BUTTONS = new Set([
  '해당 없음',
])

export default function SelectionScreen({ onSubmit }: Props) {
  const [step, setStep] = useState<'crisis' | 'situation'>('crisis')
  const [crisisAnswer, setCrisisAnswer] = useState<CrisisAnswer>('no')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const handleCrisisAnswer = (answer: CrisisAnswer) => {
    setCrisisAnswer(answer)
    if (answer === 'yes') {
      onSubmit([], 'yes')
    } else {
      setStep('situation')
    }
  }

  const toggleSelection = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (SOLO_BUTTONS.has(label)) {
        if (next.has(label)) {
          next.delete(label)
        } else {
          next.clear()
          next.add(label)
        }
        return next
      }
      if (next.has(label)) {
        next.delete(label)
      } else {
        SOLO_BUTTONS.forEach((b) => next.delete(b))
        next.add(label)
      }
      return next
    })
  }

  const hasSelection = selected.size > 0
  const hasSoloSelected = [...SOLO_BUTTONS].some((b) => selected.has(b))
  const hasNormalSelected = [...selected].some((s) => !SOLO_BUTTONS.has(s))

  const btnClass = (label: string) => {
    const active = selected.has(label)
    const isSolo = SOLO_BUTTONS.has(label)

    if (active) return 'rounded-xl border-[1.5px] px-3.5 py-2.5 text-sm transition-colors border-green-600 bg-green-50 text-green-700'

    if (isSolo && hasNormalSelected) {
      return 'rounded-xl border-[1.5px] px-3.5 py-2.5 text-sm transition-colors border-stone-100 bg-stone-50 text-stone-300 cursor-not-allowed'
    }

    if (!isSolo && hasSoloSelected) {
      return 'rounded-xl border-[1.5px] px-3.5 py-2.5 text-sm transition-colors border-stone-200 bg-white text-stone-400 hover:border-green-300 hover:bg-green-50 hover:text-stone-700'
    }

    return 'rounded-xl border-[1.5px] px-3.5 py-2.5 text-sm transition-colors border-stone-200 bg-white text-stone-700 hover:border-green-300 hover:bg-green-50'
  }

  return (
    <div className="flex flex-col gap-6">
      {step === 'crisis' ? (
        <>
          <div className="space-y-1 text-center">
            <p className="font-serif text-xl font-semibold text-stone-800">
              환영합니다.
            </p>
            <p className="text-sm text-stone-600">
              우선 드리고 싶은 질문이 있어요.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 p-4">
            <p className="mb-3 text-sm font-medium text-stone-800">
              현재 죽고 싶거나 자신을 해치고 싶은 생각이 드나요?
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCrisisAnswer('no')}
                className="min-h-[44px] flex-1 rounded-xl border-[1.5px] border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-700 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                아니오
              </button>
              <button
                type="button"
                onClick={() => handleCrisisAnswer('yes')}
                className="min-h-[44px] flex-1 rounded-xl border-[1.5px] border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-700 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                네
              </button>
              <button
                type="button"
                onClick={() => handleCrisisAnswer('skip')}
                className="min-h-[44px] w-full rounded-xl border-[1.5px] border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-700 transition-colors hover:border-green-300 hover:bg-green-50 md:w-auto md:flex-1"
              >
                답하지 않아도 돼요
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1 text-center">
            <p className="font-serif text-xl font-semibold text-stone-800">
              질문 하나만 더 드릴게요.
            </p>
            <p className="text-sm text-stone-600">
              해당되는 버튼을 모두 선택해 주세요.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setCrisisAnswer(crisisAnswer)
                setStep('crisis')
                setSelected(new Set())
              }}
              className="min-h-[40px] self-start rounded-lg px-2 text-xs text-stone-500 hover:bg-stone-100"
            >
              ‹ 이전 질문으로
            </button>

            <div className="grid grid-cols-2 gap-2">
              {SITUATION_BUTTONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleSelection(label)}
                  className={btnClass(label)}
                >
                  {label}
                </button>
              ))}

              {[...SOLO_BUTTONS].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleSelection(label)}
                  disabled={hasNormalSelected}
                  className={btnClass(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSubmit([...selected], crisisAnswer)}
            disabled={!hasSelection}
            className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
              hasSelection
                ? 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900'
                : 'cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-400'
            }`}
          >
            이 상황에 맞는 상담 찾기
          </button>
        </>
      )}

      <div className="space-y-3 text-center">
        <p className="text-xs text-stone-400">
          이 선택은 저장되지 않습니다
        </p>
        <a
          href="/crisis"
          className="inline-block text-xs text-stone-900 underline-offset-2 hover:text-stone-600 hover:underline"
        >
          전체 상담 기관 목록 →
        </a>
      </div>
    </div>
  )
}
