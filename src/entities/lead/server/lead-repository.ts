import type { Lead, LeadHandoffPayload } from "@/entities/lead/model/types";

export interface LeadRepository {
  createOrUpdateByDedup(payload: LeadHandoffPayload): Promise<Lead>;
  list(): Promise<Lead[]>;
}

const leadsStore: Lead[] = [];

const within24Hours = (aIso: string, bIso: string) => {
  const diff = Math.abs(new Date(aIso).getTime() - new Date(bIso).getTime());
  return diff <= 24 * 60 * 60 * 1000;
};

const makeLeadId = () => `lead_${Math.random().toString(36).slice(2, 10)}`;

export class InMemoryLeadRepository implements LeadRepository {
  async createOrUpdateByDedup(payload: LeadHandoffPayload): Promise<Lead> {
    const existing = leadsStore.find(
      (lead) =>
        lead.phone === payload.customer.phone &&
        lead.selectedProductId === payload.recommendation.selectedProductId &&
        within24Hours(lead.lastSubmittedAt, payload.submittedAt),
    );

    if (existing) {
      existing.lastSubmittedAt = payload.submittedAt;
      return existing;
    }

    const created: Lead = {
      leadId: payload.leadId || makeLeadId(),
      sessionId: payload.sessionId,
      status: "new",
      selectedProductId: payload.recommendation.selectedProductId,
      phone: payload.customer.phone,
      submittedAt: payload.submittedAt,
      lastSubmittedAt: payload.submittedAt,
      handoffPayload: payload,
    };

    leadsStore.push(created);
    return created;
  }

  async list(): Promise<Lead[]> {
    return [...leadsStore].sort(
      (a, b) => new Date(b.lastSubmittedAt).getTime() - new Date(a.lastSubmittedAt).getTime(),
    );
  }
}
