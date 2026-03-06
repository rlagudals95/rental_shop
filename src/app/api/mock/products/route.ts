import { NextResponse } from "next/server";

import { rentalProducts } from "@/features/rental/mock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "popular";

  const filtered =
    !category || category === "전체"
      ? rentalProducts
      : rentalProducts.filter((item) => item.category === category);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low") return a.monthlyPrice - b.monthlyPrice;
    if (sort === "high") return b.monthlyPrice - a.monthlyPrice;
    if (sort === "reviews") return b.reviewCount - a.reviewCount;
    return b.reviewCount + b.monthlyPrice - (a.reviewCount + a.monthlyPrice);
  });

  return NextResponse.json({ items: sorted, total: sorted.length });
}
