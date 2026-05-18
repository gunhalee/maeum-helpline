import Link from 'next/link'
import { type Lang, withLang } from '@/lib/i18n'

interface Props {
  lang: Lang
}

export default function FooterNote({ lang }: Props) {
  return (
    <>
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
      <p className="mt-1">
        {lang === 'en'
          ? 'Report errors or contact us: helpline@gmail.com'
          : '오류 신고 · 문의하기 helpline@gmail.com'}
      </p>
      <p className="mt-1">
        <Link
          href={withLang('/notice', lang)}
          className="text-stone-700 underline-offset-2 transition-colors hover:text-green-700 hover:underline"
        >
          {lang === 'en' ? 'Usage guide & disclaimer' : '사용 안내 및 면책 고지'}
        </Link>
      </p>
    </>
  )
}
