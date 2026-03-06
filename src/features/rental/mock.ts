export type RentalProduct = {
  slug: string;
  brand: string;
  name: string;
  monthlyPrice: number;
  originalPrice: number;
  reviewCount: number;
  badge?: "BEST" | "특가" | "혜택" | "인기";
  image: string;
  summary: string;
  contract: string;
  management: string;
};

export const rentalProducts: RentalProduct[] = [
  {
    slug: "coway-icon-ice",
    brand: "코웨이",
    name: "아이콘 얼음정수기",
    monthlyPrice: 31900,
    originalPrice: 36900,
    reviewCount: 1293,
    badge: "BEST",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
    summary: "얼음 + 냉온정수 올인원 직수형",
    contract: "60개월",
    management: "방문관리",
  },
  {
    slug: "lg-360-air",
    brand: "LG 퓨리케어",
    name: "360 공기청정기 플러스",
    monthlyPrice: 24900,
    originalPrice: 29900,
    reviewCount: 824,
    badge: "특가",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
    summary: "초미세먼지 케어 · 저소음 운전",
    contract: "48개월",
    management: "셀프관리",
  },
  {
    slug: "ceragem-master-v7",
    brand: "세라젬",
    name: "마스터 V7 척추 의료가전",
    monthlyPrice: 49000,
    originalPrice: 55000,
    reviewCount: 407,
    badge: "인기",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
    summary: "온열·지압 복합 헬스케어",
    contract: "60개월",
    management: "방문관리",
  },
  {
    slug: "samsung-cube-air",
    brand: "삼성 비스포크",
    name: "큐브 에어 공기청정기",
    monthlyPrice: 19900,
    originalPrice: 23900,
    reviewCount: 612,
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80",
    summary: "컴팩트 사이즈 · 강력 필터",
    contract: "36개월",
    management: "셀프관리",
  },
  {
    slug: "cuckoo-inout",
    brand: "쿠쿠",
    name: "인앤아웃 직수 정수기",
    monthlyPrice: 21900,
    originalPrice: 26900,
    reviewCount: 935,
    badge: "혜택",
    image:
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=1200&q=80",
    summary: "슬림 디자인 · 직수 살균",
    contract: "36개월",
    management: "방문관리",
  },
];

export const formatWon = (price: number): string => `${price.toLocaleString("ko-KR")}원`;
