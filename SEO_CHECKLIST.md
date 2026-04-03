# SEO 체크리스트

## 1) 대표 도메인 고정
- Vercel Domains에서 `helpline.or.kr`를 Primary로 설정
- `www.helpline.or.kr`는 `https://helpline.or.kr`로 301 리다이렉트

## 2) Search Console 연동
- `https://search.google.com/search-console`에서 도메인 등록
- DNS TXT 검증 또는 HTML 태그 검증 수행
- HTML 태그 방식이면 `.env.local` / 배포 환경변수에 `GOOGLE_SITE_VERIFICATION` 입력

## 3) 사이트맵/robots 제출
- `https://helpline.or.kr/sitemap.xml` 접근 확인
- `https://helpline.or.kr/robots.txt` 접근 확인
- Search Console의 사이트맵 메뉴에 `sitemap.xml` 제출

## 4) 메타데이터 확인
- 홈 title/description/OG/Twitter 확인
- 카테고리 페이지별 title/description/canonical 확인
- 구조화 데이터(WebSite, Organization, BreadcrumbList) 유효성 검사

## 5) 콘텐츠/색인 모니터링
- Search Console 색인 생성 보고서 주 1회 점검
- 성능 보고서(쿼리/CTR/노출수) 기반으로 title/description 개선
- Notion 데이터 변경 후 서비스 카드 노출 상태 확인
