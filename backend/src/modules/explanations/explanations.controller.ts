import { Body, Controller, Post } from "@nestjs/common";

import { ok } from "../../common/api-response";
import type { ExplainDto } from "./dto/explain.dto";

@Controller("recommend")
export class ExplanationsController {
  @Post("explain")
  explain(@Body() body: ExplainDto) {
    const summary = "입력한 조건 기준으로 예산/관리방식/계약기간을 우선해 추천했어요.";
    const cardReasons = Object.fromEntries(
      body.rankedProducts.map((product) => [
        String(product.productId),
        ["계약 조건과 입력 우선순위를 반영했어요."],
      ]),
    );
    const riskNotes = Object.fromEntries(
      body.rankedProducts.map((product) => [
        String(product.productId),
        ["최종 계약 조건은 상담에서 확인해 주세요."],
      ]),
    );

    return ok({ summary, cardReasons, riskNotes, fallbackUsed: false });
  }
}
