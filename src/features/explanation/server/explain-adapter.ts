import type { RankedRecommendation, UserProfile } from "@/features/recommendation/model/types";

export type ExplainResult = {
  summary: string;
  cardReasons: Record<string, string[]>;
  riskNotes: Record<string, string[]>;
  fallbackUsed: boolean;
};

export interface ExplainAdapter {
  explain(profile: UserProfile, rankedProducts: RankedRecommendation[]): Promise<ExplainResult>;
}

export class MockExplainAdapter implements ExplainAdapter {
  async explain(
    profile: UserProfile,
    rankedProducts: RankedRecommendation[],
  ): Promise<ExplainResult> {
    if (rankedProducts.length === 0) {
      throw new Error("NO_CANDIDATES");
    }

    const cardReasons = Object.fromEntries(
      rankedProducts.map((product) => [
        product.productId,
        [
          `${profile.carePreference === "self" ? "셀프관리" : "방문관리"} 선호를 반영했어요.`,
          `의무사용 ${product.mandatoryUseMonth}개월 / 계약 ${product.contractTotalMonth}개월 구조를 확인했어요.`,
        ],
      ]),
    );

    const riskNotes = Object.fromEntries(
      rankedProducts.map((product) => [
        product.productId,
        [
          `프로모션 종료 후 월 ${product.postPromoFee.toLocaleString("ko-KR")}원으로 변경될 수 있어요.`,
        ],
      ]),
    );

    return {
      summary: "입력한 조건 기준으로 예산/관리방식/계약기간을 우선해 추천했어요.",
      cardReasons,
      riskNotes,
      fallbackUsed: false,
    };
  }
}

export const buildFallbackExplanation = (
  rankedProducts: RankedRecommendation[],
): ExplainResult => ({
  summary: "설명 생성이 지연되어 기본 설명으로 먼저 안내드려요.",
  cardReasons: Object.fromEntries(
    rankedProducts.map((product) => [
      product.productId,
      ["계약 핵심 조건과 사용자 입력 우선순위를 기준으로 추천했어요."],
    ]),
  ),
  riskNotes: Object.fromEntries(
    rankedProducts.map((product) => [
      product.productId,
      ["약정 내 해지 시 위약금이 발생할 수 있으니 최종 조건을 상담에서 확인하세요."],
    ]),
  ),
  fallbackUsed: true,
});
