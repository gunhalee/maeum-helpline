import Link from 'next/link'
import { type Lang, withLang } from '@/lib/i18n'

interface Props {
  lang: Lang
}

export default function FooterNote({ lang }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="font-medium text-stone-700">Helpline Korea</p>
      <p>
        <Link
          href={withLang('/notice', lang)}
          className="inline-flex min-h-11 items-center rounded-lg px-2 text-stone-700 underline underline-offset-4 transition-colors hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          {lang === 'en' ? 'Usage guide and disclaimer' : '사용 안내 및 면책 고지'}
        </Link>
      </p>
      <p>
        <span>{lang === 'en' ? 'Contact: ' : '문의·오류 신고: '}</span>
        <a
          href="mailto:helpline@gmail.com"
          className="inline-flex min-h-11 items-center rounded-lg text-stone-700 underline underline-offset-4 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
        >
          helpline@gmail.com
        </a>
      </p>
    </div>
  )
}
