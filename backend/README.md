# rental_shop backend (NestJS + PostgreSQL)

Step2 백엔드 시작점입니다. Next.js 프론트와 분리된 API 서버로 운영합니다.

## 1) 요구사항

- Node 20+
- PostgreSQL 15+

## 2) 환경변수 세팅

```bash
cp .env.example .env
```

필수 값:

- `DATABASE_URL`: Postgres 연결 문자열
- `CORS_ORIGIN`: 프론트 주소 (로컬: `http://localhost:3000`)

예시:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rental_shop?schema=public"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
```

## 3) 설치/실행

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run start:dev
```

서버 기본 주소: `http://localhost:4000`

## 4) API (Step2 초기)

- `GET /health`
- `POST /recommend/session`
- `POST /recommend/explain`
- `POST /leads`
- `GET /leads`

응답 규약:

- 성공: `{ ok: true, data, meta }`
- 실패: `{ ok: false, error, meta }`

## 5) 프론트 연동 전략

Next.js의 `/api/*`는 점진적으로 Nest API 프록시 또는 직접 호출로 교체합니다.
