# AGENTS.md

이 문서는 이 저장소에서 작업하는 모든 에이전트(Codex 포함)의 최상위 실행 규칙입니다.

## 0) Working Agreement (반드시 준수)

1. 먼저 `AGENTS.md` → `CONTEXT.md` → `TASKS.md` 순서로 읽고 시작한다.
2. 변경은 **작게** 쪼개고, 한 번에 하나의 목적만 달성한다.
3. 구현 후 반드시 검증 명령어를 실행하고 결과를 남긴다.
4. 불명확한 요구사항은 추측 구현하지 말고 질문/가정 명시 후 진행한다.
5. 민감정보(.env, API Key, 토큰) 노출/커밋 금지.

---

## 1) Project Standards

- Stack: Next.js(App Router) + TypeScript + React
- 품질 기준:
  - `npm run typecheck` 통과
  - `npm run lint` 통과
  - `npm run format:check` 통과
- 커밋 전 pre-commit 훅(lint-staged)으로 자동 검증 수행

---

## 2) Code Style Rules

- 함수/컴포넌트는 단일 책임 유지
- 명확한 네이밍 사용 (`data`, `value` 같은 모호한 이름 지양)
- 매직넘버는 상수로 분리
- import 순서는 ESLint 규칙에 따름(자동 정렬)
- `console.log` 남발 금지 (`warn`/`error`는 허용)
- 사용하지 않는 import/변수 금지

---

## 3) App Router Convention

- 페이지: `src/app/**/page.tsx`
- 레이아웃: `src/app/**/layout.tsx`
- 공통 UI 컴포넌트: `src/components/**`
- 도메인 로직: `src/features/<domain>/**`
- 유틸/헬퍼: `src/lib/**`
- 타입: `src/types/**`

(필요 시 폴더 생성 가능. 단, 구조 변경 시 `DECISIONS.md`에 기록)

---

## 4) Git & Commit Convention

- Branch: `develop` 기반
- 커밋 prefix:
  - `feat:` 기능 추가
  - `fix:` 버그 수정
  - `refactor:` 동작 변경 없는 구조 개선
  - `chore:` 설정/빌드/문서/잡무
  - `docs:` 문서 변경
  - `test:` 테스트 추가/수정
- 커밋 메시지는 "무엇을 + 왜"가 드러나야 한다.

---

## 5) Delivery Format (작업 보고 형식)

작업 완료 시 아래 형식으로 보고:

1. 변경 요약 (핵심만)
2. 검증 결과 (`typecheck/lint/format/build`)
3. 리스크 또는 후속 과제 1개

---

## 6) Forbidden / Ask First

아래는 사용자 승인 없이 진행 금지:

- 배포/운영 설정 변경
- 대규모 의존성 교체
- 데이터 파괴성 작업
- 외부 서비스 호출이 필요한 작업

---

## 7) Quick Start Prompt (Codex용)

아래 문장을 작업 시작 시 고정으로 사용:

> 루트의 `AGENTS.md`, `CONTEXT.md`, `TASKS.md`를 먼저 읽고 그 규칙을 따르세요. 작업 후 변경 요약, 검증 결과, 다음 액션 1개를 보고하세요.
