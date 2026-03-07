# API Contract - Error & Response Convention v1

## 1. 목적

이 문서는 추천/설명/리드 API의 성공/실패 응답 형식을 통일한다.

## 2. 공통 응답 포맷

## 2.1 성공

```json
{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "req_01H...",
    "timestamp": "2026-03-07T00:00:00.000Z"
  }
}
```

## 2.2 실패

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "필수 항목이 누락되었습니다.",
    "details": [{ "field": "budgetRange", "reason": "required" }],
    "retryable": false
  },
  "meta": {
    "requestId": "req_01H...",
    "timestamp": "2026-03-07T00:00:00.000Z"
  }
}
```

## 3. HTTP 상태 코드 매핑

| HTTP | code                      | 의미                  | 클라이언트 처리    |
| ---- | ------------------------- | --------------------- | ------------------ |
| 400  | `VALIDATION_ERROR`        | 입력 형식/필수값 오류 | 필드 에러 표시     |
| 401  | `UNAUTHORIZED`            | 인증 실패             | 로그인/권한 안내   |
| 403  | `FORBIDDEN`               | 접근 권한 없음        | 접근 차단 메시지   |
| 404  | `NOT_FOUND`               | 세션/리소스 없음      | 재시작 유도        |
| 409  | `CONFLICT`                | 중복 제출/상태 충돌   | 중복 안내 + 재조회 |
| 422  | `BUSINESS_RULE_VIOLATION` | 추천 조건 불충족      | 조건 완화 가이드   |
| 429  | `RATE_LIMITED`            | 요청 과다             | 잠시 후 재시도     |
| 500  | `INTERNAL_ERROR`          | 서버 예외             | 공통 장애 메시지   |
| 503  | `UPSTREAM_UNAVAILABLE`    | LLM/외부 의존 장애    | 폴백 결과 노출     |

## 4. 엔드포인트별 계약

## 4.1 `POST /api/recommend/session`

성공(200):

- 추천 결과 JSON

실패:

- 400: 필수 프로필 누락
- 422: 추천 가능한 상품 없음
- 500: 점수 계산 실패

## 4.2 `POST /api/recommend/explain`

성공(200):

- 요약 문장 + 카드별 설명

실패:

- 400: 입력 스키마 불일치
- 503: LLM 응답 실패(클라이언트는 폴백 문구 사용)
- 500: JSON 파싱 실패

## 4.3 `POST /api/leads`

성공(201):

- `leadId`, `submittedAt`

실패:

- 400: 이름/연락처 누락
- 409: 같은 세션 중복 제출
- 500: 저장 실패

## 5. 상세 에러 코드 사전

| code                       | 설명                      | retryable |
| -------------------------- | ------------------------- | --------- |
| `VALIDATION_ERROR`         | 입력값 누락/형식 오류     | false     |
| `PROFILE_INCOMPLETE`       | 추천에 필요한 답변 미완료 | false     |
| `NO_MATCHING_PRODUCTS`     | 조건에 맞는 상품 없음     | false     |
| `SCORING_FAILED`           | 추천 엔진 계산 실패       | true      |
| `EXPLANATION_TIMEOUT`      | 설명 생성 타임아웃        | true      |
| `EXPLANATION_INVALID_JSON` | 모델 출력 JSON 불일치     | true      |
| `LEAD_DUPLICATED`          | 동일 리드 중복 제출       | false     |
| `INTERNAL_ERROR`           | 미분류 내부 오류          | true      |

## 6. 타임아웃/재시도 기준

- 추천 API 타임아웃: 1500ms
- 설명 API 타임아웃: 2500ms
- `retryable=true`면 최대 1회 자동 재시도
- 설명 API 재시도 실패 시 폴백 문구로 진행

## 7. 요청 추적 규칙

- 모든 응답에 `meta.requestId` 포함
- 클라이언트 로그에도 같은 `requestId` 저장
- 에러 리포트 키: `requestId + sessionId`

## 8. UI 매핑 규칙

| 에러 코드              | UI 노출 문구                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `VALIDATION_ERROR`     | "입력한 내용을 다시 확인해 주세요."                          |
| `NO_MATCHING_PRODUCTS` | "조건에 맞는 상품이 없어요. 예산/기능 조건을 완화해 보세요." |
| `EXPLANATION_TIMEOUT`  | "설명 생성이 지연되어 기본 설명으로 먼저 보여드려요."        |
| `INTERNAL_ERROR`       | "일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요."    |

## 9. 샘플 실패 응답

```json
{
  "ok": false,
  "error": {
    "code": "NO_MATCHING_PRODUCTS",
    "message": "추천 가능한 상품이 없습니다.",
    "details": [
      {
        "field": "wantsIce",
        "reason": "required_feature_not_found"
      }
    ],
    "retryable": false
  },
  "meta": {
    "requestId": "req_7b7f9a",
    "timestamp": "2026-03-07T09:00:00.000Z"
  }
}
```
