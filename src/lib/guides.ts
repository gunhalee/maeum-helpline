import { CATEGORY_META } from '@/lib/categories'
import { translateCategoryLabel, type Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type GuideIndexCopy = {
  title: string
  description: string
  intro: string
  urgentNotice: string
}

type GuideSourceLink = {
  label: string
  href: string
}

type GuideDetail = {
  title: string
  body?: string[]
  list?: string[]
}

type GuideEntryCopy = {
  serviceName: string
  title: string
  summary: string
  starterPhrases: string[]
  counselorChecks: string[]
  concerns: string[]
  ctaLabel: string
  details: GuideDetail[]
  sourceLinks: GuideSourceLink[]
}

type LocalizedGuideEntry = {
  slug: string
  category: Category
  ko: GuideEntryCopy
  en: GuideEntryCopy
}

export type GuideEntry = GuideEntryCopy & {
  slug: string
  category: Category
  categoryLabel: string
}

const GUIDE_INDEX_COPY: Record<Lang, GuideIndexCopy> = {
  ko: {
    title: '전화하기 전, 이것만 확인해도 괜찮아요',
    description:
      '도움을 요청할 때 처음 할 말을 안내합니다. 비용, 비밀 보장, 신고나 기관 연결 가능성도 확인할 수 있습니다.',
    intro:
      '상황을 완벽히 설명하지 않아도 됩니다. 처음에 할 말과 연락한 뒤 진행되는 일을 안내합니다.',
    urgentNotice:
      '지금 위험하거나 다쳤다면 112, 119가 가장 빠른 도움입니다.',
  },
  en: {
    title: 'Check only what you need before you call',
    description:
      'Read what you can say first and what a counselor may ask. Check costs, privacy, reports, and follow-up support.',
    intro:
      'You do not need to explain everything perfectly. These guides show what you can say first and what may happen after you call.',
    urgentNotice:
      'If you are in danger or someone is hurt, contact 112 or 119 first.',
  },
}

const GUIDE_ANCHOR_BY_CATEGORY: Record<Category, string> = {
  crisis: 'guide-119',
  depression: 'guide-109',
  women: 'guide-1366',
  youth: 'guide-1388',
  queer: 'guide-ddingdong',
  migrant: 'guide-danuri',
  elder: 'guide-elder-abuse-1389',
  addiction: 'guide-drug-1342',
  legal: 'guide-smile-center',
}

const GUIDE_ENTRIES: LocalizedGuideEntry[] = [
  {
    slug: 'guide-119',
    category: 'crisis',
    ko: {
      serviceName: '119',
      title: '몸이 위험하면 119에 먼저 연락하세요',
      summary:
        '의식, 호흡, 출혈, 약물, 심한 통증 중 걱정되는 것을 먼저 말해도 됩니다.',
      starterPhrases: [
        '사람이 쓰러져 있어요.',
        '숨쉬기 힘들고 가슴이 아파요.',
        '약을 많이 먹었어요.',
      ],
      counselorChecks: ['현재 위치', '의식·호흡·출혈·통증', '곁에서 할 수 있는 일'],
      concerns: [
        '응급 상황의 119 구급차는 무료입니다.',
        '주소를 모르면 주변 건물이나 가게 이름, 도로명을 말해도 됩니다.',
      ],
      ctaLabel: '위기·긴급 상담처 보기',
      details: [
        {
          title: '말하기 어렵다면',
          list: [
            '문자 신고나 119 신고 앱을 쓸 수 있습니다.',
            '현재 위치, 일어난 일, 사람의 상태를 짧게 적어도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상황에 따라 구급대가 출동합니다.',
            '필요하면 구급대가 가까운 응급실로 데려갑니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '소방청 119 구급신고 요령',
          href: 'https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/',
        },
        {
          label: '찾기쉬운 생활법령정보 구급차 이용',
          href: 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=2&cnpClsNo=1&csmSeq=906',
        },
      ],
    },
    en: {
      serviceName: '119',
      title: 'If physical safety is at risk, call 119 first',
      summary:
        'You do not need to be sure that it is an emergency. You can start with concerns about consciousness, breathing, bleeding, medication, or severe pain.',
      starterPhrases: [
        'I am not sure if this is an emergency, but someone collapsed.',
        'They are having trouble breathing and chest pain.',
        'They may have taken too much medication.',
      ],
      counselorChecks: ['Your location', 'Consciousness, breathing, bleeding, or pain', 'What someone nearby can do now'],
      concerns: [
        'A 119 ambulance is free in emergencies.',
        'If you do not know the address, you can describe nearby signs or buildings.',
        'If violence or crime is also happening, 112 may be needed too.',
      ],
      ctaLabel: 'View crisis support',
      details: [
        {
          title: 'If speaking is hard',
          list: [
            'Text reporting or the 119 app may be available.',
            'Give the location. Briefly describe what happened and the person\'s condition.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'Responders may come to the scene and provide emergency care.',
            'If necessary, responders may take the person to a nearby emergency facility.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'National Fire Agency: 119 reporting guide',
          href: 'https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/',
        },
        {
          label: 'Easy Law: ambulance use',
          href: 'https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=2&cnpClsNo=1&csmSeq=906',
        },
      ],
    },
  },
  {
    slug: 'guide-109',
    category: 'depression',
    ko: {
      serviceName: '109',
      title: '마음이 위험할 때는 109부터 시작해도 돼요',
      summary:
        '혼자 있기가 무섭거나 오늘 밤을 버티기 어렵다면 그 말부터 해도 됩니다.',
      starterPhrases: [
        '혼자 버티기가 어려워요.',
        '혼자 있기가 무서워요.',
        '불안하고 무서워요.',
      ],
      counselorChecks: ['지금 혼자인지', '주변을 더 안전하게 할 수 있는지', '오늘 밤을 버틸 방법'],
      concerns: [
        '24시간 무료입니다.',
        '상담원은 상담 내용을 기본적으로 비밀로 다룹니다.',
      ],
      ctaLabel: '우울·자살예방 상담처 보기',
      details: [
        {
          title: '말을 정리하기 어렵다면',
          list: [
            '상담원이 안전 여부부터 확인합니다.',
            '울거나 말이 멈춰도 괜찮습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상담원과 지금 버틸 방법을 함께 정리합니다.',
            '필요하면 상담원이 지역 정신건강복지센터나 자살예방센터로 연결합니다.',
          ],
        },
      ],
      sourceLinks: [
        { label: '보건복지상담센터 109', href: 'https://www.129.go.kr/109' },
        {
          label: '자살예방상담전화 FAQ',
          href: 'https://www.129.go.kr/faq/faq06.do?searchConsultingKeyword=F01',
        },
      ],
    },
    en: {
      serviceName: '109',
      title: 'You can start with 109 when you feel unsafe with yourself',
      summary:
        'You can say that you are afraid to be alone or do not feel safe with yourself. You can also say that you do not know how to get through tonight.',
      starterPhrases: [
        'I am having a hard time staying safe with myself.',
        'I am afraid to be alone right now.',
        'I do not know how to explain this, but I do not feel safe.',
      ],
      counselorChecks: ['Whether you are alone', 'Whether anything nearby could put you in danger', 'What can make tonight safer'],
      concerns: [
        '109 is available 24/7 and free to contact.',
        'The counselor normally keeps the counseling details confidential.',
        'If the risk to life or safety is high, the counselor may contact other support services.',
      ],
      ctaLabel: 'View depression support',
      details: [
        {
          title: 'If it is hard to find words',
          list: [
            'The counselor can start by checking safety.',
            'It is okay to cry, pause, or say only what you can say now.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'You may make a short plan to get through the next few moments.',
            'If necessary, the counselor may connect you to local mental health or suicide prevention support.',
          ],
        },
      ],
      sourceLinks: [
        { label: '109 suicide prevention hotline', href: 'https://www.129.go.kr/109' },
        {
          label: '109 FAQ',
          href: 'https://www.129.go.kr/faq/faq06.do?searchConsultingKeyword=F01',
        },
      ],
    },
  },
  {
    slug: 'guide-1366',
    category: 'women',
    ko: {
      serviceName: '여성긴급전화 1366',
      title: '일이 커질까 걱정될 때는 1366에 먼저 물어봐도 돼요',
      summary:
        '지금 폭력이 진행 중이지 않아도 상담받을 수 있습니다. 안전, 보호, 신고, 쉼터에 관해 물어봐도 됩니다.',
      starterPhrases: [
        '신고보다 우선 상담만 받고 싶어요.',
        '상대가 근처에 있어서 말해도 되는지 모르겠어요.',
        '오늘 밤 어디에 있어야 할지 모르겠어요.',
      ],
      counselorChecks: ['지금 안전하게 말할 수 있는지', '상대가 가까이 있는지', '다친 곳이나 머물 곳이 있는지'],
      concerns: [
        '24시간 상담만 받아도 됩니다.',
        '상담원과 보호시설, 의료, 법률, 신고 방법을 함께 정리합니다.',
        '신고 전에도 필요한 지원을 물어봐도 됩니다.',
      ],
      ctaLabel: '여성 상담처 보기',
      details: [
        {
          title: '전화가 어렵다면',
          list: [
            '문자, 게시판, 이메일 상담을 안내받을 수 있습니다.',
            '안전한 기기와 장소에서 연락하는 것이 좋습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '신고 여부를 정하기 전에 받을 수 있는 지원을 먼저 확인합니다.',
            '긴급피난이나 보호시설이 필요한지 확인합니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '성평등가족부 여성긴급전화 1366',
          href: 'https://www.mogef.go.kr/sp/hrp/sp_hrp_f002.do',
        },
        { label: '여성폭력 사이버 상담', href: 'https://www.women1366.kr/?menuno=227' },
      ],
    },
    en: {
      serviceName: 'Women Emergency Hotline 1366',
      title: 'You can ask 1366 before you decide what to do',
      summary:
        'You can ask about safety, reports, shelter, and other support. Violence does not have to be happening now.',
      starterPhrases: [
        'I do not know if I want to report. I want counseling first.',
        'The person is nearby, and I am not sure it is safe to talk.',
        'I do not know where I can stay tonight.',
      ],
      counselorChecks: ['Whether it is safe to talk', 'Whether the other person is nearby', 'Injury, shelter, or immediate safety needs'],
      concerns: [
        'You can receive counseling 24/7.',
        'The counselor can help you find shelter, medical support, legal support, or ways to make a report.',
        'Before you decide whether to make a report, you can check the available support.',
      ],
      ctaLabel: 'View support for women',
      details: [
        {
          title: 'If calling is hard',
          list: [
            'You may be able to use text messages, message boards, email, or other online services.',
            'Use a safe device and place when possible.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The counselor can help you find support without forcing you to make a report.',
            'The counselor can check whether you need emergency shelter or protection.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'Ministry guide to 1366',
          href: 'https://www.mogef.go.kr/sp/hrp/sp_hrp_f002.do',
        },
        { label: 'Online counseling about violence against women', href: 'https://www.women1366.kr/?menuno=227' },
      ],
    },
  },
  {
    slug: 'guide-1388',
    category: 'youth',
    ko: {
      serviceName: '청소년상담 1388',
      title: '1388은 청소년 본인이 먼저 연락해도 괜찮아요',
      summary:
        '부모님께 말하기 어렵다면 지금 힘든 것부터 말해도 됩니다.',
      starterPhrases: [
        '부모님께 말하기 전에 먼저 상담하고 싶어요.',
        '학교폭력인지 모르겠는데 계속 무서워요.',
        '집에 있기 어렵고 갈 곳을 모르겠어요.',
      ],
      counselorChecks: ['나이와 현재 위치', '지금 안전한지', '믿을 어른이나 머물 곳이 있는지'],
      concerns: [
        '전화, 문자, 온라인으로 시작할 수 있습니다.',
        '부모, 친구, 선생님도 문의할 수 있습니다.',
        '보호자에게 말하기 전에 상담원과 상황을 정리해도 됩니다.',
      ],
      ctaLabel: '청소년 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 모두 말하지 않아도 됩니다.',
            '상담원은 안전 여부부터 확인합니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '필요하면 상담원이 지역 청소년상담복지센터나 보호 지원으로 연결합니다.',
            '학교폭력, 가출, 자해 위험, 가족 갈등도 함께 정리합니다.',
          ],
        },
      ],
      sourceLinks: [
        { label: '청소년1388', href: 'https://www.1388.go.kr/' },
        {
          label: 'e청소년 청소년 상담',
          href: 'https://www.youth.go.kr/youth/eYouth/leftSelect.do?menuSn=388',
        },
      ],
    },
    en: {
      serviceName: 'Youth Counseling 1388',
      title: 'A young person can contact 1388 first',
      summary:
        'It may be hard to tell a parent or to know where to start. You can first talk about what is hard for you now.',
      starterPhrases: [
        'I want to talk before I tell my parents.',
        'I am not sure if this is school violence, but I feel scared.',
        'It is hard to stay at home, and I do not know where to go.',
      ],
      counselorChecks: ['Your age and where you are now', 'Whether you are safe now', 'Whether there is a trusted adult or safe place'],
      concerns: [
        'You can start by phone, text, or online counseling.',
        'Parents, friends, and teachers can also ask for guidance.',
        'Before you decide how to tell an adult, you can talk through the situation with a counselor.',
      ],
      ctaLabel: 'View youth support',
      details: [
        {
          title: 'Before you talk',
          list: [
            'You do not need to explain everything at the start.',
            'The counselor can first check whether you are safe.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The counselor may connect you to a local youth counseling or protection service.',
            'You and the counselor can discuss school violence, running away, self-harm risk, or family conflict.',
          ],
        },
      ],
      sourceLinks: [
        { label: 'Youth 1388', href: 'https://www.1388.go.kr/' },
        {
          label: 'e-Youth counseling guide',
          href: 'https://www.youth.go.kr/youth/eYouth/leftSelect.do?menuSn=388',
        },
      ],
    },
  },
  {
    slug: 'guide-ddingdong',
    category: 'queer',
    ko: {
      serviceName: '청소년 성소수자 지원센터 띵동',
      title: '띵동에 아웃팅 걱정부터 말해도 됩니다',
      summary:
        '정체성, 커밍아웃, 가족 갈등, 차별에 관해 말해도 됩니다. 주거와 안전 문제도 말해도 됩니다. 상담원은 이런 고민을 판단하지 않습니다.',
      starterPhrases: [
        '아웃팅될까 무서워서 말하지 못했어요.',
        '커밍아웃 뒤 집에 있기 어려워졌어요.',
        '성소수자 친화 상담을 찾고 싶어요.',
      ],
      counselorChecks: ['편한 이름이나 호칭', '지금 안전한지', '상담·주거·의료·법률 중 급한 것'],
      concerns: [
        '상담원은 상담 내용을 기본적으로 비밀로 다룹니다.',
        '청소년 성소수자로서 겪는 상황을 말해도 됩니다.',
        '필요하면 주거, 의료, 법률 지원도 함께 찾습니다.',
      ],
      ctaLabel: '성소수자 상담처 보기',
      details: [
        {
          title: '상담에서 다룰 수 있는 것',
          list: [
            '정체성, 커밍아웃, 가족·학교·관계 문제를 말해도 됩니다.',
            '의료, 법률, 주거, 위기 지원 정보도 함께 찾습니다.',
          ],
        },
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 실명이나 모든 정보를 말할 필요는 없습니다.',
            '안전한 연락 방식과 시간을 먼저 정해도 됩니다.',
            '화~토 11:00–21:00에 운영합니다. 일요일·월요일·공휴일은 쉽니다.',
            '전화 문의는 02-924-1224로 할 수 있습니다.',
            '정규 상담을 받으려면 공식 상담 안내에 있는 카카오톡 채널로 신청하세요. 신청한 뒤 상담 일정을 조율합니다.',
          ],
        },
      ],
      sourceLinks: [
        { label: '띵동 상담과 지원', href: 'https://ddingdong.kr/counsel' },
        { label: '띵동 상담 통계', href: 'https://ddingdong.kr/Consultationreport' },
      ],
    },
    en: {
      serviceName: 'LGBTIQ Youth Support Center DDing Dong',
      title: 'You can tell DDing Dong about your fear of outing',
      summary:
        'You can discuss identity, coming out, family conflict, discrimination, housing, or safety. You do not have to prove your situation.',
      starterPhrases: [
        'I am scared of being outed, so I have not told anyone.',
        'After coming out, it became hard to stay at home.',
        'I want queer-friendly counseling.',
      ],
      counselorChecks: ['The name or words you prefer', 'Whether you are safe now', 'Whether counseling, housing, medical, or legal support is urgent'],
      concerns: [
        'The counselor normally keeps the counseling details confidential.',
        'You can describe your experience as an LGBTQ+ young person. You do not need to explain everything first.',
        'You and the counselor can look for housing, medical, legal, or other support.',
      ],
      ctaLabel: 'View LGBTQ+ support',
      details: [
        {
          title: 'What you can discuss',
          list: [
            'Identity, coming out, family, school, relationship, and discrimination concerns.',
            'If necessary, you and the counselor can look for medical, legal, housing, or crisis support information.',
          ],
        },
        {
          title: 'Before you talk',
          list: [
            'You do not need to give your legal name or every detail at the start.',
            'You can first decide a safe contact method and time.',
            'Opening hours are Tue–Sat 11:00–21:00 Korea time, excluding public holidays. Closed on Sundays and Mondays.',
            'For phone inquiries, call 02-924-1224.',
            'For regular counseling, apply through the KakaoTalk channel on the official counseling page. After you apply, arrange a counseling time.',
          ],
        },
      ],
      sourceLinks: [
        { label: 'DDing Dong counseling and support', href: 'https://ddingdong.kr/counsel' },
        { label: 'DDing Dong counseling statistics', href: 'https://ddingdong.kr/Consultationreport' },
      ],
    },
  },
  {
    slug: 'guide-danuri',
    category: 'migrant',
    ko: {
      serviceName: '다누리콜센터 1577-1366',
      title: '한국어가 편하지 않을 때는 다누리에 물어볼 수 있어요',
      summary:
        '가족, 체류, 폭력, 생활 문제를 여러 언어로 상담할 수 있습니다.',
      starterPhrases: [
        '한국어가 어려워요.',
        '가족 문제를 어디에 말해야 할지 모르겠어요.',
        '체류나 생활 정보가 필요해요.',
      ],
      counselorChecks: ['필요한 언어', '지금 있는 지역', '가족·체류·폭력·생활 중 어떤 문제인지'],
      concerns: [
        '대표번호는 365일 24시간 운영합니다. 한국어·영어·중국어 등 15개 언어를 지원합니다.',
        '다문화가족과 이주민이 생활 정보를 물어봐도 됩니다.',
        '필요한 언어부터 말해도 됩니다.',
      ],
      ctaLabel: '이주민·외국인 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '상담 언어와 시간은 바뀔 수 있습니다. 공식 안내를 확인하세요.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '생활 정보, 가족 문제, 폭력 피해, 기관 연결을 정리합니다.',
            '필요하면 다른 공공기관 상담으로 이어질 수 있습니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '다문화가족지원포털 다누리콜센터',
          href: 'https://www.liveinkorea.kr/web/lay1/S1T40C44/contents.do',
        },
      ],
    },
    en: {
      serviceName: 'Danuri Call Center 1577-1366',
      title: 'Danuri can help if Korean is difficult for you',
      summary:
        'Is it hard to explain family, immigration, violence, or daily life problems in Korean? You can start with multilingual counseling and interpretation.',
      starterPhrases: [
        'I need interpretation because Korean is difficult for me.',
        'I want to talk about a family problem, but I do not know where to ask.',
        'I need information about stay or daily life in Korea.',
      ],
      counselorChecks: ['The language you need', 'Where you are in Korea', 'Whether the problem is about family, immigration, violence, or daily life'],
      concerns: [
        'The main line operates 24/7. It supports 15 languages, including Korean, English, and Chinese.',
        'Marriage migrants, migrants, and foreign families can ask about daily-life support.',
        'You can start by saying which language you need.',
      ],
      ctaLabel: 'View migrant support',
      details: [
        {
          title: 'Before you talk',
          list: [
            'Available languages and hours can change. When possible, check the official guide.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'You and the counselor can discuss daily life, family problems, and violence. You can also find services for support.',
            'If necessary, the counselor may connect you to another public service or interpretation support.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'Danuri Call Center',
          href: 'https://www.liveinkorea.kr/web/lay1/S1T40C44/contents.do',
        },
      ],
    },
  },
  {
    slug: 'guide-elder-abuse-1389',
    category: 'elder',
    ko: {
      serviceName: '노인학대 신고·상담 1577-1389',
      title: '학대인지 몰라도 1577-1389에 물어볼 수 있어요',
      summary:
        '방임, 폭언, 폭력, 경제적 착취, 돌봄 공백이 걱정되면 먼저 말해볼 수 있습니다.',
      starterPhrases: [
        '학대인지 모르겠지만 걱정돼요.',
        '혼자 계신 어르신이 돌봄을 못 받는 것 같아요.',
        '돈이나 통장을 빼앗기는 것 같아요.',
      ],
      counselorChecks: ['어르신이 있는 곳', '지금 위험한지', '누가 어떤 행동을 하는지'],
      concerns: [
        '상담과 신고 모두 가능합니다.',
        '학대가 의심되는 단계에서도 문의해도 됩니다.',
        '가족이 아니어도 문의할 수 있습니다.',
      ],
      ctaLabel: '노인 상담처 보기',
      details: [
        {
          title: '상담에서 말할 수 있는 것',
          list: [
            '방임, 정서적 학대, 경제적 착취도 말해도 됩니다.',
            '가족, 이웃, 돌봄 제공자도 상담을 요청해도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '필요하면 노인보호전문기관이 상황을 확인합니다. 상황에 따라 보호, 응급조치, 지역 지원으로 연결합니다.',
            '어르신의 안전과 의사를 함께 확인합니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '찾기쉬운 생활법령정보 노인보호전문기관',
          href: 'https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=97&onhunqueSeq=5895',
        },
        {
          label: '모바일 생활법령 노인학대 신고',
          href: 'https://m.easylaw.go.kr/MOB/CsmInfoRetrieve.laf?ccfNo=3&cciNo=1&cnpClsNo=1&csmSeq=1660',
        },
      ],
    },
    en: {
      serviceName: 'Elder abuse report and counseling 1577-1389',
      title: 'You can ask 1577-1389 even if you are not sure it is abuse',
      summary:
        'You can discuss neglect, verbal abuse, violence, financial exploitation, or a lack of care. You do not need to know the exact name for the problem.',
      starterPhrases: [
        'I am not sure this is abuse, but I am worried.',
        'An older adult seems to be alone without care.',
        'I am worried someone is taking their money or bankbook.',
      ],
      counselorChecks: ['Where the older adult is', 'Whether there is danger now', 'Who is doing what'],
      concerns: [
        'If you suspect abuse, you can ask for counseling or make a report.',
        'An elder protection agency may check the situation and arrange protection.',
        'Family members, neighbors, and other people nearby can ask for help.',
      ],
      ctaLabel: 'View older adult support',
      details: [
        {
          title: 'What you can discuss',
          list: [
            'You can discuss neglect, emotional abuse, financial exploitation, and physical violence.',
            'Family, neighbors, or care providers can ask for guidance.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The agency may visit to check the situation. It may arrange protection, emergency action, or local support.',
            'The agency should consider the older adult\'s safety and wishes together.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'Easy Law: elder protection agency',
          href: 'https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=97&onhunqueSeq=5895',
        },
        {
          label: 'Mobile Easy Law: elder abuse report',
          href: 'https://m.easylaw.go.kr/MOB/CsmInfoRetrieve.laf?ccfNo=3&cciNo=1&cnpClsNo=1&csmSeq=1660',
        },
      ],
    },
  },
  {
    slug: 'guide-drug-1342',
    category: 'addiction',
    ko: {
      serviceName: '마약 상담 용기한걸음센터 1342',
      title: '처벌이 무서워도 1342로 상담할 수 있어요',
      summary:
        '약물 사용이나 재사용이 걱정되면 치료와 회복 방법을 물어봐도 됩니다. 가족의 약물 문제도 물어봐도 됩니다.',
      starterPhrases: [
        '신고될까 무서운데 상담받고 싶어요.',
        '다시 사용할까 봐 걱정돼요.',
        '가족이 사용하는 것 같아 제가 먼저 상담받고 싶어요.',
      ],
      counselorChecks: ['어떤 물질인지', '최근 사용과 몸 상태', '혼자인지, 치료·회복 지원을 원하는지'],
      concerns: [
        '24시간 무료 상담입니다.',
        '상담 내용과 개인정보는 비밀로 다룹니다.',
        '상담으로 법적 결과를 약속할 수는 없습니다. 치료나 재활을 받을 방법은 찾을 수 있습니다.',
      ],
      ctaLabel: '중독 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 사용 이력을 모두 말하지 않아도 됩니다.',
            '본인, 가족, 지인도 상담받아도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상담을 통해 치료보호기관, 재활기관, 지역 회복 지원으로 연결될 수 있습니다.',
            '다시 사용했거나 멈추지 못해도 상담받아도 됩니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '식품의약품안전처 1342 보도자료',
          href: 'https://www.mfds.go.kr/brd/m_99/view.do?seq=48141',
        },
        {
          label: '연합뉴스 1342 상담 현황',
          href: 'https://www.yna.co.kr/view/AKR20240522046200017',
        },
      ],
    },
    en: {
      serviceName: 'Drug counseling 1342 Courage One Step Center',
      title: 'You can tell 1342 about your fear of punishment',
      summary:
        'You can ask about treatment and recovery support for drug use. You can also discuss relapse concerns or a family member\'s drug use.',
      starterPhrases: [
        'I am afraid this will be reported, but I want counseling.',
        'I am worried I will use again.',
        'I think my family member is using, and I want counseling first.',
      ],
      counselorChecks: ['What substance is involved', 'Recent use and physical condition', 'Whether you are alone and want treatment or recovery support'],
      concerns: [
        'You can start with free 24-hour counseling.',
        'The service describes counseling details and personal information as confidential.',
        'The counselor cannot promise a legal outcome. You and the counselor can look for treatment and rehabilitation services.',
      ],
      ctaLabel: 'View addiction support',
      details: [
        {
          title: 'Before you talk',
          list: [
            'Before the first call, you do not need a complete history of your drug use.',
            'People who use drugs, their families, and people they know can ask for help.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The counselor may connect you to treatment protection, rehabilitation, or local recovery support.',
            'If you use drugs again or cannot stop, you can still contact the service.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'MFDS 1342 press release',
          href: 'https://www.mfds.go.kr/brd/m_99/view.do?seq=48141',
        },
        {
          label: 'Yonhap on 1342 counseling',
          href: 'https://www.yna.co.kr/view/AKR20240522046200017',
        },
      ],
    },
  },
  {
    slug: 'guide-smile-center',
    category: 'legal',
    ko: {
      serviceName: '스마일센터',
      title: '스마일센터는 신고 뒤 회복을 도와요',
      summary:
        '범죄피해 뒤 잠, 마음, 일상에 어려움이 있으면 물어봐도 됩니다. 가족의 안정이 흔들릴 때도 물어봐도 됩니다.',
      starterPhrases: [
        '신고 뒤로 잠을 못 자요.',
        '그 뒤로 일상이 어려워요.',
        '이용할 수 있는 지원이 궁금해요.',
      ],
      counselorChecks: ['지금 안전한지', '잠·식사·일상이 어떤지', '상담·치료·법률·수사 지원 중 필요한 것'],
      concerns: [
        '스마일센터 서비스는 무료입니다.',
        '강력범죄 피해자와 가족이 이용할 수 있습니다.',
        '신고 절차와 별개로 회복 지원을 물어봐도 됩니다.',
      ],
      ctaLabel: '범죄피해 상담처 보기',
      details: [
        {
          title: '상담에서 다룰 수 있는 것',
          list: [
            '심리평가, 상담, 치료 연계를 물어봐도 됩니다.',
            '임시거처, 법률상담, 복지 지원도 확인해도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '대표번호 1551-1275로 24시간 전화접수·상담을 받을 수 있습니다.',
            '등록면담·심리치료는 평일 09:00~18:00에 진행합니다.',
            '피해자지원센터, 수사기관, 법률 지원과 연결될 수 있습니다.',
          ],
        },
      ],
      sourceLinks: [
        { label: '스마일센터 이용안내', href: 'https://resmile.or.kr/pages/?p=9' },
        {
          label: '법무부 스마일센터 피해자지원 제도',
          href: 'https://www.moj.go.kr/cvs/2723/subview.do',
        },
        { label: '스마일센터 FAQ', href: 'https://resmile.or.kr/pages/?b=B_1_6&p=11' },
      ],
    },
    en: {
      serviceName: 'Smile Center',
      title: 'Smile Center helps with recovery after a crime report',
      summary:
        'Has a crime affected your sleep, emotions, daily life, or family stability? You can ask about support for recovery.',
      starterPhrases: [
        'I reported it, but I have not been sleeping well.',
        'Daily life has been hard since then.',
        'I want to know what support I can use.',
      ],
      counselorChecks: ['Whether you are safe now', 'How the crime has affected your sleep, meals, or daily life', 'Whether you need counseling, treatment, legal support, or support during an investigation'],
      concerns: [
        'The center describes its services as free.',
        'The service is for victims of violent crime and their families.',
        'You can discuss recovery support separately from the process for a crime report.',
      ],
      ctaLabel: 'View victim support',
      details: [
        {
          title: 'What you can discuss',
          list: [
            'Psychological assessment, stabilization counseling, therapy, and psychiatry referral.',
            'You may also discuss temporary housing, legal counseling, and connections to social support.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'Call the main number, 1551-1275, for 24/7 telephone intake and counseling.',
            'Registration interviews and psychological treatment run on weekdays from 09:00 to 18:00 Korea time.',
            'The center may connect you to victim support centers, investigation agencies, or legal aid.',
          ],
        },
      ],
      sourceLinks: [
        { label: 'Smile Center user guide', href: 'https://resmile.or.kr/pages/?p=9' },
        {
          label: 'Ministry of Justice Smile Center support',
          href: 'https://www.moj.go.kr/cvs/2723/subview.do',
        },
        { label: 'Smile Center FAQ', href: 'https://resmile.or.kr/pages/?b=B_1_6&p=11' },
      ],
    },
  },
]

export function getGuidePageCopy(lang: Lang): GuideIndexCopy {
  return GUIDE_INDEX_COPY[lang]
}

export function getGuideAnchorForCategory(category: Category): string {
  return GUIDE_ANCHOR_BY_CATEGORY[category]
}

export function getGuides(lang: Lang): GuideEntry[] {
  return GUIDE_ENTRIES.map((entry) => ({
    slug: entry.slug,
    category: entry.category,
    categoryLabel: translateCategoryLabel(CATEGORY_META[entry.category].label, lang),
    ...entry[lang],
  }))
}
