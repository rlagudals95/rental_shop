import type { RentalProduct } from "@/entities/rental-product";
import type {
  RankedRecommendation,
  RecommendationResult,
  UserProfile,
} from "@/features/recommendation/model/types";

import type { ProductRepository } from "./product-repository";

const budgetUpperMap: Record<UserProfile["budgetRange"], number> = {
  under_29999: 29999,
  "30000_39999": 39999,
  "40000_plus": 99999,
};

const makeSummary = (profile: UserProfile) => {
  const residence = profile.residenceType === "jeonse_or_monthly" ? "전월세" : "자가";
  const moving = profile.movingWithin24m ? "2년 내 이사 가능성 있음" : "거주 안정성 높음";
  return `${profile.householdSize}인 가구, ${residence}, ${moving} 조건을 반영해 추천했어요.`;
};

const estimatedTotalCost = (product: RentalProduct) =>
  product.promoFee * product.promoDurationMonth +
  product.postPromoFee * (product.contractTotalMonth - product.promoDurationMonth) +
  product.installFee;

export class RecommendationService {
  constructor(private readonly repository: ProductRepository) {}

  async recommend(profile: UserProfile): Promise<RecommendationResult> {
    const products = await this.repository.listActive();
    const excludedReasons = new Set<string>();

    const scored = products
      .map((product) => {
        if (profile.wantsIce && !product.features.includes("ice")) {
          excludedReasons.add("얼음 기능 미지원 상품 제외");
          return null;
        }

        if (profile.requiredFeatures.some((feature) => !product.features.includes(feature))) {
          excludedReasons.add("필수 기능 조건 미충족 상품 제외");
          return null;
        }

        let score = 60;
        const reasons: string[] = [];
        const riskNotes: string[] = [product.terminationRuleNote];

        const budgetUpper = budgetUpperMap[profile.budgetRange];
        if (product.promoFee <= budgetUpper) {
          score += 20;
          reasons.push("예산 범위에 맞는 월 요금");
        } else {
          score -= 20;
          riskNotes.push("예산 상한보다 월 요금이 높을 수 있어요.");
        }

        if (profile.carePreference === product.managementType) {
          score += 10;
          reasons.push("선호 관리 방식과 일치");
        } else {
          score -= 8;
        }

        if (profile.movingWithin24m && product.mandatoryUseMonth >= 48) {
          score -= 15;
          riskNotes.push("이사 가능성이 있으면 장기 의무사용은 부담될 수 있어요.");
        } else if (profile.movingWithin24m && product.mandatoryUseMonth <= 36) {
          score += 10;
          reasons.push("이사 가능성 대비 의무사용기간이 짧은 편");
        }

        if (profile.spaceConstraint === "high" && product.sizeTier === "large") {
          score -= 10;
          riskNotes.push("공간 제약이 큰 경우 설치 공간을 먼저 확인하세요.");
        }

        if (profile.biggestConcern === "termination_fee" && product.mandatoryUseMonth <= 36) {
          score += 8;
          reasons.push("해지 리스크 관점에서 상대적으로 유리한 약정");
        }

        if (reasons.length === 0) {
          reasons.push("기본 조건과 계약 안정성을 종합 반영");
        }

        const candidate: RankedRecommendation = {
          productId: product.productId,
          brand: product.brand,
          modelName: product.modelName,
          score,
          reasons: reasons.slice(0, 2),
          riskNotes: riskNotes.slice(0, 2),
          promoFee: product.promoFee,
          postPromoFee: product.postPromoFee,
          mandatoryUseMonth: product.mandatoryUseMonth,
          contractTotalMonth: product.contractTotalMonth,
          managementType: product.managementType,
          totalEstimatedCost: estimatedTotalCost(product),
        };

        return candidate;
      })
      .filter((item): item is RankedRecommendation => item !== null)
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.postPromoFee - b.postPromoFee ||
          a.mandatoryUseMonth - b.mandatoryUseMonth,
      );

    return {
      sessionId: profile.sessionId,
      summary: makeSummary(profile),
      top3: scored.slice(0, 3),
      excludedReasons: Array.from(excludedReasons),
      handoffPayload: {
        priority: profile.biggestConcern,
        recommendedProducts: scored.slice(0, 3).map((product) => product.productId),
      },
    };
  }
}
