import { NextResponse } from "next/server";

import { mockLeads } from "@/features/rental/mock-db";

export async function GET() {
  return NextResponse.json({
    items: [...mockLeads].reverse(),
    total: mockLeads.length,
  });
}
