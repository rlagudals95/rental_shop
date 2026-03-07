import { NextResponse } from "next/server";

import {
  buildFallbackExplanation,
  MockExplainAdapter,
} from "@/features/explanation/server/explain-adapter";
import type { RankedRecommendation, UserProfile } from "@/features/recommendation/model/types";
import { fail, ok } from "@/lib/api-response";
import { hasBackendProxy, proxyToBackend } from "@/lib/backend-proxy";

const adapter = new MockExplainAdapter();

type ExplainRequest = {
  profile: UserProfile;
  rankedProducts: RankedRecommendation[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ExplainRequest>;

    if (!body.profile || !body.rankedProducts) {
      return NextResponse.json(
        fail("VALIDATION_ERROR", "입력 스키마가 올바르지 않습니다.", false),
        { status: 400 },
      );
    }

    if (hasBackendProxy()) {
      return await proxyToBackend("/recommend/explain", "POST", body);
    }

    try {
      const explained = await adapter.explain(body.profile, body.rankedProducts);
      return NextResponse.json(ok(explained));
    } catch {
      return NextResponse.json(ok(buildFallbackExplanation(body.rankedProducts)), {
        status: 200,
      });
    }
  } catch {
    return NextResponse.json(fail("INTERNAL_ERROR", "설명 생성 중 오류가 발생했습니다.", true), {
      status: 500,
    });
  }
}
