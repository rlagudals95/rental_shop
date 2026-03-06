import { NextResponse } from "next/server";

import { mockLeads } from "@/entities/lead/model/mock-db";

type ApplyPayload = {
  name?: string;
  phone?: string;
  product?: string;
  area?: string;
  date?: string;
  memo?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ApplyPayload;

  if (!body.name || !body.phone || !body.product) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const applyId = `apply_${Date.now()}`;
  const submittedAt = new Date().toISOString();

  mockLeads.push({
    applyId,
    submittedAt,
    name: body.name,
    phone: body.phone,
    product: body.product,
    area: body.area,
    date: body.date,
    memo: body.memo,
  });

  return NextResponse.json({
    ok: true,
    applyId,
    submittedAt,
    payload: body,
  });
}
