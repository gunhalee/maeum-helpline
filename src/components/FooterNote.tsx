import Link from 'next/link'
import { type Lang, withLang } from '@/lib/i18n'

interface Props {
  lang: Lang
}

export default function FooterNote({ lang }: Props) {
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
      <p className="mt-1">
        {lang === 'en'
          ? 'Helpline Korea provides information about counseling agencies and public support resources, and may offer limited general guidance by email.'
          : 'Helpline Korea는 상담기관과 공공 지원 정보를 안내하며, 이메일로 제한적인 일반 정보 안내를 제공할 수 있습니다.'}
      </p>
      <p className="mt-1">
        {lang === 'en'
          ? 'This website and email responses do not replace professional counseling, diagnosis, treatment, legal advice, or emergency rescue services.'
          : '이 사이트와 이메일 답변은 전문 상담·진단·치료·법률 자문·긴급 구조를 대체하지 않습니다.'}
      </p>
      <p className="mt-2">
        <Link
          href={withLang('/notice', lang)}
          className="inline-flex items-center rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
        >
          {lang === 'en' ? 'Usage guide & disclaimer' : '사용 안내 및 면책 고지'}
        </Link>
      </p>
      <p className="mt-1">helplinekorea@gmail.com</p>
    </>
  )
}
