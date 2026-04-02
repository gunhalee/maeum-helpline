# 마음 도움길

마음 도움길은 한국의 정신건강 지원 서비스를 한눈에 찾을 수 있도록 정리한 웹 디렉토리입니다.  
위기 대응, 공공 지원, 자조모임 등 다양한 서비스를 카테고리와 검색으로 빠르게 탐색할 수 있습니다.

## 로컬 실행 방법

```bash
git clone <레포지토리_URL>
cd maeum-helpline
npm install
cp .env.example .env.local
# .env.local에 실제 값 입력
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 확인할 수 있습니다.

## Notion 설정 방법

1. Notion에서 새 데이터베이스를 생성합니다.
2. 내부 통합(Integration)을 만들고 데이터베이스와 연결(Share)합니다.
3. Integration 토큰을 `NOTION_API_KEY`에 입력합니다.
4. 데이터베이스 URL에서 `NOTION_DATABASE_ID`를 복사해 `.env.local`에 입력합니다.

## Notion DB 속성 스키마

| 속성명 | 타입 | 설명 |
| --- | --- | --- |
| `name` | Title | 서비스 이름 |
| `phone` | Rich Text | 대표 연락처(전화번호 또는 웹 주소) |
| `category` | Select | 카테고리 키(`crisis`, `public` 등) |
| `description` | Rich Text | 서비스 설명 |
| `tags` | Multi-select | 태그 목록 |
| `is_emergency` | Checkbox | 긴급 서비스 여부 |
| `is_active` | Checkbox | 노출 여부 |
| `url` | URL | 공식 사이트 |
| `operating_hours` | Rich Text | 운영 시간 |

## Vercel 배포 방법

1. 코드를 GitHub에 push합니다.
2. [Vercel](https://vercel.com/)에서 **New Project**로 레포지토리를 연결합니다.
3. Environment Variables에 아래 값을 추가합니다.
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
4. Deploy를 실행합니다.

## 데이터 업데이트 방법

Notion DB에서 행을 추가/수정하면 최대 1시간 내 반영됩니다(ISR 재검증 주기 3600초).
