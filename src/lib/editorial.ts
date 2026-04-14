import { CATEGORY_META } from '@/lib/categories'
import { translateCategoryLabel, type Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type CategoryEditorial = {
  heading: string
  paragraphs: string[]
  highlights: string[]
}

type GuideIndexCopy = {
  title: string
  description: string
  intro: string
  focusPoints: string[]
}

type GuideEntryCopy = {
  title: string
  description: string
  paragraphs: string[]
  checklist: string[]
}

const CATEGORY_EDITORIAL: Record<Category, Record<Lang, CategoryEditorial>> = {
  crisis: {
    ko: {
      heading: '109에 전화하세요',
      paragraphs: [
        '대기 중이면 끊지 말고 기다리거나 119로 전환하세요. 이미 자신을 해칠 수 있는 상황이거나 신체 위험이 있으면 119나 112가 먼저입니다.',
        '이 페이지는 자살 위기, 극심한 불안 상황에서 연결할 수 있는 기관 목록입니다. 전화번호, 운영시간, 연결 방식을 비교할 수 있습니다.',
      ],
      highlights: ['109 — 24시간', '신체 위험 시 119·112 우선', '제3자 신고 가능'],
    },
    en: {
      heading: 'Call 109',
      paragraphs: [
        'If the line is busy, stay on hold or switch to 119. If there is immediate physical danger or access to means of harm, call 119 or 112 first.',
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
      heading: '급박한 위협이 있으면 112에 먼저 전화하세요',
      paragraphs: [
        '지금 당장은 아니지만 반복되는 폭력이나 통제 속에 있다면, 통화가 안전한 시간에 1366으로 연결하세요. 신고 없이 상담만 먼저 받는 것도 가능합니다.',
        '이 페이지는 가정폭력, 성폭력, 스토킹, 데이트폭력 상황에서 연결할 수 있는 기관 목록입니다. "폭력"이라는 단어가 맞는지 잘 모르겠어도, 맞고 있거나 무섭다면 전화할 수 있습니다.',
      ],
      highlights: ['1366 — 24시간', '신고 없이 상담만 가능', '쉼터·법률·의료 연계'],
    },
    en: {
      heading: 'If the threat is immediate, call 112 first',
      paragraphs: [
        'If the violence is ongoing but not happening right now, call 1366 when it is safe to talk. Counseling without filing a report is available.',
        'This page lists organizations for domestic violence, sexual violence, stalking, and dating abuse. You do not need to be certain the word "violence" applies — being hit or being afraid is reason enough to call.',
      ],
      highlights: ['1366 — 24/7', 'Counseling without report OK', 'Shelter, legal, and medical referrals'],
    },
  },
  youth: {
    ko: {
      heading: '1388에 전화하거나 카카오톡으로 채팅하세요',
      paragraphs: [
        '전화가 부담스러우면 카카오톡에서 "1388"을 검색해 채팅으로 시작할 수 있습니다. 집이나 학교가 위험하면 청소년 쉼터 연결도 가능합니다.',
        '상담 내용은 기본적으로 비밀이 보장됩니다. 다만 생명이나 안전에 급박한 위험이 있다고 판단되면 도움을 위해 보호자나 관계 기관에 연락할 수 있습니다.',
      ],
      highlights: ['1388 — 전화·카카오톡', '청소년 쉼터 연결 가능', '기본 비밀보장, 급박 시 예외'],
    },
    en: {
      heading: 'Call 1388 or start a chat on KakaoTalk',
      paragraphs: [
        'If calling feels like too much, search "1388" on KakaoTalk and start with a text message. If home or school is dangerous, youth shelter connection is available.',
        'Counseling is confidential by default. If there is an urgent risk to life or safety, the counselor may contact a guardian or relevant agency to help.',
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
      highlights: ['퀴어 친화 명시 기관', '첫 통화에서 친화 여부 확인 권장', '정신건강 치료 병행 가능 기관 포함'],
    },
    en: {
      heading: 'Compare queer-affirming counseling services',
      paragraphs: [
        'This page gathers organizations that have stated queer-affirming practices or have LGBTQ+ counseling experience. Since not all are at the same level, asking on the first call whether they can support your situation saves time.',
        'Beyond coming out, family conflict, and discrimination, if depression, anxiety, or trauma symptoms are severe, choose an organization that also offers clinical treatment for those conditions.',
      ],
      highlights: ['Queer-affirming services listed', 'Ask about LGBTQ+ experience on first call', 'Includes services with clinical treatment'],
    },
  },
  migrant: {
    ko: {
      heading: '가능한 언어부터 확인하세요',
      paragraphs: [
        '다누리콜센터(1577-1366)는 13개 언어, 외국인력상담센터(1644-0644)는 이주노동 전문입니다. 긴급 상황이면 119에 전화하세요 — 통역 연결이 가능하며, 긴급 구조는 법적으로 체류 자격과 무관하게 제공됩니다.',
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
        '도박, 알코올, 약물, 게임 등 유형에 따라 더 적합한 기관이 다릅니다. 본인이 준비되지 않았더라도 가족이 먼저 상담을 시작할 수 있습니다.',
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
}

const GUIDE_INDEX_COPY: Record<Lang, GuideIndexCopy> = {
  ko: {
    title: '전화하기 전에 | 상담 기관 이용 안내',
    description:
      '각 상담 기관에 전화하면 실제로 어떤 절차가 진행되는지, 누가 전화할 수 있는지, 비용과 비밀보장은 어떻게 되는지를 정리했습니다.',
    intro:
      '전화번호는 알겠는데 "전화하면 뭐가 달라지지?", "뭘 물어보지?", "돈이 드나?" 같은 질문 때문에 망설여진다면, 아래 글이 도움이 될 수 있습니다. 각 글은 관련 기관 페이지로 바로 연결됩니다. 이 가이드는 기관 이용을 돕기 위한 안내이며, 전문 상담을 대체하지 않습니다.',
    focusPoints: ['전화하면 어떤 절차가 진행되는지', '비용·비밀보장·접수 방식 비교', '누가 전화할 수 있는지'],
  },
  en: {
    title: 'Before You Call | Service Navigation Guide',
    description:
      'What actually happens when you call each service, who can call, and how cost and confidentiality work.',
    intro:
      'If you have the phone number but hesitate because you do not know what happens next, what they will ask, or whether it costs anything — these guides can help. Each one links to the relevant directory page. These guides help you navigate services and do not replace professional counseling.',
    focusPoints: ['What happens after you call', 'Cost, confidentiality, and intake comparison', 'Who is eligible to call'],
  },
}

const GUIDE_ENTRIES = [
  {
    slug: 'how-109-works',
    category: 'crisis',
    ko: {
      title: '109에 전화하면 무슨 일이 일어나나요',
      description:
        '본인이 아닌 제3자도 전화할 수 있는지, 상담사가 무엇을 물어보는지, 전화 후 어떤 조치가 이어지는지를 정리했습니다.',
      paragraphs: [
        '109는 24시간 운영되는 자살예방 상담전화입니다. 본인뿐 아니라 주변 사람이 대신 전화할 수 있습니다. 연결되면 상담사가 먼저 말을 꺼내고, 지금 상황이 어떤지, 혼자 있는지, 즉각적인 위험이 있는지를 확인합니다. 모든 것을 정리해서 설명하지 않아도 됩니다.',
        '상담사가 위험이 높다고 판단하면, 본인 동의를 받은 뒤 지역 정신건강복지센터나 자살예방센터로 연계하여 추가 상담과 사례관리를 받을 수 있게 합니다. 급박한 위험이 있으면 긴급 출동을 요청할 수도 있습니다. 대기 시간이 발생할 수 있으므로, 전화가 바로 연결되지 않으면 끊지 말고 기다리거나 119로 전환하세요. 비용은 없습니다.',
      ],
      checklist: [
        '본인 또는 제3자 모두 전화 가능',
        '대기 시 끊지 말고 기다리거나 119 전환',
        '비용 없음, 연계 시 본인 동의 절차 있음',
      ],
    },
    en: {
      title: 'What happens when you call 109',
      description:
        'Whether a third party can call, what the counselor asks, and what follow-up steps are available.',
      paragraphs: [
        '109 is a 24/7 suicide prevention hotline. Both the person in crisis and someone nearby can call. The counselor speaks first and checks the current situation: whether you are alone, and whether there is immediate danger. You do not need to have everything organized before calling.',
        'If the counselor assesses high risk, they can — with consent — refer to a local mental health center or suicide prevention center for ongoing support and case management. In urgent danger, emergency dispatch can be requested. Wait times may occur, so if the call does not connect immediately, stay on hold or switch to 119. There is no cost.',
      ],
      checklist: [
        'Both the person and third parties can call',
        'If busy, stay on hold or switch to 119',
        'Free; referral requires consent',
      ],
    },
  },
  {
    slug: 'first-call-mental-health-center',
    category: 'depression',
    ko: {
      title: '정신건강복지센터에 처음 전화하면 어떻게 진행되나요',
      description:
        '진단서가 필요한지, 비용이 드는지, 첫 전화에서 뭘 말해야 하는지, 대면 상담까지 얼마나 걸리는지를 정리했습니다.',
      paragraphs: [
        '정신건강복지센터는 전국 시·군·구마다 있는 공공 정신건강 기관입니다. 첫 전화에서 "상담을 받고 싶다"고 말하면 담당자가 간단한 접수 상담(현재 어려움, 이전 상담 경험 등)을 진행하고, 대면 상담 일정을 잡아 줍니다. 진단서나 의뢰서는 필요 없습니다. 일부 센터는 전화 상담만으로도 초기 대응이 가능합니다.',
        '대면 상담은 보통 1~2주 내 시작됩니다. 비용은 무료입니다. 상담 내용은 직장이나 학교에 통보되지 않습니다. 이후 필요에 따라 사례관리, 의료기관 연계, 재활 프로그램 등으로 이어질 수 있습니다. 심리상담 바우처(8회, 소득 무관, 의뢰서 필요)나 근로자지원프로그램(EAP, 직장인, 7회)도 별도로 이용 가능합니다.',
      ],
      checklist: [
        '진단서·의뢰서 없이 전화 한 통으로 접수',
        '무료, 대면 상담 1~2주 내 시작',
        '직장·학교에 통보되지 않음',
      ],
    },
    en: {
      title: 'What happens when you first call a mental health center',
      description:
        'Whether you need a diagnosis, what it costs, what to say on the first call, and how long until in-person sessions begin.',
      paragraphs: [
        'Community mental health centers exist in every district nationwide. On the first call, say you want counseling. Staff will conduct a brief intake (current difficulties, any prior counseling) and schedule an in-person session. No diagnosis or referral letter is needed. Some centers can provide initial support by phone alone.',
        'In-person sessions typically begin within one to two weeks. The service is free. Counseling records are not shared with your employer or school. Depending on needs, ongoing case management, medical referrals, or rehabilitation programs may follow. The counseling voucher program (8 sessions, no income limit, referral form needed) and Employee Assistance Programs (EAP, 7 sessions for workers) are also available separately.',
      ],
      checklist: [
        'No diagnosis or referral needed — one phone call to register',
        'Free; in-person sessions within 1–2 weeks',
        'Not reported to employer or school',
      ],
    },
  },
  {
    slug: 'how-1366-works',
    category: 'women',
    ko: {
      title: '1366에 전화하면 어떤 절차가 진행되나요',
      description:
        '어떤 질문을 받는지, 신고 없이 상담만 가능한지, 쉼터·법률·의료 연계는 어떻게 이뤄지는지를 정리했습니다.',
      paragraphs: [
        '1366은 24시간 운영되는 여성긴급전화입니다. 전화하면 상담사가 현재 상황(폭력의 종류, 빈도, 가해자와의 관계, 즉각적 위험 여부)을 확인합니다. 신고 여부는 본인이 결정합니다 — 상담만 먼저 받고 신고는 나중에 해도 됩니다. 가해자가 기기를 감시하고 있다면, 신뢰할 수 있는 사람의 전화나 공공장소 전화를 이용하세요.',
        '상담사가 위험도를 평가한 뒤, 상황에 따라 경찰 출동 요청, 긴급 쉼터 배정, 의료기관 연결, 법률 상담 연계를 안내합니다. 이 모든 것이 한 번의 통화에서 시작될 수 있습니다. 증거는 나중에 정리해도 되지만, 병원 방문 시 진료기록에 상해 원인을 기록해 달라고 요청해 두면 도움이 됩니다. 비용은 없습니다.',
      ],
      checklist: [
        '24시간, 비용 없음',
        '신고 없이 상담만 먼저 가능 — 신고 여부는 본인 결정',
        '쉼터·경찰·법률·의료 연계를 한 통화에서 시작',
      ],
    },
    en: {
      title: 'What happens when you call 1366',
      description:
        'What the counselor asks, whether counseling without reporting is possible, and how shelter, legal, and medical referrals work.',
      paragraphs: [
        '1366 is a 24/7 women\'s emergency hotline. The counselor will ask about your current situation: the type and frequency of violence, your relationship to the abuser, and whether there is immediate danger. Whether to file a report is your decision — you can receive counseling first and decide about reporting later. If your devices are being monitored, use a trusted person\'s phone or a public phone.',
        'After assessing danger level, the counselor can arrange police dispatch, emergency shelter, medical connection, or legal consultation as needed. All of this can begin from a single call. Evidence can be organized later, but if you visit a hospital, asking staff to record the cause of injury in your medical records is helpful. There is no cost.',
      ],
      checklist: [
        '24/7, no cost',
        'Counseling without report OK — reporting is your decision',
        'Shelter, police, legal, and medical referrals from one call',
      ],
    },
  },
  {
    slug: 'how-1388-works-for-parents',
    category: 'youth',
    ko: {
      title: '1388에 부모가 전화하면 어떤 도움을 받나요',
      description:
        '자녀가 자해, 학교폭력, 가출 위험에 있을 때 부모가 1388에 전화하면 어떤 절차가 진행되는지를 정리했습니다.',
      paragraphs: [
        '1388은 청소년 전용 상담이지만, 부모나 보호자도 전화할 수 있습니다. "아이가 자해를 한다고 해서 어떻게 해야 할지 모르겠다", "학교폭력을 당하고 있는 것 같다" 등 상황을 말하면 상담사가 현재 위험 수준을 확인하고, 다음 단계를 함께 정리합니다.',
        '상담사는 상황에 따라 청소년상담복지센터 대면상담 연계, 의료기관 연결, 학교 개입 여부 판단, 쉼터 연결 등을 안내합니다. 부모가 모든 답을 알고 있을 필요가 없습니다 — 어떤 순서로 뭘 해야 하는지를 정리하는 것이 1388의 역할입니다. 전화·카카오톡 채팅 모두 가능하며, 비용은 없습니다.',
      ],
      checklist: [
        '부모·보호자도 전화 가능',
        '위험 수준 확인 → 대면상담·의료·학교·쉼터 연계 안내',
        '전화·카카오톡 가능, 비용 없음',
      ],
    },
    en: {
      title: 'What happens when a parent calls 1388',
      description:
        'What the process looks like when a parent calls 1388 about a child\'s self-harm, school violence, or runaway risk.',
      paragraphs: [
        '1388 is a youth-focused hotline, but parents and guardians can also call. Describe the situation — "my child says they are self-harming," "I think they are being bullied" — and the counselor will assess the current risk level and help organize next steps.',
        'Depending on the situation, the counselor may arrange in-person sessions at a youth counseling center, medical referrals, guidance on school involvement, or shelter connection. You do not need to have all the answers — sorting out what to do and in what order is what 1388 does. Available by phone and KakaoTalk chat. No cost.',
      ],
      checklist: [
        'Parents and guardians can call',
        'Risk assessment → counseling, medical, school, or shelter referral',
        'Phone and KakaoTalk; no cost',
      ],
    },
  },
  {
    slug: 'free-counseling-routes-compared',
    category: 'depression',
    ko: {
      title: '무료·저비용 심리상담 세 가지 경로 비교',
      description:
        '정신건강복지센터, 심리상담 바우처, 근로자지원프로그램(EAP) — 비용, 비밀보장, 접수 방식, 소요 시간을 비교했습니다.',
      paragraphs: [
        '정신건강복지센터는 무료이며, 전화 한 통으로 접수 가능하고, 직장에 통보되지 않습니다. 대면 상담은 보통 1~2주 내 시작됩니다. 심리상담 바우처는 전문 상담 8회를 소득·나이 제한 없이 지원받을 수 있지만, 의뢰서가 필요합니다 — 정신건강복지센터나 보건소에서 발급받을 수 있습니다. 근로자지원프로그램(EAP)은 직장인 대상으로 연 7회 무료 상담을 제공하며, 상담 내용은 회사에 공유되지 않습니다.',
        'EAP는 회사를 통해 제공되는 서비스이므로, 이용 사실 자체의 비밀보장 범위는 회사 정책에 따라 다를 수 있습니다. 비밀보장이 걱정된다면 정신건강복지센터나 바우처가 더 안전한 선택입니다. 번아웃과 우울증의 경계가 모호하다면, 상담을 통해 구분할 수 있으므로 먼저 연결하는 것이 좋습니다.',
      ],
      checklist: [
        '정신건강복지센터 — 무료, 통보 없음, 접수 즉시',
        '바우처 — 8회, 소득 무관, 의뢰서 필요(보건소에서 발급)',
        'EAP — 직장인, 7회, 상담 내용 비공유(이용 사실 보장은 회사 정책 확인)',
      ],
    },
    en: {
      title: 'Three free or low-cost counseling routes compared',
      description:
        'Community mental health centers, counseling vouchers, and employee assistance programs — cost, confidentiality, intake, and timing compared.',
      paragraphs: [
        'Community mental health centers are free, can be accessed with a single phone call, and do not notify your employer. In-person sessions typically start within one to two weeks. The counseling voucher program covers 8 professional sessions regardless of income or age, but requires a referral form — available from mental health centers or public health offices. Employee Assistance Programs (EAP) offer 7 free sessions per year for workers, and counseling content is not shared with the employer.',
        'Because EAP is provided through the employer, whether your usage itself remains confidential may vary by company policy. If confidentiality is a concern, mental health centers or vouchers are a safer choice. If the line between burnout and depression is unclear, counseling can help distinguish — connecting first is better than waiting.',
      ],
      checklist: [
        'Mental health center — free, no notification, immediate intake',
        'Voucher — 8 sessions, no income limit, referral form needed (from public health office)',
        'EAP — workers, 7 sessions, content private (usage confidentiality depends on company policy)',
      ],
    },
  },
  {
    slug: 'how-1336-works-for-families',
    category: 'addiction',
    ko: {
      title: '1336에 가족이 전화하면 어떤 상담을 받나요',
      description:
        '도박 문제로 가족이 한국도박문제관리센터에 전화했을 때 어떤 절차가 진행되는지, 당사자 동의 없이도 가능한지를 정리했습니다.',
      paragraphs: [
        '한국도박문제관리센터(1336)는 도박 문제 전문 상담기관입니다. 당사자뿐 아니라 가족이 먼저 전화할 수 있습니다. "가족이 도박을 하고 있고 빚이 반복되는데, 어떻게 해야 하는지 상담받고 싶다"고 말하면 됩니다. 당사자의 동의나 참여가 없어도 가족 상담은 시작할 수 있습니다.',
        '상담사는 현재 상황(도박 유형, 빚 규모, 갈등 수준, 안전 문제)을 확인하고, 가족의 대응 방식을 함께 점검합니다. 빚을 대신 갚는 것이 도박을 지속시키는 구조가 될 수 있다는 점도 다루지만, 공동 재정이나 안전 문제를 함께 고려하므로 일방적인 지시가 아니라 상황에 맞는 방향을 함께 정리합니다. 폭력이나 안전 위협이 있다면 112나 1366 연결을 병행해야 합니다. 비용은 없습니다.',
      ],
      checklist: [
        '가족이 먼저 전화 가능, 당사자 동의 불필요',
        '상황 확인 → 대응 방식 점검 → 상황에 맞는 방향 정리',
        '비용 없음, 폭력 시 112·1366 병행',
      ],
    },
    en: {
      title: 'What happens when a family member calls 1336',
      description:
        'What the process looks like when a family calls the Korea Center on Gambling Problems, and whether the gambler\'s consent is needed.',
      paragraphs: [
        'The Korea Center on Gambling Problems (1336) is a specialized gambling counseling service. Family members can call first — the gambler\'s consent or participation is not required to start. Say: "A family member has a gambling problem, debt keeps recurring, and I want counseling on what to do."',
        'The counselor will assess the current situation — gambling type, debt level, conflict severity, and safety concerns — and review the family\'s response patterns. This includes examining whether paying off debts may be sustaining the cycle, but also considers shared finances and safety, so guidance is situation-specific rather than one-size-fits-all. If there is violence or a safety threat, 112 or 1366 should be contacted as well. There is no cost.',
      ],
      checklist: [
        'Family can call first; gambler\'s consent not needed',
        'Situation assessment → response review → tailored guidance',
        'No cost; contact 112 or 1366 if violence is present',
      ],
    },
  },
  {
    slug: 'how-multilingual-helplines-work',
    category: 'migrant',
    ko: {
      title: '다국어 상담 전화 시 실제 연결 과정',
      description:
        '영어, 중국어, 베트남어 등으로 전화했을 때 통역은 어떻게 연결되는지, 긴급 구조 후 체류 관련 절차는 어떻게 되는지를 정리했습니다.',
      paragraphs: [
        '다누리콜센터(1577-1366)에 전화하면 자동 안내 또는 상담사가 사용 가능한 언어를 먼저 확인합니다. 해당 언어 상담사가 있으면 바로 연결되고, 없으면 통역을 연결합니다. 외국인력상담센터(1644-0644)는 이주노동 관련 상담에 특화되어 있습니다. 119에 전화할 경우에도 통역 연결이 가능합니다.',
        '긴급 구조(119, 112)는 법적으로 체류 자격과 무관하게 제공됩니다. 다만 긴급 상황 이후 절차(경찰 조사, 병원 행정 등)에서 체류 관련 질문이 나올 수 있으므로, 상황이 안정된 후 이주민 전문 법률 상담을 받는 것을 권장합니다. 가정폭력 피해 이주여성은 체류 자격 관련 법적 보호가 있을 수 있으므로, 법률 상담을 통해 확인하세요.',
      ],
      checklist: [
        '다누리 1577-1366 — 13개 언어, 통역 연결 가능',
        '119·112 — 법적으로 체류 자격 무관, 통역 가능',
        '긴급 이후 체류 관련 절차에 대비해 법률 상담 권장',
      ],
    },
    en: {
      title: 'How multilingual helpline calls actually work',
      description:
        'How interpreter connection works when calling in English, Chinese, Vietnamese, or other languages, and what to expect regarding residency procedures after an emergency.',
      paragraphs: [
        'When you call the Danuri Call Center (1577-1366), an automated system or counselor will first check your preferred language. If a counselor who speaks that language is available, you are connected directly; otherwise, an interpreter is arranged. The Foreign Workers Counseling Center (1644-0644) specializes in migrant labor issues. Interpreter support is also available when calling 119.',
        'Emergency services (119, 112) are legally provided regardless of visa status. However, post-emergency procedures (police interviews, hospital administration) may involve residency-related questions, so seeking legal consultation through migrant-specialized services after the situation stabilizes is recommended. Marriage migrants experiencing domestic violence may have legal protections related to residency — confirm through legal consultation.',
      ],
      checklist: [
        'Danuri 1577-1366 — 13 languages, interpreter available',
        '119 and 112 — legally regardless of visa, interpreter available',
        'Post-emergency legal consultation recommended for residency concerns',
      ],
    },
  },
  {
    slug: 'how-elder-report-works',
    category: 'elder',
    ko: {
      title: '노인보호전문기관에 신고하면 어떤 절차가 진행되나요',
      description:
        '1577-1389에 신고한 후 현장 조사부터 서비스 연결까지 실제로 무슨 일이 일어나는지, 강제 조치는 언제 이뤄지는지를 정리했습니다.',
      paragraphs: [
        '노인보호전문기관(1577-1389)에 전화하면 상담원이 신고 내용(의심되는 상황, 어르신의 상태, 반복 여부 등)을 확인합니다. 익명 신고가 가능하며, 가족이 아닌 이웃, 관리인, 택배 기사 등 누구든 신고할 수 있습니다. 신고 후 전문 상담원이 현장 조사를 실시하여 어르신을 직접 만나 상황을 확인합니다.',
        '현장 조사 후 어르신의 의사를 확인하고, 필요에 따라 돌봄 서비스, 의료 연결, 보호 시설 연계 등을 안내합니다. 어르신 동의 없이 강제 분리가 이뤄지는 경우는 생명에 급박한 위험이 있을 때로 제한됩니다. 학대까지는 아니지만 독거 어르신의 고립이 걱정되면, 보건복지콜센터(129)에서 돌봄 서비스(정기 방문, 안부 전화, 식사 배달, 응급안전서비스 등)를 요청할 수 있습니다.',
      ],
      checklist: [
        '1577-1389 — 익명 신고 가능, 가족 외 누구든 신고 가능',
        '신고 → 현장조사(어르신 면담) → 의사 확인 → 서비스 연결',
        '강제 분리는 급박한 위험 시에만, 돌봄은 129에서 별도 요청',
      ],
    },
    en: {
      title: 'What happens after reporting to the Elder Protection Agency',
      description:
        'The actual process from report to on-site assessment to service connection after calling 1577-1389, and when forced intervention occurs.',
      paragraphs: [
        'When you call the Elder Protection Agency (1577-1389), staff will confirm the details of the report: the suspected situation, the person\'s condition, and whether it is recurring. Anonymous reporting is available, and anyone can report — not just family members but also neighbors, building managers, or delivery workers. After the report, a specialized counselor conducts an on-site assessment to meet with the older person directly.',
        'After the assessment, the person\'s wishes are confirmed, and appropriate services are arranged: daily care, medical referrals, or protective placement as needed. Forced separation without consent is limited to situations involving immediate danger to life. If the concern is isolation rather than abuse, the Health and Welfare Call Center (129) can connect to care services such as regular visits, welfare calls, meal delivery, and emergency safety devices.',
      ],
      checklist: [
        '1577-1389 — anonymous OK, anyone can report',
        'Report → on-site assessment (in-person) → confirm wishes → connect services',
        'Forced separation only for immediate danger; care services via 129 separately',
      ],
    },
  },
] as const satisfies ReadonlyArray<{
  slug: string
  category: Category
  ko: GuideEntryCopy
  en: GuideEntryCopy
}>

export function getCategoryEditorial(category: Category, lang: Lang): CategoryEditorial {
  return CATEGORY_EDITORIAL[category][lang]
}

export function getGuidePageCopy(lang: Lang): GuideIndexCopy {
  return GUIDE_INDEX_COPY[lang]
}

export function getGuides(lang: Lang) {
  return GUIDE_ENTRIES.map((entry) => ({
    slug: entry.slug,
    category: entry.category,
    categoryLabel: translateCategoryLabel(CATEGORY_META[entry.category].label, lang),
    ...entry[lang],
  }))
}
