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
      '상담전화에 연락하기 전 가장 많이 걱정되는 첫마디, 비용, 비밀, 신고·연계 가능성을 짧게 확인할 수 있는 가이드입니다.',
    intro:
      '상황을 완벽히 설명하지 않아도 됩니다. 이 가이드는 내가 상담 대상인지 판정하기보다, 지금 말할 수 있는 첫 문장과 연결 뒤 일어날 일을 짧게 보여줍니다.',
    urgentNotice:
      '지금 다칠 위험이 있거나 이미 다쳤다면 가이드를 읽기보다 112 또는 119가 먼저입니다. 안전해진 뒤 다시 돌아와도 됩니다.',
    focusPoints: ['처음 할 말', '상담원이 확인할 것', '걱정되는 점'],
  },
  en: {
    title: 'Check only what you need before you call',
    description:
      'Short guides for what to say first, what a counselor may ask, cost, privacy, reporting, and follow-up when contacting Korean helplines.',
    intro:
      'You do not need a perfect explanation. These guides are not a test of whether you qualify. They show a first sentence, what may happen next, and the main things people worry about.',
    urgentNotice:
      'If someone may be hurt right now, or someone has already been hurt, call 112 or 119 before reading further. You can return after immediate danger passes.',
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
      title: '119는 몸의 안전이 걱정될 때 먼저 연결하는 번호예요',
      summary:
        '응급인지 확신이 없어도 의식, 호흡, 출혈, 약물, 심한 통증이 걱정되면 먼저 말해도 됩니다.',
      starterPhrases: [
        '응급인지 모르겠는데 사람이 쓰러져 있어요.',
        '숨쉬기 힘들어 하고 가슴이 아프다고 해요.',
        '약을 많이 먹었을 수도 있어요.',
      ],
      counselorChecks: ['지금 위치', '의식·호흡·출혈·통증 상태', '곁에 있는 사람이 할 수 있는 일'],
      concerns: [
        '응급 상황의 119 구급차 이용은 무료입니다.',
        '정확한 주소를 몰라도 주변 건물, 가게, 도로명으로 시작할 수 있습니다.',
        '폭력이나 범죄가 함께 있으면 112가 같이 필요할 수 있습니다.',
      ],
      ctaLabel: '위기·긴급 상담처 보기',
      details: [
        {
          title: '말하기 어렵다면',
          list: [
            '문자 신고나 119 신고 앱을 사용할 수 있습니다.',
            '짧게 “위치 + 무슨 일 + 사람 상태”만 적어도 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상황에 따라 구급대가 출동하고 응급처치를 할 수 있습니다.',
            '필요하면 가까운 응급의료기관으로 이송됩니다.',
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
      title: '109는 죽고 싶은지 확신하지 못해도 시작할 수 있어요',
      summary:
        '사라지고 싶다, 혼자 있기가 무섭다, 오늘 밤을 넘기기 어렵다는 마음부터 말해도 됩니다.',
      starterPhrases: [
        '죽고 싶다는 생각이 들어요.',
        '혼자 있기가 무서워요.',
        '어떻게 말해야 할지 모르겠는데 지금 위험한 것 같아요.',
      ],
      counselorChecks: ['지금 혼자인지', '다칠 수단이 가까이 있는지', '오늘 밤을 안전하게 넘길 수 있는지'],
      concerns: [
        '24시간 무료로 연결할 수 있습니다.',
        '상담 내용은 기본적으로 비밀을 지키는 방향으로 다룹니다.',
        '생명·안전 위험이 크면 다른 도움을 연결할 수 있습니다.',
      ],
      ctaLabel: '우울·자살예방 상담처 보기',
      details: [
        {
          title: '말이 정리되지 않아도',
          list: [
            '상담원이 안전 여부부터 차분히 확인할 수 있습니다.',
            '울거나 말을 멈춰도 괜찮습니다. 지금 있는 상태에서 시작하면 됩니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '지금 안전하게 버틸 방법을 함께 정리할 수 있습니다.',
            '필요하면 지역 정신건강복지센터나 자살예방센터로 이어질 수 있습니다.',
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
      title: 'You can start with 109 even if you are not sure you are suicidal',
      summary:
        'You can begin with wanting to disappear, being afraid to be alone, or not knowing how to get through tonight.',
      starterPhrases: [
        'I am having thoughts of wanting to die.',
        'I am afraid to be alone right now.',
        'I do not know how to explain this, but I think I may be unsafe.',
      ],
      counselorChecks: ['Whether you are alone', 'Whether means to hurt yourself are nearby', 'Whether tonight can be made safer'],
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
      title: '1366은 말하면 일이 커질까 걱정되는 단계부터 물어볼 수 있어요',
      summary:
        '폭력이 지금 진행 중이 아니어도, 안전·보호·신고·쉼터를 어떻게 해야 할지 상담할 수 있습니다.',
      starterPhrases: [
        '신고까지 해야 할지는 모르겠고 먼저 상담만 받고 싶어요.',
        '상대가 근처에 있어서 안전하게 말할 수 있는지 모르겠어요.',
        '오늘 밤 어디에 있어야 할지 모르겠어요.',
      ],
      counselorChecks: ['지금 안전하게 말할 수 있는지', '상대가 가까이 있는지', '다친 곳이나 머물 곳이 있는지'],
      concerns: [
        '24시간 상담이 가능하고 상담만 받아도 됩니다.',
        '보호시설, 의료, 법률, 수사기관 연결을 함께 정리할 수 있습니다.',
        '위험이 크면 112나 긴급보호가 먼저 필요할 수 있습니다.',
      ],
      ctaLabel: '여성 상담처 보기',
      details: [
        {
          title: '전화가 어렵다면',
          list: [
            '문자, 게시판, 이메일 등 다른 상담 경로가 안내될 수 있습니다.',
            '안전한 기기와 장소에서 연락하는 것이 좋습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '상담원이 신고 여부를 강요하기보다 필요한 지원을 함께 정리합니다.',
            '긴급피난이나 보호시설이 필요한지 확인할 수 있습니다.',
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
        'If danger is high, 112 or emergency protection may come first.',
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
        '부모님께 말하기 어렵거나 어디서부터 말해야 할지 모르겠을 때, 지금 힘든 것부터 시작할 수 있습니다.',
      starterPhrases: [
        '부모님께 말하기 전에 먼저 상담하고 싶어요.',
        '학교폭력인지 모르겠는데 계속 무서워요.',
        '집에 있기 어렵고 어디로 가야 할지 모르겠어요.',
      ],
      counselorChecks: ['나이와 지금 있는 곳', '지금 안전한지', '믿을 수 있는 어른이나 머물 곳이 있는지'],
      concerns: [
        '전화, 문자, 온라인 상담으로 시작할 수 있습니다.',
        '부모, 친구, 선생님도 가볍게 문의할 수 있습니다.',
        '생명·안전 위험이 크면 보호기관이나 긴급기관 연결이 필요할 수 있습니다.',
      ],
      ctaLabel: '청소년 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 자세한 사정을 모두 말하지 않아도 됩니다.',
            '상담원은 지금 안전한지부터 확인할 수 있습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '필요하면 지역 청소년상담복지센터나 보호 지원으로 이어질 수 있습니다.',
            '학교폭력, 가출, 자해 위험, 가족 갈등을 함께 정리할 수 있습니다.',
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
        'If life or safety risk is high, protective or emergency services may be connected.',
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
      title: '띵동은 아웃팅 걱정부터 말할 수 있는 성소수자 지원센터예요',
      summary:
        '정체성, 커밍아웃, 가족 갈등, 차별, 주거·안전 걱정을 판단받지 않고 꺼낼 수 있습니다.',
      starterPhrases: [
        '아웃팅될까 봐 무서워서 어디에도 말하지 못했어요.',
        '커밍아웃 뒤에 집에 있기 어려워졌어요.',
        '성소수자 친화적인 상담을 찾고 싶어요.',
      ],
      counselorChecks: ['어떤 이름이나 호칭이 편한지', '지금 안전한지', '상담·주거·의료·법률 중 무엇이 급한지'],
      concerns: [
        '상담은 비밀을 지키는 방향으로 다룹니다.',
        '청소년 성소수자의 상황을 전제로 이야기할 수 있습니다.',
        '운영시간 밖 긴급 위험은 109, 112, 119가 먼저일 수 있습니다.',
      ],
      ctaLabel: '성소수자 상담처 보기',
      details: [
        {
          title: '상담에서 다룰 수 있는 것',
          list: [
            '정체성, 커밍아웃, 가족·학교·관계 문제를 이야기할 수 있습니다.',
            '필요하면 의료, 법률, 주거, 위기 지원 정보를 함께 찾을 수 있습니다.',
          ],
        },
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 실명이나 모든 정보를 말할 필요는 없습니다.',
            '연락 가능한 방식과 안전한 시간을 먼저 정해도 됩니다.',
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
        'Outside service hours, immediate danger may need 109, 112, or 119 first.',
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
      title: '다누리는 한국어가 편하지 않아도 여러 언어로 물어볼 수 있어요',
      summary:
        '가족, 체류, 폭력, 생활 문제를 한국어로 설명하기 어렵다면 통역과 상담을 함께 시작할 수 있습니다.',
      starterPhrases: [
        '한국어가 어려워서 통역이 필요해요.',
        '가족 문제를 상담하고 싶은데 어디에 말해야 할지 모르겠어요.',
        '체류나 생활 정보가 필요해요.',
      ],
      counselorChecks: ['필요한 언어', '지금 있는 지역', '가족·체류·폭력·생활 중 어떤 문제인지'],
      concerns: [
        '여러 언어로 상담과 통역 지원을 받을 수 있습니다.',
        '결혼이주민, 이주민, 외국인 가족이 생활 정보를 물어볼 수 있습니다.',
        '폭력이나 응급상황은 112 또는 119가 먼저일 수 있습니다.',
      ],
      ctaLabel: '이주민·외국인 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음에 필요한 언어부터 말하면 됩니다.',
            '상담 가능 언어와 시간은 바뀔 수 있으니 공식 안내를 확인하는 것이 좋습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '생활 정보, 가족 문제, 폭력 피해, 기관 연결을 함께 정리할 수 있습니다.',
            '필요하면 다른 공공기관 상담이나 통역으로 이어질 수 있습니다.',
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
        'Violence or medical emergencies may need 112 or 119 first.',
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
      title: '1389는 학대인지 확신이 없어도 의심을 상담할 수 있어요',
      summary:
        '방임, 폭언, 폭력, 경제적 착취, 돌봄 공백이 걱정될 때 먼저 상황을 말해볼 수 있습니다.',
      starterPhrases: [
        '학대인지 모르겠지만 계속 걱정되는 상황이 있어요.',
        '혼자 계신 어르신이 돌봄을 받지 못하는 것 같아요.',
        '돈이나 통장을 빼앗기는 것 같아 걱정돼요.',
      ],
      counselorChecks: ['어르신이 어디에 있는지', '지금 위험이 있는지', '누가 어떤 행동을 하고 있는지'],
      concerns: [
        '상담과 신고 모두 가능하며, 의심 단계에서도 물어볼 수 있습니다.',
        '상황에 따라 노인보호전문기관이 확인과 보호를 진행할 수 있습니다.',
        '생명·신체 위험이 크면 112 또는 119가 먼저입니다.',
      ],
      ctaLabel: '노인 상담처 보기',
      details: [
        {
          title: '상담에서 말할 수 있는 것',
          list: [
            '신체적 폭력뿐 아니라 방임, 정서적 학대, 경제적 착취도 이야기할 수 있습니다.',
            '가족, 이웃, 돌봄 제공자 등 주변 사람이 상담할 수 있습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '필요하면 현장 확인, 보호, 응급조치, 지역 서비스 연결이 이뤄질 수 있습니다.',
            '어르신의 안전과 의사를 함께 고려합니다.',
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
        'If life or physical safety is at risk, 112 or 119 comes first.',
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
      title: '1342는 처벌이 무서운 마음부터 상담으로 꺼낼 수 있어요',
      summary:
        '사용, 재사용 걱정, 가족의 약물 문제를 치료와 회복 쪽으로 어떻게 연결할지 먼저 물어볼 수 있습니다.',
      starterPhrases: [
        '신고될까 봐 무서운데 상담을 받고 싶어요.',
        '다시 사용할까 봐 걱정돼요.',
        '가족이 사용하는 것 같아서 제가 먼저 상담받고 싶어요.',
      ],
      counselorChecks: ['어떤 물질인지', '최근 사용 시점과 몸 상태', '혼자인지, 치료나 회복 지원을 원하는지'],
      concerns: [
        '24시간 무료 상담으로 시작할 수 있습니다.',
        '상담 내용과 개인정보는 비밀을 지키는 방향으로 안내됩니다.',
        '법적 결과를 약속하지는 않지만 치료·재활 경로를 함께 찾을 수 있습니다.',
      ],
      ctaLabel: '중독 상담처 보기',
      details: [
        {
          title: '말하기 전 알아둘 점',
          list: [
            '처음부터 모든 사용 이력을 자세히 말하지 않아도 됩니다.',
            '본인뿐 아니라 가족이나 지인도 상담을 요청할 수 있습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '치료보호기관, 재활기관, 지역 회복 지원으로 이어질 수 있습니다.',
            '다시 사용했거나 멈추지 못한 상태여도 다시 상담할 수 있습니다.',
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
      title: '스마일센터는 신고 뒤에도 남는 마음과 일상 회복을 도와요',
      summary:
        '범죄피해 이후 잠을 못 자거나 사건이 계속 떠오르거나 가족까지 흔들릴 때 회복 지원을 물어볼 수 있습니다.',
      starterPhrases: [
        '신고는 했는데 그 뒤로 잠을 못 자요.',
        '사건이 계속 떠올라서 일상이 어렵습니다.',
        '제가 이용할 수 있는 지원이 있는지 알고 싶어요.',
      ],
      counselorChecks: ['어떤 피해가 있었는지', '지금 안전한지', '심리상담·치료·법률·수사 지원 중 무엇이 필요한지'],
      concerns: [
        '스마일센터 서비스는 무료로 안내됩니다.',
        '피해자뿐 아니라 가족도 지원을 문의할 수 있습니다.',
        '즉시 위험을 막는 기관은 아니므로 현재 위험은 112 또는 119가 먼저입니다.',
      ],
      ctaLabel: '범죄피해 상담처 보기',
      details: [
        {
          title: '상담에서 다룰 수 있는 것',
          list: [
            '심리평가, 안정화 상담, 심리치료, 정신건강의학과 연계를 물어볼 수 있습니다.',
            '임시거처, 법률상담, 사회복지 지원 연결도 함께 확인할 수 있습니다.',
          ],
        },
        {
          title: '연결 뒤에는',
          list: [
            '전화 접수 뒤 면담이나 치료 일정으로 이어질 수 있습니다.',
            '피해자지원센터, 수사기관, 법률 지원과 함께 연결될 수 있습니다.',
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
      title: 'Smile Center helps with recovery after reporting is not enough',
      summary:
        'After crime victimization, if sleep, flashbacks, daily life, or family stability are affected, you can ask about recovery support.',
      starterPhrases: [
        'I reported it, but I cannot sleep afterward.',
        'The event keeps coming back, and daily life is hard.',
        'I want to know what support I can use.',
      ],
      counselorChecks: ['What harm occurred', 'Whether you are safe now', 'Whether counseling, treatment, legal, or investigation support is needed'],
      concerns: [
        'Smile Center services are described as free.',
        'Victims and family members can ask about support.',
        'It is not the service that stops immediate danger, so current danger needs 112 or 119 first.',
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
