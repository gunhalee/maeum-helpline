'use client'

import { useSearchParams } from 'next/navigation'
import { normalizeLang } from '@/lib/i18n'

export default function FooterNote() {
  const searchParams = useSearchParams()
  const lang = normalizeLang(searchParams.get('lang'))

  return (
    <>
      <p>
        {lang === 'en'
          ? 'This page was created to introduce various urgent helplines in Korea.'
          : '본 페이지는 다양한 긴급상담 기관들을 소개하기 위해 제작되었습니다.'}
      </p>
      <p className="mt-1">
        {lang === 'en'
          ? 'We do not store any personal information.'
          : '어떤 개인정보도 저장하지 않습니다.'}
      </p>
      <p className="mt-1">helplinekorea@gmail.com</p>
    </>
  )
}
