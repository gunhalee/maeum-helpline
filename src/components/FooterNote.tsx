'use client'

import { usePathname } from 'next/navigation'
import { getLangFromPathname } from '@/lib/i18n'

export default function FooterNote() {
  const pathname = usePathname()
  const lang = getLangFromPathname(pathname)

  return (
    <>
      <p>
        {lang === 'en'
          ? 'This page introduces various urgent helplines in Korea.'
          : '본 페이지는 다양한 긴급상담 기관들을 소개합니다.'}
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
