import type { Lang } from '@/lib/i18n'

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
          ? 'Helpline Korea provides information about counseling agencies and public support resources, and may offer limited general guidance by email. This website and email responses do not replace professional counseling, diagnosis, treatment, legal advice, or emergency rescue services.'
          : 'Helpline Korea는 상담기관과 공공 지원 정보를 안내하며, 이메일로 제한적인 일반 정보 안내를 제공할 수 있습니다. 이 사이트와 이메일 답변은 전문 상담·진단·치료·법률 자문·긴급 구조를 대체하지 않습니다.'}
      </p>
      <p className="mt-1">helplinekorea@gmail.com</p>
    </>
  )
}
