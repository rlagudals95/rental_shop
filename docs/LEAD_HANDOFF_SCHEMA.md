# Lead Handoff Schema v1

## 1. 목적

추천 결과를 상담 채널(카카오/CRM/콜센터)로 넘길 때 필요한 표준 payload를 정의한다.

## 2. 설계 원칙

- 상담사는 "다시 질문"하지 않아도 핵심 상황을 바로 본다.
- 개인정보는 최소 수집한다.
- 추천 근거/리스크를 함께 전달한다.

## 3. payload 스키마

```json
{
  "leadId": "lead_01H...",
  "sessionId": "sess_01H...",
  "submittedAt": "2026-03-07T09:00:00.000Z",
  "customer": {
    "name": "홍길동",
    "phone": "01012345678",
    "preferredChannel": "kakao",
    "preferredTime": "19:00-21:00"
  },
  "profile": {
    "householdSize": 1,
    "residenceType": "jeonse_or_monthly",
    "movingWithin24m": true,
    "budgetRange": "30000_39999",
    "carePreference": "self",
    "biggestConcern": "termination_fee"
  },
  "recommendation": {
    "top3": ["skm-wp-013", "ckc-wp-027", "cwy-wp-005"],
    "selectedProductId": "skm-wp-013",
    "summary": "이사 가능성이 있어 장기 의무사용 리스크가 낮은 옵션 우선",
    "riskNotes": ["약정 내 해지 시 위약금 발생 가능", "프로모션 종료 후 월 요금 인상 확인 필요"]
  },
  "utm": {
    "source": "google",
    "campaign": "water_agent_mvp"
  }
}
```

## 4. 필수/선택 필드

필수:

- `leadId`, `sessionId`, `submittedAt`
- `customer.name`, `customer.phone`
- `profile.movingWithin24m`, `profile.budgetRange`, `profile.biggestConcern`
- `recommendation.top3`, `recommendation.selectedProductId`

선택:

- `customer.preferredTime`
- `utm.*`

## 5. 상태 전이

| 상태         | 설명             |
| ------------ | ---------------- |
| `new`        | 접수 직후        |
| `assigned`   | 상담 담당자 배정 |
| `contacting` | 연락 시도 중     |
| `qualified`  | 상담 유효 리드   |
| `contracted` | 계약 완료        |
| `dropped`    | 이탈/거절        |

## 6. 채널별 매핑

## 6.1 Kakao 템플릿 변수

- `{{name}}`
- `{{selected_product}}`
- `{{summary}}`
- `{{risk_note_1}}`
- `{{callback_time}}`

## 6.2 CRM 컬럼 매핑

| payload 필드                       | CRM 컬럼              |
| ---------------------------------- | --------------------- |
| `leadId`                           | `external_lead_id`    |
| `sessionId`                        | `session_id`          |
| `customer.phone`                   | `phone`               |
| `recommendation.selectedProductId` | `preferred_product`   |
| `recommendation.summary`           | `pre_consult_summary` |
| `recommendation.riskNotes`         | `risk_notes`          |

## 7. PII 정책

- 전화번호는 저장 시 해시 컬럼을 추가 보관
- 로그에는 마스킹(`010****5678`) 값만 남김
- 설명 생성 LLM에는 이름/전화번호 전달 금지

## 8. 중복 처리

중복 기준:

- `phone + selectedProductId + 24시간`

중복 시:

- 신규 레코드 생성 대신 기존 `leadId` 반환
- 상태는 유지하고 `lastSubmittedAt`만 갱신

## 9. 검증 규칙

- `top3`는 반드시 3개
- `selectedProductId`는 `top3` 안에 포함
- `phone`은 숫자 10~11자리
- `summary`는 120자 이내

## 10. API 예시

요청: `POST /api/leads`

응답:

```json
{
  "ok": true,
  "data": {
    "leadId": "lead_01HABC",
    "status": "new"
  },
  "meta": {
    "requestId": "req_88f1"
  }
}
```
