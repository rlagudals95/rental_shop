# TASKS.md

현재 작업 큐. 항상 최신 상태를 유지한다.

## Now (우선순위 높음)

- [ ] 홈 화면 정보 구조 설계 (Hero + 카테고리 + 추천 상품)
  - DoD:
    - `src/app/page.tsx`가 단일 덩어리에서 섹션 기반 구조로 분리
    - 모바일 뷰 기준 가독성 확보
    - `npm run check` 통과

- [ ] 공통 레이아웃/스타일 베이스 정리
  - DoD:
    - 글로벌 타이포/스페이싱 기준 정의 (`globals.css`)
    - 공통 컨테이너/섹션 유틸 패턴 반영
    - `npm run check` 통과

- [ ] 상품 카드 컴포넌트 초안 작성
  - DoD:
    - `src/components/product-card.tsx` 생성
    - props 타입 명시
    - 가격/기간/재고 상태 표시
    - 스켈레톤/빈 상태 대응 설계 메모 포함

## Next (다음 단계)

- [ ] 상품 목록 페이지 라우트 초안 (`/products`)
- [ ] 상품 상세 페이지 라우트 초안 (`/products/[id]`)
- [ ] 목업 데이터 계층 분리 (`src/features/products`)

## Backlog

- [ ] 예약 플로우 UX 초안
- [ ] 문의 CTA 및 채널 정책
- [ ] SEO 메타데이터 전략

## Blocked / Need Decision

- [ ] 브랜드 톤앤매너(색상/문구) 확정 필요
- [ ] 예약 확정 기준(즉시 확정 vs 운영자 승인) 정책 필요

## Working Rule

- 작업 완료 시 체크박스 업데이트
- 큰 구조/정책 변경은 `DECISIONS.md`에 기록
- 한 PR(또는 한 커밋 묶음)당 하나의 명확한 목적 유지
