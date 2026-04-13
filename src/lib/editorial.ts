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
      heading: '자살 위기와 극심한 불안은 혼자 버티지 않아도 됩니다',
      paragraphs: [
        '죽고 싶다는 생각이 반복되거나, 구체적인 방법을 떠올리고 있거나, 지금 당장 자신을 해칠 수 있다는 느낌이 들면 일반 정보 탐색보다 즉시 연결이 우선입니다. 이 페이지는 109 같은 자살예방 상담과 함께 응급 구조와 경찰 연결이 필요한 상황을 빠르게 구분할 수 있도록 정리했습니다.',
        '통화가 어렵다면 가까운 사람에게 함께 전화해 달라고 요청하고, 혼자 있지 말고, 위험한 물건을 잠시 멀리 두세요. 이미 행동 직전이거나 생명과 안전에 즉각적인 위험이 있으면 119나 112를 먼저 사용해야 합니다.',
      ],
      highlights: ['109 자살 위기 상담', '즉각 위험 시 119·112 우선', '24시간 연결 기관 중심'],
    },
    en: {
      heading: 'Suicidal crisis and acute distress do not need to be handled alone',
      paragraphs: [
        'If thoughts of suicide keep returning, you are planning a method, or you feel you may hurt yourself soon, immediate connection matters more than continued browsing. This page helps you quickly compare hotline 109 with other emergency response options in Korea.',
        'If speaking feels hard, ask someone nearby to stay with you and make the call together. Move away from sharp objects, medication, or anything you could use to harm yourself. If there is immediate danger to life or safety, call 119 or 112 first.',
      ],
      highlights: ['109 suicide crisis line', 'Use 119 or 112 for immediate danger', '24/7 services listed first'],
    },
  },
  depression: {
    ko: {
      heading: '우울, 번아웃, 불안이 길어질수록 더 일찍 연결하는 편이 좋습니다',
      paragraphs: [
        '기분 저하가 2주 이상 이어지거나, 잠과 식사 패턴이 크게 흔들리거나, 일과 관계가 무너질 정도로 무기력하다면 상담 연결 시점을 미루지 않는 것이 좋습니다. 이 페이지는 정신건강복지센터, 무료 심리상담, 바우처와 같은 접근 경로를 한곳에서 비교할 수 있게 정리했습니다.',
        '위기 상황이 아니라도 상담은 충분히 이용할 수 있습니다. 지금 상태를 정확히 설명하지 못해도 괜찮고, “요즘 버티기 어렵다”는 한 문장만으로도 시작할 수 있습니다. 비용, 운영시간, 접근 방식이 다른 기관을 함께 살펴보세요.',
      ],
      highlights: ['무료·저비용 상담 경로', '정신건강복지센터 안내', '불안·번아웃 지원 포함'],
    },
    en: {
      heading: 'Depression, burnout, and anxiety are easier to address when support starts early',
      paragraphs: [
        'If low mood lasts for more than two weeks, your sleep or appetite has changed, or daily life feels difficult to maintain, it helps to connect with support sooner rather than later. This page compares mental health centers, voucher routes, and low-cost counseling options in Korea.',
        'You do not need to be in immediate crisis to use counseling. It is enough to say that things feel hard lately. Compare cost, hours, and access routes here, then start with the option that feels easiest to reach today.',
      ],
      highlights: ['Free and low-cost support', 'Mental health center access', 'Burnout and anxiety guidance'],
    },
  },
  women: {
    ko: {
      heading: '폭력과 통제는 참을 일이 아니라 도움을 요청할 일입니다',
      paragraphs: [
        '가정폭력, 성폭력, 스토킹, 데이트폭력처럼 관계 안에서 반복되는 위협과 통제는 시간이 갈수록 위험해질 수 있습니다. 이 페이지는 1366과 피해자 지원 기관을 중심으로, 전화 연결 후 어떤 도움을 받을 수 있는지 빠르게 비교할 수 있게 구성했습니다.',
        '안전한 통화가 어려운 상황이라면 통화 기록과 위치 노출 가능성도 함께 고려해야 합니다. 급박한 위협이 있으면 먼저 112나 119로 연결하고, 이후 보호·법률·쉼터 지원까지 이어질 수 있는 기관을 확인해 보세요.',
      ],
      highlights: ['1366 여성긴급전화', '가정폭력·성폭력·스토킹 대응', '보호·쉼터·법률 연계'],
    },
    en: {
      heading: 'Violence and coercive control are reasons to seek help, not to endure silently',
      paragraphs: [
        'Domestic violence, sexual violence, stalking, and dating abuse often escalate over time. This page helps you compare the 1366 women support hotline with other organizations that can provide crisis counseling, shelter referrals, and next-step support in Korea.',
        'If calling is not fully safe, think about call logs, location sharing, and whether someone nearby can overhear you. If the threat is immediate, contact 112 or 119 first, then use the listed organizations for protection, legal guidance, and victim support.',
      ],
      highlights: ['1366 women support line', 'Violence response options', 'Shelter and legal support links'],
    },
  },
  youth: {
    ko: {
      heading: '청소년 위기는 늦기 전에 안전한 어른과 연결되는 것이 중요합니다',
      paragraphs: [
        '학교폭력, 가출, 학업 스트레스, 가족 갈등, 자해 충동은 혼자 감당하기 어려운 청소년 위기로 이어질 수 있습니다. 이 페이지는 1388, 청소년상담복지센터, 문자·온라인 상담 등 접근 방식이 다른 기관을 빠르게 살펴볼 수 있도록 정리했습니다.',
        '전화가 부담스러운 청소년에게는 문자나 온라인 상담이 더 쉬운 시작점이 될 수 있습니다. 지금 당장 집이나 학교에서 안전하지 않다면, 혼자 버티지 말고 긴급 기관과 신뢰할 수 있는 어른에게 바로 도움을 요청하세요.',
      ],
      highlights: ['1388 위기상담', '문자·온라인 상담 가능', '학교폭력·가정갈등 대응'],
    },
    en: {
      heading: 'Youth crises are easier to address when a safe adult is involved early',
      paragraphs: [
        'School violence, running away, family conflict, academic pressure, and self-harm urges can grow into urgent youth crises. This page helps you compare hotline 1388, youth counseling centers, and text or online support options in Korea.',
        'For teenagers who find phone calls difficult, text-based or online counseling may be the easiest first step. If home or school does not feel safe right now, ask a trusted adult for help and contact the emergency or youth support lines listed here.',
      ],
      highlights: ['1388 youth hotline', 'Text and online counseling', 'School and family crisis support'],
    },
  },
  queer: {
    ko: {
      heading: '정체성 때문에 설명을 포기하지 않아도 되는 상담이 필요할 수 있습니다',
      paragraphs: [
        '성소수자와 트랜스젠더 당사자는 일반 상담 환경에서 정체성을 다시 설명하거나 방어해야 한다는 부담 때문에 도움 요청을 미루기 쉽습니다. 이 페이지는 퀴어 친화적 상담, 커밍아웃 고민, 우울과 불안 지원처럼 실제 필요에 가까운 기관을 모아 두었습니다.',
        '모든 기관이 완벽히 같은 언어와 태도를 제공하는 것은 아니므로, 먼저 전화로 상담 범위와 친화성을 확인하는 것도 도움이 됩니다. 안전하고 존중받는 환경에서 시작하는 것이 지속적인 지원 연결에 더 유리합니다.',
      ],
      highlights: ['퀴어 친화 상담 안내', '커밍아웃 고민 지원', '우울·불안과 정체성 이슈 함께 고려'],
    },
    en: {
      heading: 'Support should not require you to defend or re-explain your identity',
      paragraphs: [
        'LGBTQ+ and transgender people often delay reaching out because many support settings feel unsafe or exhausting to explain. This page gathers queer-friendly counseling options in Korea, including support for coming out, identity stress, depression, and anxiety.',
        'Not every organization will use the same language or level of cultural competence, so it can help to ask about counseling scope before a full session. Starting in a respectful environment often makes ongoing support easier to continue.',
      ],
      highlights: ['Queer-friendly resources', 'Coming-out and identity support', 'Mental health care with safety in mind'],
    },
  },
  migrant: {
    ko: {
      heading: '언어와 체류 조건 때문에 도움을 포기하지 않도록 안내가 필요합니다',
      paragraphs: [
        '외국인, 이주노동자, 결혼이주여성은 위기 상황에서도 언어 장벽과 제도 정보 부족 때문에 적절한 지원을 놓치기 쉽습니다. 이 페이지는 다국어 상담 여부, 지원 범위, 접근 가능한 기관을 중심으로 빠르게 확인할 수 있도록 구성했습니다.',
        '상황 설명이 길지 않아도 괜찮습니다. 한국어가 익숙하지 않다면 가능한 언어 지원부터 확인하고, 통역이 가능한 기관이나 외국인 전용 핫라인을 먼저 이용해도 됩니다. 긴급 위험이 있으면 국적과 체류 자격과 무관하게 먼저 구조 요청이 우선입니다.',
      ],
      highlights: ['다국어 상담 여부 확인', '외국인·이주민 지원 기관', '긴급 구조는 체류 자격과 무관'],
    },
    en: {
      heading: 'People should not lose access to help because of language or migration status',
      paragraphs: [
        'Foreign residents, migrant workers, and marriage migrants in Korea can miss support simply because information is hard to access in a familiar language. This page highlights multilingual counseling options, support scope, and the easiest entry points for migrant-focused help.',
        'You do not need to explain everything perfectly in Korean. Start with services that offer language support or migrant-specific guidance. If there is immediate danger, emergency help comes first regardless of nationality or visa status.',
      ],
      highlights: ['Multilingual support options', 'Migrant-focused organizations', 'Emergency help first in urgent danger'],
    },
  },
  addiction: {
    ko: {
      heading: '중독은 의지 부족이 아니라 반복해서 지원이 필요한 문제일 수 있습니다',
      paragraphs: [
        '도박, 알코올, 약물, 게임, 인터넷 사용이 통제되지 않아 생활과 관계가 무너지고 있다면 빠른 상담 연결이 도움이 됩니다. 이 페이지는 중독관리통합지원센터와 전문 상담기관을 비교해, 어떤 문제에 어떤 기관이 더 적합한지 볼 수 있게 정리했습니다.',
        '당사자가 바로 도움을 요청하지 못하더라도 가족이 먼저 상담을 받는 것만으로도 대응 방식이 달라질 수 있습니다. 빚, 갈등, 재발 때문에 지쳐 있다면 혼자 해결하려 하기보다 초기 평가와 가족 지원이 가능한 기관부터 연결해 보세요.',
      ],
      highlights: ['도박·알코올·약물·게임 대응', '가족 상담도 시작 가능', '초기 평가와 재발 대응'],
    },
    en: {
      heading: 'Addiction often needs repeated support, not just stronger willpower',
      paragraphs: [
        'If gambling, alcohol, drugs, gaming, or internet use are disrupting daily life, relationships, or finances, early counseling can make the next steps clearer. This page compares Korean addiction support centers and specialist counseling options by problem type.',
        'Even if the person directly affected is not ready to ask for help, family members can often start with counseling themselves. If debt, conflict, or relapse are exhausting everyone involved, begin with services that can assess the situation and support both the person and the family.',
      ],
      highlights: ['Gambling, alcohol, drug, and gaming support', 'Family counseling can start first', 'Relapse-aware support options'],
    },
  },
  elder: {
    ko: {
      heading: '노년기 위기는 돌봄과 연결이 끊길 때 더 깊어질 수 있습니다',
      paragraphs: [
        '노인 학대, 고립, 우울, 돌봄 공백은 겉으로 드러나지 않아도 빠르게 악화될 수 있습니다. 이 페이지는 노인보호전문기관, 보건복지상담센터, 정서 지원 기관을 함께 비교해 지금 필요한 연결점을 찾을 수 있도록 만들었습니다.',
        '당사자가 직접 도움을 요청하지 못하는 경우 가족이나 이웃, 돌봄 제공자가 먼저 상담을 받는 것도 중요합니다. 신고가 필요한 상황과 생활 지원이 필요한 상황을 구분하면서, 안전과 돌봄을 동시에 살펴보는 것이 좋습니다.',
      ],
      highlights: ['노인학대 신고와 상담', '고립·우울 정서 지원', '가족·이웃의 대리 상담 가능'],
    },
    en: {
      heading: 'Older-adult crises often worsen when care and connection are interrupted',
      paragraphs: [
        'Elder abuse, isolation, depression, and gaps in care can become serious even when they are not immediately visible. This page compares Korean elder abuse reporting lines, welfare counseling, and emotional support resources so people can find the right starting point quickly.',
        'Older adults may not always be the first person to ask for help, so family members, neighbors, and care workers often need guidance too. It helps to separate urgent safety concerns from care-planning concerns while still addressing both together.',
      ],
      highlights: ['Elder abuse reporting', 'Isolation and depression support', 'Family and caregiver guidance'],
    },
  },
}

const GUIDE_INDEX_COPY: Record<Lang, GuideIndexCopy> = {
  ko: {
    title: '도움 요청 가이드 | 위기 대응, 우울, 폭력, 중독 안내',
    description:
      '위기 대응, 우울, 폭력 피해, 청소년 지원, 중독, 이주민·노인 지원까지 한국 상담기관을 이용하기 전 알아두면 좋은 실전 가이드 모음입니다.',
    intro:
      '전화번호만 보여 주는 디렉터리를 넘어서, 실제로 어떤 상황에서 어디에 먼저 연결해야 하는지 이해할 수 있도록 실전형 가이드를 모았습니다. 각 글은 상담을 시작할 때 바로 도움이 되는 말, 우선순위, 관련 페이지 링크를 함께 제공합니다.',
    focusPoints: ['즉각 위험 구분', '상황별 첫 연결점', '기관 이용 전 준비 포인트'],
  },
  en: {
    title: 'Help-Seeking Guides | Crisis, Depression, Violence, Addiction',
    description:
      'Practical guides for using Korean crisis helplines, including suicide risk, depression, violence, youth support, addiction, migrant support, and older-adult care.',
    intro:
      'This guide section goes beyond a phone-number directory and explains where to start, what to say, and what to prioritize in common support scenarios across Korea. Each section points to the most relevant directory page so you can move from information to action more quickly.',
    focusPoints: ['How to tell what is urgent', 'Where to start first', 'What to prepare before calling'],
  },
}

const GUIDE_ENTRIES = [
  {
    slug: 'friend-suicide-signs',
    category: 'crisis',
    ko: {
      title: '친구가 자살을 암시할 때 어떻게 말하고 어디에 연결할까',
      description:
        '죽고 싶다, 사라지고 싶다 같은 말을 들었을 때 피해야 할 말과 바로 연결해야 할 상담기관을 정리했습니다.',
      paragraphs: [
        '친구가 “죽고 싶다”, “사라지고 싶다”, “이제 끝내고 싶다”처럼 삶을 포기하는 표현을 반복한다면 단순한 하소연으로 넘기지 않는 편이 안전합니다. 비밀을 지켜 주겠다고 약속하기보다, 지금 얼마나 구체적인지와 혼자 있는지, 이미 위험한 물건이나 계획이 있는지를 차분하게 확인하는 것이 중요합니다.',
        '설득하거나 혼내기보다 곁에 남아 있는 것이 우선입니다. 혼자 두지 말고, 가능한 한 함께 109나 응급 번호로 연결하세요. 직접 말하기 어려우면 “내가 대신 같이 전화해도 돼”라고 제안하는 식의 구체적인 도움이 실제 연결 확률을 높입니다.',
      ],
      checklist: [
        '죽고 싶다는 말이 구체적인 계획으로 이어지는지 확인하기',
        '혼자 두지 않고 가까운 어른이나 보호자에게 알리기',
        '즉각 위험 시 109, 119, 112 순서로 바로 연결하기',
      ],
    },
    en: {
      title: 'How to respond when a friend hints at suicide',
      description:
        'A practical guide to what to say, what to avoid, and which Korean crisis lines to contact when a friend talks about wanting to die.',
      paragraphs: [
        'If a friend keeps saying things like “I want to disappear” or “I want it to end,” it is safer to treat that as a real warning sign rather than ordinary venting. Instead of promising secrecy, ask calm and direct questions about whether they are alone, whether they have a plan, and whether there is immediate access to anything they could use to hurt themselves.',
        'Staying with the person is usually more helpful than trying to argue them out of how they feel. If possible, make the call together to 109 or emergency services in Korea. If they cannot speak much, offer a concrete next step such as calling on speakerphone together or contacting another trusted adult right away.',
      ],
      checklist: [
        'Ask whether there is a plan, timing, or immediate access to means',
        'Do not leave the person alone if danger feels near',
        'Use 109 first, or 119 and 112 when the danger is immediate',
      ],
    },
  },
  {
    slug: 'depression-next-steps',
    category: 'depression',
    ko: {
      title: '우울 증상이 계속될 때 무료 상담과 첫 연결점을 찾는 방법',
      description:
        '우울, 무기력, 불안이 이어질 때 어떤 기관부터 연락하면 좋은지와 비용 부담을 줄이는 경로를 정리했습니다.',
      paragraphs: [
        '우울 증상이 오래 지속되면 “더 심해지기 전까지는 괜찮다”고 버티기 쉽지만, 실제로는 초기에 연결할수록 선택지가 넓습니다. 정신건강복지센터, 심리상담 바우처, 직장 EAP처럼 접근 경로가 여러 가지이기 때문에, 현재의 비용 부담과 지역, 이용 가능한 시간을 기준으로 첫 연결점을 정하는 것이 좋습니다.',
        '상담을 처음 받을 때는 진단명을 정확히 말할 필요가 없습니다. 잠을 못 자는지, 출근이나 등교가 버거운지, 식사와 집중이 무너졌는지 같은 변화만 이야기해도 충분합니다. 오늘 바로 연결 가능한 곳과 예약이 필요한 곳을 구분해 두면 실제 행동으로 옮기기 쉬워집니다.',
      ],
      checklist: [
        '2주 이상 이어진 수면·식사·집중 변화 적어 보기',
        '무료 또는 저비용 기관부터 먼저 확인하기',
        '오늘 연결 가능한 기관과 예약 기관을 나눠 보기',
      ],
    },
    en: {
      title: 'How to find a first step when depression symptoms keep going',
      description:
        'A practical guide to free or low-cost support routes in Korea when depression, numbness, anxiety, or burnout continue.',
      paragraphs: [
        'When depression or burnout continues, many people wait because they feel they are not “bad enough” yet. In practice, early support often means more options and less disruption later. Korea has several entry points, including mental health welfare centers, voucher-based counseling, and workplace assistance programs, so it helps to begin with the route that matches your cost and scheduling limits.',
        'You do not need a precise diagnosis to start. It is enough to describe what has changed in your sleep, appetite, concentration, work, school, or relationships. Separating options into “can contact today” and “requires booking” can make the next action feel much more manageable.',
      ],
      checklist: [
        'Write down symptom changes lasting more than two weeks',
        'Check free or low-cost routes before assuming counseling is unaffordable',
        'Separate same-day options from services that need an appointment',
      ],
    },
  },
  {
    slug: 'violence-safety-reporting',
    category: 'women',
    ko: {
      title: '가정폭력이나 스토킹 피해가 있을 때 안전하게 기록하고 신고 준비하기',
      description:
        '통화가 안전하지 않은 상황에서 어떤 기록이 도움이 되는지, 어떤 기관에 먼저 연결할지 정리한 안전 중심 가이드입니다.',
      paragraphs: [
        '가정폭력, 데이트폭력, 스토킹은 피해 사실을 설명하는 것 자체가 위험할 수 있다는 점을 먼저 고려해야 합니다. 통화기록, 메시지, 사진, 날짜 메모 같은 자료는 나중에 도움이 될 수 있지만, 기록을 남기는 행동이 당장의 안전을 위협한다면 보관 방식부터 다시 점검해야 합니다.',
        '위협이 급박하면 증거 정리보다 즉시 안전한 장소와 긴급 연락이 우선입니다. 이후에는 1366이나 피해자 지원기관에 연결해 보호, 상담, 법률 지원, 쉼터 가능성까지 함께 확인하는 편이 좋습니다. 혼자 모든 단계를 계획하려 하기보다, 현재 위험도와 다음 행동을 같이 정리해 줄 기관에 먼저 연결하세요.',
      ],
      checklist: [
        '현재 위치와 통화 기록 노출 위험부터 확인하기',
        '즉각 위험이면 112 또는 119를 먼저 사용하기',
        '1366과 피해자 지원기관에서 보호·법률·쉼터 연계를 함께 묻기',
      ],
    },
    en: {
      title: 'How to document violence safely and prepare for reporting',
      description:
        'A safety-first guide for domestic violence, dating violence, and stalking situations in Korea, including when to prioritize emergency help.',
      paragraphs: [
        'Domestic violence and stalking can make even simple help-seeking risky. Notes, screenshots, dates, and photos may later support reporting, but saving them should never increase immediate danger. Think first about whether your phone, cloud account, messages, or shared location are being monitored.',
        'If the threat feels urgent, focus on physical safety and emergency contact before evidence organization. After the immediate risk is addressed, services like 1366 and victim-support organizations can help you think through protection, shelter options, counseling, and legal next steps without having to plan every step alone.',
      ],
      checklist: [
        'Check whether your device or location may be monitored',
        'Use 112 or 119 first if danger feels immediate',
        'Ask 1366 about protection, shelter, and legal support together',
      ],
    },
  },
  {
    slug: 'teen-self-harm-support',
    category: 'youth',
    ko: {
      title: '청소년이 자해를 말할 때 부모와 보호자가 바로 할 수 있는 일',
      description:
        '놀라서 통제하기보다 안전과 연결을 우선하는 방식으로 1388과 청소년 상담기관을 활용하는 가이드입니다.',
      paragraphs: [
        '청소년이 자해 경험이나 충동을 털어놓았을 때 가장 먼저 필요한 것은 판단보다 안전 확인입니다. 혼내거나 휴대폰을 빼앗는 방식은 대화를 끊을 수 있으므로, 지금 다칠 위험이 있는지, 혼자 있는지, 위험한 물건이 가까운지부터 차분하게 확인하는 것이 중요합니다.',
        '보호자는 모든 답을 알고 있어야 할 필요가 없습니다. 1388이나 청소년상담복지센터에 먼저 연락해 어떻게 대화를 이어갈지 도움을 받을 수 있습니다. 학교, 병원, 가족을 어떻게 연결할지 혼자 정리하려 하기보다, 지금 가장 안전한 다음 한 걸음을 만드는 데 집중하세요.',
      ],
      checklist: [
        '현재 자해 위험과 주변 환경부터 확인하기',
        '비난이나 압박보다 안전한 대화 유지하기',
        '1388 또는 청소년상담복지센터에 보호자도 먼저 연락하기',
      ],
    },
    en: {
      title: 'What parents or caregivers can do when a teen talks about self-harm',
      description:
        'A practical guide for responding with safety and connection first, including when to use 1388 and youth counseling resources in Korea.',
      paragraphs: [
        'When a teenager talks about self-harm, the first priority is safety rather than control or punishment. Taking away a phone or reacting with anger can shut down the conversation. Start by checking whether the person is alone, whether there is immediate danger, and whether anything nearby could be used for self-harm.',
        'Parents and caregivers do not need to solve everything alone. Korean youth resources such as 1388 and local youth counseling centers can help you decide how to continue the conversation, when to involve school or medical care, and how to support the teen without escalating fear or shame.',
      ],
      checklist: [
        'Check immediate risk and the surrounding environment first',
        'Keep the conversation open instead of reacting with blame',
        'Use 1388 or youth counseling centers for caregiver guidance too',
      ],
    },
  },
  {
    slug: 'burnout-free-counseling',
    category: 'depression',
    ko: {
      title: '직장 번아웃과 무기력감이 심할 때 무료 상담을 연결하는 순서',
      description:
        '회사에 알리지 않고도 확인할 수 있는 무료·저비용 심리상담 경로와 EAP 활용 포인트를 정리했습니다.',
      paragraphs: [
        '번아웃은 단순한 피로가 아니라 수면, 집중, 감정 조절, 업무 지속에 영향을 주는 상태로 이어질 수 있습니다. 비용이 부담돼 도움을 미루고 있다면 지역 정신건강복지센터, 바우처, 회사 EAP처럼 비교적 접근 장벽이 낮은 경로부터 확인하는 것이 좋습니다.',
        '회사에 알려질까 걱정되는 경우에도 이용 경로마다 개인정보 처리 방식과 연결 범위가 다릅니다. “당장 퇴사해야 하나” 같은 큰 결론보다, 이번 주 안에 한 번 연결 가능한 상담 창구를 정하는 것이 더 현실적인 첫 단계가 될 수 있습니다.',
      ],
      checklist: [
        '수면·집중·감정 변화가 업무에 미치는 영향 적어 보기',
        '정신건강복지센터·바우처·EAP를 비교하기',
        '이번 주 안에 연결 가능한 한 곳을 먼저 정하기',
      ],
    },
    en: {
      title: 'A simple order for finding free counseling during work burnout',
      description:
        'A practical guide to low-cost mental health routes in Korea when burnout, numbness, or work stress start affecting daily functioning.',
      paragraphs: [
        'Burnout is more than feeling tired. It can change sleep, concentration, emotional regulation, and the ability to keep working or studying. If cost is the main reason you have delayed support, start with Korean routes that have lower barriers, such as mental health welfare centers, vouchers, or employee assistance programs.',
        'If you worry about privacy, compare how each route handles access and confidentiality before assuming counseling will reach your workplace. Instead of trying to decide everything at once, begin by choosing one option you could realistically contact this week.',
      ],
      checklist: [
        'Notice how burnout is affecting sleep, focus, and daily function',
        'Compare community centers, vouchers, and workplace assistance',
        'Choose one realistic contact point for this week',
      ],
    },
  },
  {
    slug: 'family-gambling-support',
    category: 'addiction',
    ko: {
      title: '가족이 도박 문제로 무너질 때 당사자보다 먼저 상담받아도 괜찮습니다',
      description:
        '빚, 거짓말, 재발로 지친 가족이 중독 상담기관에 먼저 연락해도 되는 이유와 준비할 내용을 정리했습니다.',
      paragraphs: [
        '도박 문제는 당사자뿐 아니라 가족의 생활과 안전에도 큰 영향을 줍니다. 빚, 거짓말, 분노, 반복되는 약속 위반 때문에 지쳐 있다면 “본인이 싫다는데 내가 먼저 상담받아도 되나”라는 고민이 들 수 있지만, 가족이 먼저 도움을 요청하는 것은 매우 일반적이고 도움이 됩니다.',
        '처음 연락할 때는 모든 사실을 정리해 두지 않아도 괜찮습니다. 최근 반복되는 행동, 금전 문제, 갈등 정도, 현재 안전 문제만 간단히 메모해도 충분합니다. 중독 상담기관은 당사자 개입 여부와 별개로 가족이 지금 무엇을 하지 말아야 하는지, 어떤 경계를 세워야 하는지 함께 안내할 수 있습니다.',
      ],
      checklist: [
        '최근 반복되는 도박 행동과 금전 문제를 간단히 메모하기',
        '가족 안전이나 폭력 위험이 있는지 먼저 확인하기',
        '당사자 동의가 없어도 가족 상담이 가능한 기관부터 연결하기',
      ],
    },
    en: {
      title: 'It is okay for family members to seek gambling support first',
      description:
        'A practical guide for families affected by debt, secrecy, relapse, and stress around gambling problems in Korea.',
      paragraphs: [
        'Gambling problems affect more than the person who is betting. Debt, secrecy, repeated promises, anger, and relapse can destabilize an entire household. Families often hesitate because they think support only makes sense if the person directly affected agrees first, but family counseling is often a valid and helpful starting point.',
        'You do not need a perfect timeline before contacting an addiction service. A short note about recent gambling behavior, money issues, conflict, and safety concerns is enough to begin. Counselors can help family members think about boundaries, urgent risks, and what kinds of responses may reduce harm even before the person is ready for treatment.',
      ],
      checklist: [
        'Write down the recent pattern of gambling, debt, and conflict',
        'Check for safety risks such as threats, violence, or severe financial crisis',
        'Start with services that support family members even without full buy-in',
      ],
    },
  },
  {
    slug: 'foreigner-mental-health-korea',
    category: 'migrant',
    ko: {
      title: '한국에서 외국인·이주민이 언어 장벽 없이 상담을 시작하는 법',
      description:
        '영어 또는 다국어 상담이 가능한 기관을 먼저 고르고, 긴급 상황에서 어떤 번호를 우선 써야 하는지 정리했습니다.',
      paragraphs: [
        '한국에서 생활하는 외국인과 이주민은 상담이 필요해도 어디로 전화해야 하는지, 한국어가 부족해도 괜찮은지부터 막히는 경우가 많습니다. 이런 경우에는 문제를 전부 설명하려 하기보다, 먼저 가능한 언어와 지원 범위를 확인할 수 있는 기관부터 연결하는 편이 훨씬 수월합니다.',
        '긴급 위험이 있으면 통역 가능 여부를 완벽히 확인하기 전에 구조 요청을 우선해야 합니다. 위기가 지난 뒤에는 외국인 전용 핫라인이나 다국어 상담기관을 통해 체류, 노동, 가족 문제와 정서 지원을 함께 정리할 수 있습니다. 필요한 언어로 천천히 설명해도 된다는 점을 기억하세요.',
      ],
      checklist: [
        '가능한 언어 지원 여부부터 먼저 확인하기',
        '즉각 위험이면 통역보다 구조 요청을 우선하기',
        '외국인·이주민 전용 기관에서 정서와 생활 문제를 함께 묻기',
      ],
    },
    en: {
      title: 'How foreigners and migrants in Korea can start counseling despite language barriers',
      description:
        'A practical guide to multilingual helplines, urgent safety choices, and the easiest first contact points for foreigners in Korea.',
      paragraphs: [
        'Many foreigners and migrants in Korea get stuck before support even starts because they are unsure which numbers can handle English or other languages. In those situations, begin by checking language support and service scope first instead of trying to explain the whole problem immediately in Korean.',
        'If there is immediate danger, emergency response comes before perfect interpretation. Once the urgent situation is safer, migrant-focused or multilingual services can help with emotional support, family stress, work issues, and practical guidance. Taking the first step in a language you can manage is often the fastest path forward.',
      ],
      checklist: [
        'Check which services can support your preferred language',
        'Use emergency response first when the danger is immediate',
        'Ask migrant-focused services about both emotional and practical concerns',
      ],
    },
  },
  {
    slug: 'older-adult-loneliness-support',
    category: 'elder',
    ko: {
      title: '고립된 어르신을 도울 때 신고와 돌봄 지원을 함께 보는 방법',
      description:
        '노인학대 신고가 필요한 상황과 정서·생활 지원이 필요한 상황을 구분하면서도 함께 살피는 방법을 안내합니다.',
      paragraphs: [
        '혼자 지내는 어르신이 식사, 약 복용, 안전 확인, 정서적 교류에서 계속 어려움을 겪고 있다면 단순한 외로움 문제로만 보지 않는 편이 좋습니다. 고립과 우울은 학대, 방임, 건강 악화와도 연결될 수 있으므로, 신고가 필요한 상황인지 생활 지원이 더 시급한 상황인지 함께 살펴야 합니다.',
        '가족이나 이웃이 먼저 상담을 요청해도 괜찮습니다. 반복되는 위험 신호를 간단히 정리해 두고, 노인보호전문기관이나 복지 상담기관에 현재 상황을 설명해 보세요. 당장 신고가 필요한지, 정기 방문이나 돌봄 연결이 우선인지, 감정 지원이 필요한지를 나눠서 안내받을 수 있습니다.',
      ],
      checklist: [
        '식사·약·위생·안전 확인 같은 생활 신호를 먼저 살피기',
        '학대나 방임 의심 시 신고 가능성을 함께 점검하기',
        '가족·이웃도 먼저 상담을 요청할 수 있다는 점 기억하기',
      ],
    },
    en: {
      title: 'How to look at reporting and care support together for isolated older adults',
      description:
        'A guide to recognizing when elder abuse reporting may be needed and when emotional or daily care support should be arranged in Korea.',
      paragraphs: [
        'When an older adult is increasingly isolated, missing meals, struggling with medication, or losing contact with others, it helps not to frame the issue as “loneliness only.” Isolation can overlap with neglect, depression, worsening health, and even abuse, so the next step may involve both safety assessment and care planning.',
        'Family members, neighbors, and care workers can seek advice first. A short record of repeated warning signs is enough to begin. Korean elder protection and welfare services can help clarify whether the situation calls for formal reporting, ongoing support visits, emotional care, or a combination of these steps.',
      ],
      checklist: [
        'Notice daily living warning signs such as food, medication, and hygiene',
        'Check whether abuse or neglect may be part of the situation',
        'Remember that family or neighbors can ask for guidance first',
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
