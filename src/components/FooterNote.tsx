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
          ? 'Helpline Korea provides information about counseling agencies and public support resources.'
          : 'Helpline Korea는 상담기관과 공공 지원 정보를 안내합니다.'}
      </p>
      <p className="mt-1">
        <Link
          href={withLang('/notice', lang)}
          className="text-stone-700 underline-offset-2 transition-colors hover:text-green-700 hover:underline"
        >
          {lang === 'en' ? 'Usage guide & disclaimer' : '사용 안내 및 면책 고지'}
        </Link>
        <span className="mx-2 text-stone-400">·</span>
        {lang === 'en'
          ? 'Report errors or contact us: helpline@gmail.com'
          : '오류 신고 · 문의하기 helpline@gmail.com'}
      </p>
    </>
  )
}
