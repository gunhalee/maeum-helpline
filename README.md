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
| `category` | Multi-select | 카테고리 키(`crisis`, `depression`, `legal` 등) |
| `description` | Rich Text | 서비스 설명 |
| `tags` | Multi-select | 태그 목록 |
| `is_emergency` | Checkbox | 긴급 서비스 여부 |
| `is_active` | Checkbox | 노출 여부 |
| `url` | URL | 공식 사이트 |
| `operating_hours` | Rich Text | 운영 시간 |
| `hours_type` | Select | `24h`, `weekday`, `custom` |
| `hours_detail` | Rich Text | 전화상담 기준 상세 시간표·예약 안내 |
| `last_verified` | Date | 공식 정보를 확인한 날짜 |

## Vercel 배포 방법

1. 코드를 GitHub에 push합니다.
2. [Vercel](https://vercel.com/)에서 **New Project**로 레포지토리를 연결합니다.
3. Environment Variables에 아래 값을 추가합니다.
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
4. Deploy를 실행합니다.

## 데이터 업데이트 방법

카테고리 페이지와 추천 API는 같은 300초 서비스 캐시를 사용하며, 카테고리 페이지의 ISR 주기도 300초입니다. Notion SDK의 원본 HTTP 응답은 별도로 캐시하지 않습니다. 만료 후 요청 시 재생성하는 방식이므로 정확히 5분 이내 반영을 보장하지는 않습니다.

2026-10-13 점검에서는 기존 활성 35개를 확인하고 서울 마음이음 중복 항목을 1577-0199 안내에 통합했습니다. 변경 전후 값·공식 출처·미확인 사항·DB 재조회 결과는 `docs/content-refresh-2026-10-13.json`에 기록했습니다. `last_verified`는 정보 확인일이며 실제 통화 연결이나 임시 휴무까지 보증하지 않습니다.

검토한 갱신 기록을 적용할 때는 아래 스크립트를 사용할 수 있습니다. 기본 실행은 미리보기이며, `--apply`를 붙이면 DB에 반영한 뒤 다시 조회해 비교합니다. 확인 이후 다른 사람이 수정한 필드는 덮어쓰지 않고 중단합니다.

```bash
node scripts/refresh-notion-content.mjs docs/content-refresh-2026-10-13.json
node scripts/refresh-notion-content.mjs docs/content-refresh-2026-10-13.json --apply
```

## 운영시간 판정과 검증

운영시간 판정은 `src/lib/service-hours.ts`에서 관리합니다. API, 카드의 24시간 배지,
구조화 데이터는 같은 24시간 판정 함수를 사용합니다.

- `hours_detail`을 우선하고 비어 있으면 `operating_hours`를 읽습니다. 상세 시간표가 있으면 `hours_type`이나 태그보다 우선합니다.
- `매일 09:00~18:00`, `평일 08:00~22:00, 주말·공휴일 09:00~18:00`, `화요일~토요일 11:00~21:00`처럼 요일과 시간을 함께 입력합니다.
- 복수 시간 구간, 점심시간, 휴무일, 자정을 넘는 시간대, `~`·`-`·대시 표기를 지원합니다. 시작 시각은 포함하고 종료 시각은 제외합니다.
- 시간이 비었거나 조건을 해석할 수 없으면 `is_open: null`을 반환합니다. 평일 9~18시를 임의로 가정하지 않습니다. 화면에서는 미확인 정보를 회색으로 표시합니다.
- 날짜와 시간은 한국 표준시로 판단합니다. 검증된 공휴일 달력은 아직 연결하지 않았습니다. 공휴일 여부에 따라 결과가 달라지는 시간은 미확인으로 남기며, 추후 날짜별 `HolidayLookup`을 연결할 수 있습니다.
- 등록된 `24h` 자체가 잘못된 경우는 기관 정보를 따로 바로잡아야 합니다. 판정 코드가 기관의 실제 운영시간을 조회하거나 보정하지는 않습니다.

회귀 테스트는 TypeScript 실행을 지원하는 Node.js 22.18 이상에서 실행합니다.

```bash
npm run test:hours
```
