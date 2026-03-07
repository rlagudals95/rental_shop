import { Body, Controller, Get, Post } from "@nestjs/common";

import { fail, ok } from "../../common/api-response";
import type { CreateLeadDto } from "./dto/create-lead.dto";
import type { LeadsService } from "./leads.service";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() body: CreateLeadDto) {
    if (!body.recommendation?.top3 || body.recommendation.top3.length !== 3) {
      return fail("VALIDATION_ERROR", "추천 상품 top3는 반드시 3개여야 합니다.", false, [
        { field: "recommendation.top3", reason: "must_be_3" },
      ]);
    }

    if (!body.recommendation.top3.includes(body.recommendation.selectedProductId)) {
      return fail("VALIDATION_ERROR", "선택 상품은 top3 안에 있어야 합니다.", false, [
        { field: "recommendation.selectedProductId", reason: "not_in_top3" },
      ]);
    }

    const { duplicated, lead } = await this.leadsService.create(body);

    if (duplicated) {
      return fail("LEAD_DUPLICATED", "동일한 리드가 이미 접수되어 기존 정보를 반환합니다.", false, [
        { leadId: lead.leadId },
      ]);
    }

    return ok({ leadId: lead.leadId, status: lead.status, submittedAt: lead.lastSubmittedAt });
  }

  @Get()
  async list() {
    const leads = await this.leadsService.list();
    return ok({ leads });
  }
}
