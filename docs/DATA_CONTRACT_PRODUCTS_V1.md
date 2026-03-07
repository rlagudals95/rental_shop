# Data Contract - Product Contracts v1

## 1. 목적

이 문서는 추천 엔진에 바로 넣을 수 있는 정수기 계약 데이터 규격과 샘플 30개를 정의한다.

## 2. 필드 스키마

| 필드                  | 타입        | 필수 | 설명                            |
| --------------------- | ----------- | ---- | ------------------------------- |
| `productId`           | string      | Y    | 고유 ID                         |
| `brand`               | string      | Y    | 브랜드명                        |
| `modelName`           | string      | Y    | 모델명                          |
| `category`            | enum        | Y    | `water_purifier` 고정(MVP)      |
| `monthlyFee`          | number      | Y    | 월 기본료                       |
| `promoFee`            | number      | Y    | 프로모션 월 요금                |
| `promoDurationMonth`  | number      | Y    | 프로모션 적용 개월              |
| `postPromoFee`        | number      | Y    | 프로모션 종료 후 월 요금        |
| `mandatoryUseMonth`   | number      | Y    | 의무사용기간(개월)              |
| `contractTotalMonth`  | number      | Y    | 전체 계약기간(개월)             |
| `managementType`      | enum        | Y    | `visit` \| `self`               |
| `installFee`          | number      | Y    | 설치비                          |
| `removalFee`          | number      | Y    | 철거비/회수비                   |
| `supportsMove`        | boolean     | Y    | 이전설치 지원 여부              |
| `terminationRuleNote` | string      | Y    | 해지 유의 문구                  |
| `features`            | string[]    | Y    | `cold/hot/purify/ice`           |
| `sizeTier`            | enum        | Y    | `slim` \| `standard` \| `large` |
| `stockStatus`         | enum        | Y    | `active` \| `paused`            |
| `updatedAt`           | string(ISO) | Y    | 데이터 기준 시점                |

## 3. 유효성 규칙

- `postPromoFee >= promoFee`
- `contractTotalMonth >= mandatoryUseMonth`
- `monthlyFee >= promoFee`
- `features`는 최소 1개 이상
- `stockStatus = active`인 상품만 추천 대상으로 사용

## 4. 샘플 데이터 30개

> 단위: 원, 기간: 개월

| productId  | brand  | modelName                   | monthlyFee | promoFee | promoDurationMonth | postPromoFee | mandatoryUseMonth | contractTotalMonth | managementType | supportsMove | features            | sizeTier |
| ---------- | ------ | --------------------------- | ---------: | -------: | -----------------: | -----------: | ----------------: | -----------------: | -------------- | ------------ | ------------------- | -------- |
| cwy-wp-001 | 코웨이 | 아이콘 직수 냉온정수기 Lite |      31900 |    28900 |                 12 |        31900 |                36 |                 60 | visit          | true         | cold,hot,purify     | slim     |
| cwy-wp-002 | 코웨이 | 아이콘 얼음정수기 Pro       |      37900 |    33900 |                 12 |        37900 |                48 |                 72 | visit          | true         | cold,hot,purify,ice | slim     |
| cwy-wp-003 | 코웨이 | 노블 정수기 베이직          |      29900 |    26900 |                  9 |        29900 |                36 |                 60 | self           | true         | cold,purify         | standard |
| cwy-wp-004 | 코웨이 | 노블 정수기 플러스          |      33900 |    30900 |                 12 |        33900 |                48 |                 60 | visit          | true         | cold,hot,purify     | standard |
| cwy-wp-005 | 코웨이 | 아이콘 미니 셀프            |      26900 |    24900 |                 12 |        26900 |                36 |                 48 | self           | true         | cold,purify         | slim     |
| cwy-wp-006 | 코웨이 | 아이콘 온정수 전용          |      28900 |    25900 |                  6 |        28900 |                36 |                 48 | self           | true         | hot,purify          | slim     |
| cwy-wp-007 | 코웨이 | 얼음정수기 Prime            |      40900 |    36900 |                 12 |        40900 |                48 |                 72 | visit          | true         | cold,hot,purify,ice | large    |
| cwy-wp-008 | 코웨이 | 직수 정수기 컴팩트          |      24900 |    22900 |                 12 |        24900 |                24 |                 36 | self           | true         | purify              | slim     |
| cwy-wp-009 | 코웨이 | 케어형 패밀리 정수기        |      35900 |    31900 |                 12 |        35900 |                48 |                 60 | visit          | true         | cold,hot,purify     | large    |
| cwy-wp-010 | 코웨이 | 슬림 정수기 Daily           |      27900 |    24900 |                  9 |        27900 |                36 |                 48 | visit          | true         | cold,purify         | slim     |
| skm-wp-011 | SK매직 | 올인원 직수 냉온정수기      |      30900 |    27900 |                 12 |        30900 |                36 |                 60 | visit          | true         | cold,hot,purify     | standard |
| skm-wp-012 | SK매직 | 얼음정수기 원코크           |      36900 |    32900 |                 12 |        36900 |                48 |                 72 | visit          | true         | cold,hot,purify,ice | standard |
| skm-wp-013 | SK매직 | 스스로직수 정수기           |      27900 |    24900 |                 12 |        27900 |                36 |                 48 | self           | true         | cold,purify         | slim     |
| skm-wp-014 | SK매직 | 미니 정수기 싱글            |      23900 |    21900 |                  6 |        23900 |                24 |                 36 | self           | true         | purify              | slim     |
| skm-wp-015 | SK매직 | 슈퍼S 직수 냉정수기         |      29900 |    26900 |                 12 |        29900 |                36 |                 48 | visit          | true         | cold,purify         | slim     |
| skm-wp-016 | SK매직 | 방문관리 프리미엄           |      34900 |    30900 |                 12 |        34900 |                48 |                 60 | visit          | true         | cold,hot,purify     | standard |
| skm-wp-017 | SK매직 | 셀프관리 이코노미           |      25900 |    22900 |                 12 |        25900 |                36 |                 48 | self           | true         | cold,purify         | slim     |
| skm-wp-018 | SK매직 | 얼음정수기 스탠다드         |      38900 |    34900 |                 12 |        38900 |                48 |                 72 | visit          | true         | cold,hot,purify,ice | large    |
| skm-wp-019 | SK매직 | 온수특화 정수기             |      28900 |    25900 |                  9 |        28900 |                36 |                 48 | self           | true         | hot,purify          | standard |
| skm-wp-020 | SK매직 | 직수 정수기 라이트          |      26900 |    23900 |                 12 |        26900 |                24 |                 36 | self           | true         | purify              | slim     |
| ckc-wp-021 | 쿠쿠   | 인앤아웃 직수 정수기 A      |      21900 |    19900 |                 12 |        21900 |                24 |                 36 | visit          | true         | purify              | slim     |
| ckc-wp-022 | 쿠쿠   | 인앤아웃 직수 정수기 B      |      24900 |    21900 |                 12 |        24900 |                36 |                 48 | visit          | true         | cold,purify         | slim     |
| ckc-wp-023 | 쿠쿠   | 스팀 얼음정수기             |      36900 |    32900 |                 12 |        36900 |                48 |                 72 | visit          | true         | cold,hot,purify,ice | large    |
| ckc-wp-024 | 쿠쿠   | 셀프관리 미니 정수기        |      22900 |    20900 |                  6 |        22900 |                24 |                 36 | self           | true         | purify              | slim     |
| ckc-wp-025 | 쿠쿠   | 냉온정수기 홈케어           |      29900 |    26900 |                 12 |        29900 |                36 |                 60 | visit          | true         | cold,hot,purify     | standard |
| ckc-wp-026 | 쿠쿠   | 냉정수기 원룸형             |      23900 |    21900 |                 12 |        23900 |                24 |                 36 | self           | true         | cold,purify         | slim     |
| ckc-wp-027 | 쿠쿠   | 셀프관리 스탠다드           |      25900 |    22900 |                 12 |        25900 |                36 |                 48 | self           | true         | cold,hot,purify     | standard |
| ckc-wp-028 | 쿠쿠   | 방문관리 패밀리형           |      32900 |    28900 |                 12 |        32900 |                48 |                 60 | visit          | true         | cold,hot,purify     | large    |
| ckc-wp-029 | 쿠쿠   | 온수 특화 모델              |      27900 |    24900 |                  9 |        27900 |                36 |                 48 | self           | true         | hot,purify          | standard |
| ckc-wp-030 | 쿠쿠   | 직수 정수기 Daily           |      24900 |    21900 |                 12 |        24900 |                24 |                 36 | visit          | true         | purify              | slim     |

## 5. Seed JSON 예시

```json
{
  "productId": "skm-wp-013",
  "brand": "SK매직",
  "modelName": "스스로직수 정수기",
  "category": "water_purifier",
  "monthlyFee": 27900,
  "promoFee": 24900,
  "promoDurationMonth": 12,
  "postPromoFee": 27900,
  "mandatoryUseMonth": 36,
  "contractTotalMonth": 48,
  "managementType": "self",
  "installFee": 0,
  "removalFee": 50000,
  "supportsMove": true,
  "terminationRuleNote": "약정 내 해지 시 위약금이 발생할 수 있습니다.",
  "features": ["cold", "purify"],
  "sizeTier": "slim",
  "stockStatus": "active",
  "updatedAt": "2026-03-07T00:00:00.000Z"
}
```

## 6. 구현 적용 순서

1. `src/entities/rental-product/model/types.ts`에 v1 필드 확장
2. `src/entities/rental-product/model/mock-data.ts`를 이 문서 기준으로 갱신
3. 추천 API에서 `stockStatus=active` 필터 적용
4. 데이터 유효성 체크(런타임 스키마) 추가
