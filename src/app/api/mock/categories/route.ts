import { NextResponse } from "next/server";

const categories = ["전체", "정수기", "공기청정기", "안마의자", "주방가전"];

export async function GET() {
  return NextResponse.json({ items: categories });
}
