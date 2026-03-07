import { NextResponse } from "next/server";

import { recommendationService } from "@/features/recommendation/server";
import { validateProfile } from "@/features/recommendation/server/validation";
import { fail, ok } from "@/lib/api-response";
import { hasBackendProxy, proxyToBackend } from "@/lib/backend-proxy";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = validateProfile(body);

    if (!parsed.valid) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "필수 항목이 누락되었습니다.", false, parsed.details),
        { status: 400 },
      );
    }

    if (hasBackendProxy()) {
      return await proxyToBackend("/recommend/session", "POST", parsed.value);
    }

    const result = await recommendationService.recommend(parsed.value);

    if (result.top3.length === 0) {
      return NextResponse.json(
        fail("NO_MATCHING_PRODUCTS", "추천 가능한 상품이 없습니다.", false),
        { status: 422 },
      );
    }

    return NextResponse.json(ok(result));
  } catch {
    return NextResponse.json(
      fail("INTERNAL_ERROR", "일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.", true),
      {
        status: 500,
      },
    );
  }
}
