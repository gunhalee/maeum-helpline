import type { Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

export interface EditorialItem {
  label: string
  text: string
}

type CategoryEditorial = {
  title?: string
  summary: EditorialItem[]
  detailsHeading: string
  paragraphs: EditorialItem[]
}

// Keep selection advice separate from the longer context and search metadata.
const CATEGORY_EDITORIAL: Record<Category, Record<Lang, CategoryEditorial>> = {
  crisis: {
    ko: {
      summary: [
        { label: '위기 상담', text: '109는 24시간 자살위기 상담을 제공합니다. 다른 사람을 위해 연락해도 됩니다.' },
        { label: '긴급 도움', text: '스스로를 안전하게 지키기 어렵거나 몸이 위험하면 119·112로 연락하세요.' },
      ],
      detailsHeading: '109 연결이 늦어질 때',
      paragraphs: [
        { label: '연결 대기', text: '연결이 늦어지면 기다릴 수 있습니다.' },
        { label: '안전이 위험할 때', text: '기다리는 동안 안전을 지키기 어렵다면 119나 112로 연락하세요.' },
      ],
    },
    en: {
      summary: [
        { label: 'Crisis counseling', text: '109 provides suicide crisis counseling 24/7. You can call for another person.' },
        { label: 'Urgent help', text: 'If you cannot keep yourself safe or are in physical danger, call 119 or 112.' },
      ],
      detailsHeading: 'If you cannot reach 109',
      paragraphs: [
        { label: 'Waiting', text: 'If the line is busy, you can wait.' },
        { label: 'If you are unsafe', text: 'If you cannot stay safe while waiting, call 119 or 112.' },
      ],
    },
  },
  depression: {
    ko: {
      summary: [
        { label: '처음 문의', text: '어디서 시작할지 모르겠다면 정신건강복지센터에 초기 상담을 문의하세요.' },
        { label: '바우처', text: '지원 대상에 해당하면 심리상담 8회를 지원합니다.' },
        { label: '신청 조건', text: '증빙서류가 필요합니다. 본인부담금은 소득 등에 따라 다릅니다.' },
      ],
      detailsHeading: '바우처 신청 요건과 비용',
      paragraphs: [
        { label: '사업 이름', text: '정신건강 심리상담 바우처사업의 이전 이름은 전국민 마음투자 지원사업입니다.' },
        { label: '지원 대상', text: '나이·소득에 따른 신청 제한은 없지만, 지원 대상 요건을 충족해야 합니다.' },
        { label: '증빙서류', text: '대상에 따라 의뢰서·소견서·건강검진 결과 등이 필요합니다.' },
        { label: '신청 절차', text: '초기 상담 문의와 바우처 신청은 절차가 다릅니다.' },
        { label: '신청 전 확인', text: '공식 사업 안내에서 필요한 서류와 본인부담금을 확인하세요.' },
        { label: '다른 서비스', text: '정신건강복지센터와 근로자지원프로그램도 이용할 수 있습니다. 비용과 이용 조건은 서비스마다 다릅니다.' },
      ],
    },
    en: {
      summary: [
        { label: 'First contact', text: 'If you do not know where to start, ask a community mental health center for an initial consultation.' },
        { label: 'Voucher', text: 'The counseling voucher covers 8 sessions for eligible applicants.' },
        { label: 'Requirements', text: 'Eligibility documents are required. Copayments vary by income and other qualifying circumstances.' },
      ],
      detailsHeading: 'Voucher eligibility and costs',
      paragraphs: [
        { label: 'Program name', text: 'The Mental Health Psychological Counseling Voucher Program was formerly called the National Mind Investment Support Program.' },
        { label: 'Eligibility', text: 'There is no age or income limit for applications, but you must meet the eligibility requirements.' },
        { label: 'Documents', text: 'Depending on your eligibility category, you may need a referral, medical opinion, or health screening result.' },
        { label: 'Application', text: 'An initial inquiry and a voucher application have different requirements.' },
        { label: 'Before applying', text: 'Check the official program guide for required documents and copayments.' },
        { label: 'Other services', text: 'Community mental health centers and employee assistance programs are other options. Costs and eligibility differ by service.' },
      ],
    },
  },
  women: {
    ko: {
      summary: [
        { label: '긴급 도움', text: '지금 안전이 위험하면 112로 연락하세요.' },
        { label: '24시간 상담', text: '통화가 안전한 시간에 1366으로 연락하세요.' },
        { label: '신고 전 상담', text: '폭력인지 확신이 없어도, 신고하지 않아도 상담부터 받을 수 있습니다.' },
      ],
      detailsHeading: '폭력 피해·디지털성범죄 지원',
      paragraphs: [
        { label: '상담 주제', text: '가정폭력·성폭력·스토킹·교제폭력 피해를 상담할 수 있습니다.' },
        { label: '지원 연결', text: '쉼터·법률·의료 지원도 연결받을 수 있습니다.' },
        { label: '디지털성범죄', text: '피해 상담과 삭제지원은 중앙디지털성범죄피해자지원센터(02-735-8994)에 문의하세요.' },
        { label: '직통전화 시간', text: '평일 08:00–22:00, 주말·공휴일 09:00–18:00에 운영합니다.' },
        { label: '운영시간 밖', text: '1366에서 피해 상담을 받을 수 있습니다.' },
      ],
    },
    en: {
      summary: [
        { label: 'Urgent help', text: 'For immediate danger, call 112.' },
        { label: '24/7 counseling', text: 'Call 1366 when it is safe to talk.' },
        { label: 'Before reporting', text: 'You can start counseling without making a report, even if you are unsure whether it is violence.' },
      ],
      detailsHeading: 'Violence and digital sexual abuse support',
      paragraphs: [
        { label: 'Counseling topics', text: 'Domestic violence, sexual violence, stalking, and dating violence.' },
        { label: 'Support referrals', text: 'Services can also connect you to shelter, legal, and medical support.' },
        { label: 'Digital sexual abuse', text: 'For counseling and takedown support, call the National Center for Digital Sexual Crime Response at 02-735-8994.' },
        { label: 'Direct line hours', text: 'Weekdays 08:00–22:00; weekends and public holidays 09:00–18:00, in Korea time.' },
        { label: 'Outside these hours', text: 'Call 1366 for victim counseling.' },
      ],
    },
  },
  youth: {
    ko: {
      summary: [
        { label: '전화·채팅', text: '1388에 전화하거나 카카오톡에서 ‘1388’을 검색하세요. 전화가 부담스러우면 채팅으로 시작해도 됩니다.' },
        { label: '비밀보장', text: '상담 내용은 기본적으로 비밀로 다룹니다.' },
        { label: '안전 위험 시', text: '급박한 안전 위험이 있으면 필요한 도움을 연결할 수 있습니다.' },
      ],
      detailsHeading: '쉼터 연결과 비밀보장',
      paragraphs: [
        { label: '쉼터 연결', text: '집이나 학교가 위험하면 청소년 쉼터로 연결받을 수 있습니다.' },
        { label: '도움 연결 안내', text: '안전을 위해 다른 도움을 연결해야 할 때 상담원은 가능한 범위에서 설명합니다.' },
      ],
    },
    en: {
      summary: [
        { label: 'Call or chat', text: 'Call 1388 or search for “1388” on KakaoTalk. If a call feels difficult, you can start with a chat.' },
        { label: 'Confidentiality', text: 'Counseling is normally confidential.' },
        { label: 'Safety risks', text: 'For an urgent safety risk, the counselor may connect you to other support.' },
      ],
      detailsHeading: 'Shelter and confidentiality',
      paragraphs: [
        { label: 'Shelter referral', text: 'If home or school is dangerous, the service can connect you to a youth shelter.' },
        { label: 'Referral information', text: 'If other support is needed for your safety, the counselor may explain what is happening as much as possible.' },
      ],
    },
  },
  queer: {
    ko: {
      summary: [
        { label: '기관 선택', text: '성소수자 친화를 명시했거나 관련 상담 경험이 있는 기관입니다. 지원 범위는 기관마다 다릅니다.' },
        { label: '처음 문의', text: '“성소수자 관련 상담이 가능한가요?”라고 물어보세요.' },
      ],
      detailsHeading: '전문 치료도 필요할 때',
      paragraphs: [
        { label: '함께 살필 증상', text: '커밍아웃·가족 갈등·차별 경험과 함께 나타나는 우울·불안·트라우마 증상.' },
        { label: '증상이 심할 때', text: '해당 증상의 전문 치료도 제공하는 기관을 선택하세요.' },
      ],
    },
    en: {
      summary: [
        { label: 'Choosing a service', text: 'These organizations describe their services as LGBTQ+ friendly or have LGBTQ+ counseling experience. Available support differs.' },
        { label: 'First contact', text: 'Ask whether the organization can help with LGBTQ+ concerns.' },
      ],
      detailsHeading: 'When you also need clinical treatment',
      paragraphs: [
        { label: 'Symptoms to consider', text: 'Depression, anxiety, or trauma symptoms alongside concerns about coming out, family conflict, or discrimination.' },
        { label: 'Severe symptoms', text: 'Choose an organization that also provides clinical treatment for those symptoms.' },
      ],
    },
  },
  migrant: {
    ko: {
      title: '이주민·외국인 상담',
      summary: [
        { label: '다국어 상담', text: '다누리콜센터 1577-1366은 15개 언어를 지원합니다. 필요한 언어부터 말해도 됩니다.' },
        { label: '출입국·비자', text: '1345에 문의하세요.' },
        { label: '고용·체류', text: '1577-0071에 문의하세요.' },
        { label: '연락 전 확인', text: '기관별 운영시간과 지원 언어를 확인하세요.' },
      ],
      detailsHeading: '운영시간과 야간 지원 언어',
      paragraphs: [
        { label: '1577-0071', text: '외국인력상담센터는 매일 09:00–18:00에 운영합니다.' },
        { label: '1345', text: '평일 09:00–22:00에 운영하며 공휴일은 쉽니다.' },
        { label: '1345 야간 언어', text: '18:00 이후에는 한국어·영어·중국어로 상담합니다.' },
        { label: '긴급 도움', text: '즉각적인 신체 위험이나 범죄 피해가 있으면 119·112에 신고하세요.' },
      ],
    },
    en: {
      title: 'Migrant support',
      summary: [
        { label: 'Language support', text: 'Danuri Call Center, 1577-1366, supports 15 languages. You can start by saying which language you need.' },
        { label: 'Immigration & visas', text: 'Call 1345.' },
        { label: 'Work & immigration', text: 'Call 1577-0071.' },
        { label: 'Before contacting', text: 'Check each service’s hours and languages.' },
      ],
      detailsHeading: 'Hours and evening language support',
      paragraphs: [
        { label: '1577-0071', text: 'The Counseling Center for Foreign Workers opens daily 09:00–18:00, in Korea time.' },
        { label: '1345', text: 'Weekdays 09:00–22:00, in Korea time. Closed on public holidays.' },
        { label: '1345 after 18:00', text: 'Counseling is available in Korean, English, and Chinese.' },
        { label: 'Urgent help', text: 'For immediate physical danger or a crime in progress, call 119 or 112.' },
      ],
    },
  },
  addiction: {
    ko: {
      summary: [
        { label: '기관 선택', text: '도박·알코올·약물·게임 등 문제 유형에 맞는 기관을 선택하세요.' },
        { label: '가족 상담', text: '본인이 아직 준비되지 않았더라도 가족이 먼저 상담해도 됩니다.' },
        { label: '다시 연락', text: '재발한 뒤에도 다시 연락할 수 있습니다.' },
      ],
      detailsHeading: '가족이 먼저 상담할 때',
      paragraphs: [],
    },
    en: {
      summary: [
        { label: 'Choosing a service', text: 'Choose a service for the problem: gambling, alcohol, drugs, or gaming.' },
        { label: 'Family counseling', text: 'Family members can start counseling even if the person is not ready.' },
        { label: 'Contacting again', text: 'You can contact the service again after a relapse.' },
      ],
      detailsHeading: 'When a family member calls first',
      paragraphs: [],
    },
  },
  elder: {
    ko: {
      summary: [
        { label: '학대·방임', text: '의심되면 1577-1389로 신고하세요. 익명으로 신고할 수 있습니다.' },
        { label: '대신 연락', text: '가족 외 이웃이나 관리인도 연락할 수 있습니다.' },
        { label: '돌봄 서비스', text: '129에 문의하세요.' },
      ],
      detailsHeading: '혼자 지내는 것이 걱정될 때',
      paragraphs: [
        { label: '돌봄 연결', text: '학대가 아니더라도 보건복지콜센터(129)에서 돌봄 서비스로 연결받을 수 있습니다.' },
        { label: '서비스 예시', text: '정기 방문·안부 전화·식사 배달 등이 있습니다.' },
      ],
    },
    en: {
      summary: [
        { label: 'Abuse or neglect', text: 'Report suspected abuse or neglect to 1577-1389. Reports can be anonymous.' },
        { label: 'Calling for others', text: 'Neighbors and building managers can also call.' },
        { label: 'Care services', text: 'Call 129.' },
      ],
      detailsHeading: 'If you are concerned about living alone',
      paragraphs: [
        { label: 'Care referrals', text: 'Even if there is no abuse, the Health and Welfare Call Center (129) can connect you to care services.' },
        { label: 'Service examples', text: 'Regular visits, welfare calls, and meal delivery.' },
      ],
    },
  },
  legal: {
    ko: {
      summary: [
        { label: '긴급 도움', text: '범죄가 진행 중이거나 지금 안전이 위험하면 112로 연락하세요.' },
        { label: '피해 회복', text: '급박한 위험이 지난 뒤에는 법률·의료·생계 지원을 문의할 수 있습니다.' },
        { label: '처음 문의', text: '어떤 지원을 받을 수 있는지 몰라도 괜찮습니다.' },
      ],
      detailsHeading: '피해 회복 지원을 문의할 때',
      paragraphs: [
        { label: '기관별 지원', text: '피해자지원센터·법률구조 기관·인권·피해자 지원 기관은 서로 다른 지원을 제공합니다.' },
        { label: '문의할 내용', text: '치료비·생계비·법률상담·수사기관 및 법정 동행 등을 문의할 수 있습니다.' },
        { label: '지원 범위', text: '상황과 필요에 따라 다릅니다.' },
        { label: '다음 절차', text: '겪은 일과 지금 필요한 일을 말하면 상담원과 다음 절차를 정리할 수 있습니다.' },
      ],
    },
    en: {
      summary: [
        { label: 'Urgent help', text: 'If a crime is happening now or you are in immediate danger, call 112.' },
        { label: 'Recovery support', text: 'After immediate danger has passed, ask about legal, medical, or living support.' },
        { label: 'First contact', text: 'You do not need to know what support you qualify for before calling.' },
      ],
      detailsHeading: 'Asking about recovery support',
      paragraphs: [
        { label: 'Service differences', text: 'Victim support centers, legal aid organizations, and human rights or victim support groups offer different services.' },
        { label: 'What to ask about', text: 'Medical or living expenses, legal counseling, or attendance at investigation and court procedures.' },
        { label: 'Available support', text: 'Support depends on your situation and needs.' },
        { label: 'Next steps', text: 'Describe what happened and what you need now. You and the counselor can discuss the next steps.' },
      ],
    },
  },
}

export function getCategoryEditorial(category: Category, lang: Lang): CategoryEditorial {
  return CATEGORY_EDITORIAL[category][lang]
}
