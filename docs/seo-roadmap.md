# SEO 작업 로드맵

작성일: 2026-06-04

## 기준

- Google은 좋은 title이 페이지마다 고유하고 명확하며 내용을 정확히 설명해야 한다고 안내한다.
- Google은 meta description을 검색 스니펫 후보로 사용할 수 있으므로, 페이지 내용을 한두 문장으로 요약하는 설명이 필요하다고 안내한다.
- Google은 구조화 데이터를 페이지 의미를 명시적으로 전달하는 신호로 설명한다.
- 네이버 Search Advisor는 페이지마다 고유한 `<title>`과 `<meta name="description">`을 권장하고, 중복 제목/설명이 노출에 불리할 수 있다고 설명한다.
- 네이버는 robots.txt에서 검색로봇 접근을 허용하고 sitemap.xml 위치를 알릴 수 있다고 안내한다.
- 네이버는 일반 title/description과 OG title/description을 모두 검색 결과 제목·설명 후보로 활용할 수 있다고 안내한다.

참고:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://developers.google.com/search/docs/advanced/crawling/localized-versions
- https://searchadvisor.naver.com/guide/seo-help
- https://searchadvisor.naver.com/guide/seo-basic-create
- https://searchadvisor.naver.com/guide/report-seo
- https://searchadvisor.naver.com/guide/faq-serpedit

## 1차: 현재 페이지 구조 반영

완료 목표:
- 새 탭 `범죄피해`, 가이드 개편, 챗 매칭 고도화, 카드 변경사항을 title/description/keywords에 반영한다.
- 네이버를 고려해 각 페이지 title은 `페이지 주제 | 긴급상담 헬프라인` 형태로 고유하게 유지한다.
- 카테고리 페이지의 구조화 데이터에 대표 서비스, 검색 의도, 수정일을 반영한다.
- `/robots.txt`에 `Yeti` 허용 규칙을 명시한다.
- `/sitemap.xml`은 모든 ko/en 공개 URL을 포함하고 안정적인 lastModified를 제공한다.
- `npm run seo:check`로 주요 SEO 신호를 로컬에서 확인한다.

## 1.5차: Notion 원천 데이터 SEO 보강

카드 데이터는 페이지 본문과 JSON-LD에 직접 반영되므로, Notion DB 자체가 SEO 콘텐츠 소스가 된다. 현재 `notion_list.csv` 기준으로 description이 짧고 `languages`, `age_group`, `exclusion_description`, `seo_summary`, `search_intent`, `last_verified` 같은 필드가 빠져 있어 이 축을 별도 작업으로 둔다.

완료 목표:
- Notion DB에 `languages`, `age_group`, `exclusion_description`을 추가해 챗 매칭과 카드 구조화 데이터를 보강한다.
- Notion DB에 `seo_summary`, `search_intent`, `last_verified`, `source_type`, `source_priority`를 추가해 검색엔진용 설명, 사용자의 실제 검색 의도, 정보 확인일, 출처 신뢰도를 관리한다.
- 모든 카드의 `description`을 최소 35자 이상으로 보강한다.
- 모든 카드의 `seo_summary`를 70~140자 수준으로 작성한다.
- `hours_detail` 누락 카드와 성소수자/외국인/범죄피해 카드의 핵심 필드를 우선 보강한다.
- 세부 계획은 `docs/notion-seo-update-plan.md`를 따른다.

## 2차: 독립 가이드 URL 검토

현재 `/guide#guide-1388` 같은 해시 링크는 UX에는 좋지만, 검색엔진에는 독립 문서로 강하게 전달되기 어렵다.

독립 URL 후보:
- `/ko/guide/109`
- `/ko/guide/1366`
- `/ko/guide/1388`
- `/ko/guide/ddingdong`
- `/ko/guide/danuri`
- `/ko/guide/elder-abuse-1389`
- `/ko/guide/drug-1342`
- `/ko/guide/smile-center`

조건:
- 원고는 `src/lib/guides.ts`를 단일 소스로 유지한다.
- 전체 `/guide`는 허브 페이지로 유지한다.
- 독립 URL에는 self canonical을 둔다.
- 허브와 상세 간 내부 링크를 명확히 둔다.

## 3차: 검색 의도형 본문 보강

카테고리별로 사용자가 실제로 묻는 질문을 본문에 짧게 반영한다.

예:
- 1366에 전화하면 신고해야 하나요?
- 1388은 청소년 본인이 직접 전화해도 되나요?
- 스마일센터는 경찰 신고 후에만 이용할 수 있나요?
- 109와 119 중 어디에 먼저 전화해야 하나요?
- 다누리콜센터는 어떤 언어를 지원하나요?

주의:
- FAQPage rich result만을 목적으로 하지 않는다.
- 본문 품질과 사용자 이해를 우선한다.
- 고위험 상황에서는 112, 119, 109 우선 안내를 유지한다.

## 4차: 신뢰성 신호 강화

- 각 가이드에 출처와 최근 확인일을 표시한다.
- Notion 카드 정보에도 최근 확인일 필드를 둘지 검토한다.
- 공식기관 출처, 공공기관 출처, 민간 전문기관 출처의 우선순위를 문서화한다.
- 면책/긴급 안내 문구가 모든 주요 진입 경로에서 보이도록 점검한다.

## 5차: 운영 루프

주 1회:
- Google Search Console 색인/성능 보고서 확인
- 네이버 Search Advisor 사이트 최적화/수집 현황/콘텐츠 노출 클릭 리포트 확인
- CTR은 낮지만 노출이 있는 URL의 title/description 개선

콘텐츠 변경 시:
- Notion 카드 추가/변경/삭제 후 관련 카테고리 title/description 검토
- 대표 기관이 바뀌면 guide와 category SEO copy를 함께 갱신
- `npm run seo:check -- http://localhost:3001` 실행
