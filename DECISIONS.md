# DECISIONS.md

중요한 기술/구조/정책 결정을 기록한다.

---

## Template

### [YYYY-MM-DD] Decision Title

- Status: Proposed | Accepted | Superseded
- Context:
- Decision:
- Consequences:
- Alternatives Considered:
- Owner:

---

## [2026-03-06] Frontend Quality Baseline 도입

- Status: Accepted
- Context:
  - 초기 Next.js 스캐폴드 상태에서 팀/에이전트 협업 시 코드 일관성과 품질 관리 기준이 필요했음.
- Decision:
  - ESLint + Prettier + Husky + lint-staged 조합을 기본 품질 게이트로 채택.
  - 표준 검증 명령은 `npm run check`로 통합.
- Consequences:
  - 커밋 전 자동 포맷/린트가 실행되어 품질 편차 감소.
  - 초기 설정 복잡도는 증가하지만 장기 유지보수성 향상.
- Alternatives Considered:
  - ESLint만 사용 (포맷 통일 한계)
  - Prettier만 사용 (정적 품질 규칙 부족)
- Owner: project
