import type { Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type CategoryEditorial = {
  heading: string
  paragraphs: string[]
  highlights: string[]
}


const CATEGORY_EDITORIAL: Record<Category, Record<Lang, CategoryEditorial>> = {
  crisis: {
    ko: {
      heading: '109로 시작할 수 있어요',
      paragraphs: [
        '연결이 늦어지면 기다리거나 119로 연락할 수 있습니다. 스스로를 안전하게 지키기 어렵거나 몸이 위험하면 119나 112가 더 빠른 도움이 될 수 있습니다.',
        '자살 위기나 극심한 불안이 있을 때 연락할 기관을 안내합니다. 전화번호, 운영시간, 연락 방법을 비교할 수 있습니다.',
      ],
      highlights: ['109 — 24시간', '신체 위험 시 119·112 우선', '다른 사람을 위한 신고도 가능'],
    },
    en: {
      heading: 'You can start with 109',
      paragraphs: [
        'If the line is busy, you can wait or call 119. If you cannot keep yourself safe or are in physical danger, 119 or 112 may help faster.',
        'This page lists organizations for a suicidal crisis or severe distress. Compare phone numbers, hours, and contact methods.',
      ],
      highlights: ['109 — 24/7', 'Use 119 or 112 for physical danger', 'You can call for another person'],
    },
  },
  depression: {
    ko: {
      heading: '무료·저비용 심리상담 기관 비교',
      paragraphs: [
        '정신건강복지센터의 초기 상담, 정신건강 심리상담 바우처사업(구 전국민 마음투자 지원사업), 근로자지원프로그램을 비교할 수 있습니다. 각 서비스의 비용과 이용 조건은 다릅니다.',
        '정신건강 심리상담 바우처사업은 대상 요건에 해당하면 전문 심리상담 8회를 지원합니다. 나이·소득에 따른 신청 제한은 없습니다. 대상에 따라 의뢰서·소견서·건강검진 결과 등의 증빙서류가 필요합니다. 소득 등에 따라 본인부담금이 달라집니다.',
        '초기 상담 문의와 바우처 신청은 절차가 다릅니다. 필요한 서류와 비용은 공식 사업 안내에서 확인하세요. 어디서 시작할지 모르겠다면 정신건강복지센터에 먼저 문의할 수 있습니다.',
      ],
      highlights: ['정신건강복지센터 — 초기 상담', '바우처 — 8회, 대상 증빙 필요', '본인부담금 확인'],
    },
    en: {
      heading: 'Compare free and low-cost counseling options',
      paragraphs: [
        'You can compare initial consultations at community mental health centers and employee assistance programs. You can also compare the Mental Health Psychological Counseling Voucher Program (formerly the National Mind Investment Support Program). Costs and eligibility requirements differ.',
        'The voucher program provides 8 professional counseling sessions for eligible applicants. There is no age or income limit for applications. You need documents for your eligibility category, such as a referral, medical opinion, or health screening result. Copayments vary by income and other qualifying circumstances.',
        'An initial inquiry and a voucher application have different requirements. Check the official program guide for required documents and costs. If you do not know where to start, contact a community mental health center.',
      ],
      highlights: ['Mental health centers — initial consultation', 'Voucher — 8 sessions, eligibility documents required', 'Check copayments'],
    },
  },
  women: {
    ko: {
      heading: '지금 안전이 걱정되면 112가 더 빠를 수 있어요',
      paragraphs: [
        '폭력이나 통제가 반복되지만 지금 당장 급박한 상황은 아닌가요? 통화가 안전한 시간에 1366으로 연락할 수 있습니다. 신고 없이 상담만 먼저 받을 수도 있습니다.',
        '가정폭력, 성폭력, 스토킹, 교제폭력 상황에서 연락할 기관을 안내합니다. 폭력인지 확신이 없어도 상담을 시작할 수 있습니다. 몸의 안전이 걱정되거나 상대가 무서울 때도 상담할 수 있습니다.',
        '디지털성범죄 피해 상담이나 삭제지원은 중앙디지털성범죄피해자지원센터(02-735-8994)에 문의할 수 있습니다. 직통전화는 평일 08:00–22:00, 주말·공휴일 09:00–18:00에 운영합니다. 24시간 피해 상담은 여성긴급전화 1366에서 받을 수 있습니다.',
      ],
      highlights: ['1366 — 24시간', '신고 없이 상담만 가능', '쉼터·법률·의료 연계'],
    },
    en: {
      heading: 'If immediate safety is at risk, 112 may be faster',
      paragraphs: [
        'If violence continues but is not happening now, call 1366 when it is safe to talk. You can receive counseling without a report.',
        'This page lists organizations for domestic violence, sexual violence, stalking, and dating violence. You do not need to be sure that it is violence. If you feel unsafe or afraid, you can start with counseling.',
        'The National Center for Digital Sexual Crime Response provides digital sexual abuse counseling and takedown support. Call 02-735-8994. Its direct line operates 08:00–22:00 on weekdays and 09:00–18:00 on weekends and public holidays. All times are Korea time. For 24-hour victim counseling, call Women Emergency Hotline 1366.',
      ],
      highlights: ['1366 — 24/7', 'Counseling without a report is available', 'Shelter, legal, and medical referrals'],
    },
  },
  youth: {
    ko: {
      heading: '1388에 전화하거나 카카오톡으로 채팅하세요',
      paragraphs: [
        '전화가 부담스러우면 카카오톡에서 \'1388\'을 검색하세요. 채팅으로 상담을 시작할 수 있습니다. 집이나 학교가 위험하면 청소년 쉼터로 연결받을 수도 있습니다.',
        '상담원은 상담 내용을 기본적으로 비밀로 다룹니다. 안전을 위해 꼭 필요한 경우에는 도움을 연결할 수 있습니다. 이때 가능한 범위에서 설명합니다.',
      ],
      highlights: ['1388 — 전화·카카오톡', '청소년 쉼터 연결 가능', '기본 비밀보장, 급박 시 예외'],
    },
    en: {
      heading: 'Call 1388 or start a chat on KakaoTalk',
      paragraphs: [
        'If a call feels difficult, search for \'1388\' on KakaoTalk. You can start with a text message. If home or school is dangerous, the service can connect you to a youth shelter.',
        'The counselor normally keeps counseling details confidential. If you urgently need help to stay safe, the counselor may connect you to other support. The counselor may explain what is happening as much as possible.',
      ],
      highlights: ['1388 — phone and KakaoTalk', 'Youth shelter available', 'Confidential by default; urgent safety exception'],
    },
  },
  queer: {
    ko: {
      heading: '성소수자 친화 상담 기관 비교',
      paragraphs: [
        '퀴어 친화를 명시했거나 성소수자 상담 경험이 있는 기관을 안내합니다. 기관마다 상담 경험과 지원 수준은 다릅니다. 시간을 아끼려면 첫 통화에서 \'성소수자 관련 상담이 가능한가요?\'라고 물어보세요.',
        '커밍아웃, 가족 갈등, 차별 경험과 함께 우울·불안·트라우마 증상이 심한가요? 이 경우에는 해당 증상의 전문 치료도 제공하는 기관을 선택하세요.',
      ],
      highlights: ['퀴어 친화 명시 기관', '첫 통화에서 친화 여부 확인 권장'],
    },
    en: {
      heading: 'Compare LGBTQ+ friendly counseling services',
      paragraphs: [
        'This page lists organizations that describe their services as LGBTQ+ friendly or have LGBTQ+ counseling experience. Their experience and support differ. On your first call, ask whether the organization can help with your situation. This can save time.',
        'Do you have severe depression, anxiety, or trauma symptoms as well as concerns about coming out, family conflict, or discrimination? In this case, choose an organization that also provides clinical treatment for those symptoms.',
      ],
      highlights: ['LGBTQ+ friendly services listed', 'Ask about LGBTQ+ experience on first call'],
    },
  },
  migrant: {
    ko: {
      heading: '가능한 언어부터 확인하세요',
      paragraphs: [
        '다누리콜센터(1577-1366)는 15개 언어를 지원합니다. 외국인력상담센터(1577-0071)는 매일 09:00–18:00에 고용·체류 상담을 제공합니다. 출입국·비자는 1345로 문의할 수 있습니다. 평일 09:00–22:00에 운영하며 공휴일은 쉽니다. 18:00 이후에는 한국어·영어·중국어로 상담합니다. 즉각적인 신체 위험이나 범죄 피해가 있으면 119·112에 신고하세요.',
        '다국어 상담과 이주민 전용 상담전화를 비교할 수 있습니다. 노동, 가정폭력, 유학 등 상황에 맞는 기관도 비교할 수 있습니다.',
      ],
      highlights: ['다누리 1577-1366 — 15개 언어', '1345 — 평일 09:00~22:00', '노동·가정폭력·유학 상황별 안내'],
    },
    en: {
      heading: 'First, check the available languages',
      paragraphs: [
        'Danuri Call Center (1577-1366) offers 15 languages. The Counseling Center for Foreign Workers (1577-0071) provides employment and immigration advice daily from 09:00 to 18:00. For immigration and visa questions, call 1345 on weekdays from 09:00 to 22:00. The service closes on public holidays. After 18:00, the service supports Korean, English, and Chinese. All times are Korea time. For immediate physical danger or a crime in progress, call 119 or 112.',
        'This page compares available languages and helplines for migrants. Compare services for labor problems, domestic violence, or isolation as a student.',
      ],
      highlights: ['Danuri 1577-1366 — 15 languages', '1345 — weekdays 09:00–22:00 KST', 'By situation: labor, violence, students'],
    },
  },
  addiction: {
    ko: {
      heading: '문제 유형별 중독 상담 기관 비교',
      paragraphs: [
        '도박, 알코올, 약물, 게임 등 문제 유형에 따라 더 적합한 기관이 다릅니다. 본인이 아직 준비되지 않았더라도 가족이 먼저 상담을 시작할 수 있습니다.',
        '재발한 뒤에도 다시 상담받을 수 있습니다. 다시 연락해도 됩니다.',
      ],
      highlights: ['도박·알코올·약물·게임 유형별', '가족 먼저 상담 가능', '재발 후 재연결 가능'],
    },
    en: {
      heading: 'Compare addiction services by problem type',
      paragraphs: [
        'The right organization depends on the problem: gambling, alcohol, drugs, or gaming. Family members can start counseling even if the person is not ready.',
        'After a relapse, you can contact the service again. You can start again.',
      ],
      highlights: ['By type: gambling, alcohol, drugs, gaming', 'Family can start first', 'You can return after a relapse'],
    },
  },
  elder: {
    ko: {
      heading: '학대·방임 신고와 돌봄 서비스 연결',
      paragraphs: [
        '학대나 방임이 의심되면 노인보호전문기관(1577-1389)에 신고할 수 있습니다. 익명으로 신고할 수 있습니다. 가족이 아닌 이웃이나 관리인도 신고할 수 있습니다.',
        '학대는 아니지만 혼자 사는 것이 걱정되나요? 보건복지콜센터(129)에서 돌봄 서비스로 연결받을 수 있습니다. 정기 방문, 안부 전화, 식사 배달 등의 서비스가 있습니다.',
      ],
      highlights: ['1577-1389 — 학대·방임 신고, 익명 가능', '129 — 돌봄 서비스 연결', '가족 외 이웃·관리인도 요청 가능'],
    },
    en: {
      heading: 'Report abuse or find care services',
      paragraphs: [
        'If you suspect abuse or neglect, report it to the Elder Protection Agency (1577-1389). You can make an anonymous report. Family members, neighbors, and building managers can report abuse.',
        'Are you concerned about isolation, even if there is no abuse? The Health and Welfare Call Center (129) can connect you to care services. These include regular visits, welfare calls, and meal delivery.',
      ],
      highlights: ['1577-1389 — abuse reports; anonymous reports accepted', '129 — care service connection', 'Neighbors and people outside the family can ask for help'],
    },
  },
  legal: {
    ko: {
      heading: '지금 안전이 걱정되면 112가 더 빠를 수 있어요',
      paragraphs: [
        '범죄가 지금 진행 중이거나 관련자가 가까이 있어 안전이 걱정되나요? 이 경우에는 112가 더 빠른 도움이 될 수 있습니다. 신고 이후나 급박한 상황이 지난 뒤에는 아래 기관에서 회복 지원을 찾을 수 있습니다. 치료비, 생계비, 법률상담, 수사기관·법정 동행 등을 문의할 수 있습니다.',
        '범죄피해자지원센터, 법률구조 기관, 인권·피해자 지원 기관은 서로 다른 지원을 제공합니다. 상황과 필요한 지원에 따라 연결할 수 있는 내용도 다릅니다. 어떤 지원을 받을 수 있는지 몰라도 문의할 수 있습니다. 겪은 일과 지금 필요한 일을 말하면 다음 절차를 함께 정리할 수 있습니다.',
      ],
      highlights: ['112 — 현재 위험·신고 우선', '피해자지원센터 — 회복 지원 연결', '법률·의료·생계 지원 확인'],
    },
    en: {
      heading: 'If immediate safety is at risk, 112 may be faster',
      paragraphs: [
        'Is a crime happening now? Is someone involved nearby, and do you feel unsafe? In these situations, 112 may help faster. The organizations on this page are most useful after a report or after immediate danger has passed. They can help with medical or living expenses, legal counseling, or attendance at investigation and court procedures.',
        'Victim support centers, legal aid organizations, and human rights or victim support groups provide different services. Available support depends on your situation and needs. You do not need to know exactly what support you qualify for before you call. Describe the situation and what you need now. You and the counselor can then discuss the next steps.',
      ],
      highlights: ['112 — current danger or reporting first', 'Victim support centers — recovery support', 'Check legal, medical, and living support'],
    },
  },
}


export function getCategoryEditorial(category: Category, lang: Lang): CategoryEditorial {
  return CATEGORY_EDITORIAL[category][lang]
}
