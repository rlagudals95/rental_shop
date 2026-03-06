import { NextResponse } from "next/server";

import { mockLeads } from "@/entities/lead/model/mock-db";

export async function GET() {
  return NextResponse.json({
    items: [...mockLeads].reverse(),
    total: mockLeads.length,
  });
}
