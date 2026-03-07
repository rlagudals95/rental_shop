import { Body, Controller, Post } from "@nestjs/common";

import { fail, ok } from "../../common/api-response";
import type { RecommendSessionDto } from "./dto/recommend-session.dto";
import type { RecommendationsService } from "./recommendations.service";

@Controller("recommend")
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post("session")
  async createSession(@Body() body: RecommendSessionDto) {
    const result = await this.recommendationsService.createSession(body);

    if (result.top3.length === 0) {
      return fail("NO_MATCHING_PRODUCTS", "추천 가능한 상품이 없습니다.", false);
    }

    return ok(result);
  }
}
