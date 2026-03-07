import { Injectable } from "@nestjs/common";

import type { PrismaService } from "../../infra/prisma.service";
import type { RecommendSessionDto } from "./dto/recommend-session.dto";

const budgetUpperMap = {
  under_29999: 29999,
  "30000_39999": 39999,
  "40000_plus": 99999,
};

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(input: RecommendSessionDto) {
    const products = await this.prisma.product.findMany({ where: { stockStatus: "active" } });

    const scored = products
      .filter((product) => {
        if (input.wantsIce && !product.features.includes("ice")) return false;
        return input.requiredFeatures.every((feature) => product.features.includes(feature));
      })
      .map((product) => {
        let score = 60;
        const reasons: string[] = [];
        const riskNotes: string[] = [product.terminationRuleNote];

        const upper = budgetUpperMap[input.budgetRange];
        if (product.promoFee <= upper) {
          score += 20;
          reasons.push("예산 범위에 맞는 월 요금");
        } else {
          score -= 20;
        }

        if (input.carePreference === product.managementType) {
          score += 10;
          reasons.push("선호 관리 방식과 일치");
        }

        if (input.movingWithin24m && product.mandatoryUseMonth >= 48) {
          score -= 15;
          riskNotes.push("장기 의무사용은 이사 시 부담이 될 수 있어요.");
        }

        return {
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
        };
      })
      .sort((a, b) => b.score - a.score || a.postPromoFee - b.postPromoFee)
      .slice(0, 3);

    const summary = `${input.householdSize}인 가구 조건과 계약 리스크를 기준으로 추천했어요.`;

    await this.prisma.recommendationSession.upsert({
      where: { sessionId: input.sessionId },
      update: {
        summary,
        top3ProductIds: scored.map((x) => x.productId),
      },
      create: {
        ...input,
        summary,
        top3ProductIds: scored.map((x) => x.productId),
      },
    });

    return {
      sessionId: input.sessionId,
      summary,
      top3: scored,
      excludedReasons: [],
      handoffPayload: {
        priority: input.biggestConcern,
        recommendedProducts: scored.map((x) => x.productId),
      },
    };
  }
}
