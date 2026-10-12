'use client'

import { useEffect, useRef, useState } from 'react'
import { translateSelectionLabel, type Lang } from '@/lib/i18n'

export type CrisisAnswer = 'yes' | 'no' | 'skip'

interface Props {
  lang: Lang
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
  '술·도박·약물',
] as const

export default function SelectionScreen({ lang, onSubmit }: Props) {
  const [step, setStep] = useState<'crisis' | 'situation'>('crisis')
  const [crisisAnswer, setCrisisAnswer] = useState<CrisisAnswer>('no')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)

  useEffect(() => {
    if (previousStep.current === step) return
    previousStep.current = step

    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true })
      headingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    })

    return () => cancelAnimationFrame(frame)
  }, [step])

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
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const hasSelection = selected.size > 0

  const btnClass = (label: string) => {
    const active = selected.has(label)

    if (active) return 'min-h-[44px] min-w-0 break-words rounded-md border px-3.5 py-2.5 text-sm leading-6 transition-colors border-green-700 bg-green-50 text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2'

    return 'min-h-[44px] min-w-0 break-words rounded-md border px-3.5 py-2.5 text-sm leading-6 transition-colors border-stone-300 text-stone-700 hover:border-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2'
  }

  return (
    <div className="flex flex-col gap-6">
      {step === 'crisis' ? (
        <>
          <div className="space-y-5 text-center">
            <h2 ref={headingRef} data-flow-heading tabIndex={-1} className="scroll-target text-xl font-semibold leading-relaxed text-stone-800 focus:outline-none">
              {lang === 'en'
                ? 'Are you worried that you cannot keep yourself safe right now?'
                : '지금 혼자 버티기 어렵거나 스스로를 해칠까 걱정되나요?'}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCrisisAnswer('no')}
                className="min-h-[50px] flex-1 rounded-md border border-stone-300 px-4 py-3.5 text-center text-base text-stone-700 transition-colors hover:border-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                {lang === 'en' ? 'No' : '아니오'}
              </button>
              <button
                type="button"
                onClick={() => handleCrisisAnswer('yes')}
                className="min-h-[50px] flex-1 rounded-md border border-green-700 px-4 py-3.5 text-center text-base font-semibold text-green-800 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
              >
                {lang === 'en' ? 'Yes' : '네'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleCrisisAnswer('skip')}
              className="inline-flex min-h-[44px] items-center justify-center px-4 text-sm text-stone-700 underline underline-offset-4 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              {lang === 'en' ? 'Skip this question' : '답변하지 않기'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3 text-center">
            <h2 ref={headingRef} data-flow-heading tabIndex={-1} className="scroll-target text-xl font-semibold leading-relaxed text-stone-800 focus:outline-none">
              {lang === 'en' ? 'What kind of support do you need?' : '어떤 도움이 필요한가요?'}
            </h2>
            <p className="mx-auto max-w-[32rem] text-base leading-7 text-stone-600">
              {lang === 'en'
                ? 'Select all options that apply to you.'
                : '해당되는 버튼을 모두 선택해 주세요.'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setStep('crisis')
                setSelected(new Set())
              }}
              className="flex min-h-[44px] items-center gap-1 self-start text-base text-stone-500 transition-colors hover:text-stone-700"
            >
              {lang === 'en' ? '← Back' : '← 이전으로'}
            </button>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,max(11rem,calc((100%_-_0.5rem)/2))),1fr))] gap-2">
              {SITUATION_BUTTONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleSelection(label)}
                  aria-pressed={selected.has(label)}
                  className={btnClass(label)}
                >
                  {translateSelectionLabel(label, lang)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSubmit([...selected], crisisAnswer)}
            disabled={!hasSelection}
            className={`w-full rounded-md px-4 py-4 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 ${
              hasSelection
                ? 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900'
                : 'cursor-not-allowed border border-stone-200 bg-stone-100 text-stone-400'
            }`}
          >
            {lang === 'en'
              ? 'Find Support'
              : '이 상황에 맞는 상담 찾기'}
          </button>
        </>
      )}

    </div>
  )
}
