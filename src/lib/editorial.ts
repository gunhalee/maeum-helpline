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
        '연결이 지연되면 기다리거나 119로 바꿀 수 있습니다. 스스로를 안전하게 지키기 어렵거나 신체 위험이 있으면 119나 112가 더 빠른 도움이 될 수 있습니다.',
        '이 페이지는 자살 위기, 극심한 불안 상황에서 연결할 수 있는 기관 목록입니다. 전화번호, 운영시간, 연결 방식을 비교할 수 있습니다.',
      ],
      highlights: ['109 — 24시간', '신체 위험 시 119·112 우선', '제3자 신고 가능'],
    },
    en: {
      heading: 'You can start with 109',
      paragraphs: [
        'If the line is busy, you can stay on hold or switch to 119. If it is hard to stay safe with yourself or there is physical danger, 119 or 112 may be faster help.',
        'This page lists organizations you can reach during a suicidal crisis or acute distress. Compare phone numbers, hours, and connection methods.',
      ],
      highlights: ['109 — 24/7', 'Use 119 or 112 for physical danger', 'Third-party calls accepted'],
    },
  },
  depression: {
    ko: {
      heading: '무료·저비용 심리상담 기관 비교',
      paragraphs: [
        '정신건강복지센터(무료), 심리상담 바우처(8회, 소득 무관), 근로자지원프로그램(직장인, 7회) 등 비용과 접근 방식이 다른 경로를 한 페이지에서 비교할 수 있습니다.',
        '대부분의 기관은 진단서나 의뢰서 없이 전화 한 통으로 초기 상담을 시작할 수 있습니다. "이 정도로 상담받아도 되나" 싶을 때가 연결하기 가장 쉬운 시점입니다.',
      ],
      highlights: ['정신건강복지센터 — 무료', '바우처 — 8회, 소득 무관', '진단서 없이 시작 가능'],
    },
    en: {
      heading: 'Compare free and low-cost counseling options',
      paragraphs: [
        'This page compares routes with different costs and access methods: community mental health centers (free), counseling vouchers (8 sessions, no income limit), and employee assistance programs (7 sessions for workers).',
        'Most services can be started with a single phone call and no diagnosis or referral. If you are wondering whether your situation is "bad enough," that is usually the easiest moment to connect.',
      ],
      highlights: ['Mental health centers — free', 'Voucher — 8 sessions, no income limit', 'No diagnosis needed to start'],
    },
  },
  women: {
    ko: {
      heading: '지금 안전이 걱정되면 112가 더 빠를 수 있어요',
      paragraphs: [
        '반복되는 폭력이나 통제가 있지만 지금 당장 급박한 상황은 아니라면, 통화가 안전한 시간에 1366으로 시작할 수 있습니다. 신고 없이 상담만 먼저 받는 것도 가능합니다.',
        '이 페이지는 가정폭력, 성폭력, 스토킹, 데이트폭력 상황에서 연결할 수 있는 기관을 모아 둔 목록입니다. "폭력"이라는 단어가 맞는지 확신이 없어도, 몸의 안전이 걱정되거나 상대가 무섭다면 상담을 시작할 수 있습니다.',
      ],
      highlights: ['1366 — 24시간', '신고 없이 상담만 가능', '쉼터·법률·의료 연계'],
    },
    en: {
      heading: 'If immediate safety is at risk, 112 may be faster',
      paragraphs: [
        'If the violence is ongoing but not happening right now, call 1366 when it is safe to talk. Counseling without filing a report is available.',
        'This page lists organizations for domestic violence, sexual violence, stalking, and dating abuse. You do not need to be certain the word "violence" applies. If your safety is at risk or you feel afraid, you can start with counseling.',
      ],
      highlights: ['1366 — 24/7', 'Counseling without report OK', 'Shelter, legal, and medical referrals'],
    },
  },
  youth: {
    ko: {
      heading: '1388에 전화하거나 카카오톡으로 채팅하세요',
      paragraphs: [
        '전화가 부담스러우면 카카오톡에서 "1388"을 검색해 채팅으로 시작할 수 있습니다. 집이나 학교가 위험하면 청소년 쉼터 연결도 가능합니다.',
        '상담 내용은 기본적으로 비밀이 보장됩니다. 안전을 위해 꼭 필요한 경우에는 가능한 범위에서 설명하고 도움을 연결할 수 있습니다.',
      ],
      highlights: ['1388 — 전화·카카오톡', '청소년 쉼터 연결 가능', '기본 비밀보장, 급박 시 예외'],
    },
    en: {
      heading: 'Call 1388 or start a chat on KakaoTalk',
      paragraphs: [
        'If calling feels like too much, search "1388" on KakaoTalk and start with a text message. If home or school is dangerous, youth shelter connection is available.',
        'Counseling is confidential by default. If safety support is urgently needed, the counselor may explain what is happening as much as possible and connect help.',
      ],
      highlights: ['1388 — phone and KakaoTalk', 'Youth shelter available', 'Confidential by default; urgent safety exception'],
    },
  },
  queer: {
    ko: {
      heading: '성소수자 친화 상담 기관 비교',
      paragraphs: [
        '이 페이지는 퀴어 친화를 명시했거나 성소수자 상담 경험이 있는 기관을 모았습니다. 모든 곳이 동일한 수준은 아니므로, 첫 통화에서 "성소수자 관련 상담이 가능한지" 직접 물어보는 것이 시간을 아끼는 방법입니다.',
        '커밍아웃, 가족 갈등, 차별 경험뿐 아니라 우울·불안·트라우마 증상이 심하다면 증상 자체에 대한 전문 치료를 함께 제공하는 기관을 선택하세요.',
      ],
      highlights: ['퀴어 친화 명시 기관', '첫 통화에서 친화 여부 확인 권장'],
    },
    en: {
      heading: 'Compare queer-affirming counseling services',
      paragraphs: [
        'This page gathers organizations that have stated queer-affirming practices or have LGBTQ+ counseling experience. Since not all are at the same level, asking on the first call whether they can support your situation saves time.',
        'Beyond coming out, family conflict, and discrimination, if depression, anxiety, or trauma symptoms are severe, choose an organization that also offers clinical treatment for those conditions.',
      ],
      highlights: ['Queer-affirming services listed', 'Ask about LGBTQ+ experience on first call'],
    },
  },
  migrant: {
    ko: {
      heading: '가능한 언어부터 확인하세요',
      paragraphs: [
        '다누리콜센터(1577-1366)는 13개 언어를 지원하고, 외국인력상담센터(1644-0644)는 이주노동 상담에 특화되어 있습니다. 긴급 상황이면 119가 더 빠른 도움이 될 수 있습니다. 통역 연결이 가능하며, 긴급 구조는 법적으로 체류 자격과 무관하게 제공됩니다.',
        '이 페이지는 다국어 상담 여부, 이주민 전용 핫라인, 상황별(노동, 가정폭력, 유학) 적합 기관을 비교할 수 있게 구성했습니다.',
      ],
      highlights: ['다누리 1577-1366 — 13개 언어', '119·112 — 체류 자격 무관', '노동·가정폭력·유학 상황별 안내'],
    },
    en: {
      heading: 'Start by checking which language is available',
      paragraphs: [
        'Danuri Call Center (1577-1366) offers 13 languages. Foreign Workers Center (1644-0644) specializes in migrant labor. In an emergency, call 119 — interpreter support is available, and emergency services are legally provided regardless of visa status.',
        'This page compares multilingual availability, migrant-specific hotlines, and services matched to your situation: labor issues, domestic violence, or student isolation.',
      ],
      highlights: ['Danuri 1577-1366 — 13 languages', '119 and 112 — regardless of visa', 'By situation: labor, violence, students'],
    },
  },
  addiction: {
    ko: {
      heading: '문제 유형별 중독 상담 기관 비교',
      paragraphs: [
        '도박, 알코올, 약물, 게임 등 문제 유형에 따라 더 적합한 기관이 다릅니다. 본인이 아직 준비되지 않았더라도 가족이 먼저 상담을 시작할 수 있습니다.',
        '재발이 일어났다고 해서 상담을 다시 받을 수 없는 것이 아닙니다. 다시 연결하면 됩니다.',
      ],
      highlights: ['도박·알코올·약물·게임 유형별', '가족 먼저 상담 가능', '재발 후 재연결 가능'],
    },
    en: {
      heading: 'Compare addiction services by problem type',
      paragraphs: [
        'Different organizations are better suited for gambling, alcohol, drugs, or gaming. Family members can start counseling even if the person is not ready.',
        'Relapse does not mean you cannot reconnect with services. You can start again.',
      ],
      highlights: ['By type: gambling, alcohol, drugs, gaming', 'Family can start first', 'Reconnection after relapse OK'],
    },
  },
  elder: {
    ko: {
      heading: '학대·방임 신고와 돌봄 서비스 연결',
      paragraphs: [
        '학대나 방임이 의심되면 노인보호전문기관(1577-1389)에 신고할 수 있습니다. 익명 가능하며, 가족이 아닌 이웃이나 관리인도 신고할 수 있습니다.',
        '학대까지는 아니지만 혼자 사는 것이 걱정되면, 보건복지콜센터(129)에서 돌봄 서비스(정기 방문, 안부 전화, 식사 배달 등)를 연결받을 수 있습니다.',
      ],
      highlights: ['1577-1389 — 학대·방임 신고, 익명 가능', '129 — 돌봄 서비스 연결', '가족 외 이웃·관리인도 요청 가능'],
    },
    en: {
      heading: 'Abuse reporting and care service connection',
      paragraphs: [
        'If abuse or neglect is suspected, report to the Elder Protection Agency (1577-1389). Anonymous reporting is available, and neighbors or building managers can report — not just family.',
        'If it is not abuse but isolation is concerning, the Health and Welfare Call Center (129) can connect to care services such as regular visits, welfare calls, and meal delivery.',
      ],
      highlights: ['1577-1389 — abuse report, anonymous OK', '129 — care service connection', 'Neighbors and non-family can request'],
    },
  },
  legal: {
    ko: {
      heading: '지금 안전이 걱정되면 112가 더 빠를 수 있어요',
      paragraphs: [
        '범죄가 지금 진행 중이거나 관련자가 가까이 있어 안전이 걱정되면 112가 더 빠른 도움이 될 수 있습니다. 이 페이지의 기관들은 신고 이후 또는 급박한 상황이 지난 뒤 치료비, 생계비, 법률상담, 수사기관·법정 동행 같은 회복 지원을 찾을 때 도움이 됩니다.',
        '범죄피해자지원센터, 법률구조 기관, 인권·피해자 지원 기관은 상황과 필요한 지원에 따라 연결 가능한 내용이 다릅니다. 어떤 지원을 받을 수 있는지 확신이 없어도, 겪은 일과 현재 필요한 일을 말하면 다음 절차를 함께 정리할 수 있습니다.',
      ],
      highlights: ['112 — 현재 위험·신고 우선', '피해자지원센터 — 회복 지원 연결', '법률·의료·생계 지원 확인'],
    },
    en: {
      heading: 'If immediate safety is at risk, 112 may be faster',
      paragraphs: [
        'If a crime is happening now or someone involved is nearby and you feel unsafe, 112 may be faster help. The organizations on this page are most useful after reporting, or once immediate danger has passed, when you need recovery support such as medical or living expense assistance, legal counseling, or accompaniment to investigation and court steps.',
        'Victim support centers, legal aid organizations, and human rights or victim advocacy groups offer different support depending on your situation and needs. You do not need to know exactly what you qualify for before calling; describing the situation and what you need now is enough to start sorting out next steps.',
      ],
      highlights: ['112 — current danger or reporting first', 'Victim support centers — recovery support', 'Check legal, medical, and living support'],
    },
  },
}


export function getCategoryEditorial(category: Category, lang: Lang): CategoryEditorial {
  return CATEGORY_EDITORIAL[category][lang]
}
