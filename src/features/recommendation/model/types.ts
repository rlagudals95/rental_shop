export type BudgetRange = "under_29999" | "30000_39999" | "40000_plus";
export type ResidenceType = "jeonse_or_monthly" | "owned";
export type CarePreference = "visit" | "self";
export type ConcernType = "price" | "maintenance" | "termination_fee";
export type FeatureType = "cold" | "hot" | "purify" | "ice";

export type UserProfile = {
  sessionId: string;
  householdSize: number;
  residenceType: ResidenceType;
  movingWithin24m: boolean;
  budgetRange: BudgetRange;
  requiredFeatures: FeatureType[];
  wantsIce: boolean;
  carePreference: CarePreference;
  spaceConstraint: "low" | "medium" | "high";
  biggestConcern: ConcernType;
};

export type RankedRecommendation = {
  productId: string;
  brand: string;
  modelName: string;
  score: number;
  reasons: string[];
  riskNotes: string[];
  promoFee: number;
  postPromoFee: number;
  mandatoryUseMonth: number;
  contractTotalMonth: number;
  managementType: "visit" | "self";
  totalEstimatedCost: number;
};

export type RecommendationResult = {
  sessionId: string;
  summary: string;
  top3: RankedRecommendation[];
  excludedReasons: string[];
  handoffPayload: {
    priority: string;
    recommendedProducts: string[];
  };
};
