# Step1 Plan - Frontend + Mock Backend (No External LLM)

## 1. Step1 목표

Step1의 목표는 사용자 퍼널이 실제처럼 동작하는 MVP를 만든다.

범위:

- 프론트엔드 핵심 플로우 완성
- mock 데이터 기반 추천/설명/리드 API 완성
- LLM 호출 인터페이스 정의 및 mock/fallback 동작

Step1에서 하지 않는 것:

- 외부 LLM API 실호출
- 실제 DB 연동
- 결제/설치 스케줄링

## 2. 산출물

필수 산출물:

- `/funnel/result` 화면 구현
- `POST /api/recommend/session` 구현
- `POST /api/recommend/explain` 구현 (mock adapter 사용)
- `POST /api/leads`, `GET /api/leads` 표준 응답 포맷 적용
- 추천 결과 -> 상담 핸드오프 payload 저장

참조 문서:

- [PRD.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/PRD.md)
- [UX_SPEC.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/UX_SPEC.md)
- [FUNNEL_RESULT_WIREFRAME.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/FUNNEL_RESULT_WIREFRAME.md)
- [AI_AGENT_SPEC.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/AI_AGENT_SPEC.md)
- [DATA_CONTRACT_PRODUCTS_V1.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/DATA_CONTRACT_PRODUCTS_V1.md)
- [API_ERROR_CONTRACT.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/API_ERROR_CONTRACT.md)
- [LEAD_HANDOFF_SCHEMA.md](/Users/hyeongmin/Desktop/workspace/rental_shop/dosc/LEAD_HANDOFF_SCHEMA.md)

## 3. 구현 원칙

- API 계약은 Step2/Step3에서도 바꾸지 않는다.
- 저장소는 In-memory 구현으로 시작하고 인터페이스를 먼저 만든다.
- 설명 생성은 `ExplainAdapter` 인터페이스 뒤에 둔다.
- 에러 응답은 공통 형식(`ok`, `error.code`, `meta.requestId`)을 따른다.

## 4. 작업 분할

## 4.1 FE 퍼널 구현

작업:

- `/funnel/result` 라우트 생성
- 요약 카드 + 추천 3카드 + 비교표 + 고정 CTA 구현
- loading/empty/error/partial 상태 구현
- `/funnel/apply` -> `/funnel/result` 연결

완료 기준:

- 모바일에서 핵심 동작 완료
- 추천 결과가 3개 미만일 때 빈 상태/가이드 노출

## 4.2 Mock 추천 백엔드

작업:

- `ProductRepository` 인터페이스 + in-memory 구현
- `RecommendationService`(룰 점수) 구현
- `POST /api/recommend/session` 구현

완료 기준:

- 입력 검증 실패 시 400 반환
- 조건 불일치 시 422(`NO_MATCHING_PRODUCTS`) 반환

## 4.3 설명 레이어(mock)

작업:

- `ExplainAdapter` 인터페이스 생성
- `MockExplainAdapter` 구현
- `POST /api/recommend/explain` 구현
- 실패 시 템플릿 폴백

완료 기준:

- 설명 실패해도 결과 페이지는 정상 렌더
- 응답 스키마 검증 통과

## 4.4 리드 저장/운영

작업:

- `LeadRepository` 인터페이스 + in-memory 구현
- `POST /api/leads`, `GET /api/leads` 공통 응답 적용
- 핸드오프 payload를 리드 레코드에 포함 저장

완료 기준:

- 중복 제출 정책(동일 전화번호 + 상품 + 24h) 적용
- 관리자 페이지에서 최신순 조회 가능

## 4.5 이벤트 로깅

작업:

- 최소 이벤트 7종 로깅 훅 추가
- 이벤트 payload에 `sessionId` 포함

완료 기준:

- 온보딩 시작/완료/결과조회/CTA 클릭/리드 제출 추적 가능

## 5. 파일 단위 실행 가이드

예상 생성/수정 파일:

- `src/app/funnel/result/page.tsx`
- `src/app/api/recommend/session/route.ts`
- `src/app/api/recommend/explain/route.ts`
- `src/app/api/leads/route.ts` (또는 기존 mock leads 확장)
- `src/features/recommendation/*`
- `src/features/explanation/*`
- `src/entities/lead/*`
- `src/entities/rental-product/model/*`

## 6. DoD (Step1 종료 조건)

아래를 모두 만족하면 Step1 완료:

1. 퍼널이 `랜딩 -> 온보딩 -> 결과 -> 상담 -> 완료`로 동작한다.
2. 추천 API/설명 API/리드 API가 문서 계약을 지킨다.
3. 외부 LLM 미연동 상태에서도 설명/폴백 UX가 동작한다.
4. 이벤트 로그로 퍼널 핵심 지표를 계산할 수 있다.
5. 검증 명령 통과:

- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run build`

## 7. Step2 진입 조건

- Step1 DoD 충족
- mock 데이터 30개 기준 추천 결과 품질 점검 완료
- 설명 품질 회귀 테스트(E01~E12) 기준 통과

Step2에서 하는 일:

- `ExplainAdapter`를 실제 LLM 구현으로 교체
- 타임아웃/재시도/비용/로그 정책 적용

## 8. 리스크 1개

리스크:

- Step1에서 추천 룰/카피 품질이 낮으면 결과 페이지 전환률이 왜곡될 수 있다.

완화:

- Step1 종료 전 내부 시연 10회, 대표 시나리오 5개로 결과 일관성 점검
