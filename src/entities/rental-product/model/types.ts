export type RentalCategory = "정수기" | "공기청정기" | "안마의자" | "주방가전";

export type RentalProduct = {
  slug: string;
  brand: string;
  name: string;
  category: RentalCategory;
  monthlyPrice: number;
  originalPrice: number;
  reviewCount: number;
  badge?: "BEST" | "특가" | "혜택" | "인기";
  image: string;
  summary: string;
  contract: string;
  management: string;
  specs: Array<{ label: string; value: string }>;
};
