import { CATEGORY_META } from '@/lib/categories'
import { translateCategoryLabel, type Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'

type GuideIndexCopy = {
  title: string
  description: string
  intro: string
  urgentNotice: string
  focusPoints: string[]
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
      '첫마디, 비용, 비밀, 신고·연계 가능성을 짧게 정리한 가이드입니다.',
    intro:
      '상황을 완벽히 설명하지 않아도 됩니다. 지금 말할 첫마디와 연결 뒤 일을 짧게 보여줍니다.',
    urgentNotice:
      '지금 위험하거나 다쳤다면 112, 119가 가장 빠른 도움입니다.',
    focusPoints: ['처음 할 말', '상담원이 확인할 것', '걱정되는 점'],
  },
  en: {
    title: 'Check only what you need before you call',
    description:
      'Short guides for what to say first, what a counselor may ask, cost, privacy, reporting, and follow-up when contacting Korean helplines.',
    intro:
      'You do not need a perfect explanation. These guides are not a test of whether you qualify. They show a first sentence, what may happen next, and the main things people worry about.',
    urgentNotice:
      'If physical safety is at risk, or someone is already hurt, 112 or 119 may be faster help. You can return after immediate danger passes.',
    focusPoints: ['First words', 'What they may check', 'Common worries'],
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
      title: '몸이 위험할 때는 119에 먼저 연락해요',
      summary:
        '의식, 호흡, 출혈, 약물, 심한 통증이 걱정되면 먼저 말해도 됩니다.',
      starterPhrases: [
        '사람이 쓰러져 있어요.',
        '숨쉬기 힘들고 가슴이 아파요.',
        '약을 많이 먹었어요.',
      ],
      counselorChecks: ['현재 위치', '의식·호흡·출혈·통증', '곁에서 할 수 있는 일'],
      concerns: [
        '응급 상황의 119 구급차는 무료입니다.',
        '주소를 몰라도 주변 건물, 가게, 도로명을 말하면 됩니다.',
      ],
      ctaLabel: '위기·긴급 상담처 보기',
      details: [
        {
          title: '말하기 어렵다면',
          list: [
            '문자 신고나 119 신고 앱을 쓸 수 있습니다.',
            '위치, 무슨 일, 사람 상태만 짧게 적어도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상황에 따라 구급대가 출동합니다.',
            '필요하면 가까운 응급실로 이송됩니다.',
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
      title: '119 is the first number when physical safety is at risk',
      summary:
        'You do not need to be sure it is an emergency. If consciousness, breathing, bleeding, medication, or severe pain is involved, start there.',
      starterPhrases: [
        'I am not sure if this is an emergency, but someone collapsed.',
        'They are having trouble breathing and chest pain.',
        'They may have taken too much medication.',
      ],
      counselorChecks: ['Your location', 'Consciousness, breathing, bleeding, or pain', 'What someone nearby can do now'],
      concerns: [
        'A 119 ambulance is free in emergencies.',
        'If you do not know the exact address, nearby signs or buildings can help.',
        'If violence or crime is also happening, 112 may be needed too.',
      ],
      ctaLabel: 'Open crisis services',
      details: [
        {
          title: 'If speaking is hard',
          list: [
            'Text reporting or the 119 app may be available.',
            'Keep it short: location, what happened, and the person’s condition.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'Responders may come to the scene and provide emergency care.',
            'If needed, the person may be taken to a nearby emergency facility.',
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
        '혼자 있기 무섭거나 오늘 밤이 어렵다면 그 말부터 해도 됩니다.',
      starterPhrases: [
        '혼자 버티기가 어려워요.',
        '혼자 있기가 무서워요.',
        '불안하고 무서워요.',
      ],
      counselorChecks: ['지금 혼자인지', '주변을 더 안전하게 할 수 있는지', '오늘 밤을 버틸 방법'],
      concerns: [
        '24시간 무료입니다.',
        '상담 내용은 기본적으로 비밀이 보장됩니다.',
      ],
      ctaLabel: '우울·자살예방 상담처 보기',
      details: [
        {
          title: '말이 정리되지 않아도',
          list: [
            '상담원이 안전 여부부터 확인합니다.',
            '울거나 말이 멈춰도 괜찮습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '지금 버틸 방법을 함께 정리합니다.',
            '필요하면 지역 정신건강복지센터나 자살예방센터로 이어집니다.',
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
        'You can begin with being afraid to be alone, not knowing how to get through tonight, or feeling unsafe with yourself.',
      starterPhrases: [
        'I am having a hard time staying safe with myself.',
        'I am afraid to be alone right now.',
        'I do not know how to explain this, but I do not feel safe.',
      ],
      counselorChecks: ['Whether you are alone', 'Whether anything nearby could make things less safe', 'How tonight can be made safer'],
      concerns: [
        '109 is available 24/7 and free to contact.',
        'Counseling is handled confidentially by default.',
        'If life or safety risk is high, other help may be connected.',
      ],
      ctaLabel: 'Open depression and suicide prevention services',
      details: [
        {
          title: 'If your words are not organized',
          list: [
            'The counselor can start by checking safety.',
            'It is okay to cry, pause, or say only what you can say now.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'You may make a short plan for getting through the immediate moment.',
            'If needed, you may be connected to local mental health or suicide prevention support.',
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
        '폭력이 지금 진행 중이지 않아도 안전·보호·신고·쉼터를 어떡할지 물어봐도 됩니다.',
      starterPhrases: [
        '신고보다 우선 상담만 받고 싶어요.',
        '상대가 근처에 있어서 말해도 되는지 모르겠어요.',
        '오늘 밤 어디에 있어야 할지 모르겠어요.',
      ],
      counselorChecks: ['지금 안전하게 말할 수 있는지', '상대가 가까이 있는지', '다친 곳이나 머물 곳이 있는지'],
      concerns: [
        '24시간 상담만 받아도 됩니다.',
        '보호시설, 의료, 법률, 신고 선택지를 함께 정리합니다.',
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
            '신고 여부를 정하기 전 지원부터 정리합니다.',
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
      title: '1366 can be a first question before you decide what to do',
      summary:
        'Even if violence is not happening this second, you can ask about safety, reporting, shelter, and support options.',
      starterPhrases: [
        'I do not know if I want to report. I want counseling first.',
        'The person is nearby, and I am not sure it is safe to talk.',
        'I do not know where I can stay tonight.',
      ],
      counselorChecks: ['Whether it is safe to talk', 'Whether the other person is nearby', 'Injury, shelter, or immediate safety needs'],
      concerns: [
        'You can receive counseling 24/7.',
        'They can help organize shelter, medical, legal, or reporting options.',
        'You can sort support options before deciding whether to report.',
      ],
      ctaLabel: 'Open women support services',
      details: [
        {
          title: 'If calling is hard',
          list: [
            'Text, board, email, or other online routes may be available.',
            'Use a safe device and place when possible.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The counselor can help sort options without forcing a report.',
            'They can check whether emergency shelter or protection is needed.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'Ministry guide to 1366',
          href: 'https://www.mogef.go.kr/sp/hrp/sp_hrp_f002.do',
        },
        { label: 'Women’s violence cyber counseling', href: 'https://www.women1366.kr/?menuno=227' },
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
        '보호자에게 말하기 전 먼저 정리해도 됩니다.',
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
            '필요하면 지역 청소년상담복지센터나 보호 지원으로 이어집니다.',
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
        'If telling a parent feels hard or you do not know where to start, you can begin with what feels hard right now.',
      starterPhrases: [
        'I want to talk before I tell my parents.',
        'I am not sure if this is school violence, but I feel scared.',
        'It is hard to stay at home, and I do not know where to go.',
      ],
      counselorChecks: ['Your age and where you are now', 'Whether you are safe now', 'Whether there is a trusted adult or safe place'],
      concerns: [
        'You can start by phone, text, or online counseling.',
        'Parents, friends, and teachers can also ask for guidance.',
        'You can sort out the situation before deciding how to tell an adult.',
      ],
      ctaLabel: 'Open youth support services',
      details: [
        {
          title: 'Before you talk',
          list: [
            'You do not need to explain everything at the beginning.',
            'The counselor can first check whether you are safe.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'You may be connected to a local youth counseling or protection service.',
            'School violence, running away, self-harm risk, or family conflict can be sorted together.',
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
      title: '띵동은 아웃팅 걱정부터 말할 수 있어요',
      summary:
        '정체성, 커밍아웃, 가족 갈등, 차별, 주거·안전을 판단받지 않고 말해도 됩니다.',
      starterPhrases: [
        '아웃팅될까 무서워서 말하지 못했어요.',
        '커밍아웃 뒤 집에 있기 어려워졌어요.',
        '성소수자 친화 상담을 찾고 싶어요.',
      ],
      counselorChecks: ['편한 이름이나 호칭', '지금 안전한지', '상담·주거·의료·법률 중 급한 것'],
      concerns: [
        '상담은 기본적으로 비밀로 다룹니다.',
        '청소년 성소수자 상황을 전제로 말해도 됩니다.',
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
      title: 'DDing Dong is a place to start with outing concerns',
      summary:
        'You can talk about identity, coming out, family conflict, discrimination, housing, or safety without having to prove your situation.',
      starterPhrases: [
        'I am scared of being outed, so I have not told anyone.',
        'After coming out, it became hard to stay at home.',
        'I want queer-friendly counseling.',
      ],
      counselorChecks: ['What name or words feel comfortable', 'Whether you are safe now', 'Whether counseling, housing, medical, or legal support is urgent'],
      concerns: [
        'Counseling is handled confidentially by default.',
        'You can speak from an LGBTQ+ youth context without explaining everything first.',
        'Housing, medical, legal, or other support routes can be explored together.',
      ],
      ctaLabel: 'Open LGBTQ+ support services',
      details: [
        {
          title: 'What can be discussed',
          list: [
            'Identity, coming out, family, school, relationship, and discrimination concerns.',
            'Medical, legal, housing, or crisis support information can be explored if needed.',
          ],
        },
        {
          title: 'Before you talk',
          list: [
            'You do not need to give your legal name or every detail at the start.',
            'You can first decide a safe contact method and time.',
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
        '여러 언어로 상담받을 수 있습니다.',
        '다문화가족과 이주민이 생활 정보를 물어봐도 됩니다.',
        '필요한 언어부터 말해도 됩니다.',
      ],
      ctaLabel: '이주민·외국인 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음에 필요한 언어부터 말하면 됩니다.',
            '상담 언어와 시간은 바뀔 수 있어 공식 안내를 확인하세요.',
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
      title: 'Danuri can help when Korean is not the easiest language',
      summary:
        'If family, stay, violence, or daily-life issues are hard to explain in Korean, multilingual counseling and interpretation can be a starting point.',
      starterPhrases: [
        'I need interpretation because Korean is difficult for me.',
        'I want to talk about a family problem, but I do not know where to ask.',
        'I need information about stay or daily life in Korea.',
      ],
      counselorChecks: ['The language you need', 'Where you are in Korea', 'Whether the issue is family, stay, violence, or daily life'],
      concerns: [
        'Multilingual counseling and interpretation may be available.',
        'Marriage migrants, migrants, and foreign families can ask about daily-life support.',
        'You can start by saying that you need interpretation.',
      ],
      ctaLabel: 'Open migrant and foreigner support services',
      details: [
        {
          title: 'Before you talk',
          list: [
            'Start by saying which language you need.',
            'Available languages and hours can change, so check the official guide when possible.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'Daily-life information, family issues, violence support, and service connections can be sorted together.',
            'If needed, you may be connected to another public service or interpretation support.',
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
      title: '학대인지 몰라도 1389에 물어볼 수 있어요',
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
        '의심 단계에서도 문의해도 됩니다.',
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
            '필요하면 확인, 보호, 응급조치, 지역 연결로 이어집니다.',
            '어르신의 안전과 의사를 함께 봅니다.',
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
      title: 'You can ask 1389 even if you are not sure it is abuse',
      summary:
        'Neglect, verbal abuse, violence, financial exploitation, or care gaps can be discussed before you know exactly what to call them.',
      starterPhrases: [
        'I am not sure this is abuse, but I am worried.',
        'An older adult seems to be alone without care.',
        'I am worried someone is taking their money or bankbook.',
      ],
      counselorChecks: ['Where the older adult is', 'Whether there is danger now', 'Who is doing what'],
      concerns: [
        'You can ask for counseling or make a report, even at the suspicion stage.',
        'An elder protection agency may check the situation and arrange protection.',
        'Neighbors or people nearby can ask, not only family members.',
      ],
      ctaLabel: 'Open older adult support services',
      details: [
        {
          title: 'What can be discussed',
          list: [
            'Neglect, emotional abuse, financial exploitation, and physical violence can all be mentioned.',
            'Family, neighbors, or care providers can ask for guidance.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'The case may lead to field checks, protection, emergency measures, or local support.',
            'The older adult’s safety and wishes should be considered together.',
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
        '사용, 재사용 걱정, 가족의 약물 문제를 치료·회복으로 연결할 방법을 물어봐도 됩니다.',
      starterPhrases: [
        '신고될까 무서운데 상담받고 싶어요.',
        '다시 사용할까 봐 걱정돼요.',
        '가족이 사용하는 것 같아 제가 먼저 상담받고 싶어요.',
      ],
      counselorChecks: ['어떤 물질인지', '최근 사용과 몸 상태', '혼자인지, 치료·회복 지원을 원하는지'],
      concerns: [
        '24시간 무료 상담입니다.',
        '상담 내용과 개인정보는 비밀로 다룹니다.',
        '법적 결과를 약속하지는 않지만 치료·재활 경로를 찾을 수 있습니다.',
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
            '치료보호기관, 재활기관, 지역 회복 지원으로 이어질 수 있습니다.',
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
      title: '1342 can start with fear about punishment',
      summary:
        'You can ask how drug use, relapse worries, or a family member’s use could connect to treatment and recovery support.',
      starterPhrases: [
        'I am afraid this will be reported, but I want counseling.',
        'I am worried I will use again.',
        'I think my family member is using, and I want counseling first.',
      ],
      counselorChecks: ['What substance is involved', 'Recent use and physical condition', 'Whether you are alone and whether treatment or recovery support is wanted'],
      concerns: [
        'You can start with free 24-hour counseling.',
        'Counseling content and personal information are described as confidential.',
        'Legal outcomes cannot be promised, but treatment and rehabilitation routes can be explored.',
      ],
      ctaLabel: 'Open addiction services',
      details: [
        {
          title: 'Before you talk',
          list: [
            'You do not need a complete history of use before the first call.',
            'The person directly affected, family, or acquaintances can ask for help.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'You may be connected to treatment protection, rehabilitation, or local recovery support.',
            'You can come back even after reuse or while still unable to stop.',
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
        '범죄피해 뒤 잠, 마음, 일상, 가족의 안정이 흔들릴 때 물어봐도 됩니다.',
      starterPhrases: [
        '신고 뒤로 잠을 못 자요.',
        '그 뒤로 일상이 어려워요.',
        '이용할 수 있는 지원이 궁금해요.',
      ],
      counselorChecks: ['지금 안전한지', '잠·식사·일상이 어떤지', '상담·치료·법률·수사 지원 중 필요한 것'],
      concerns: [
        '스마일센터 서비스는 무료입니다.',
        '피해자와 가족도 문의할 수 있습니다.',
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
            '전화 접수 뒤 면담이나 치료 일정으로 이어질 수 있습니다.',
            '피해자지원센터, 수사기관, 법률 지원과 연결될 수 있습니다.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: '법무부 스마일센터 피해자지원 제도',
          href: 'https://www.moj.go.kr/cvs/2723/subview.do',
        },
        { label: '스마일센터 이용안내', href: 'https://resmile.or.kr/pages/?p=9' },
        { label: '스마일센터 FAQ', href: 'https://resmile.or.kr/pages/?b=B_1_6&p=11' },
      ],
    },
    en: {
      serviceName: 'Smile Center',
      title: 'Smile Center helps with recovery after a crime report',
      summary:
        'After crime victimization, if sleep, emotions, daily life, or family stability are affected, you can ask about recovery support.',
      starterPhrases: [
        'I reported it, but I have not been sleeping well.',
        'Daily life has been hard since then.',
        'I want to know what support I can use.',
      ],
      counselorChecks: ['Whether you are safe now', 'Whether sleep, meals, or daily life are affected', 'Whether counseling, treatment, legal, or investigation support is needed'],
      concerns: [
        'Smile Center services are described as free.',
        'Victims and family members can ask about support.',
        'Recovery support can be discussed separately from the reporting process.',
      ],
      ctaLabel: 'Open crime victim support services',
      details: [
        {
          title: 'What can be discussed',
          list: [
            'Psychological assessment, stabilization counseling, therapy, and psychiatry referral.',
            'Temporary housing, legal counseling, and social support connection may also be discussed.',
          ],
        },
        {
          title: 'What may happen next',
          list: [
            'Phone intake may lead to an interview or treatment schedule.',
            'You may be connected with victim support centers, investigation agencies, or legal aid.',
          ],
        },
      ],
      sourceLinks: [
        {
          label: 'Ministry of Justice Smile Center support',
          href: 'https://www.moj.go.kr/cvs/2723/subview.do',
        },
        { label: 'Smile Center user guide', href: 'https://resmile.or.kr/pages/?p=9' },
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
