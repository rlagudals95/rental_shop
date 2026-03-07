export type ProductCategory = "water_purifier" | "정수기" | "공기청정기" | "안마의자" | "주방가전";
export type ManagementType = "visit" | "self";
export type FeatureType = "cold" | "hot" | "purify" | "ice";
export type SizeTier = "slim" | "standard" | "large";
export type StockStatus = "active" | "paused";

export type RentalProduct = {
  // v1 contract fields
  productId: string;
  brand: string;
  modelName: string;
  category: ProductCategory;
  monthlyFee: number;
  promoFee: number;
  promoDurationMonth: number;
  postPromoFee: number;
  mandatoryUseMonth: number;
  contractTotalMonth: number;
  managementType: ManagementType;
  installFee: number;
  removalFee: number;
  supportsMove: boolean;
  terminationRuleNote: string;
  features: FeatureType[];
  sizeTier: SizeTier;
  stockStatus: StockStatus;
  updatedAt: string;

  // legacy UI compatibility fields
  slug: string;
  name: string;
  monthlyPrice: number;
  originalPrice: number;
  reviewCount: number;
  image: string;
  summary: string;
  contract: string;
  management: string;
  specs: Array<{ label: string; value: string }>;
  badge?: "BEST" | "특가" | "혜택" | "인기";
};
