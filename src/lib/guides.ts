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

export type GuideSectionId =
  | 'when'
  | 'firstCall'
  | 'privacy'
  | 'alternatives'
  | 'after'
  | 'urgent'

type GuideSection = {
  id: GuideSectionId
  title: string
  body: string[]
  list?: string[]
  example?: string[]
}

type GuideSourceLink = {
  label: string
  href: string
}

type GuideEntryCopy = {
  serviceName: string
  title: string
  shortAnswer: string
  lead: string
  ctaLabel: string
  sections: GuideSection[]
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
    title: '전화하기 전에 먼저 확인해도 괜찮습니다',
    description:
      '상담처를 알아도 바로 전화하기는 어렵습니다. 무엇을 말해야 하는지, 비용이 드는지, 비밀이 지켜지는지, 신고나 보호자 연락으로 이어지는지 걱정될 수 있습니다.',
    intro:
      '아래 글은 각 상담처에 연락하기 전 가장 많이 걸리는 질문을 먼저 정리합니다. 정확히 설명하지 못해도 괜찮은지, 상담원이 보통 무엇을 묻는지, 통화 뒤 어떤 지원으로 이어질 수 있는지 차분히 확인해보세요.',
    urgentNotice:
      '지금 누군가 다칠 위험이 있거나 이미 다친 상황이라면, 이 가이드를 끝까지 읽기보다 112 또는 119가 먼저입니다. 상담처는 위험이 지나간 뒤에도 다시 연결할 수 있습니다.',
    focusPoints: ['상담원이 묻는 것', '비밀·비용·신고 여부', '전화가 어려울 때의 다른 방법'],
  },
  en: {
    title: 'It is okay to check before you call',
    description:
      'Even with the right number, calling can feel hard. You may wonder what to say, whether it costs money, whether it is confidential, or whether it triggers reporting or family contact.',
    intro:
      'These guides answer the questions people often have just before contacting a service: whether your situation is enough, what the first call is like, and what support may follow.',
    urgentNotice:
      'If someone may be hurt right now, or someone has already been hurt, call 112 or 119 before reading further. You can return to these support services after the immediate danger passes.',
    focusPoints: ['What they may ask', 'Confidentiality, cost, and reporting', 'Options when calling is hard'],
  },
}

export const GUIDE_ANCHOR_BY_CATEGORY: Record<Category, string> = {
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
      title: '119에 전화하면 무엇부터 말해야 할까요?',
      shortAnswer:
        '응급인지 애매해도 의식, 호흡, 출혈, 약물, 자해 수단, 심한 통증처럼 몸의 안전이 걸린 상황이면 119에 먼저 전화해도 됩니다.',
      lead:
        '119는 "정말 큰일일 때만" 누르는 번호처럼 느껴질 수 있습니다. 하지만 응급상황에서는 스스로 판단을 오래 붙잡고 있는 시간이 더 위험할 수 있습니다. 환자가 있거나, 내가 다쳤거나, 누군가 지금 다칠 수 있다면 먼저 연결하세요. 상황 설명은 통화하면서 함께 정리할 수 있습니다.',
      ctaLabel: '위기·긴급 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '의식이 흐려지거나 깨우기 어렵습니다.',
            '숨쉬기 어렵거나 가슴 통증, 심한 통증이 있습니다.',
            '피가 많이 나거나 골절, 화상, 경련이 의심됩니다.',
            '약물을 많이 먹었거나, 자해를 했거나, 자해 수단이 가까이 있습니다.',
            '화재, 사고, 추락, 물에 빠짐처럼 즉시 구조가 필요합니다.',
            '내가 판단하기 어렵지만 "지금 병원으로 가야 할 것 같다"는 느낌이 듭니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상황실에서는 먼저 무슨 일이 있었는지, 환자가 어디에 있는지, 환자 상태가 어떤지 확인합니다. 가능하면 "환자가 있습니다", "현재 위치는 어디입니다", "의식·호흡·출혈·통증은 이렇습니다" 순서로 말하면 좋습니다.',
            '주소를 정확히 몰라도 괜찮습니다. 가까운 건물 이름, 가게 상호, 도로명, 엘리베이터 번호, 전봇대 번호, 고속도로 이정표, 산악 위치 표지처럼 주변에 보이는 정보를 말하세요. 스마트폰 GPS를 켜두는 것도 도움이 됩니다.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '119 구급차는 위급상황에서 전국 어디서나 무료로 이용할 수 있습니다. 병원 간 이동이나 단순 이동처럼 응급상황이 아닌 경우에는 민간 구급차가 필요할 수 있고, 그때는 비용이 생길 수 있습니다.',
            '119는 상담 기록을 남기기 위한 번호가 아니라 출동과 응급처치를 위한 번호입니다. 폭력이나 범죄가 함께 있는 상황에서는 112와 연계될 수 있습니다. 이것은 처벌을 먼저 하려는 절차라기보다 현장의 안전을 확보하기 위한 조치입니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '말하기 어렵거나 소리를 내기 위험한 상황이라면 119 문자 신고, 119 안전신고센터, 119 신고 앱 같은 다른 경로를 사용할 수 있습니다. 문자에는 가능한 짧게 "위치 + 무슨 일 + 환자 상태"를 적으면 됩니다.',
          ],
          example: ['서울 중구 ○○빌딩 3층, 사람이 쓰러져 있고 숨을 잘 못 쉽니다.'],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '119는 현장으로 출동해 상태를 확인하고 응급처치를 하며, 필요하면 병원으로 이송합니다. 병원 선택은 환자의 상태와 가까운 응급의료기관 상황에 따라 정해질 수 있습니다. 내가 원하는 병원을 말할 수는 있지만, 항상 그대로 되지는 않을 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '이미 자해했거나 약물을 먹었거나 의식·호흡 문제가 있으면 109보다 119가 먼저입니다. 가해자가 가까이 있거나 폭력이 진행 중이라면 112도 함께 필요할 수 있습니다.',
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
      title: 'What should you say first when you call 119?',
      shortAnswer:
        'If physical safety is involved, such as consciousness, breathing, bleeding, medication, self-harm means, or severe pain, call 119 even if you are unsure whether it is an emergency.',
      lead:
        '119 can feel like a number reserved for only the most obvious emergencies. But in an emergency, spending too long deciding can be risky. If there is a patient, you are hurt, or someone may be hurt right now, call first. You can organize the details during the call.',
      ctaLabel: 'Open crisis services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to call when',
          body: [],
          list: [
            'Someone is losing consciousness or is hard to wake.',
            'There is trouble breathing, chest pain, or severe pain.',
            'There is heavy bleeding, suspected fracture, burn, or seizure.',
            'Someone took too much medication, has self-harmed, or has self-harm means nearby.',
            'Fire, accident, fall, drowning, or immediate rescue is involved.',
            'You cannot judge clearly, but it feels like hospital care is needed now.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The dispatcher will usually check what happened, where the patient is, and what condition the patient is in. If you can, say: there is a patient, where you are, and what you know about consciousness, breathing, bleeding, pain, or medication.',
            'You do not need an exact address to start. Nearby building names, shop signs, road names, elevator numbers, utility pole numbers, highway markers, or location signs can help. Turning on smartphone GPS can also help.',
          ],
        },
        {
          id: 'privacy',
          title: 'Cost and reporting',
          body: [
            'A 119 ambulance is free nationwide in an emergency. Non-emergency transfers, such as moving between hospitals or simple transportation, may require a private ambulance and can cost money.',
            '119 exists for dispatch and emergency care, not for counseling records. If violence or crime is happening too, 112 may be connected to secure safety at the scene.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If speaking is hard',
          body: [
            'If speaking is difficult or unsafe, you may use text reporting, the 119 Safety Reporting Center, or the 119 app. Keep it short: location, what happened, and the patient condition.',
          ],
          example: ['3rd floor of ○○ Building, Jung-gu, Seoul. Someone collapsed and cannot breathe well.'],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            '119 responders can come to the scene, assess the person, provide emergency care, and transport them to a hospital if needed. Hospital choice depends on the patient condition and nearby emergency capacity. You can state a preference, but it may not always be possible.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If someone has already self-harmed, taken medication, or has consciousness or breathing problems, call 119 before 109. If an abuser is nearby or violence is happening, 112 may also be needed.',
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
      title: '109는 죽고 싶은 마음을 정확히 설명하지 못해도 전화할 수 있습니다',
      shortAnswer:
        '"정말 죽을 생각까지는 아닌데 너무 힘들다"는 상태에서도 109에 연락할 수 있습니다. 상담은 말이 정리된 사람만 받는 것이 아닙니다.',
      lead:
        '죽고 싶은 마음은 늘 또렷한 계획으로 오지 않습니다. 사라지고 싶다, 잠들고 깨고 싶지 않다, 내가 없어지면 낫겠다는 생각처럼 흐릿하게 오기도 합니다. 109는 그런 순간에 혼자 버티지 않도록 연결하는 24시간 자살예방상담전화입니다.',
      ctaLabel: '우울·자살예방 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '죽고 싶다는 생각이 반복됩니다.',
            '구체적인 계획은 없지만 사라지고 싶습니다.',
            '자해 충동이 있거나 수단이 가까이 있습니다.',
            '주변 사람이 위험해 보여 무엇을 해야 할지 모르겠습니다.',
            '밤이나 주말에 버티기 어렵습니다.',
            '이미 다른 상담을 받고 있어도 지금 당장 누군가와 말해야 합니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상담원은 지금 혼자인지, 다칠 수단이 가까이 있는지, 이미 다친 곳은 없는지, 오늘 밤을 안전하게 넘길 수 있는지부터 확인할 수 있습니다. 모든 사정을 처음부터 완벽하게 설명하지 않아도 됩니다.',
          ],
          example: [
            '죽고 싶은 생각이 들어서 전화했어요. 어떻게 말해야 할지 잘 모르겠어요.',
            '지금 위험한 건지 모르겠는데 혼자 있기가 무서워요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '109와 마들랜 상담은 별도 동의 없이 개인정보를 수집하지 않는 것이 원칙입니다. 상담 내용도 기본적으로 비밀이 보장됩니다. 다만 생명이나 안전에 급한 위험이 있다고 판단되는 경우에는 다른 기관에 도움을 요청할 수 있습니다.',
            '상담 뒤 위험성이 높다고 판단되면, 본인 동의를 받아 주소지 지역의 정신건강복지센터나 자살예방센터로 이어질 수 있습니다. 이것은 "문제가 커졌다"는 뜻이 아니라, 한 번의 통화로 끝나지 않도록 지역에서 이어 받는 절차에 가깝습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '말로 꺼내기 어렵다면 마들랜을 통해 카카오톡, 앱, 문자 등 텍스트 기반 상담을 이용할 수 있습니다. 문자로 109에 보내는 방식도 안내되어 있습니다. 말이 잘 나오지 않는 사람에게 텍스트는 충분히 좋은 시작점입니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '상담원과 지금 밤을 넘길 방법, 혼자 있지 않을 방법, 위험한 수단에서 멀어지는 방법을 함께 정리할 수 있습니다. 필요하면 지역 정신건강복지센터, 자살예방센터, 의료기관, 응급출동으로 이어질 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '이미 다쳤거나 약물을 먹었거나, 지금 바로 실행할 수단이 곁에 있거나, 의식과 호흡에 문제가 있으면 119가 먼저입니다. 누군가에게 공격받고 있거나 안전하지 않은 장소에 있다면 112가 먼저입니다.',
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
      title: 'You can call 109 even if you cannot explain suicidal thoughts clearly',
      shortAnswer:
        'You can contact 109 even if your thought is closer to "I am not sure I want to die, but I cannot keep going." Counseling is not only for people with organized words.',
      lead:
        'Suicidal thoughts do not always arrive as a clear plan. They can feel like wanting to disappear, not wanting to wake up, or thinking people would be better off without you. 109 is a 24/7 suicide prevention hotline for those moments.',
      ctaLabel: 'Open depression and suicide prevention services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to call when',
          body: [],
          list: [
            'Thoughts of wanting to die keep returning.',
            'There is no specific plan, but you want to disappear.',
            'You have self-harm urges or means nearby.',
            'Someone near you seems at risk and you do not know what to do.',
            'It is night or the weekend and it feels hard to get through.',
            'You are already in counseling, but need to talk to someone right now.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The counselor may first ask whether you are alone, whether there are means to hurt yourself nearby, whether you are already injured, and whether you can get through tonight safely. You do not need to explain everything perfectly.',
          ],
          example: [
            'I am having thoughts of wanting to die. I do not know how to explain it.',
            'I am not sure if this is dangerous, but I am afraid to be alone.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            '109 and MaDeulRan state that they do not collect personal information without separate consent. Counseling is confidential by default. If there is urgent risk to life or safety, another agency may be asked to help.',
            'If the risk is assessed as high, the counselor may connect you, with your consent, to a local mental health welfare center or suicide prevention center. This is a way to continue support locally, not a sign that you did something wrong.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'If speaking is difficult, MaDeulRan offers text-based access through KakaoTalk, app, and text message channels. Text can be a strong first step when words do not come easily.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'You can work with the counselor on getting through the next hours, not being alone, and moving away from immediate means of harm. If needed, support may continue through a local center, medical care, or emergency dispatch.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If someone is already injured, has taken medication, has immediate means nearby, or has consciousness or breathing problems, call 119 first. If someone is attacking you or you are not safe where you are, call 112 first.',
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
      title: '1366은 신고할 준비가 없어도 먼저 상담할 수 있습니다',
      shortAnswer:
        '가정폭력, 성폭력, 교제폭력, 스토킹, 디지털성범죄처럼 느껴지지만 아직 신고할 마음이 없어도 1366에 상담부터 요청할 수 있습니다.',
      lead:
        '폭력 상황에서는 "이게 신고할 일인지", "내가 너무 예민한 건 아닌지", "전화했다가 일이 커지는 건 아닌지"가 먼저 떠오를 수 있습니다. 1366은 신고를 강요하기보다 지금 안전한지 확인하고, 필요한 선택지를 함께 정리하는 24시간 상담 창구입니다.',
      ctaLabel: '여성·폭력 피해 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '맞거나 밀치거나 감금당한 일이 있습니다.',
            '상대가 휴대폰, 돈, 외출, 인간관계를 통제합니다.',
            '헤어진 뒤에도 찾아오거나 연락을 반복합니다.',
            '협박, 감시, 위치추적, 불법촬영, 유포 협박이 있습니다.',
            '성폭력인지 확신은 없지만 원치 않는 성적 접촉이나 강요가 있었습니다.',
            '집을 나와야 할지, 증거를 어떻게 해야 할지 모르겠습니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상담원은 지금 안전하게 말할 수 있는지 먼저 확인할 수 있습니다. 이어서 어떤 일이 있었는지, 상대가 가까이 있는지, 다친 곳이 있는지, 오늘 밤 머물 곳이 있는지, 신고나 보호시설 연결을 원하는지 등을 물어볼 수 있습니다.',
          ],
          example: [
            '신고까지는 모르겠고, 제가 겪는 일이 폭력인지 상담받고 싶어요.',
            '지금 길게 말하기 어려워요. 안전하게 연락할 방법부터 알고 싶어요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '상담만 먼저 받을 수 있습니다. 신고 여부는 상황과 위험도에 따라 상담원과 논의할 수 있으며, 사용자가 선택할 수 있는 부분이 있습니다. 다만 지금 생명이나 신체에 급한 위험이 있으면 112 또는 119 연계가 필요할 수 있습니다.',
            '1366 상담과 초기지원은 비용 없이 이용할 수 있습니다. 긴급피난처, 의료기관, 법률지원, 전문상담소, 디지털성범죄 삭제지원 등으로 이어질 수 있습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '가해자가 통화기록이나 알림을 볼 수 있다면 다른 사람의 휴대폰, 공중전화, 안전한 장소의 전화가 더 나을 수 있습니다. 전화가 어렵다면 여성폭력 사이버 상담에서 실시간 채팅, 게시판, 카카오톡 상담을 이용할 수 있습니다.',
            '디지털성범죄 피해에서는 삭제를 서두르고 싶어질 수 있지만, 증거보전과 삭제지원이 함께 중요할 수 있습니다. 혼자 판단하기 어렵다면 먼저 상담으로 순서를 정리하세요.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '상황에 따라 긴급피난처, 보호시설, 의료기관, 경찰, 법률구조, 전문상담소, 디지털성범죄 피해 영상물 삭제지원으로 이어질 수 있습니다. 모든 지원이 한 번에 결정되지 않아도 괜찮습니다. 첫 통화에서는 "지금 가장 안전한 다음 한 걸음"을 정하는 것이 중요합니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '가해자가 가까이 있거나 폭력이 진행 중이면 1366보다 112가 먼저입니다. 다친 곳이 있거나 응급처치가 필요하면 119도 함께 필요합니다.',
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
      title: 'You can call 1366 before you are ready to report',
      shortAnswer:
        'If something feels like domestic violence, sexual violence, dating violence, stalking, or digital sexual abuse, you can ask 1366 for counseling even if you are not ready to report.',
      lead:
        'In violence situations, people often wonder whether it is serious enough, whether they are overreacting, or whether calling will make everything bigger. 1366 is a 24/7 place to check safety and sort through options, not only a place for people ready to report.',
      ctaLabel: 'Open women and violence support services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to call when',
          body: [],
          list: [
            'You have been hit, pushed, trapped, or confined.',
            'Someone controls your phone, money, movement, or relationships.',
            'An ex-partner keeps coming to you or contacting you.',
            'There are threats, monitoring, location tracking, illegal filming, or threats to share images.',
            'You are not sure whether it was sexual violence, but there was unwanted sexual contact or pressure.',
            'You do not know whether to leave home or how to handle evidence.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The counselor may first check whether it is safe for you to talk. They may ask what happened, whether the other person is nearby, whether you are injured, where you can stay tonight, and whether you want reporting or shelter connection.',
          ],
          example: [
            'I am not sure about reporting yet. I want to ask whether what I am experiencing is violence.',
            'I cannot talk for long right now. I want to know a safe way to contact you.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            'You can receive counseling first. Reporting can be discussed depending on the situation and risk level, and there may be choices you can make. If there is urgent danger to life or body, 112 or 119 may need to be connected.',
            '1366 counseling and initial support are free. Support may connect to emergency shelter, medical care, legal support, specialized counseling centers, or digital sexual abuse takedown support.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'If an abuser can see call logs or notifications, a trusted person’s phone, a public phone, or a safer place may be better. If calling is hard, the women’s violence cyber counseling service offers live chat, board counseling, and KakaoTalk counseling.',
            'For digital sexual abuse, it can feel urgent to delete everything, but evidence preservation and takedown support both matter. If you are unsure, ask a counselor to help decide the order.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Depending on the situation, support may connect to emergency shelter, protection facilities, medical institutions, police, legal aid, specialized counseling, or image takedown support. The first call can focus on the safest next step.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If the abuser is nearby or violence is happening now, call 112 before 1366. If you are injured or need emergency care, 119 may also be needed.',
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
      title: '1388은 청소년 본인이 먼저 연락해도 되는 곳입니다',
      shortAnswer:
        '부모님이나 학교에 먼저 말하기 어렵다면, 청소년 본인이 1388에 먼저 연락해도 됩니다. 친구관계, 가족, 학교, 진로, 성, 폭력, 가출, 자해 생각까지 무엇부터 말해야 할지 몰라도 괜찮습니다.',
      lead:
        '청소년 상담은 꼭 부모님이 예약해줘야 시작되는 것이 아닙니다. 혼자 감당하기 어렵지만 주변 어른에게 바로 말하기 무섭다면, 1388을 첫 연결로 사용할 수 있습니다. 전화가 부담스러우면 문자, 카카오톡, 온라인 상담으로 시작할 수도 있습니다.',
      ctaLabel: '청소년 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '부모님이나 선생님에게 말하기 어려운 고민이 있습니다.',
            '친구관계, 따돌림, 학교폭력, 진로, 성적 문제로 버티기 어렵습니다.',
            '집에 있기 힘들거나 나가고 싶은 마음이 큽니다.',
            '자해 생각, 죽고 싶은 생각, 위험한 충동이 있습니다.',
            '성폭력, 성매매 강요, 협박, 온라인 피해가 걱정됩니다.',
            '친구가 위험해 보여 어떻게 도와야 할지 모르겠습니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상담원은 지금 안전한지, 혼자 있는지, 어디에서 연락하고 있는지, 어떤 일이 있었는지 물어볼 수 있습니다. 이름이나 학교를 처음부터 자세히 말해야만 상담이 시작되는 것은 아닙니다. 다만 위험이 큰 상황에서는 안전을 위해 추가 정보를 확인할 수 있습니다.',
          ],
          example: [
            '부모님한테 말하기 전에 먼저 상담하고 싶어요.',
            '제가 위험한 상황인지 모르겠는데 집에 있기가 힘들어요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '상담 내용은 기본적으로 조심스럽게 다뤄져야 합니다. 다만 생명이나 안전에 큰 위험이 있거나, 즉시 보호가 필요한 상황이라면 상담원이 보호를 위한 연결을 제안하거나 필요한 기관과 연결할 수 있습니다. 이 부분은 "혼내려고 알리는 것"이 아니라 위험을 줄이기 위한 절차입니다.',
            '1388 상담은 비용 없이 이용할 수 있습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '전화가 어렵다면 문자, 카카오톡, 온라인 채팅, 게시판 상담을 이용할 수 있습니다. 말로 설명하기 어렵거나 집에서 통화하기 어려운 경우에는 글로 시작하는 것이 더 편할 수 있습니다.',
            '부모, 친구, 교사, 보호자가 대신 문의할 수도 있습니다. 다만 이 가이드의 중심은 청소년 본인이 먼저 도움을 요청하는 상황입니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '필요에 따라 가까운 청소년상담복지센터의 대면 상담, 청소년동반자, 쉼터, 의료기관, 학교폭력 대응, 성폭력 피해 지원, 지역 복지서비스로 이어질 수 있습니다. 첫 상담에서 모든 것을 결정하지 않아도 됩니다. 지금 안전한지, 누구와 함께 있을 수 있는지, 다음 연락을 어떻게 이어갈지부터 정리할 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '지금 다칠 것 같거나 이미 다쳤다면 119가 먼저입니다. 누군가에게 폭력을 당하고 있거나 강제로 붙잡혀 있다면 112가 먼저입니다. 죽고 싶은 생각이 매우 강하고 혼자 있기가 위험하다면 109 또는 119로 바로 연결하세요.',
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
      title: '1388 is a place young people can contact first',
      shortAnswer:
        'If telling your parents or school first feels hard, you can contact 1388 yourself. You do not need to know where to begin with friendship, family, school, career, sexuality, violence, running away, or self-harm thoughts.',
      lead:
        'Youth counseling does not have to start with a parent making an appointment. If you cannot handle it alone but feel scared to tell an adult around you, 1388 can be the first connection. If calling feels too much, you can start by text, KakaoTalk, or online counseling.',
      ctaLabel: 'Open youth services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'There is something you cannot tell your parents or teachers yet.',
            'Friendship, bullying, school violence, career, or grades feel hard to endure.',
            'It is hard to stay at home or you strongly want to leave.',
            'You have self-harm thoughts, thoughts of dying, or dangerous urges.',
            'You are worried about sexual violence, forced sexual exploitation, threats, or online harm.',
            'A friend seems at risk and you do not know how to help.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The counselor may ask whether you are safe now, whether you are alone, where you are contacting them from, and what happened. You do not have to share your name or school in detail before counseling begins, though urgent risk may require more safety information.',
          ],
          example: [
            'I want to talk to someone before telling my parents.',
            'I am not sure if I am in danger, but it is hard to stay at home.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            'Counseling should be handled carefully. If there is serious risk to life or safety, or immediate protection is needed, the counselor may suggest connection to protective services or relevant agencies. This is about reducing danger, not punishing you.',
            '1388 counseling is free.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'You can use text, KakaoTalk, online chat, or board counseling. If speaking is difficult or you cannot talk safely at home, writing can be easier.',
            'Parents, friends, teachers, or guardians can also ask on behalf of a young person. This guide, however, centers the young person contacting 1388 directly.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Support may connect to an in-person youth counseling center, youth companion support, shelter, medical care, school violence response, sexual violence support, or local welfare services. The first conversation can focus on safety, who can stay with you, and how to keep contact going.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If you may hurt yourself now or are already injured, call 119 first. If someone is hurting you or holding you somewhere, call 112 first. If suicidal thoughts are very strong and being alone is unsafe, contact 109 or 119 right away.',
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
      title: '띵동은 아웃팅 걱정 없이 처음 말을 꺼낼 수 있는 곳입니다',
      shortAnswer:
        '성적지향이나 성별정체성을 아직 확신하지 못해도, 가족이나 학교에 알려질까 봐 무서워도, 띵동에 먼저 카카오톡으로 말을 걸 수 있습니다.',
      lead:
        '성소수자 청소년에게 상담은 단순히 "고민을 말하는 일"이 아닐 수 있습니다. 내가 말한 내용이 가족, 학교, 친구에게 알려지지는 않을지, 상담자가 내 정체성을 문제로 보지는 않을지 먼저 걱정될 수 있습니다. 띵동은 청소년 성소수자의 정체성 고민, 가족 갈등, 탈가정, 폭력, 주거, 의료, 법률, 정신건강 문제를 함께 다루는 지원기관입니다.',
      ctaLabel: '성소수자 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '내가 성소수자인지 확신은 없지만 혼란스럽습니다.',
            '커밍아웃, 아웃팅, 가족 갈등이 두렵습니다.',
            '집에 있기 어렵거나 나갈 곳이 없습니다.',
            '트랜지션, 의료, 성건강, HIV 검사, 법률 문제가 궁금합니다.',
            '학교나 일상에서 혐오, 차별, 폭력을 겪었습니다.',
            '우울, 불안, 트라우마, 자살위기처럼 마음이 위험합니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '띵동에는 카카오톡으로 먼저 메시지를 보낼 수 있습니다. 상담 신청과 예약을 카카오톡으로 진행할 수 있고, 전화 문의도 가능합니다. 방문 상담, 전화 상담, 화상 상담이 가능하므로 서울에 바로 오기 어렵다고 해서 포기하지 않아도 됩니다.',
          ],
          example: [
            '제가 성소수자인지 잘 모르겠는데, 이 얘기를 할 곳이 없어요.',
            '집에 있기 힘들고 아웃팅될까 봐 무서워요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '띵동 상담은 무료입니다. 상담 내용은 비밀 보장을 원칙으로 하며, 동의 없이 다른 기관에 말하지 않는다고 안내하고 있습니다. 이 비밀보장이 띵동을 찾는 가장 중요한 이유 중 하나가 될 수 있으므로, 페이지에서도 앞쪽에 분명히 보여주는 것이 좋습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '카카오톡으로 먼저 시작할 수 있습니다. 전화보다 글이 편하다면 긴 설명을 한 번에 쓰지 않아도 됩니다. "상담하고 싶어요", "지금 말해도 되나요" 정도로 시작해도 됩니다.',
            '띵동은 화요일부터 토요일 오전 11시부터 오후 9시까지 운영합니다. 일요일, 월요일, 공휴일이나 늦은 밤의 즉시 위기에는 112, 119, 109, 1388 같은 24시간 경로가 먼저 필요할 수 있습니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '상황에 따라 공간 이용, 생활물품, 쉼터 연계 및 주거 지원, 의료상담과 의료기관 동행, 법률상담, 지속적인 심리상담 연계로 이어질 수 있습니다. 상담은 정체성 고민 하나만 다루는 것이 아니라, 지금 삶을 버티는 데 필요한 지원을 함께 찾는 과정이 될 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '폭력이나 감금, 추적, 협박이 현재 진행 중이면 112가 먼저입니다. 이미 다쳤거나 약물, 자해, 의식·호흡 문제가 있으면 119가 먼저입니다. 죽고 싶은 생각이 강한데 띵동 운영시간이 아니라면 109 또는 1388로 먼저 연결하세요.',
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
      title: 'DDing Dong is a place to start without fear of being outed',
      shortAnswer:
        'Even if you are not sure about your sexual orientation or gender identity, or you are afraid family or school will find out, you can message DDing Dong first through KakaoTalk.',
      lead:
        'For queer youth, counseling may not feel like simply sharing a concern. You may first worry whether your family, school, or friends will find out, or whether the counselor will treat your identity as a problem. DDing Dong supports LGBTQ+ youth with identity questions, family conflict, leaving home, violence, housing, medical, legal, and mental health concerns.',
      ctaLabel: 'Open LGBTQ+ services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'You are confused and not sure whether you are LGBTQ+.',
            'Coming out, outing, or family conflict feels frightening.',
            'It is hard to stay at home or you have nowhere to go.',
            'You have questions about transition, medical care, sexual health, HIV testing, or legal issues.',
            'You experienced hate, discrimination, or violence at school or in daily life.',
            'Depression, anxiety, trauma, or suicidal crisis makes your mind feel unsafe.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What happens first',
          body: [
            'You can message DDing Dong through KakaoTalk first. Counseling applications and appointments can happen there, and phone inquiries are also possible. In-person, phone, and video counseling may be available, so not being able to come to Seoul right away does not mean you cannot start.',
          ],
          example: [
            'I am not sure if I am LGBTQ+, and I have nowhere to talk about it.',
            'It is hard to stay at home and I am afraid of being outed.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy and cost',
          body: [
            'DDing Dong counseling is free. The organization states that counseling is confidential by principle and not shared with other institutions without consent. That assurance should be visible early because fear of outing can be the main barrier.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'You can start through KakaoTalk. If writing is easier than calling, you do not have to explain everything at once. A short message like "I want counseling" or "Can I talk now?" can be enough to begin.',
            'DDing Dong operates Tuesday through Saturday, 11:00 to 21:00. On Sundays, Mondays, holidays, late nights, or immediate crises, 24/7 routes such as 112, 119, 109, or 1388 may be needed first.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Support may include use of DDing Dong’s space, basic supplies, shelter and housing connection, medical counseling and accompaniment, legal counseling, or ongoing psychological counseling referral. Counseling can be about what helps you get through life now, not only about identity.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If violence, confinement, stalking, or threats are happening now, call 112 first. If someone is injured, has taken medication, self-harmed, or has consciousness or breathing problems, call 119 first. If suicidal thoughts are strong outside DDing Dong hours, contact 109 or 1388 first.',
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
      title: '다누리콜센터는 한국어가 어려운 상황의 첫 연결이 될 수 있습니다',
      shortAnswer:
        '한국어로 설명하기 어렵거나, 가족·체류·폭력·생활 문제가 섞여 어디에 말해야 할지 모르겠다면 다누리콜센터에 먼저 연락할 수 있습니다.',
      lead:
        '이주민과 외국인은 어려움이 하나만 오지 않는 경우가 많습니다. 폭력 피해를 말하려 해도 언어가 막히고, 병원이나 경찰과 통화해야 하는데 통역이 필요하고, 체류자격이나 가족관계가 걱정될 수 있습니다. 다누리콜센터는 13개 언어로 365일 24시간 상담을 제공하는 다문화가족 종합정보 전화센터입니다.',
      ctaLabel: '이주민·외국인 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '한국어로 상담기관에 설명하기 어렵습니다.',
            '가정폭력, 가족갈등, 통제, 협박이 있습니다.',
            '경찰, 병원, 주민센터, 상담기관과 통화할 때 통역이 필요합니다.',
            '체류, 국적, 노동, 취업, 법률, 생활정보가 궁금합니다.',
            '한국 생활 정보와 지역 서비스를 어디서 물어볼지 모르겠습니다.',
            '이주여성 폭력피해 긴급지원이나 보호시설 연결이 필요합니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '먼저 가능한 언어를 확인하고 해당 언어 상담원 또는 통역으로 연결될 수 있습니다. 이후 어떤 문제인지, 지금 안전한지, 긴급한 폭력 상황인지, 통역이 필요한 기관이 있는지, 생활정보나 법률·의료·체류 상담이 필요한지 확인합니다.',
          ],
          example: ['한국어가 어려워요. 제 언어로 상담받고 싶어요.', '병원과 통화해야 하는데 통역이 필요해요.'],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '다누리는 처벌이나 단속을 위한 창구가 아니라 상담과 지원 연결을 위한 창구로 이해하는 것이 좋습니다. 다만 체류, 법률, 가족폭력 문제는 개인 상황에 따라 결과가 달라질 수 있으므로, 상담을 통해 정확한 기관과 절차를 확인해야 합니다.',
            '상담은 365일 24시간 운영됩니다. 언어와 지역에 따라 연결 방식이 달라질 수 있습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '다누리 포털의 온라인 상담을 이용할 수 있습니다. 주변의 한국어 가능한 사람에게 대신 설명을 부탁하기보다, 가능하면 본인이 편한 언어로 직접 말할 수 있는 통역·상담 경로를 이용하는 것이 더 안전할 수 있습니다. 특히 가정폭력 상황에서는 가족이나 배우자를 통역자로 세우지 않는 것이 좋습니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '상황에 따라 생활정보 안내, 3자 통역, 경찰·병원·상담기관 연결, 긴급피난처, 법률상담, 의료지원, 체류·국적·노동·취업 정보 안내로 이어질 수 있습니다. 다누리는 문제를 한 번에 해결하는 기관이라기보다, 언어와 제도 사이에서 다음 기관으로 이어주는 첫 문 역할을 할 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '폭력이 지금 진행 중이면 112가 먼저입니다. 응급환자나 부상이 있으면 119가 먼저입니다. 112나 119에서도 통역 연결이 가능할 수 있으므로, 한국어가 완벽하지 않아도 긴급 신고를 미루지 마세요.',
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
      title: 'Danuri can be the first call when Korean is hard',
      shortAnswer:
        'If it is hard to explain in Korean, or family, visa, violence, and daily life problems are mixed together, Danuri can be a first place to contact.',
      lead:
        'For migrants and foreigners, problems often overlap. You may need to talk about violence but face a language barrier, need interpretation with a hospital or police, or worry about visa status and family issues. Danuri is a multicultural family information call center offering counseling in 13 languages, 24/7.',
      ctaLabel: 'Open migrant and foreigner services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'It is hard to explain your situation to an agency in Korean.',
            'There is domestic violence, family conflict, control, or threats.',
            'You need interpretation with police, hospitals, local offices, or counseling agencies.',
            'You have questions about stay, nationality, labor, employment, legal issues, or daily life.',
            'You do not know where to ask about Korean life or local services.',
            'You need emergency support or shelter connection for migrant women experiencing violence.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'They may first check which language you can use and connect you to a counselor or interpreter. Then they may ask what the problem is, whether you are safe, whether violence is urgent, whether another agency needs interpretation, and whether you need daily life, legal, medical, or stay-status information.',
          ],
          example: ['Korean is hard for me. I want counseling in my language.', 'I need interpretation for a hospital call.'],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            'Danuri is best understood as a counseling and support connection point, not a punishment or enforcement line. Immigration, legal, and family violence issues can depend on individual circumstances, so use counseling to confirm the right procedure and agency.',
            'The service operates 24/7. Connection details can vary by language and region.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'Online counseling is available through the Danuri portal. Rather than relying on a family member or spouse to interpret, it can be safer to use a language route where you can speak directly, especially in domestic violence situations.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Support may include daily life information, three-way interpretation, connection with police, hospitals, or counseling agencies, emergency shelter, legal counseling, medical support, and information about stay, nationality, labor, or employment. Danuri can serve as a first door between language barriers and the next agency.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If violence is happening now, call 112 first. If there is injury or a medical emergency, call 119 first. Interpretation may be available through emergency services, so do not delay because your Korean is not perfect.',
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
      title: '노인학대는 확실한 증거가 없어도 먼저 상담할 수 있습니다',
      shortAnswer:
        '가족 일이라 조심스럽고 학대인지 확신이 없어도, 노인의 안전과 돌봄이 걱정된다면 1577-1389에 상담할 수 있습니다.',
      lead:
        '노인학대는 폭행처럼 눈에 보이는 일만 뜻하지 않습니다. 외출을 막는 것, 식사나 물을 제대로 주지 않는 것, 치료를 방치하는 것, 돈이나 재산을 마음대로 쓰는 것, 모욕과 협박도 상담이 필요한 신호일 수 있습니다. 신고는 처벌을 먼저 떠올리게 하지만, 실제 첫 단계는 안전 확인과 지원 연결입니다.',
      ctaLabel: '노인 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '노인이 맞거나 밀쳐진 것 같습니다.',
            '식사, 물, 약, 병원 진료가 제대로 제공되지 않습니다.',
            '가족이나 보호자가 외출, 연락, 만남을 막습니다.',
            '통장, 연금, 재산을 누군가 마음대로 쓰는 것 같습니다.',
            '노인이 특정 사람을 두려워하거나 말하기를 꺼립니다.',
            '이웃, 지인, 관리인, 시설 종사자로서 의심 상황을 보았습니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상담원은 학대가 의심되는 노인의 거주지, 현재 안전, 학대 의심 내용, 학대가 반복되는지, 응급성이 있는지 등을 확인할 수 있습니다. 모든 증거를 갖고 있어야만 말할 수 있는 것은 아닙니다. 본인이 직접 겪은 일, 들은 말, 본 장면을 가능한 만큼 설명하면 됩니다.',
          ],
          example: [
            '학대인지 확실하지는 않은데, 어르신이 집 밖에 못 나가고 식사도 제대로 못 하는 것 같아요.',
            '가족 일이라 조심스럽지만, 안전이 걱정돼서 상담하고 싶어요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '누구든지 노인학대를 알게 되면 신고하거나 상담할 수 있습니다. 1577-1389로 연락하면 관할 지역노인보호전문기관으로 연결됩니다. 신고자의 신분 노출이 걱정될 수 있으므로, 처음 통화에서 비밀보장과 연락 방식에 대해 먼저 확인하는 것이 좋습니다.',
            '전화가 부담스럽다면 나비새김 앱을 통한 신고도 가능합니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '나비새김 앱을 통해 장소, 기간, 내용, 증거자료 등을 적어 신고할 수 있습니다. 다만 응급 상황에서는 앱보다 112 또는 119가 빠를 수 있습니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '지역노인보호전문기관은 접수된 내용을 바탕으로 응급성과 안전성을 판단하고, 필요하면 현장조사, 상담, 의료기관 치료 의뢰, 법률지원 요청, 노인복지시설 입소 의뢰, 가족과 관련 기관 상담, 재발방지 교육 등을 진행할 수 있습니다. 위험성이 높으면 경찰이나 119와 함께 움직일 수 있습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '지금 폭력이 진행 중이거나 생명이 위험하면 112가 먼저입니다. 다친 곳이 있거나 응급처치가 필요하면 119도 함께 필요합니다.',
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
      title: 'You can ask about suspected elder abuse before you have proof',
      shortAnswer:
        'Even if it feels sensitive because it is a family matter, and even if you are not sure it is abuse, you can call 1577-1389 when an older person’s safety or care worries you.',
      lead:
        'Elder abuse is not only visible assault. Blocking someone from leaving, withholding food, water, medication, or medical care, misusing money or property, insults, and threats can all be signals that counseling is needed. The first step is often safety checking and support connection.',
      ctaLabel: 'Open older adult services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'An older person may have been hit or pushed.',
            'Meals, water, medication, or medical care are not being provided.',
            'Family or caregivers block outings, contact, or visits.',
            'Someone seems to be using bank accounts, pension, or property without consent.',
            'The older person fears a specific person or hesitates to speak.',
            'You saw something concerning as a neighbor, acquaintance, manager, or facility worker.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The counselor may ask where the older person lives, whether they are safe now, what abuse is suspected, whether it is recurring, and whether it is urgent. You do not need complete evidence. Share what you saw, heard, or experienced as clearly as you can.',
          ],
          example: [
            'I am not sure if this is abuse, but an older person seems unable to leave home or eat properly.',
            'It is a family matter, so I am cautious, but I am worried about safety.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy and reporting',
          body: [
            'Anyone who becomes aware of elder abuse can report or consult. Calling 1577-1389 connects to the local elder protection agency. If you worry about being identified, ask about confidentiality and contact methods at the start.',
            'If calling feels hard, reporting through the Nabisaegim app may be available.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'Through the Nabisaegim app, you can enter location, period, details, and evidence materials. In emergencies, however, 112 or 119 can be faster than an app report.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'The local elder protection agency assesses urgency and safety, then may conduct on-site investigation, counseling, medical referral, legal support request, welfare facility placement referral, family or agency counseling, and recurrence prevention education. If risk is high, police or 119 may be involved.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If violence is happening now or life is at risk, call 112 first. If there is injury or emergency care is needed, 119 may also be needed.',
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
      title: '1342는 마약 문제를 신고하기 전에 회복을 상담할 수 있는 곳입니다',
      shortAnswer:
        '사용 사실을 말하는 것이 두렵거나 가족이 대신 걱정하는 상황이어도, 1342에서 24시간 무료로 상담을 시작할 수 있습니다.',
      lead:
        '마약류 사용이나 오남용 문제는 "말하는 순간 신고되는 것 아닐까" 하는 두려움 때문에 더 깊이 숨게 되기 쉽습니다. 용기한걸음센터 1342는 처벌을 먼저 떠올리게 하는 번호가 아니라, 상담·치료·재활로 이어지는 첫 연결입니다. 당사자뿐 아니라 가족과 지인도 문의할 수 있습니다.',
      ctaLabel: '중독 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '마약류를 사용했고 끊고 싶지만 혼자 어렵습니다.',
            '다시 사용하고 싶은 갈망이 강합니다.',
            '한 번 사용한 뒤 불안하거나 몸과 마음 상태가 걱정됩니다.',
            '처방약 오남용이 걱정됩니다.',
            '가족이나 친구가 사용 중인 것 같아 어떻게 말해야 할지 모르겠습니다.',
            '치료기관이나 재활기관을 어디서 찾아야 할지 모르겠습니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '상담원은 어떤 물질인지, 사용 빈도와 최근 사용 시점, 몸 상태, 금단이나 갈망, 혼자 있는지, 치료나 재활 의사가 있는지 등을 확인할 수 있습니다. 처음부터 모든 사실을 완벽하게 정리할 필요는 없습니다.',
          ],
          example: [
            '신고될까 봐 무서운데, 마약 문제 상담을 받고 싶어요.',
            '가족이 사용하는 것 같아요. 제가 먼저 상담받을 수 있나요?',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '1342는 24시간 무료 상담을 제공하며, 상담 내용과 개인정보는 비밀보장을 전제로 안내되고 있습니다. 상담자는 원하면 주거지 기준 가까운 한국마약퇴치운동본부 지부나 재활기관 등으로 연결될 수 있습니다.',
            '법적 상황은 개인별로 다를 수 있으므로, 가이드는 수사나 처벌 결과를 단정하지 않아야 합니다. 핵심은 "말하면 바로 끝난다"가 아니라 "말해야 치료와 재활 경로를 찾을 수 있다"는 점입니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '전화가 가장 빠른 경로입니다. 당장 말하기 어렵다면 첫 문장은 짧아도 됩니다.',
          ],
          example: ['마약 상담을 받고 싶습니다. 익명으로 가능한지 먼저 알고 싶어요.'],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '상담 결과에 따라 치료가 필요한 경우 치료보호기관, 재활이 필요한 경우 함께한걸음센터 등으로 연결될 수 있습니다. 중독 상담은 한 번의 결심으로 끝나지 않을 수 있습니다. 다시 사용했거나 끊지 못한 상태여도 연락할 수 있다는 메시지를 분명히 두는 것이 중요합니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '약물을 많이 사용했거나 의식, 호흡, 심장박동, 경련, 심한 불안이나 혼란이 있으면 1342보다 119가 먼저입니다. 누군가 약물 사용을 강요하거나 폭력이 함께 있으면 112도 필요합니다.',
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
      title: '1342 is for recovery counseling before fear shuts the door',
      shortAnswer:
        'Even if you are afraid to talk about use, or a family member is worried on someone’s behalf, 1342 offers 24/7 free counseling.',
      lead:
        'Drug use or misuse can become more hidden because people fear being reported as soon as they talk. 1342 is presented as a first connection to counseling, treatment, and rehabilitation. The person directly affected, family members, and acquaintances can ask for help.',
      ctaLabel: 'Open addiction services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'You used drugs and want to stop, but cannot do it alone.',
            'Cravings to use again feel strong.',
            'You feel anxious or physically unwell after using once.',
            'You are worried about prescription drug misuse.',
            'A family member or friend may be using and you do not know how to respond.',
            'You do not know where to find treatment or rehabilitation services.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'The counselor may ask what substance is involved, how often and how recently it was used, physical condition, withdrawal or cravings, whether you are alone, and whether treatment or rehabilitation is desired. You do not need every fact organized before calling.',
          ],
          example: [
            'I am scared this will be reported, but I want counseling about drug use.',
            'I think my family member is using. Can I get counseling first?',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            '1342 provides free 24-hour counseling, and public information describes counseling content and personal information as confidential. If the caller wants, they can be connected to a nearby Korea Association Against Drug Abuse branch or rehabilitation service.',
            'Legal situations differ by person, so the guide should not promise investigation or punishment outcomes. The key message is that talking can open treatment and rehabilitation routes.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: ['Calling is the fastest route. If it is hard to start, the first sentence can be short.'],
          example: ['I want drug counseling. I want to ask first whether anonymous counseling is possible.'],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Depending on the counseling result, treatment needs may connect to treatment protection institutions, and rehabilitation needs may connect to Together One Step Centers or similar services. Returning after reuse or while still unable to stop should remain clearly allowed.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If someone used a large amount or has consciousness, breathing, heartbeat, seizure, severe anxiety, or confusion symptoms, call 119 before 1342. If someone is forcing drug use or violence is involved, 112 may also be needed.',
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
      title: '스마일센터는 범죄 이후의 마음과 일상을 회복하도록 돕습니다',
      shortAnswer:
        '강력범죄 피해 이후 잠을 못 자거나, 계속 떠오르거나, 밖에 나가기 어렵거나, 가족까지 흔들린다면 스마일센터에 무료 지원을 문의할 수 있습니다.',
      lead:
        '범죄 피해 이후에는 신고와 수사만으로 회복이 끝나지 않습니다. 몸은 안전해졌어도 마음은 계속 사건 안에 머물 수 있고, 가족도 함께 무너질 수 있습니다. 스마일센터는 강력범죄 피해자와 가족을 대상으로 심리평가, 심리치료, 임시거처, 법률·사회지원 연계를 제공하는 범죄피해 트라우마 통합지원기관입니다.',
      ctaLabel: '범죄피해 상담처 보기',
      sections: [
        {
          id: 'when',
          title: '이럴 때 연락해도 됩니다',
          body: [],
          list: [
            '살인, 강도, 폭력, 성폭력, 방화 등 강력범죄 피해를 겪었습니다.',
            '사건 장면이 계속 떠오르거나 악몽, 불면, 불안이 심합니다.',
            '일상생활, 출근, 등교, 외출이 어렵습니다.',
            '가족도 충격을 받아 상담이 필요합니다.',
            '집에 머무르기 어렵거나 임시거처가 필요합니다.',
            '법률상담이나 범죄피해자지원센터 같은 다른 지원과의 차이를 알고 싶습니다.',
          ],
        },
        {
          id: 'firstCall',
          title: '처음 연결되면',
          body: [
            '스마일센터는 전화접수와 상담을 24시간 받을 수 있고, 등록면담과 심리치료 등은 평일 오전 9시부터 오후 6시 중심으로 진행됩니다. 전화에서는 어떤 피해가 있었는지, 현재 안전한지, 심리적 어려움이 어느 정도인지, 필요한 지원이 무엇인지, 서류나 의뢰가 필요한지 확인할 수 있습니다.',
          ],
          example: [
            '범죄 피해 이후 잠을 못 자고 계속 떠올라요. 제가 이용할 수 있는지 알고 싶어요.',
            '신고는 했는데 이후에 어떤 지원을 받을 수 있는지 모르겠어요.',
          ],
        },
        {
          id: 'privacy',
          title: '비밀·비용·신고',
          body: [
            '스마일센터의 모든 서비스는 무료로 제공됩니다. 심리치료 내용은 비밀보장이 원칙입니다. 다만 법률기관 요청처럼 특별한 경우에는 내담자의 의사를 확인한 뒤 자료를 제공할 수 있고, 자해나 타해 위험 등 특정 상황에서는 예외가 있을 수 있습니다.',
            '정신건강의학과 진료와 약물치료는 필수가 아닙니다. 증상과 필요에 따라 권유될 수 있으며, 심리치료와 함께 진행될 수 있습니다.',
          ],
        },
        {
          id: 'alternatives',
          title: '전화가 어렵다면',
          body: [
            '직접 신청이 가능하지만, 경찰서, 검찰청, 범죄피해자지원센터 등을 통해 의뢰될 수도 있습니다. 이미 수사기관이나 피해자지원센터와 연결되어 있다면 "스마일센터 심리지원을 받고 싶다"고 말해도 됩니다.',
          ],
        },
        {
          id: 'after',
          title: '상담 뒤에는',
          body: [
            '심리평가, 안정화 상담, 심리치료, 정신건강의학과 연계, 임시거처, 법률상담, 사회지원 연계가 진행될 수 있습니다. 범죄피해자지원센터는 치료비, 이사비, 생계비, 학자금 등 경제적 지원을 더 폭넓게 다룰 수 있으므로, 두 기관은 경쟁 관계가 아니라 함께 연결될 수 있는 지원 축으로 설명하는 것이 좋습니다.',
          ],
        },
        {
          id: 'urgent',
          title: '지금 위험하다면',
          body: [
            '가해자가 가까이 있거나 다시 피해를 당할 위험이 있으면 스마일센터보다 112가 먼저입니다. 다친 곳이 있거나 응급처치가 필요하면 119도 함께 필요합니다. 스마일센터는 즉시 위험이 지나간 뒤 회복 지원으로 다시 연결할 수 있습니다.',
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
      title: 'Smile Center helps with recovery after crime victimization',
      shortAnswer:
        'If after a violent crime you cannot sleep, the event keeps returning, going outside feels hard, or family members are also shaken, you can ask Smile Center about free support.',
      lead:
        'After crime victimization, recovery does not end with reporting or investigation. The body may be safe while the mind remains inside the event, and family members can also be affected. Smile Center is an integrated crime-victim trauma support service for victims of serious crimes and their families, offering psychological assessment, therapy, temporary housing, and legal or social support connection.',
      ctaLabel: 'Open crime victim support services',
      sections: [
        {
          id: 'when',
          title: 'It is okay to contact them when',
          body: [],
          list: [
            'You experienced a serious crime such as homicide, robbery, violence, sexual violence, or arson.',
            'Scenes from the event keep returning, or nightmares, insomnia, or anxiety are severe.',
            'Daily life, work, school, or going outside has become difficult.',
            'Family members are also affected and need counseling.',
            'It is hard to stay at home or temporary housing is needed.',
            'You want to understand the difference between Smile Center and other victim support centers.',
          ],
        },
        {
          id: 'firstCall',
          title: 'What they may ask first',
          body: [
            'Smile Center can receive phone intake and counseling 24 hours a day, while registration interviews and therapy are mainly on weekdays from 9:00 to 18:00. On the call, they may ask what harm occurred, whether you are safe now, how severe the psychological difficulty is, what support is needed, and whether documents or referral are required.',
          ],
          example: [
            'Since the crime, I cannot sleep and it keeps coming back. I want to know whether I can use this service.',
            'I reported it, but I do not know what support is available afterward.',
          ],
        },
        {
          id: 'privacy',
          title: 'Privacy, cost, and reporting',
          body: [
            'All Smile Center services are free. Psychological treatment is confidential by principle. In special situations, such as requests from legal institutions, information may be provided after confirming the client’s wishes, and there may be exceptions for self-harm or harm-to-others risk.',
            'Psychiatric treatment and medication are not mandatory. They may be recommended depending on symptoms and needs, and can be combined with psychotherapy.',
          ],
        },
        {
          id: 'alternatives',
          title: 'If calling is hard',
          body: [
            'Direct application is possible, and referral may also come through police, prosecutors, or crime victim support centers. If you are already connected to an investigative agency or victim support center, you can say that you want psychological support through Smile Center.',
          ],
        },
        {
          id: 'after',
          title: 'What may happen next',
          body: [
            'Support may include psychological assessment, stabilization counseling, psychotherapy, psychiatry referral, temporary housing, legal counseling, and social support connection. Crime victim support centers may cover broader economic support such as medical costs, moving costs, living expenses, and school expenses, so the two can work together.',
          ],
        },
        {
          id: 'urgent',
          title: 'If danger is immediate',
          body: [
            'If the offender is nearby or there is risk of being harmed again, call 112 before Smile Center. If you are injured or need emergency care, 119 may also be needed. Smile Center can be contacted again for recovery support after immediate danger passes.',
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
