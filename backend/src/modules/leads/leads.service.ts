import { Injectable } from "@nestjs/common";

import type { PrismaService } from "../../infra/prisma.service";
import type { CreateLeadDto } from "./dto/create-lead.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateLeadDto) {
    const submittedAt = new Date(input.submittedAt);
    const from = new Date(submittedAt.getTime() - 24 * 60 * 60 * 1000);

    const duplicate = await this.prisma.lead.findFirst({
      where: {
        customerPhone: input.customer.phone,
        selectedProductId: input.recommendation.selectedProductId,
        lastSubmittedAt: { gte: from },
      },
      orderBy: { lastSubmittedAt: "desc" },
    });

    if (duplicate) {
      const updated = await this.prisma.lead.update({
        where: { id: duplicate.id },
        data: { lastSubmittedAt: submittedAt },
      });

      return { duplicated: true, lead: updated };
    }

    const created = await this.prisma.lead.create({
      data: {
        leadId: input.leadId,
        sessionId: input.sessionId,
        customerName: input.customer.name,
        customerPhone: input.customer.phone,
        selectedProductId: input.recommendation.selectedProductId,
        top3: input.recommendation.top3,
        summary: input.recommendation.summary,
        riskNotes: input.recommendation.riskNotes,
        submittedAt,
        lastSubmittedAt: submittedAt,
      },
    });

    return { duplicated: false, lead: created };
  }

  async list() {
    return this.prisma.lead.findMany({
      orderBy: { lastSubmittedAt: "desc" },
      take: 100,
    });
  }
}
