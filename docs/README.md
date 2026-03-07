# Docs Pack - Build Ready (MVP)

## 1. 읽는 순서

1. [PRD.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/PRD.md)
2. [STEP1_PLAN.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/STEP1_PLAN.md)
3. [UX_SPEC.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/UX_SPEC.md)
4. [FUNNEL_RESULT_WIREFRAME.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/FUNNEL_RESULT_WIREFRAME.md)
5. [AI_AGENT_SPEC.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/AI_AGENT_SPEC.md)
6. [DATA_CONTRACT_PRODUCTS_V1.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/DATA_CONTRACT_PRODUCTS_V1.md)
7. [API_ERROR_CONTRACT.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/API_ERROR_CONTRACT.md)
8. [LLM_PROMPT_EVAL_V1.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/LLM_PROMPT_EVAL_V1.md)
9. [LEAD_HANDOFF_SCHEMA.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/LEAD_HANDOFF_SCHEMA.md)
10. [BACKEND_ENV_SETUP.md](/Users/hyeongmin/Desktop/workspace/rental_shop/docs/BACKEND_ENV_SETUP.md)

## 2. 구현 시작 체크리스트

- [x] `/funnel/result` 라우트 생성
- [x] 추천 API(`POST /api/recommend/session`) 생성
- [x] 설명 API(`POST /api/recommend/explain`) 생성
- [x] 리드 API 응답 포맷을 공통 규약으로 통일
- [x] 상품 mock 데이터를 v1 데이터 계약으로 확장
- [x] 이벤트 7종(`onboarding_*`, `result_*`, `lead_submit`) 연동

## 3. Done 정의

- 추천 결과 3개 + 리스크 문구가 `/funnel/result`에 노출된다.
- 설명 API 실패 시 폴백 문구가 동작한다.
- 상담 제출 payload가 핸드오프 스키마를 만족한다.
- `typecheck/lint/format/build` 통과.
