# Notion SEO 업데이트 계획

기준 파일: `C:\helpme\notion_list.csv`  
확인일: 2026-06-04

## 요약

현재 카드는 페이지 본문과 JSON-LD에 반영되지만, Notion 원천 데이터가 짧고 구조화 필드가 부족해서 SEO 신호가 약하다. 특히 Google과 네이버 모두 페이지별 고유한 설명, 본문 품질, 명확한 링크/구조화 데이터를 중요하게 보므로, Notion DB 자체를 SEO 가능한 콘텐츠 소스로 보강해야 한다.

현재 CSV/DB 상태:
- 활성 카드: 35개
- 카테고리 분포: 우울 8, 청소년 6, 성소수자 5, 위기·긴급 4, 여성 4, 이주민 3, 중독 3, 노인 3, 범죄피해 3
- 평균 description 길이: 대부분 13~26자 수준으로 매우 짧음
- `phone` 누락: 10개
- `hours_detail` 누락: 25개
- `situation_keywords` 누락: 1개
- 실제 Notion DB에 없는 중요 필드: `languages`, `age_group`, `exclusion_description`, `seo_summary`, `search_intent`, `last_verified`, `source_priority`, `source_type`

## 1. 먼저 추가해야 할 Notion 속성

앱 코드가 이미 읽을 수 있거나 이번에 읽도록 준비한 필드다.

| 속성명 | 타입 | 목적 | 앱 반영 |
|---|---|---|---|
| `languages` | multi_select | 한국어 외 언어 지원 표시, 챗 추천 보정, JSON-LD availableLanguage | 이미 지원 |
| `age_group` | multi_select | 청소년/노인/성인 등 대상자 필터와 챗 추천 보정 | 이미 지원 |
| `exclusion_description` | rich_text | 사용자가 오해하면 안 되는 제한 사항. 챗 LLM 판단 보정 | 이미 지원 |
| `seo_summary` | rich_text | 카드별 검색용 설명. JSON-LD description 우선값 | 이번에 지원 |
| `search_intent` | multi_select | 사용자가 실제로 검색/입력할 질문형 의도 | 이번에 지원 |
| `last_verified` | date | 정보 확인일. JSON-LD dateModified와 운영 점검 | 이번에 지원 |
| `source_type` | select | official, public, nonprofit, private 등 출처 성격 | 이번에 지원 |
| `source_priority` | select | official-high, public-high, nonprofit-medium 등 신뢰 우선순위 | 이번에 지원 |

## 2. description 작성 기준

현재 description은 카드 표시에는 짧아서 좋지만, 검색엔진이 카드 의미를 이해하기에는 얇다. 앞으로는 `description`은 사용자 카드용, `seo_summary`는 검색/구조화 데이터용으로 분리한다.

권장:
- `description`: 35~70자
- `seo_summary`: 70~140자
- 문장 구조: `대상자 + 상황 + 제공 지원 + 첫 행동`

예:
- 기존: `경찰 신고 112`
- 개선 description: `범죄, 폭력, 스토킹 등 즉각적인 신변위협이 있을 때 신고하는 경찰 긴급번호`
- seo_summary: `112는 범죄, 폭력, 스토킹, 침입, 신변위협처럼 현재 안전이 위험한 상황에서 먼저 연락해야 하는 경찰 긴급 신고 번호입니다.`

## 3. 카테고리별 우선 보강 포인트

### 위기·긴급

문제:
- 평균 description 13.2자로 가장 얇음
- 112/119/109가 너무 번호명만 반복됨

보강:
- 112: 범죄·폭력·스토킹·침입·현재 위험
- 119: 부상·응급의료·구조·자살시도 위험
- 109: 자살생각·자해충동·죽고 싶다는 생각
- 생명의전화: 민간 위기상담, 24시간 여부와 109와의 차이

### 우울

문제:
- 카드 수는 8개로 많지만 `hours_detail` 전부 누락
- 119/109가 함께 포함되어 있어 일반 우울 상담과 위기 대응의 차이를 설명해야 함

보강:
- `exclusion_description`: 생명·신체 위험은 119/112/109 우선
- `search_intent`: 우울할 때 전화, 무료 심리상담, 돈 없을 때 상담, 정신건강복지센터, 상담 바우처
- 서비스별 역할 차이 명확화

### 여성

문제:
- 카드 품질은 비교적 좋으나 위기임산부/디지털성범죄/1366의 검색 의도가 다름

보강:
- 1366: 신고 없이 상담, 보호시설/법률/의료 연계
- 디지털성범죄피해자지원센터: 삭제지원, 유포협박, 딥페이크
- 위기임산부 상담전화: 임신·출산·양육 곤란, 보호출산

### 청소년

문제:
- 카드 수는 충분하지만 대상자와 대신 상담 가능 여부가 약함

보강:
- 1388: 청소년 본인 전화 가능, 보호자/친구/교사 문의 가능
- 117: 학교폭력 신고 성격
- Wee 센터: 학교 안/교육청 기반 상담
- 청소년근로권익센터: 아르바이트 임금체불·부당대우

### 성소수자

문제:
- 모든 카드의 phone이 없음
- hours_detail도 모두 없음
- SEO 관점에서는 온라인/이메일/상담 신청 방식이 매우 중요

보강:
- `contact_method`: online/email/in-person 구분 강화
- `exclusion_description`: 긴급 신변위협은 112/119 우선
- `search_intent`: 아웃팅 걱정, 커밍아웃, 차별, 트랜스젠더, 퀴어 친화 병원/상담
- 띵동은 청소년 성소수자와 함께 보기/대표 가이드 연결용으로 특히 중요

### 이주민·외국인

문제:
- 언어 지원이 핵심인데 `languages` 필드가 없음

보강:
- 다누리콜센터: 지원 언어, 24시간, 이주여성/다문화가족
- 외국인력상담센터: 노동, 임금체불, 산재, 체류
- 외국인종합안내센터: 출입국, 비자, 생활안내

### 중독

문제:
- description 평균 19.7자로 짧음
- 도박/마약/알코올·약물 통합지원의 차이가 더 드러나야 함

보강:
- 용기한걸음센터: 마약 상담·재활
- 도박 중독 헬프라인: 도박·빚·가족도박
- 중독관리통합지원센터: 알코올·약물·치료·재활

### 노인

문제:
- 노인학대와 돌봄/치매가 섞여 있어 검색 의도 분리가 필요

보강:
- 1389: 노인학대 신고·상담
- 독거노인종합지원센터: 고립, 돌봄 공백, 응급안전안심서비스
- 치매상담콜센터: 치매 가족상담, 치료 정보

### 범죄피해

문제:
- `situation_keywords` 누락 1개
- 평균 키워드 수 2개로 가장 낮음
- 이번에 새 탭이 생긴 만큼 원천 데이터 보강 효과가 큼

보강:
- 스마일센터: 범죄피해 후 심리상담, 트라우마 회복, 치료비·법률 연계 가능성
- 대한법률구조공단: 취약계층 법률상담, 소송구조
- 국가인권위원회: 차별·인권침해 진정, 상담
- `search_intent`: 범죄피해 상담, 스마일센터 이용, 경찰 신고 후 도움, 피해자 법률상담, 치료비 지원

## 4. 업데이트 우선순위

1. DB 속성 추가: `languages`, `age_group`, `exclusion_description`, `seo_summary`, `search_intent`, `last_verified`, `source_type`, `source_priority`
2. 모든 카드의 `description`을 최소 35자 이상으로 보강
3. 모든 카드의 `seo_summary` 작성
4. `hours_detail` 25개 누락 보강. 모르면 `공식 페이지 확인 필요` 대신 비워두지 않고 운영 상태를 확인해야 함
5. 언어 지원이 중요한 카드부터 `languages` 입력: 다누리, 외국인력상담센터, 외국인종합안내센터, 119/112 통역 가능성
6. 성소수자/온라인 중심 카드의 `contact_method`와 `hours_detail` 정리
7. 범죄피해 카드의 `situation_keywords`와 `search_intent` 보강
8. 전체 카드에 `last_verified` 입력

## 5. 앱 반영 상태

이미 앱이 읽는 필드:
- `languages`
- `age_group`
- `exclusion_description`

이번에 코드로 추가한 필드:
- `seo_summary`
- `search_intent`
- `last_verified`
- `source_priority`
- `source_type`

반영 위치:
- 카테고리 페이지 JSON-LD `Organization.description`: `seo_summary`가 있으면 우선 사용
- 카테고리 페이지 JSON-LD `keywords`/`knowsAbout`: `situation_keywords`와 `search_intent` 병합
- 카테고리 페이지 JSON-LD `dateModified`: `last_verified` 사용
- 카테고리 페이지 JSON-LD `additionalProperty`: `source_type`, `source_priority` 사용

## 6. 실제 Notion 업데이트 전 확인할 것

- 속성 추가를 실제 Notion DB에 바로 적용할지
- 기존 35개 카드 전체를 한 번에 보강할지, 카테고리별로 나눌지
- `seo_summary`를 화면 카드에는 노출하지 않고 구조화 데이터에만 쓸지
- `last_verified`를 화면에도 표시할지
- Search Console/네이버 Search Advisor 기준으로 우선 노출을 노릴 카테고리 순서
