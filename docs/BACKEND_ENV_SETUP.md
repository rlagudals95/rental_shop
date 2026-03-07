# Backend ENV Setup Guide (Next + Nest)

## 1) Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rental_shop?schema=public"
CORS_ORIGIN="http://localhost:3000"
INTERNAL_API_KEY="change-me"
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4.1-mini"
```

## 2) Frontend (`.env.local`)

Nest 백엔드를 활성화하려면 아래 값을 넣어주세요.

```env
BACKEND_API_BASE_URL="http://localhost:4000"
```

- 값이 없으면: 기존 Next 내부 mock/in-memory API 사용
- 값이 있으면: Next `/api/*`가 Nest 백엔드로 프록시

## 3) Local run order

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run start:dev
```

### Frontend

```bash
cd ..
echo 'BACKEND_API_BASE_URL="http://localhost:4000"' > .env.local
npm install
npm run dev
```

## 4) Production (Vercel)

Vercel 프로젝트 환경변수에 추가:

- `BACKEND_API_BASE_URL=https://<your-nest-api-domain>`

배포 후 프론트는 기존 `/api/recommend/*`, `/api/leads` 경로를 유지하면서 Nest를 사용합니다.
