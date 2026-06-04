# SEO 체크리스트

## 1) 대표 도메인 고정
- Vercel Domains에서 `helpline.or.kr`를 Primary로 설정
- `www.helpline.or.kr`는 `https://helpline.or.kr`로 301 리다이렉트

## 2) Google Search Console 연동
- `https://search.google.com/search-console`에서 도메인 등록
- DNS TXT 검증 또는 HTML 태그 검증 수행
- HTML 태그 방식이면 `.env.local` / 배포 환경변수에 `GOOGLE_SITE_VERIFICATION` 입력
- 사이트맵 제출: `https://helpline.or.kr/sitemap.xml`

## 3) 네이버 Search Advisor 연동
- `https://searchadvisor.naver.com`에서 `https://helpline.or.kr` 등록
- HTML 태그 방식이면 배포 환경변수에 `NAVER_SITE_VERIFICATION` 입력
- 소유 확인 후 사이트맵 제출: `https://helpline.or.kr/sitemap.xml`
- robots.txt 검증에서 `Yeti` 접근 허용 확인
- 콘텐츠가 크게 바뀐 URL은 웹 페이지 수집 요청 검토

## 4) 사이트맵/robots 확인
- `https://helpline.or.kr/sitemap.xml` 접근 확인
- `https://helpline.or.kr/robots.txt` 접근 확인
- Search Console의 사이트맵 메뉴에 `sitemap.xml` 제출
- Search Advisor의 요청 메뉴에 `sitemap.xml` 제출

## 5) 메타데이터 확인
- 홈, 챗, 가이드, 공지, 카테고리 페이지별 title/description/OG/Twitter 확인
- 각 페이지에 고유한 title과 meta description이 있는지 확인
- 각 페이지의 canonical과 ko/en/x-default hreflang 확인
- 한 페이지에 H1이 하나만 있는지 확인
- 구조화 데이터(WebSite, Organization, BreadcrumbList, CollectionPage) 유효성 검사
- 로컬 서버 실행 후 `npm run seo:check -- http://localhost:3001` 실행

## 6) 콘텐츠/색인 모니터링
- Search Console 색인 생성 보고서 주 1회 점검
- Search Advisor의 사이트 최적화, 수집 현황, 콘텐츠 노출/클릭 리포트 주 1회 점검
- 성능 보고서(쿼리/CTR/노출수) 기반으로 title/description 개선
- Notion 데이터 변경 후 서비스 카드 노출 상태 확인
- 가이드 원고가 바뀌면 `/guide` 메타와 관련 카테고리 설명도 함께 점검
