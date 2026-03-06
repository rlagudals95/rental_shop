import { NextResponse } from "next/server";

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

  return NextResponse.json({
    ok: true,
    applyId,
    submittedAt: new Date().toISOString(),
    payload: body,
  });
}
