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
          <div className="space-y-3 text-center">
            <p className="font-serif text-[clamp(1.45rem,1.2rem+1vw,1.95rem)] font-semibold leading-tight text-stone-800">
              환영합니다.
            </p>
            <p className="mx-auto max-w-[32rem] text-base leading-7 text-stone-600">
              두 질문에 답해주시면
              <br className="sm:hidden" /> 적절한 긴급상담 기관을 안내해드릴게요.
            </p>
          </div>

          <div className="p-4 text-center">
            <p className="mb-4 text-base font-medium leading-7 text-stone-800">
              죽고 싶거나 자신을 해치고 싶은가요?
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCrisisAnswer('no')}
                className="min-h-[50px] flex-1 rounded-xl border-[1.5px] border-stone-200 bg-white px-4 py-3.5 text-center text-base text-stone-700 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                아니오
              </button>
              <button
                type="button"
                onClick={() => handleCrisisAnswer('yes')}
                className="min-h-[50px] flex-1 rounded-xl border-[1.5px] border-stone-200 bg-white px-4 py-3.5 text-center text-base text-stone-700 transition-colors hover:border-green-300 hover:bg-green-50"
              >
                네
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleCrisisAnswer('skip')}
              className="mt-4 inline-block text-sm text-stone-900 underline-offset-2 hover:text-stone-600 hover:underline"
            >
              답변하지 않기
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3 text-center">
            <p className="font-serif text-[clamp(1.45rem,1.2rem+1vw,1.95rem)] font-semibold leading-tight text-stone-800">
              질문 하나만 더 드릴게요.
            </p>
            <p className="mx-auto max-w-[32rem] text-base leading-7 text-stone-600">
              해당되는 버튼을 모두 선택해 주세요.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setStep('crisis')
                setSelected(new Set())
              }}
              className="min-h-[44px] self-start rounded-lg px-2 py-1 text-sm text-stone-500 hover:bg-stone-100"
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
            className={`w-full rounded-xl px-4 py-4 text-base font-semibold transition-colors ${
              hasSelection
                ? 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900'
                : 'cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-400'
            }`}
          >
            이 상황에 맞는 상담 찾기
          </button>
        </>
      )}

    </div>
  )
}
