import { NextResponse } from "next/server";

import type { LeadHandoffPayload } from "@/entities/lead/model/types";
import { leadRepository } from "@/entities/lead/server";
import { fail, ok } from "@/lib/api-response";
import { hasBackendProxy, proxyToBackend } from "@/lib/backend-proxy";

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

    if (!body.recommendation.top3 || body.recommendation.top3.length !== 3) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "추천 상품 top3는 반드시 3개여야 합니다.", false, [
          { field: "recommendation.top3", reason: "must_be_3" },
        ]),
        { status: 400 },
      );
    }

    if (!body.recommendation.top3.includes(body.recommendation.selectedProductId)) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "선택 상품은 top3 안에 있어야 합니다.", false, [
          { field: "recommendation.selectedProductId", reason: "not_in_top3" },
        ]),
        { status: 400 },
      );
    }

    const payload: LeadHandoffPayload = {
      ...body,
      leadId: body.leadId ?? `lead_${Math.random().toString(36).slice(2, 10)}`,
      submittedAt: body.submittedAt ?? new Date().toISOString(),
    } as LeadHandoffPayload;

    if (hasBackendProxy()) {
      return await proxyToBackend("/leads", "POST", payload);
    }

    const { lead, duplicated } = await leadRepository.createOrUpdateByDedup(payload);

    if (duplicated) {
      return NextResponse.json(
        fail("LEAD_DUPLICATED", "동일한 리드가 이미 접수되어 기존 정보를 반환합니다.", false, [
          { leadId: lead.leadId },
        ]),
        { status: 409 },
      );
    }

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
    if (hasBackendProxy()) {
      return await proxyToBackend("/leads", "GET");
    }

    const leads = await leadRepository.list();
    return NextResponse.json(ok({ leads }));
  } catch {
    return NextResponse.json(fail("INTERNAL_ERROR", "리드 조회 중 오류가 발생했습니다.", true), {
      status: 500,
    });
  }
}
