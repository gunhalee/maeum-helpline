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
      heading: '지금 이 순간이 견딜 수 없다면, 읽기보다 연결이 먼저입니다',
      paragraphs: [
        '지금 죽고 싶다는 생각에 사로잡혀 있다면, 이 페이지를 끝까지 읽을 필요가 없습니다. 109에 전화하세요. 말이 잘 안 나와도 괜찮습니다. 연결되면 상담사가 먼저 말을 꺼냅니다. 만약 대기 중이라면 끊지 말고 기다리거나, 바로 119에 전화하세요. 이미 자신을 해칠 수 있는 물건이 가까이 있거나 행동 직전이라면, 109보다 119나 112가 먼저입니다.',
        '전화를 걸기 어려운 상태라면, 지금 있는 자리를 떠나세요 — 다른 방, 현관 밖, 아무 데나. 장소를 바꾸는 것만으로도 충동과 행동 사이에 시간이 생깁니다. 그리고 옆에 아무나 — 가족이든, 이웃이든, 편의점 직원이든 — 한 사람만 불러 주세요. 위험한 물건은 눈에 안 보이는 곳으로 치워 두세요. 완벽한 판단이 아니라 물리적 거리를 확보하는 것이 지금은 더 중요합니다.',
      ],
      highlights: ['109 자살위기 상담 (24시간)', '대기 중이면 끊지 말거나 119 전환', '장소를 바꾸고, 곁에 한 사람 부르기'],
    },
    en: {
      heading: 'If this moment feels unbearable, connection comes before reading',
      paragraphs: [
        'If you are consumed by thoughts of ending your life, you do not need to finish reading this page. Call 109. You do not have to speak clearly — the counselor will start the conversation. If the line is busy, stay on hold or switch to 119 immediately. If you already have access to something you could use to hurt yourself or you are about to act, call 119 or 112 before 109.',
        'If making a call feels impossible right now, leave where you are — another room, outside the door, anywhere. Changing your physical location creates time between impulse and action. Then get one person near you — anyone: a family member, a neighbor, a store clerk. Move anything dangerous out of sight. This is not about making the right decision — it is about creating physical distance between you and harm.',
      ],
      highlights: ['109 suicide crisis line (24/7)', 'Stay on hold or switch to 119', 'Change location and get one person nearby'],
    },
  },
  depression: {
    ko: {
      heading: '아무것도 하고 싶지 않은 상태가 계속되고 있다면',
      paragraphs: [
        '"이 정도로 상담을 받아도 되나" 하는 생각이 드는 것 자체가 이미 오래 버텨 왔다는 신호일 수 있습니다. 잠이 안 오거나 너무 많이 자는 날이 반복되고, 출근이나 등교 전에 몸이 굳는 느낌이 들고, 좋아하던 것에 아무 감정이 없어졌다면 — 그건 게으름이나 의지 부족이 아닙니다. 감정, 사고, 신체 반응이 함께 달라진 상태이며, 환경적 요인과 생물학적 요인이 복합적으로 작용합니다. 의지만으로 해결하기 어렵기 때문에 전문적 지원이 필요합니다.',
        '이 페이지에 정리된 기관 중에는 오늘 바로 전화할 수 있는 곳도 있고, 예약이 필요한 곳도 있습니다. 비용이 걱정이라면 정신건강복지센터(무료)나 심리상담 바우처(소득 무관, 8회)부터 확인해 보세요. 처음 전화할 때 "요즘 너무 힘든데 상담받을 수 있는지 알고 싶어서요"라고만 해도 충분합니다. 자기 상태를 정확히 정리해서 말하는 건 상담사가 도울 일이지, 전화하기 전에 준비해야 할 일이 아닙니다.',
      ],
      highlights: ['정신건강복지센터 — 전국 무료', '심리상담 바우처 — 소득·나이 무관 8회', '한 문장으로 시작해도 충분'],
    },
    en: {
      heading: 'If the numbness or exhaustion has not lifted for weeks',
      paragraphs: [
        'Wondering whether you are "bad enough" to deserve support is itself a sign that you have been enduring for a long time. When sleep collapses in either direction, when getting out of bed for work or school takes everything you have, when things you used to enjoy now feel like nothing — that is not laziness. It is a state where emotions, thoughts, and physical responses have shifted together, shaped by both life circumstances and biology. Willpower alone is not enough, which is why professional support helps.',
        'Some services listed here can be reached today; others require booking. If cost is a barrier, start with community mental health centers (free) or the counseling voucher program (8 sessions, no income restriction). When you call for the first time, saying "I have been struggling and I want to know if I can get counseling" is enough. Describing your condition precisely is something the counselor helps with — it is not something you need to prepare before calling.',
      ],
      highlights: ['Community mental health centers — free nationwide', 'Counseling voucher — 8 sessions, no income limit', 'One sentence is enough to start'],
    },
  },
  women: {
    ko: {
      heading: '지금 안전하지 않다면, 이 페이지보다 먼저 해야 할 일이 있습니다',
      paragraphs: [
        '가해자가 같은 공간에 있거나, 전화 기록이 확인될 수 있거나, 지금 이 화면을 보는 것조차 위험한 상황이라면 — 이 페이지를 저장하거나 기억하려 하지 마세요. 급박한 위협이 있으면 112에 먼저 전화하세요. 몸이 다쳤으면 119가 먼저입니다. 지금 당장은 아니지만 반복되는 폭력이나 통제 속에 있다면, 통화가 안전한 시간과 장소를 먼저 확보한 뒤 1366에 연결하세요.',
        '1366에 전화하면 상담사가 폭력의 빈도, 위협의 심각성, 무기 접근 가능성 등을 함께 확인하면서 현재 위험 수준을 평가하고, 경찰 연계·긴급 쉼터·법률 지원·의료 연결까지 다음 단계를 안내합니다. 아직 신고할 준비가 안 됐다면 상담만 먼저 받는 것도 가능합니다. "폭력"이라는 단어가 맞는지 잘 모르겠어도 괜찮습니다. 맞고 있거나, 감시당하고 있거나, 무섭다면 — 그것만으로 전화할 이유가 됩니다.',
      ],
      highlights: ['급박한 위협 → 112 먼저', '안전한 시간 확보 후 1366 연결', '신고 없이 상담만 먼저 가능'],
    },
    en: {
      heading: 'If you are not safe right now, there are steps before this page',
      paragraphs: [
        'If the person who hurts you is nearby, if your call history may be checked, if even viewing this page is risky — do not try to save or memorize it. If there is an immediate physical threat, call 112 first. If you are injured, call 119. If the violence is ongoing but not happening at this exact moment, find a safe time and place before calling 1366.',
        'When you reach 1366, a counselor will assess your current danger level — including frequency of violence, severity of threats, and access to weapons — and walk you through what comes next: police coordination, emergency shelter, legal support, or medical care. If you are not ready to report, counseling alone is available first. You do not need to be certain that the word "violence" applies. If you are being hit, monitored, or you feel afraid — that is reason enough to call.',
      ],
      highlights: ['Immediate threat → call 112 first', 'Find a safe moment, then call 1366', 'Counseling available without filing a report'],
    },
  },
  youth: {
    ko: {
      heading: '어른한테 말해 봤자 소용없다고 느껴질 수 있습니다',
      paragraphs: [
        '학교에서 맞거나 따돌림을 당하고 있거나, 집이 안전하지 않거나, 스스로를 다치게 하고 싶은 충동이 반복된다면 — 그건 네가 약해서가 아닙니다. "말해 봤자 달라지는 게 없다"는 경험을 이미 했을 수도 있습니다. 모든 상담이 완벽하지는 않지만, 1388에는 전문 훈련을 받은 상담사가 있고 학교나 부모와 다른 방식으로 대응합니다. 전화가 부담스러우면 카카오톡에서 "1388"을 검색해 채팅으로 시작할 수 있습니다.',
        '지금 당장 집이나 학교에서 벗어나야 할 만큼 위험하다면, 1388에서 청소년 쉼터 연결도 가능합니다. "상담" 같은 거창한 것을 할 준비가 안 돼도 괜찮습니다. 지금 무슨 일이 벌어지고 있는지 한 줄만 써서 보내도 됩니다. 상담 내용은 기본적으로 비밀이 보장되지만, 생명이나 안전에 급박한 위험이 있다고 판단되면 도움을 위해 보호자나 관계 기관에 연락할 수 있습니다.',
      ],
      highlights: ['1388 전화 또는 카카오톡 채팅', '청소년 쉼터 연결 가능', '상담은 기본 비밀보장, 급박한 위험 시 예외'],
    },
    en: {
      heading: 'It might feel like telling an adult will not change anything',
      paragraphs: [
        'If you are being bullied or hit at school, if home does not feel safe, if you keep wanting to hurt yourself — that is not because you are weak. You may have already tried telling someone and nothing changed. No service is perfect, but 1388 has professionally trained counselors who respond differently from teachers or parents. If calling feels like too much, search "1388" on KakaoTalk and start with a text message.',
        'If you need to get away from home or school right now because it is that dangerous, 1388 can also connect you to a youth shelter. You do not need to be ready for "counseling." Sending one line about what is happening is enough. Counseling is confidential by default, but if there is an urgent risk to your life or safety, the counselor may contact a guardian or relevant agency to help.',
      ],
      highlights: ['1388 by phone or KakaoTalk chat', 'Youth shelter connection available', 'Confidential by default; exception only for urgent safety risk'],
    },
  },
  queer: {
    ko: {
      heading: '정체성을 설명하느라 지치기 전에, 이미 이해하는 곳으로 연결되어야 합니다',
      paragraphs: [
        '상담이 필요해서 전화했는데, 정체성부터 설명해야 하고, 때로는 교정이나 설득의 대상이 되는 경험 — 그런 일을 한 번이라도 겪었다면 다시 도움을 요청하기까지 오래 걸리는 것이 당연합니다. 이 페이지에는 성소수자 당사자 상담 경험이 있거나 퀴어 친화를 명시한 기관을 모았습니다. 모든 곳이 동일한 수준의 이해를 제공하지는 않기 때문에, 첫 통화에서 "성소수자 관련 상담이 가능한지" 직접 물어보는 것이 시간을 아끼는 방법입니다.',
        '커밍아웃 이후의 가족 갈등, 직장이나 학교에서의 차별, 혐오 경험으로 인한 우울과 불안, 트랜스젠더 의료 접근 과정의 스트레스 — 이런 것들은 적대적인 환경에 놓인 사람이라면 누구나 겪을 수 있는 반응입니다. 안전한 환경을 찾는 것이 첫 단계이지만, 우울이나 불안, 트라우마 증상이 일상에 심각한 영향을 주고 있다면 증상 자체에 대한 전문 치료(심리치료, 필요시 약물치료 등)도 함께 고려해야 합니다.',
      ],
      highlights: ['퀴어 친화 명시 기관 모음', '첫 통화에서 친화 여부 직접 확인 권장', '안전한 환경 확보 + 증상 치료 병행 고려'],
    },
    en: {
      heading: 'You should not have to educate your counselor before getting help',
      paragraphs: [
        'If you have ever called a helpline only to spend the session explaining your identity — or worse, been treated as someone who needs correction — it makes sense that reaching out again feels difficult. This page lists organizations that have stated queer-affirming practices or have counseling experience with LGBTQ+ individuals. Since not all are at the same level, asking directly on the first call whether they can support your specific situation saves time and protects your energy.',
        'Family conflict after coming out, discrimination at work or school, depression and anxiety from repeated exposure to hostility, stress around transgender healthcare access — these are responses anyone would have in a hostile environment. Finding a safe counseling environment is the first step, but if depression, anxiety, or trauma symptoms are seriously affecting your daily life, professional treatment for those symptoms (psychotherapy, medication if needed) should also be considered alongside affirming support.',
      ],
      highlights: ['Verified queer-affirming services listed', 'Ask about LGBTQ+ experience on the first call', 'Safe environment + symptom-specific treatment when needed'],
    },
  },
  migrant: {
    ko: {
      heading: '한국어가 서툴러도, 비자가 불안정해도, 긴급 구조를 받을 권리는 같습니다',
      paragraphs: [
        '위기 상황에서 어디에 전화해야 하는지, 한국어를 못 하면 도움을 받을 수 있는지, 신고하면 체류 자격에 문제가 생기는지 — 이런 질문들 때문에 도움 요청 자체를 포기하는 경우가 많습니다. 이 페이지에는 다국어 상담이 가능한 기관, 이주민 전용 핫라인, 통역 지원 여부를 함께 표시했습니다. 119, 112 같은 긴급 구조는 법적으로 국적이나 체류 자격과 관계없이 제공됩니다.',
        '전화할 때 상황을 완벽하게 설명하지 않아도 됩니다. 가능한 언어를 먼저 말하면 통역 연결이나 해당 언어 상담사로 전환됩니다. 긴급 상황이 지난 후에는 체류 관련 절차에 대해 이주민 전문 법률 상담을 함께 받는 것을 권장합니다. 이주노동자의 임금 체불, 결혼이주여성의 가정폭력, 유학생의 고립감 — 각각 다른 기관이 더 적합할 수 있으므로 상황에 맞는 곳을 아래에서 확인하세요.',
      ],
      highlights: ['긴급 구조(119·112)는 법적으로 체류 자격 무관', '다국어 상담·통역 지원 기관 표시', '긴급 이후 체류 관련 법률 상담 병행 권장'],
    },
    en: {
      heading: 'Limited Korean or uncertain visa status does not remove your legal right to emergency help',
      paragraphs: [
        'Many migrants in Korea give up on seeking help because of unanswered questions: where to call, whether services work without Korean, whether reporting will create visa problems. This page marks which organizations offer multilingual counseling, migrant-specific hotlines, and interpreter support. Emergency services like 119 and 112 are legally available to everyone regardless of nationality or visa status.',
        'You do not need to explain your situation perfectly when you call. State your preferred language first — the service can then transfer you to an interpreter or a counselor who speaks it. After an emergency situation is resolved, it is recommended to seek legal consultation on any residency-related procedures through migrant-specialized services. Wage theft for migrant workers, domestic violence for marriage migrants, isolation for international students — different organizations are better suited for each, and they are listed by situation below.',
      ],
      highlights: ['Emergency services (119, 112) legally available regardless of visa', 'Multilingual and interpreter services marked', 'Legal consultation on residency recommended after emergency'],
    },
  },
  addiction: {
    ko: {
      heading: '끊겠다는 다짐이 반복해서 무너지는 건, 의지만으로는 부족하다는 뜻입니다',
      paragraphs: [
        '도박을 그만두겠다, 술을 줄이겠다, 게임을 끊겠다고 수십 번 다짐하고 매번 실패하면 "나는 왜 이것도 못 하나"라는 자책이 따라옵니다. 하지만 중독 상태에서는 보상 체계와 충동 조절이 달라져 있기 때문에, 의지만으로는 충분하지 않고 전문적 개입이 효과적입니다. 재발이 일어났다고 해서 모든 것이 실패한 것은 아닙니다 — 다시 연결하면 됩니다.',
        '본인이 아직 준비가 안 됐더라도, 가족이 먼저 상담받는 것은 매우 흔한 시작점입니다. 빚 때문에 가정이 무너지고 있거나, 폭력이나 거짓말이 반복되고 있다면, 가족의 안전을 먼저 확인하는 것도 중독 상담기관이 하는 일입니다. 아래에서 문제 유형별로 더 적합한 기관을 확인하세요.',
      ],
      highlights: ['의지 부족이 아닌, 전문 개입이 필요한 상태', '가족이 먼저 상담 시작 가능', '도박·알코올·약물·게임 유형별 안내'],
    },
    en: {
      heading: 'Repeatedly breaking promises to quit means willpower alone is not enough',
      paragraphs: [
        'If you have promised to stop gambling, drinking, or gaming dozens of times and failed each time, the shame of "why can\'t I even do this" follows every attempt. But in addiction, the brain\'s reward and impulse-control systems are altered, making willpower alone insufficient — professional intervention is what works. Relapse does not mean everything has failed — reconnecting with support is the appropriate next step.',
        'Even if the person who is struggling is not ready, it is very common for family members to start with counseling first. If debt is destroying the household, or if violence and deception are recurring, protecting the family\'s safety is also part of what addiction services do. Check below for organizations matched to specific problem types.',
      ],
      highlights: ['Not a willpower issue — professional intervention helps', 'Family members can start counseling first', 'Organized by type: gambling, alcohol, drugs, gaming'],
    },
  },
  elder: {
    ko: {
      heading: '돌봄의 손길이 닿지 않는 곳에서, 위기는 소리 없이 깊어집니다',
      paragraphs: [
        '식사를 거르고, 약을 빠뜨리고, 며칠째 밖에 나오지 않는 어르신 — 그것이 단순한 노화인지, 우울인지, 방임인지, 학대인지 구분하기 어려울 수 있습니다. 하지만 구분이 완벽하지 않아도 연결은 할 수 있습니다. 노인보호전문기관은 학대 신고뿐 아니라, 지금 이 상황이 어떤 종류의 도움이 필요한지 함께 판단하는 역할도 합니다.',
        '어르신 본인이 도움을 거부하는 경우도 많습니다. "괜찮다", "신세 지기 싫다"는 말 뒤에 수치심이나 체념이 있을 수 있습니다. 가족, 이웃, 관리인 — 누구든 반복되는 위험 신호를 발견했다면 먼저 연락해도 됩니다. 신고 후에는 전문 상담원이 현장 조사를 실시하며, 어르신의 의사를 확인하고 필요한 서비스(돌봄, 의료, 보호)를 연결합니다. 어르신 동의 없이 강제 분리가 이뤄지는 경우는 급박한 위험이 있을 때로 제한됩니다.',
      ],
      highlights: ['구분이 완벽하지 않아도 연결 가능', '누구든 먼저 신고·상담 요청 가능', '신고 후 현장조사 → 의사확인 → 서비스 연결 순서'],
    },
    en: {
      heading: 'Where care does not reach, crisis deepens in silence',
      paragraphs: [
        'An older person skipping meals, missing medication, not leaving the house for days — it can be hard to tell whether that is aging, depression, neglect, or abuse. But you do not need a perfect distinction to make a connection. Elder protection services do not only handle abuse reports — they also help assess what kind of support the situation actually needs.',
        'Older adults often refuse help. Behind "I am fine" or "I do not want to be a burden," there may be shame or resignation. Family, neighbors, building managers — anyone who notices repeated warning signs can reach out first. After a report, a specialized counselor conducts an on-site assessment, confirms the older person\'s wishes, and connects them to appropriate services such as daily care, medical support, or protective placement. Forced separation without the person\'s consent is limited to situations involving urgent danger.',
      ],
      highlights: ['Connection possible before clear diagnosis', 'Anyone can report or request guidance', 'After report: on-site assessment → confirm wishes → connect services'],
    },
  },
}

const GUIDE_INDEX_COPY: Record<Lang, GuideIndexCopy> = {
  ko: {
    title: '도움 요청 가이드 | 전화하기 전에 알아두면 덜 막막한 것들',
    description:
      '자살 위기, 우울, 폭력, 청소년 위기, 중독, 이주민·노인 지원까지 — 전화번호만이 아니라 실제로 전화했을 때 무슨 일이 일어나는지, 뭘 말해야 하는지, 어디가 내 상황에 맞는지를 정리했습니다.',
    intro:
      '전화번호는 알겠는데 막상 전화하려면 막막한 — 그 간격을 줄이기 위한 글 모음입니다. "뭐라고 말하지?", "여기가 맞나?", "전화하면 뭐가 달라지지?" 같은 질문에 먼저 답하고, 관련 기관 페이지로 바로 연결됩니다. 이 가이드는 상담 기관 이용을 돕기 위한 안내이며, 전문 상담을 대체하지 않습니다.',
    focusPoints: ['전화하면 실제로 무슨 일이 일어나는지', '내 상황에 맞는 첫 연결점 찾기', '전화 전에 당장 할 수 있는 일'],
  },
  en: {
    title: 'Help-Seeking Guides | What to know before the first call',
    description:
      'Practical guides covering suicide crisis, depression, violence, youth support, addiction, migrant services, and elder care in Korea — not just phone numbers, but what happens when you actually call.',
    intro:
      'Knowing a phone number and actually calling it are very different things. These guides address the gap: what to say, which service fits your situation, and what happens after you dial. Each one links directly to the relevant directory page so you can move from reading to action. These guides help you navigate services and do not replace professional counseling.',
    focusPoints: ['What actually happens when you call', 'Finding the right first contact for your situation', 'What you can do right now before calling'],
  },
}

const GUIDE_ENTRIES = [
  {
    slug: 'friend-suicide-signs',
    category: 'crisis',
    ko: {
      title: '친구가 죽고 싶다고 말했을 때 — 하지 말아야 할 말, 해야 할 행동',
      description:
        '"죽고 싶다"는 말을 들었을 때 대부분의 사람은 얼어붙거나, 말리려 하거나, 비밀을 지켜주겠다고 합니다. 세 가지 모두 실제 연결을 막는 반응입니다.',
      paragraphs: [
        '"죽고 싶다", "없어지고 싶다", "더 이상 못 하겠다" — 이런 말을 들었을 때, 비밀을 지켜주겠다고 약속하지 마세요. 비밀을 지키겠다는 약속은 당신을 혼자서 그 무게를 감당해야 하는 위치에 놓고, 정작 필요한 연결을 막습니다. 대신 이렇게 말할 수 있습니다: "네가 이 얘기를 해줘서 다행이야. 나 혼자 감당하긴 어려울 수 있는데, 같이 도움받을 수 있는 데를 찾아보자."',
        '설득하려 하지 마세요. "살아야 할 이유"를 나열하는 것은 지금 극심한 고통 속에 있는 사람에게 "네 고통은 이유가 부족하다"는 메시지로 들릴 수 있습니다. 대신 직접 물어보세요: "자살을 생각하고 있어?" — 직접 묻는 것이 자살 위험을 높이지 않는다는 것은 연구로 확인된 사실입니다. 그리고 혼자 있는지, 구체적인 방법이나 계획이 있는지, 근처에 위험한 물건이 있는지를 확인하세요. 가능하면 함께 109에 전화하세요. "내가 옆에서 같이 전화할게"라는 한 마디가 혼자 전화하라는 말보다 실제 연결 가능성을 훨씬 높입니다. 109가 바로 연결되지 않으면 끊지 말고 기다리거나, 119로 전환하세요.',
      ],
      checklist: [
        '"비밀 지켜줄게" 대신 "같이 도움받을 곳 찾아보자"고 말하기',
        '"자살을 생각하고 있어?"라고 직접 물어보기 — 직접 묻는 것이 위험을 높이지 않음',
        '109에 함께 전화하기 — 대기 중이면 끊지 말고 기다리거나 119로 전환',
      ],
    },
    en: {
      title: 'When a friend says they want to die — what not to say, and what to do',
      description:
        'Most people freeze, try to talk them out of it, or promise to keep it secret when they hear "I want to die." All three block actual connection to help.',
      paragraphs: [
        'When someone says "I want to die," "I want to disappear," or "I can\'t do this anymore" — do not promise to keep it secret. That promise traps you into carrying the weight alone and blocks the connection they actually need. Instead, try: "I\'m glad you told me. This might be too much for me to handle alone — let\'s find help together."',
        'Do not try to persuade them with reasons to live. Listing reasons why life is worth living can sound like "your pain is not a good enough reason" to someone in acute suffering. Instead, ask directly: "Are you thinking about suicide?" — research confirms that asking directly does not increase risk. Then check: are you alone right now? Do you have a specific plan or method? Is there anything nearby you could use to hurt yourself? If possible, call 109 together. "I will sit with you and we will call together" is far more likely to result in actual connection than "you should call a hotline." If 109 does not connect immediately, stay on hold or switch to 119.',
      ],
      checklist: [
        'Say "let\'s find help together" instead of "I\'ll keep your secret"',
        'Ask "are you thinking about suicide?" directly — research shows this does not increase risk',
        'Call 109 together — if the line is busy, hold or switch to 119',
      ],
    },
  },
  {
    slug: 'depression-next-steps',
    category: 'depression',
    ko: {
      title: '"이 정도로 상담받아도 되나?" — 그 생각이 드는 시점이 상담 시작점입니다',
      description:
        '우울 증상이 지속될 때, 무료 상담은 어디서 받는지, 처음 전화하면 뭐라고 하는지, 진단서가 필요한지를 정리했습니다.',
      paragraphs: [
        '우울 증상이 오래 이어질수록 "더 심해지면 그때 가야지"라는 생각이 강해집니다. 하지만 실제로는 증상이 깊어질수록 전화를 걸 에너지 자체가 사라집니다. 지금 "상담을 받아야 하나 말아야 하나" 고민이 되고 있다면, 역설적으로 지금이 가장 연결하기 쉬운 시점입니다. 정신건강복지센터는 전국 시·군·구에 있고, 전화 한 통으로 초기 상담 일정을 잡을 수 있습니다. 진단서나 의뢰서가 없어도 됩니다.',
        '심리상담 바우처는 소득이나 나이 제한 없이 전문 상담 8회를 지원받을 수 있는 제도입니다(의뢰서 필요). 직장인이라면 근로자지원프로그램(EAP)을 통해 연 7회 무료 상담을 받을 수 있습니다. 처음 전화할 때 "우울 증상이 있어서 상담을 받아보고 싶은데, 어떻게 시작하면 되는지 알고 싶어서요"라고 하면 충분합니다. 자기 상태를 정확히 진단해서 말하는 건 상담사의 일입니다. 전화가 어려우면 정신건강복지센터 중 일부는 온라인 예약이나 방문 접수도 가능합니다.',
      ],
      checklist: [
        '정신건강복지센터에 전화해서 초기 상담 일정 문의하기 (진단서 불필요)',
        '비용이 부담이면 심리상담 바우처(8회)나 EAP(직장인, 7회) 확인하기',
        '"우울 증상이 있어서 상담받고 싶다"고만 말하면 충분 — 전화 외 온라인·방문 접수도 확인',
      ],
    },
    en: {
      title: '"Am I bad enough to get counseling?" — that thought means it is time',
      description:
        'Where to get free counseling in Korea when depression persists, what to say on the first call, and whether you need a referral or diagnosis.',
      paragraphs: [
        'The longer depression continues, the stronger the thought becomes: "I will go when it gets worse." But the deeper symptoms get, the less energy you have to make a call. If you are debating whether to seek support right now, this is paradoxically the easiest moment to connect. Community mental health centers exist in every district nationwide, and a single phone call can set up an initial consultation. No diagnosis or referral letter is needed.',
        'The counseling voucher program provides 8 professional sessions regardless of income or age (a referral form is needed). If you are employed, the Employee Assistance Program (EAP) offers 7 free sessions per year. On the first call, saying "I have been experiencing symptoms of depression and I want to know how to start counseling" is enough. Diagnosing your condition is the counselor\'s job. If calling feels difficult, some mental health centers also accept online booking or walk-in registration.',
      ],
      checklist: [
        'Call a local mental health center to schedule an initial session (no diagnosis required)',
        'If cost is a concern, check the voucher program (8 sessions) or EAP (7 sessions for workers)',
        '"I have depression symptoms and want counseling" is enough — online or walk-in options also available',
      ],
    },
  },
  {
    slug: 'violence-safety-reporting',
    category: 'women',
    ko: {
      title: '폭력 피해 기록과 신고 — 안전이 증거보다 먼저이지만, 안전한 기록 방법은 있습니다',
      description:
        '가정폭력, 데이트폭력, 스토킹 상황에서 안전한 연락 경로를 먼저 확보하고, 위험을 높이지 않으면서 증거를 남기는 방법, 1366에 전화하면 실제로 무슨 일이 일어나는지 정리했습니다.',
      paragraphs: [
        '증거를 모아야 한다는 생각에 위험한 상황에서 녹음을 하거나, 사진을 찍거나, 메시지를 저장하려다 발각되면 폭력이 더 심해질 수 있습니다. 증거 수집은 중요하지만, 그것 때문에 지금의 안전이 위협받아서는 안 됩니다. 가해자가 휴대폰, 클라우드, 위치 공유를 확인할 수 있는 상황이라면, 안전한 연락 경로를 먼저 확보하세요. 안전한 기록 방법으로는: 신뢰할 수 있는 사람의 이메일이나 메신저로 사진을 전송한 뒤 내 기기에서 삭제하기, 날짜·시간·내용만 간단히 종이에 메모하기, 병원 방문 시 진료 기록에 상해 원인을 기록해 달라고 요청하기 등이 있습니다.',
        '1366에 전화하면 상담사가 폭력의 빈도와 심각성, 무기 접근 가능성, 가해자의 위협 수준 등을 함께 확인하면서 현재 위험 수준을 평가하고, 상황에 따라 경찰 출동 요청, 긴급 쉼터 배정, 의료 연결, 법률 상담 연계까지 한 번의 통화로 시작할 수 있습니다. "아직 신고할 준비가 안 됐다"고 해도 괜찮습니다 — 상담만 먼저 받고, 신고 여부는 나중에 결정해도 됩니다.',
      ],
      checklist: [
        '기기나 위치가 감시당하고 있는지 먼저 확인하고, 안전한 연락 경로 확보하기',
        '기록은 신뢰할 수 있는 사람에게 전송 후 삭제, 또는 종이 메모 — 병원 진료기록 활용도 가능',
        '1366에서는 신고 없이 상담만 먼저 받는 것도 가능, 위험도 평가 후 다음 단계 안내',
      ],
    },
    en: {
      title: 'Documenting violence and reporting — safety first, but safe documentation is possible',
      description:
        'How to secure a safe communication channel, document evidence without increasing risk, and what actually happens when you call 1366 in domestic violence and stalking situations.',
      paragraphs: [
        'The urge to collect evidence — recordings, photos, saved messages — can put you in greater danger if the person who hurts you discovers what you are doing. Evidence matters, but it should never come at the cost of your immediate safety. If your phone, cloud storage, or location sharing are being monitored, secure a safe communication channel first. Safe documentation methods include: sending photos to a trusted person\'s email or messenger and then deleting from your device, writing brief notes on paper with date, time, and description, or asking medical staff to record the cause of injury in your medical records when you visit a hospital.',
        'When you call 1366, the counselor assesses your current danger level — frequency and severity of violence, access to weapons, the abuser\'s threat level — and can initiate police dispatch, emergency shelter placement, medical connection, or legal consultation from a single call. It is fine to say "I am not ready to report yet." You can receive counseling first and decide about reporting later.',
      ],
      checklist: [
        'Check whether your devices or location are being monitored and secure a safe channel',
        'Document by sending to a trusted contact then deleting, paper notes, or asking for medical records',
        'Counseling through 1366 is possible without filing a report; danger assessment guides next steps',
      ],
    },
  },
  {
    slug: 'teen-self-harm-support',
    category: 'youth',
    ko: {
      title: '아이가 자해를 하고 있다고 말했을 때 — 부모가 해야 할 일과 하지 말아야 할 일',
      description:
        '놀라고 무섭겠지만, 지금 가장 위험한 반응은 화를 내거나 일방적으로 통제하려는 것입니다. 대화를 끊지 않으면서 안전을 확보하는 방법을 정리했습니다.',
      paragraphs: [
        '아이가 자해를 고백했을 때 부모의 첫 반응이 가장 중요합니다. "왜 그런 짓을 해", "그게 말이 되니", "그거 보여줘" — 이런 반응은 아이가 다시는 말하지 않게 만듭니다. 지금 필요한 것은 판단이 아니라, "말해줘서 고마워. 네가 얼마나 힘들었는지 같이 알아보자"입니다. 그리고 바로 다음에 확인해야 할 것은 지금 다칠 위험이 있는지, 최근에 자해를 했는지, 상처 치료가 필요한 수준인지입니다.',
        '감시나 처벌은 안전을 높이는 것이 아니라 신뢰를 무너뜨립니다. 다만, 위험한 물건(칼, 약, 라이터 등)을 잠시 다른 곳에 두는 것은 통제가 아니라 안전 계획의 일부입니다 — 가능하면 아이와 함께 합의하세요. 부모가 모든 답을 알고 있을 필요가 없습니다. 1388에 전화하면 "아이가 자해를 한다고 해서 부모로서 어떻게 해야 할지 모르겠다"고 말하면 됩니다. 상담사가 대화를 어떻게 이어갈지, 병원에 가야 하는지, 학교에 알려야 하는지를 함께 정리해 줍니다.',
      ],
      checklist: [
        '화를 내거나 일방적으로 통제하지 않기 — 대화가 끊기면 위험이 더 커짐',
        '위험한 물건을 합의하에 잠시 다른 곳에 두기 — 이것은 통제가 아닌 안전 계획',
        '1388에 부모로서 전화해서 다음 단계를 함께 정리하기',
      ],
    },
    en: {
      title: 'When your child says they are self-harming — what to do and what to avoid',
      description:
        'It is frightening, but the most dangerous response right now is anger or unilateral control. How to keep the conversation open while securing safety.',
      paragraphs: [
        'Your first reaction when a child discloses self-harm is the most important moment. "Why would you do that," "That makes no sense," "Show me" — these responses guarantee they will never tell you again. What is needed is not judgment but: "Thank you for telling me. I want to understand how hard things have been." Then check immediately: is there a risk of harm right now, have they self-harmed recently, and does any wound need medical attention.',
        'Surveillance and punishment do not increase safety — they destroy trust. However, temporarily moving dangerous items (knives, medication, lighters) out of reach is not control — it is part of a safety plan, and should be done collaboratively with your child when possible. You do not need to have all the answers. Call 1388 and say: "My child told me they are self-harming and I do not know what to do as a parent." The counselor will help you figure out how to continue the conversation, whether a hospital visit is needed, and whether the school should be informed.',
      ],
      checklist: [
        'Do not react with anger or unilateral control — losing the conversation increases risk',
        'Collaboratively move dangerous items out of reach — this is safety planning, not punishment',
        'Call 1388 as a parent to work through the next steps together',
      ],
    },
  },
  {
    slug: 'burnout-free-counseling',
    category: 'depression',
    ko: {
      title: '직장 번아웃 — "회사에 알려지지 않을까?"가 상담을 미루는 가장 큰 이유입니다',
      description:
        '회사에 알리지 않고 이용할 수 있는 무료·저비용 심리상담 경로 세 가지와, 각각의 비밀보장 방식을 비교했습니다. 번아웃이 우울증과 겹칠 경우 어떻게 다른지도 안내합니다.',
      paragraphs: [
        '번아웃으로 상담이 필요하다고 느끼면서도, "회사에 알려지면 어떡하지"라는 걱정 때문에 아무것도 하지 못하는 상태가 가장 흔한 막힘입니다. 결론부터 말하면, 정신건강복지센터와 심리상담 바우처는 직장에 통보되지 않습니다. 근로자지원프로그램(EAP)도 상담 내용은 회사에 공유되지 않지만, 회사를 통해 제공되는 서비스이므로 이용 사실 자체의 비밀보장 범위는 회사 정책에 따라 다를 수 있습니다. 번아웃은 ICD-11에서 "직업 현상"으로 분류되어 있고 정신장애 진단은 아니지만, 수면·집중·감정 조절에 심각한 영향을 주고 있다면 우울증이나 불안장애와 겹칠 수 있으므로, 상담을 통해 구분하는 것이 필요합니다.',
        '"퇴사해야 하나" 같은 큰 결론을 먼저 내리려고 하면 오히려 아무것도 못 합니다. 지금 해야 할 일은 하나입니다: 이번 주 안에 한 곳에 전화해서 초기 상담 일정을 잡는 것. 정신건강복지센터는 예약 없이 전화 상담이 가능한 곳도 있고, 대면 상담은 보통 1~2주 내 시작됩니다.',
      ],
      checklist: [
        '정신건강복지센터·바우처는 직장에 통보되지 않음을 확인하기',
        'EAP는 상담 내용 비공유, 이용 사실 비밀보장은 회사 정책 확인 필요',
        '번아웃과 우울증의 경계가 모호하면 상담을 통해 구분 — 이번 주 한 곳에 전화하는 것부터 시작',
      ],
    },
    en: {
      title: 'Work burnout — "Will my employer find out?" is the biggest reason people delay',
      description:
        'Three free or low-cost counseling routes available without employer notification in Korea, with a comparison of how each handles confidentiality. Also covers when burnout may overlap with depression.',
      paragraphs: [
        'The most common reason people with burnout delay seeking help is the fear that their employer will find out. To be direct: community mental health centers and the counseling voucher program do not notify your workplace. The Employee Assistance Program (EAP) does not share counseling content with your employer, but because it is an employer-provided benefit, whether your usage itself remains confidential depends on your company\'s specific policy. Burnout is classified as an "occupational phenomenon" in ICD-11, not a mental disorder diagnosis, but if it is severely affecting sleep, concentration, and emotional regulation, it may overlap with depression or anxiety — counseling can help distinguish between them.',
        'Trying to decide whether to quit your job before getting support puts the cart before the horse. The only action item right now is this: call one service this week and schedule an initial session. Some mental health centers accept walk-in phone consultations, and in-person sessions typically begin within one to two weeks.',
      ],
      checklist: [
        'Mental health centers and voucher counseling do not notify employers',
        'EAP keeps content private, but usage confidentiality varies by company policy',
        'If burnout and depression blur, counseling helps distinguish — start by calling one place this week',
      ],
    },
  },
  {
    slug: 'family-gambling-support',
    category: 'addiction',
    ko: {
      title: '가족이 도박을 멈추지 못할 때 — 본인보다 가족이 먼저 전화해야 하는 이유',
      description:
        '빚, 거짓말, 재발의 반복 속에서 가족이 할 수 있는 일과, 상담 없이 혼자 경계를 세우는 것이 왜 위험할 수 있는지를 정리했습니다.',
      paragraphs: [
        '도박 문제에서 가장 흔한 패턴은 이것입니다: 당사자가 "이번이 마지막"이라고 하고 → 가족이 빚을 대신 갚고 → 재발하고 → 가족이 더 큰 빚을 떠안는 순환. 빚을 대신 갚는 것이 결과적으로 도박을 지속시키는 구조가 될 수 있다는 점은 중독 상담에서 자주 다루는 주제입니다. 다만, 공동 명의 대출, 자녀 양육, 주거 안정 등 재정적으로 분리가 어려운 상황도 있고, 빚을 갚지 않겠다고 했을 때 폭력이 심해지는 경우도 있습니다. 그래서 이런 경계는 상담사와 함께 정해야 하며, 혼자 일방적으로 세우는 것이 항상 안전한 것은 아닙니다.',
        '한국도박문제관리센터(1336)에 전화하면 가족 상담을 직접 신청할 수 있습니다. 처음 전화할 때 "가족이 도박을 하고 있고, 빚이 반복되고 있는데, 가족으로서 어떻게 해야 하는지 상담받고 싶다"고 말하면 됩니다. 상담사는 지금 가족이 하고 있는 대응 중 어떤 것이 상황을 유지시키고 있는지, 어떤 경계가 현실적으로 가능한지, 폭력이나 안전 문제는 없는지를 함께 정리합니다. 당사자가 치료를 거부해도 가족 상담은 시작할 수 있고, 시작해야 합니다.',
      ],
      checklist: [
        '빚 대신 갚기가 도박을 유지시키는 패턴인지 상담사와 함께 점검하기',
        '경계를 세울 때는 재정 상황, 안전 문제, 자녀 영향을 함께 고려 — 상담 없이 혼자 결정하지 않기',
        '한국도박문제관리센터(1336)에 가족 상담 직접 신청, 폭력 위험 시 112나 1366 병행',
      ],
    },
    en: {
      title: 'When a family member cannot stop gambling — why the family should call first',
      description:
        'What families can do amid cycles of debt, lies, and relapse, and why setting boundaries alone without professional support can be risky.',
      paragraphs: [
        'The most common pattern in gambling addiction looks like this: the person says "this is the last time" → the family pays off the debt → relapse occurs → the family absorbs even larger debt. The fact that paying off debts can structurally sustain gambling is a frequent topic in addiction counseling. However, situations involving joint loans, childcare responsibilities, and housing stability can make financial separation difficult, and refusing to pay may sometimes escalate violence. This is why boundaries should be set with a counselor, not unilaterally — going it alone is not always safe.',
        'Call the Korea Center on Gambling Problems (1336) to request family counseling directly. On the first call, say: "A family member has a gambling problem, debt keeps recurring, and I want counseling on what I should do as a family member." The counselor will help identify which of the family\'s current responses may be sustaining the situation, what boundaries are realistically feasible, and whether there are any violence or safety concerns. Family counseling can and should begin even if the person refuses treatment.',
      ],
      checklist: [
        'Examine whether paying off debts is sustaining the cycle — with a counselor, not alone',
        'When setting boundaries, consider financial interdependence, safety, and children — do not decide alone',
        'Call 1336 to request family counseling directly; if there is violence, also contact 112 or 1366',
      ],
    },
  },
  {
    slug: 'foreigner-mental-health-korea',
    category: 'migrant',
    ko: {
      title: '한국에서 외국인이 심리상담을 받으려면 — 언어별·상황별 첫 연락처',
      description:
        '가능한 언어별로 어디에 먼저 전화하는지, 긴급 구조의 법적 보장, 그리고 긴급 이후 체류 관련 법률 상담을 함께 받아야 하는 이유를 정리했습니다.',
      paragraphs: [
        '한국에서 정신적으로 힘든 상황에 처한 외국인이 가장 먼저 부딪히는 벽은 "한국어로 내 상태를 설명할 수 없다"는 것입니다. 그래서 첫 단계는 상담 기관을 고르는 것이 아니라, 내가 사용할 수 있는 언어로 연결되는 곳을 찾는 것입니다. 다누리콜센터(1577-1366)는 13개 언어로 상담 가능하고, 외국인력상담센터(1644-0644)는 이주노동자 전문입니다. 긴급 상황이면 119에 전화하세요 — 통역 연결이 가능하며, 긴급 구조는 법적으로 체류 자격과 무관하게 제공됩니다.',
        '신고하면 추방당하지 않을까 하는 두려움 때문에 위기 상황에서도 전화를 못 하는 경우가 많습니다. 긴급 구조(119, 112)는 법적으로 누구에게나 보장되지만, 긴급 상황 이후 절차에서 체류 관련 질문이 나올 수 있습니다. 그래서 상황이 안정된 후 이주민 전문 법률 상담을 함께 받는 것이 중요합니다. 가정폭력 피해 이주여성의 경우 체류 자격과 관련된 법적 보호가 있을 수 있으므로, 법률 상담을 통해 구체적 요건을 확인하세요.',
      ],
      checklist: [
        '가능한 언어부터 확인: 다누리(1577-1366, 13개 언어), 외국인력상담(1644-0644)',
        '긴급 구조(119·112)는 법적으로 체류 자격 무관 — 다만 이후 절차에 대비해 법률 상담 병행',
        '가정폭력 피해 이주여성은 체류 자격 관련 법적 보호 가능성을 법률 상담으로 확인',
      ],
    },
    en: {
      title: 'Mental health support for foreigners in Korea — where to call by language and situation',
      description:
        'Which services are available by language, legal protections for emergency services, and why post-emergency legal consultation on residency matters.',
      paragraphs: [
        'The first barrier a foreigner in Korea faces during a mental health crisis is not the lack of services — it is "I cannot explain my situation in Korean." So the first step is not choosing a counseling center but finding one that connects in your language. The Danuri Call Center (1577-1366) offers counseling in 13 languages. The Foreign Workers Counseling Center (1644-0644) specializes in migrant labor issues. In an emergency, call 119 — interpreter services are available, and emergency rescue is legally guaranteed regardless of visa status.',
        'Fear of deportation prevents many migrants from calling even in emergencies. Emergency services (119, 112) are legally available to everyone, but residency-related questions may arise in post-emergency procedures. This is why seeking legal consultation through migrant-specialized services after the situation stabilizes is important. Marriage migrants experiencing domestic violence may have legal protections related to their residency status — confirm specific eligibility through legal consultation.',
      ],
      checklist: [
        'Find your language first: Danuri (1577-1366, 13 languages), Foreign Workers Center (1644-0644)',
        'Emergency services (119, 112) are legally guaranteed regardless of visa — plan for post-emergency legal advice',
        'Marriage migrants experiencing violence should confirm visa-related protections through legal consultation',
      ],
    },
  },
  {
    slug: 'older-adult-loneliness-support',
    category: 'elder',
    ko: {
      title: '혼자 사는 어르신이 걱정될 때 — "외로움"과 "위험"을 구분하는 기준',
      description:
        '며칠째 연락이 안 되거나, 식사를 거르거나, 집 안이 방치된 상태라면 — 단순한 외로움이 아닐 수 있습니다. 누가, 어디에, 어떻게 연락하고, 신고 후에는 어떤 절차가 진행되는지를 정리했습니다.',
      paragraphs: [
        '"괜찮다"고 하는 어르신이 실제로 괜찮지 않은 경우는 매우 많습니다. 도움을 거부하는 이유는 다양합니다: 자식에게 짐이 되기 싫다, 낯선 사람이 집에 오는 것이 싫다, 이미 체념한 상태다. 하지만 며칠째 식사를 거르거나, 약을 먹지 않거나, 집 안에 쓰레기가 쌓이거나, 계절에 맞지 않는 옷을 입고 있다면 — 그것은 "성격"이 아니라 돌봄이 필요한 상태입니다. 학대나 방임이 의심되면 노인보호전문기관(1577-1389)에 신고할 수 있고, 익명으로도 가능합니다.',
        '신고 후에는 전문 상담원이 현장 조사를 실시하여 어르신을 직접 만나 상황을 확인합니다. 어르신의 의사를 확인한 뒤, 필요에 따라 돌봄 서비스, 의료 연결, 보호 조치 등을 안내합니다. 어르신 동의 없이 강제 분리가 이뤄지는 경우는 생명에 급박한 위험이 있을 때로 제한됩니다. 학대까지는 아닌 것 같지만 혼자 지내는 것이 걱정된다면, 보건복지콜센터(129)에 전화해서 독거노인 돌봄 서비스(정기 방문, 안부 전화, 식사 배달, 응급안전서비스 등)를 요청할 수 있습니다. 가족이 아니어도 이웃, 관리인, 통장(이장)이 요청할 수 있습니다.',
      ],
      checklist: [
        '식사·약·위생·외출 여부 등 구체적 생활 신호를 먼저 확인하기',
        '학대·방임 의심 시 노인보호전문기관(1577-1389)에 익명 신고 가능 — 신고 후 현장조사 → 의사확인 → 서비스 연결',
        '돌봄 서비스 연결은 129에 전화 — 가족이 아닌 이웃도 요청 가능',
      ],
    },
    en: {
      title: 'When you are worried about an older person living alone — telling "lonely" from "at risk"',
      description:
        'If they have been unreachable for days, skipping meals, or their home is deteriorating — it may not be simple loneliness. Who contacts whom, how, and what happens after a report is filed.',
      paragraphs: [
        'Older adults who say "I am fine" are very often not fine. The reasons they refuse help vary: not wanting to burden their children, not wanting strangers in their home, having given up. But if someone is skipping meals for days, not taking medication, letting trash accumulate, or wearing clothes wrong for the season — that is not "personality." It is a state requiring care. If abuse or neglect is suspected, it can be reported to the Elder Protection Agency (1577-1389), and anonymous reporting is available.',
        'After a report, a specialized counselor conducts an on-site assessment, meeting with the older person to evaluate the situation. After confirming the person\'s wishes, they arrange appropriate services such as daily care, medical referrals, or protective placement as needed. Forced separation without consent is limited to situations involving immediate danger to life. If abuse is not suspected but isolation itself is concerning, call the Health and Welfare Call Center (129) to request elderly care services such as regular visits, welfare check calls, meal delivery, and emergency safety devices. You do not need to be a family member — neighbors, building managers, and community leaders can request these services.',
      ],
      checklist: [
        'Check specific daily-living indicators: meals, medication, hygiene, going outside',
        'If abuse or neglect is suspected, report to 1577-1389 (anonymous OK) — after report: on-site visit → confirm wishes → connect services',
        'For care service connection, call 129 — neighbors and non-family can also request',
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
