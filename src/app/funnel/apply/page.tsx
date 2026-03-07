"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { logEvent } from "@/features/analytics/log-event";
import type { UserProfile } from "@/features/recommendation/model/types";

const genSessionId = () => `sess_${Math.random().toString(36).slice(2, 10)}`;

export default function FunnelApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sessionId = useMemo(() => genSessionId(), []);

  const [form, setForm] = useState<Omit<UserProfile, "sessionId">>({
    householdSize: 1,
    residenceType: "jeonse_or_monthly",
    movingWithin24m: true,
    budgetRange: "30000_39999",
    requiredFeatures: ["cold", "purify"],
    wantsIce: false,
    carePreference: "self",
    spaceConstraint: "medium",
    biggestConcern: "termination_fee",
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload: UserProfile = { ...form, sessionId };
    sessionStorage.setItem(`profile:${sessionId}`, JSON.stringify(payload));

    logEvent("onboarding_complete", { sessionId });
    router.push(`/funnel/result?sessionId=${sessionId}`);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">1분 추천 시작</h1>
      <p className="mt-2 text-sm text-black/60">필수 조건만 입력하면 3개 추천을 바로 보여드려요.</p>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 rounded-2xl border border-black/10 bg-white p-4"
      >
        <label className="block text-sm">
          가구 수
          <input
            type="number"
            min={1}
            max={6}
            value={form.householdSize}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, householdSize: Number(e.target.value) }))
            }
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          월 예산
          <select
            value={form.budgetRange}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                budgetRange: e.target.value as UserProfile["budgetRange"],
              }))
            }
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="under_29999">3만원 미만</option>
            <option value="30000_39999">3만원대</option>
            <option value="40000_plus">4만원 이상</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.movingWithin24m}
            onChange={(e) => setForm((prev) => ({ ...prev, movingWithin24m: e.target.checked }))}
          />
          24개월 내 이사 가능성이 있어요
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.wantsIce}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                wantsIce: e.target.checked,
                requiredFeatures: e.target.checked
                  ? ["cold", "hot", "purify", "ice"]
                  : ["cold", "purify"],
              }))
            }
          />
          얼음 기능이 꼭 필요해요
        </label>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "추천 준비 중..." : "추천 결과 보기"}
        </button>
      </form>
    </main>
  );
}
