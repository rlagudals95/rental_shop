"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { logEvent } from "@/features/analytics/log-event";
import type { FeatureType, UserProfile } from "@/features/recommendation/model/types";

const genSessionId = () => `sess_${Math.random().toString(36).slice(2, 10)}`;

type ApplyForm = Omit<UserProfile, "sessionId">;

const baseRequiredFeatures: FeatureType[] = ["cold", "purify"];

export default function FunnelApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sessionId = useMemo(() => genSessionId(), []);

  const [form, setForm] = useState<ApplyForm>({
    householdSize: 1,
    residenceType: "jeonse_or_monthly",
    movingWithin24m: true,
    budgetRange: "30000_39999",
    requiredFeatures: baseRequiredFeatures,
    wantsIce: false,
    carePreference: "self",
    spaceConstraint: "medium",
    biggestConcern: "termination_fee",
  });

  useEffect(() => {
    logEvent("onboarding_start", { sessionId });
  }, [sessionId]);

  const updateForm = <K extends keyof ApplyForm>(key: K, value: ApplyForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    logEvent("onboarding_question_answered", {
      sessionId,
      questionKey: key,
      selectedOption: value,
    });
  };

  const onFeatureChange = (feature: FeatureType, checked: boolean) => {
    const next = new Set(form.requiredFeatures);

    if (checked) {
      next.add(feature);
    } else {
      next.delete(feature);
    }

    if (!next.has("purify")) {
      next.add("purify");
    }

    const nextFeatures = Array.from(next);
    updateForm("requiredFeatures", nextFeatures);

    if (feature === "ice") {
      updateForm("wantsIce", checked);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload: UserProfile = { ...form, sessionId };
    sessionStorage.setItem(`profile:${sessionId}`, JSON.stringify(payload));

    logEvent("onboarding_complete", { sessionId, profile: payload });
    router.push(`/funnel/result?sessionId=${sessionId}`);
  };

  const select =
    <K extends keyof ApplyForm>(key: K) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as ApplyForm[K];
      updateForm(key, value);
    };

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">1분 추천 시작</h1>
      <p className="mt-2 text-sm text-black/60">
        7~9개 질문으로 계약 리스크를 같이 보는 추천을 진행해요.
      </p>

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
            onChange={(e) => updateForm("householdSize", Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          거주 형태
          <select
            value={form.residenceType}
            onChange={select("residenceType")}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="jeonse_or_monthly">전월세</option>
            <option value="owned">자가</option>
          </select>
        </label>

        <label className="block text-sm">
          월 예산
          <select
            value={form.budgetRange}
            onChange={select("budgetRange")}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="under_29999">3만원 미만</option>
            <option value="30000_39999">3만원대</option>
            <option value="40000_plus">4만원 이상</option>
          </select>
        </label>

        <label className="block text-sm">
          관리 선호
          <select
            value={form.carePreference}
            onChange={select("carePreference")}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="self">셀프관리</option>
            <option value="visit">방문관리</option>
          </select>
        </label>

        <label className="block text-sm">
          공간 제약
          <select
            value={form.spaceConstraint}
            onChange={select("spaceConstraint")}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="high">높음 (슬림형 선호)</option>
            <option value="medium">보통</option>
            <option value="low">낮음 (대형 가능)</option>
          </select>
        </label>

        <label className="block text-sm">
          가장 큰 걱정
          <select
            value={form.biggestConcern}
            onChange={select("biggestConcern")}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="termination_fee">해지/위약금</option>
            <option value="price">월요금</option>
            <option value="maintenance">관리 부담</option>
          </select>
        </label>

        <fieldset className="space-y-2 text-sm">
          <legend className="font-medium">필수 기능</legend>
          <label className="mr-3 inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.requiredFeatures.includes("cold")}
              onChange={(e) => onFeatureChange("cold", e.target.checked)}
            />
            냉수
          </label>
          <label className="mr-3 inline-flex items-center gap-2">
            <input type="checkbox" checked disabled />
            정수(필수)
          </label>
          <label className="mr-3 inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.requiredFeatures.includes("hot")}
              onChange={(e) => onFeatureChange("hot", e.target.checked)}
            />
            온수
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.requiredFeatures.includes("ice")}
              onChange={(e) => onFeatureChange("ice", e.target.checked)}
            />
            얼음
          </label>
        </fieldset>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.movingWithin24m}
            onChange={(e) => updateForm("movingWithin24m", e.target.checked)}
          />
          24개월 내 이사 가능성이 있어요
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
