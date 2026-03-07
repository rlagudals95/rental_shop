"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { LeadHandoffPayload } from "@/entities/lead/model/types";
import { formatManagement, formatWon } from "@/entities/rental-product";
import { logEvent } from "@/features/analytics/log-event";
import type {
  RankedRecommendation,
  RecommendationResult,
  UserProfile,
} from "@/features/recommendation/model/types";

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: { code: string; message: string } };

type ExplainData = {
  summary: string;
  cardReasons: Record<string, string[]>;
  riskNotes: Record<string, string[]>;
  fallbackUsed: boolean;
};

type ResultClientProps = {
  sessionId: string | null;
};

export function ResultClient({ sessionId }: ResultClientProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [data, setData] = useState<RecommendationResult | null>(null);
  const [explain, setExplain] = useState<ExplainData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!sessionId) {
        setError("sessionId가 없어 온보딩으로 이동이 필요해요.");
        setLoading(false);
        return;
      }

      const raw = sessionStorage.getItem(`profile:${sessionId}`);
      if (!raw) {
        setError("프로필 정보를 찾을 수 없어요.");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw) as UserProfile;
      setProfile(parsed);

      const recommendResponse = await fetch("/api/recommend/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const recommendJson = (await recommendResponse.json()) as
        | ApiSuccess<RecommendationResult>
        | ApiFailure;

      if (!recommendJson.ok) {
        setError(recommendJson.error.message);
        setLoading(false);
        return;
      }

      setData(recommendJson.data);
      logEvent("result_view", {
        sessionId,
        recommendedProductIds: recommendJson.data.top3.map((item) => item.productId),
      });
      logEvent("result_rendered", {
        sessionId,
        recommendedProductIds: recommendJson.data.top3.map((item) => item.productId),
      });

      const explainResponse = await fetch("/api/recommend/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: parsed,
          rankedProducts: recommendJson.data.top3,
        }),
      });

      const explainJson = (await explainResponse.json()) as ApiSuccess<ExplainData>;
      setExplain(explainJson.data);
      setLoading(false);
    };

    void load();
  }, [sessionId]);

  const top3 = useMemo(() => data?.top3 ?? [], [data]);

  const submitLead = async () => {
    if (!profile || !data || !selectedProductId) return;

    logEvent("result_cta_click", { sessionId: profile.sessionId, selectedProductId });
    logEvent("lead_cta_clicked", { sessionId: profile.sessionId, selectedProductId });

    const payload: LeadHandoffPayload = {
      leadId: "",
      sessionId: profile.sessionId,
      submittedAt: new Date().toISOString(),
      customer: {
        name: "테스트고객",
        phone: "01012345678",
        preferredChannel: "kakao",
        preferredTime: "19:00-21:00",
      },
      profile: {
        householdSize: profile.householdSize,
        residenceType: profile.residenceType,
        movingWithin24m: profile.movingWithin24m,
        budgetRange: profile.budgetRange,
        carePreference: profile.carePreference,
        biggestConcern: profile.biggestConcern,
      },
      recommendation: {
        top3: data.top3.map((item) => item.productId),
        selectedProductId,
        summary: data.summary,
        riskNotes: data.top3.flatMap((item) => item.riskNotes).slice(0, 2),
      },
      utm: {
        source: "direct",
        campaign: "mvp_step1",
      },
    };

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    logEvent("lead_submit", { sessionId: profile.sessionId, selectedProductId });
    window.location.href = "/funnel/complete";
  };

  if (loading) {
    return <main className="mx-auto max-w-3xl px-4 py-8">추천 계산 중...</main>;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>
        <Link
          href="/funnel/apply"
          className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
        >
          온보딩으로 돌아가기
        </Link>
      </main>
    );
  }

  if (top3.length < 3) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p>
          추천 결과가 3개 미만이에요. 예산/기능 조건을 조금 완화하면 더 정확히 비교할 수 있어요.
        </p>
        <Link
          href="/funnel/apply"
          className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
        >
          조건 다시 설정
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="text-2xl font-bold">추천 결과</h1>
      <p className="mt-2 rounded-xl bg-white p-3 text-sm text-black/70">
        {explain?.summary ?? data?.summary}
      </p>

      {explain?.fallbackUsed ? (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          설명 생성이 지연되어 기본 설명으로 안내 중입니다.
        </p>
      ) : null}

      <section className="mt-4 space-y-3">
        {top3.map((product: RankedRecommendation) => (
          <article
            key={product.productId}
            className="rounded-2xl border border-black/10 bg-white p-4"
          >
            <h2 className="font-semibold">
              {product.brand} {product.modelName}
            </h2>
            <p className="mt-1 text-sm text-black/70">
              월 {formatWon(product.promoFee)} (할인 후 {formatWon(product.postPromoFee)})
            </p>
            <p className="text-sm text-black/70">
              의무 {product.mandatoryUseMonth}개월 / 계약 {product.contractTotalMonth}개월 ·{" "}
              {formatManagement(product.managementType)}
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-black/80">
              {(explain?.cardReasons[product.productId] ?? product.reasons).map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p className="mt-2 rounded-md bg-[#FFF3E8] px-2 py-1 text-xs text-black/80">
              {(explain?.riskNotes[product.productId] ?? product.riskNotes)[0]}
            </p>
            <button
              onClick={() => {
                setSelectedProductId(product.productId);
                logEvent("result_product_select", {
                  sessionId,
                  selectedProductId: product.productId,
                });
                logEvent("recommendation_card_clicked", {
                  sessionId,
                  selectedProductId: product.productId,
                });
              }}
              className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-semibold ${selectedProductId === product.productId ? "bg-black text-white" : "border border-black/20"}`}
            >
              {selectedProductId === product.productId ? "선택됨" : "이 상품으로 상담"}
            </button>
          </article>
        ))}
      </section>

      <section className="mt-5 overflow-x-auto rounded-2xl border border-black/10 bg-white p-3">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="mb-2 text-left text-xs text-black/50">추천 상품 비교표</caption>
          <thead>
            <tr className="text-left text-black/60">
              <th>상품</th>
              <th>월요금</th>
              <th>의무</th>
              <th>계약</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {top3.map((p) => (
              <tr key={p.productId} className="border-t border-black/10">
                <td>{p.modelName}</td>
                <td>{formatWon(p.promoFee)}</td>
                <td>{p.mandatoryUseMonth}개월</td>
                <td>{p.contractTotalMonth}개월</td>
                <td>{formatManagement(p.managementType)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <button
        onClick={submitLead}
        disabled={!selectedProductId}
        className="fixed bottom-4 left-4 right-4 mx-auto w-[min(720px,calc(100%-2rem))] rounded-xl bg-[#111] px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        비교 결과 전달 후 상담하기
      </button>
    </main>
  );
}
