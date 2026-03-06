import { NextResponse } from "next/server";

import { rentalProducts } from "@/features/rental/mock";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const product = rentalProducts.find((item) => item.slug === slug);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ item: product });
}
