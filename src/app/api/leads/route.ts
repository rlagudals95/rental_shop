import { NextResponse } from "next/server";

import type { LeadHandoffPayload } from "@/entities/lead/model/types";
import { leadRepository } from "@/entities/lead/server";
import { fail, ok } from "@/lib/api-response";

const isPhoneValid = (phone: string) => /^\d{10,11}$/.test(phone);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadHandoffPayload>;

    if (!body.customer?.name || !body.customer?.phone || !body.recommendation?.selectedProductId) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "이름/연락처/선택 상품은 필수입니다.", false),
        { status: 400 },
      );
    }

    if (!isPhoneValid(body.customer.phone)) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "전화번호 형식이 올바르지 않습니다.", false, [
          { field: "phone", reason: "invalid_format" },
        ]),
        { status: 400 },
      );
    }

    const payload: LeadHandoffPayload = {
      ...body,
      leadId: body.leadId ?? `lead_${Math.random().toString(36).slice(2, 10)}`,
      submittedAt: body.submittedAt ?? new Date().toISOString(),
    } as LeadHandoffPayload;

    const lead = await leadRepository.createOrUpdateByDedup(payload);

    return NextResponse.json(
      ok({
        leadId: lead.leadId,
        status: lead.status,
        submittedAt: lead.lastSubmittedAt,
      }),
      {
        status: 201,
      },
    );
  } catch {
    return NextResponse.json(fail("INTERNAL_ERROR", "리드 저장 중 오류가 발생했습니다.", true), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const leads = await leadRepository.list();
    return NextResponse.json(ok({ leads }));
  } catch {
    return NextResponse.json(fail("INTERNAL_ERROR", "리드 조회 중 오류가 발생했습니다.", true), {
      status: 500,
    });
  }
}
