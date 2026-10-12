import type { Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type CategoryEditorial = {
  title?: string
  summary: string[]
  detailsHeading: string
  paragraphs: string[]
}

// Keep selection advice separate from the longer context and search metadata.
const CATEGORY_EDITORIAL: Record<Category, Record<Lang, CategoryEditorial>> = {
  crisis: {
    ko: {
      summary: [
        '109는 24시간 자살위기 상담을 제공합니다. 다른 사람을 위해 연락해도 됩니다.',
        '스스로를 안전하게 지키기 어렵거나 몸이 위험하면 119·112로 연락하세요.',
      ],
      detailsHeading: '109 연결이 늦어질 때',
      paragraphs: ['연결이 늦어지면 기다릴 수 있습니다. 기다리는 동안 안전을 지키기 어렵다면 119나 112로 연락하세요.'],
    },
    en: {
      summary: [
        '109 provides suicide crisis counseling 24/7. You can call for another person.',
        'If you cannot keep yourself safe or are in physical danger, call 119 or 112.',
      ],
      detailsHeading: 'If you cannot reach 109',
      paragraphs: ['If the line is busy, you can wait. If you cannot stay safe while waiting, call 119 or 112.'],
    },
  },
  depression: {
    ko: {
      summary: [
        '어디서 시작할지 모르겠다면 정신건강복지센터에 초기 상담을 문의하세요.',
        '심리상담 바우처는 대상 요건에 해당하면 8회를 지원합니다. 증빙서류가 필요하며, 본인부담금은 소득 등에 따라 다릅니다.',
      ],
      detailsHeading: '바우처 신청 요건과 비용',
      paragraphs: [
        '정신건강 심리상담 바우처사업의 이전 이름은 전국민 마음투자 지원사업입니다. 나이·소득에 따른 신청 제한은 없지만, 지원 대상 요건을 충족해야 합니다.',
        '대상에 따라 의뢰서·소견서·건강검진 결과 등의 증빙서류가 필요합니다. 초기 상담 문의와 바우처 신청은 절차가 다릅니다. 신청 전 공식 사업 안내에서 필요한 서류와 본인부담금을 확인하세요.',
        '정신건강복지센터와 근로자지원프로그램도 이용할 수 있습니다. 서비스마다 비용과 이용 조건은 다릅니다.',
      ],
    },
    en: {
      summary: [
        'If you do not know where to start, ask a community mental health center for an initial consultation.',
        'The counseling voucher covers 8 sessions for eligible applicants. Eligibility documents are required. Copayments vary by income and other qualifying circumstances.',
      ],
      detailsHeading: 'Voucher eligibility and costs',
      paragraphs: [
        'The Mental Health Psychological Counseling Voucher Program was formerly called the National Mind Investment Support Program. There is no age or income limit for applications, but you must meet the eligibility requirements.',
        'Required documents depend on your eligibility category. Examples include a referral, medical opinion, or health screening result. An initial inquiry and a voucher application have different requirements. Check the official program guide for documents and copayments before applying.',
        'Community mental health centers and employee assistance programs are other options. Costs and eligibility requirements differ by service.',
      ],
    },
  },
  women: {
    ko: {
      summary: [
        '지금 안전이 위험하면 112로 연락하세요. 상담은 통화가 안전한 시간에 1366으로 연락할 수 있습니다. 24시간 운영합니다.',
        '폭력인지 확신이 없어도, 신고하지 않아도 상담부터 받을 수 있습니다.',
      ],
      detailsHeading: '폭력 피해·디지털성범죄 지원',
      paragraphs: [
        '가정폭력, 성폭력, 스토킹, 교제폭력 피해에 대해 상담할 수 있습니다. 쉼터·법률·의료 지원도 연결받을 수 있습니다.',
        '디지털성범죄 피해 상담과 삭제지원은 중앙디지털성범죄피해자지원센터(02-735-8994)에 문의하세요. 직통전화는 평일 08:00–22:00, 주말·공휴일 09:00–18:00에 운영합니다. 운영시간 밖에도 1366에서 피해 상담을 받을 수 있습니다.',
      ],
    },
    en: {
      summary: [
        'For immediate danger, call 112. For counseling, call 1366 when it is safe to talk. The line is open 24/7.',
        'You can start counseling without making a report, even if you are unsure whether it is violence.',
      ],
      detailsHeading: 'Violence and digital sexual abuse support',
      paragraphs: [
        'Counseling covers domestic violence, sexual violence, stalking, and dating violence. Services can also connect you to shelter, legal, and medical support.',
        'For digital sexual abuse counseling and takedown support, call the National Center for Digital Sexual Crime Response at 02-735-8994. The direct line opens 08:00–22:00 on weekdays and 09:00–18:00 on weekends and public holidays, in Korea time. Outside these hours, you can call 1366 for victim counseling.',
      ],
    },
  },
  youth: {
    ko: {
      summary: [
        '1388에 전화하거나 카카오톡에서 ‘1388’을 검색하세요. 전화가 부담스러우면 채팅으로 시작해도 됩니다.',
        '상담 내용은 기본적으로 비밀로 다룹니다. 다만 급박한 안전 위험이 있으면 필요한 도움을 연결할 수 있습니다.',
      ],
      detailsHeading: '쉼터 연결과 비밀보장',
      paragraphs: [
        '집이나 학교가 위험하면 청소년 쉼터로 연결받을 수 있습니다.',
        '안전을 위해 다른 도움을 연결해야 할 때 상담원은 가능한 범위에서 설명합니다.',
      ],
    },
    en: {
      summary: [
        'Call 1388 or search for “1388” on KakaoTalk. If a call feels difficult, you can start with a chat.',
        'Counseling is normally confidential. For an urgent safety risk, the counselor may connect you to other support.',
      ],
      detailsHeading: 'Shelter and confidentiality',
      paragraphs: [
        'If home or school is dangerous, the service can connect you to a youth shelter.',
        'If other support is needed for your safety, the counselor may explain what is happening as much as possible.',
      ],
    },
  },
  queer: {
    ko: {
      summary: [
        '성소수자 친화를 명시했거나 관련 상담 경험이 있는 기관입니다. 기관마다 지원 범위는 다릅니다.',
        '첫 연락에서 “성소수자 관련 상담이 가능한가요?”라고 물어보세요.',
      ],
      detailsHeading: '전문 치료도 필요할 때',
      paragraphs: ['커밍아웃, 가족 갈등, 차별 경험과 함께 우울·불안·트라우마 증상이 심하다면, 해당 증상의 전문 치료도 제공하는 기관을 선택하세요.'],
    },
    en: {
      summary: [
        'These organizations describe their services as LGBTQ+ friendly or have LGBTQ+ counseling experience. Available support differs.',
        'On your first contact, ask whether the organization can help with LGBTQ+ concerns.',
      ],
      detailsHeading: 'When you also need clinical treatment',
      paragraphs: ['If you have severe depression, anxiety, or trauma symptoms as well as concerns about coming out, family conflict, or discrimination, choose an organization that also provides clinical treatment for those symptoms.'],
    },
  },
  migrant: {
    ko: {
      title: '이주민·외국인 상담',
      summary: [
        '다누리콜센터 1577-1366은 15개 언어를 지원합니다. 필요한 언어부터 말해도 됩니다.',
        '출입국·비자는 1345, 고용·체류는 1577-0071에 문의하세요. 기관별 운영시간과 지원 언어를 확인하세요.',
      ],
      detailsHeading: '운영시간과 야간 지원 언어',
      paragraphs: [
        '외국인력상담센터(1577-0071)는 매일 09:00–18:00에 운영합니다.',
        '1345는 평일 09:00–22:00에 운영하며 공휴일은 쉽니다. 18:00 이후에는 한국어·영어·중국어로 상담합니다.',
        '즉각적인 신체 위험이나 범죄 피해가 있으면 119·112에 신고하세요.',
      ],
    },
    en: {
      title: 'Migrant support',
      summary: [
        'Danuri Call Center, 1577-1366, supports 15 languages. You can start by saying which language you need.',
        'For immigration or visas, call 1345. For employment and immigration advice, call 1577-0071. Check each service’s hours and languages.',
      ],
      detailsHeading: 'Hours and evening language support',
      paragraphs: [
        'The Counseling Center for Foreign Workers (1577-0071) opens daily from 09:00 to 18:00, in Korea time.',
        '1345 opens on weekdays from 09:00 to 22:00, in Korea time, and closes on public holidays. After 18:00, it supports Korean, English, and Chinese.',
        'For immediate physical danger or a crime in progress, call 119 or 112.',
      ],
    },
  },
  addiction: {
    ko: {
      summary: [
        '도박·알코올·약물·게임 등 문제 유형에 맞는 기관을 선택하세요.',
        '본인이 아직 준비되지 않았더라도 가족이 먼저 상담해도 됩니다. 재발한 뒤에도 다시 연락할 수 있습니다.',
      ],
      detailsHeading: '가족이 먼저 상담할 때',
      paragraphs: [],
    },
    en: {
      summary: [
        'Choose a service for the problem: gambling, alcohol, drugs, or gaming.',
        'Family members can start counseling even if the person is not ready. You can contact the service again after a relapse.',
      ],
      detailsHeading: 'When a family member calls first',
      paragraphs: [],
    },
  },
  elder: {
    ko: {
      summary: [
        '학대·방임이 의심되면 1577-1389로 신고하세요. 익명으로 신고할 수 있으며, 가족 외 이웃이나 관리인도 연락할 수 있습니다.',
        '돌봄 서비스가 필요하면 129에 문의하세요.',
      ],
      detailsHeading: '혼자 지내는 것이 걱정될 때',
      paragraphs: ['학대가 아니더라도 보건복지콜센터(129)에서 돌봄 서비스로 연결받을 수 있습니다. 정기 방문, 안부 전화, 식사 배달 등의 서비스가 있습니다.'],
    },
    en: {
      summary: [
        'Report suspected abuse or neglect to 1577-1389. Reports can be anonymous. Neighbors and building managers can also call.',
        'For care services, call 129.',
      ],
      detailsHeading: 'If you are concerned about living alone',
      paragraphs: ['Even if there is no abuse, the Health and Welfare Call Center (129) can connect you to care services. These include regular visits, welfare calls, and meal delivery.'],
    },
  },
  legal: {
    ko: {
      summary: [
        '범죄가 진행 중이거나 지금 안전이 위험하면 112로 연락하세요.',
        '급박한 위험이 지난 뒤에는 법률·의료·생계 등 회복 지원을 문의할 수 있습니다. 어떤 지원을 받을 수 있는지 몰라도 괜찮습니다.',
      ],
      detailsHeading: '피해 회복 지원을 문의할 때',
      paragraphs: [
        '피해자지원센터, 법률구조 기관, 인권·피해자 지원 기관은 서로 다른 지원을 제공합니다. 치료비, 생계비, 법률상담, 수사기관·법정 동행 등을 문의할 수 있습니다.',
        '지원 범위는 상황과 필요에 따라 다릅니다. 겪은 일과 지금 필요한 일을 말하면 상담원과 다음 절차를 정리할 수 있습니다.',
      ],
    },
    en: {
      summary: [
        'If a crime is happening now or you are in immediate danger, call 112.',
        'After immediate danger has passed, ask about legal, medical, or living support. You do not need to know what support you qualify for before calling.',
      ],
      detailsHeading: 'Asking about recovery support',
      paragraphs: [
        'Victim support centers, legal aid organizations, and human rights or victim support groups offer different services. Ask about medical or living expenses, legal counseling, or attendance at investigation and court procedures.',
        'Available support depends on your situation and needs. Describe what happened and what you need now. You and the counselor can discuss the next steps.',
      ],
    },
  },
}

export function getCategoryEditorial(category: Category, lang: Lang): CategoryEditorial {
  return CATEGORY_EDITORIAL[category][lang]
}
