import type { UserProfile } from "@/features/recommendation/model/types";

export type LeadStatus = "new" | "assigned" | "contacting" | "qualified" | "contracted" | "dropped";

export type LeadHandoffPayload = {
  leadId: string;
  sessionId: string;
  submittedAt: string;
  customer: {
    name: string;
    phone: string;
    preferredChannel: string;
    preferredTime?: string;
  };
  profile: Pick<
    UserProfile,
    | "householdSize"
    | "residenceType"
    | "movingWithin24m"
    | "budgetRange"
    | "carePreference"
    | "biggestConcern"
  >;
  recommendation: {
    top3: string[];
    selectedProductId: string;
    summary: string;
    riskNotes: string[];
  };
  utm?: {
    source?: string;
    campaign?: string;
  };
};

export type Lead = {
  leadId: string;
  sessionId: string;
  status: LeadStatus;
  selectedProductId: string;
  phone: string;
  submittedAt: string;
  lastSubmittedAt: string;
  handoffPayload: LeadHandoffPayload;
};
