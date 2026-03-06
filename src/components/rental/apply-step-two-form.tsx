"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ApplyStepTwoFormProps = {
  product: string;
  name: string;
  phone: string;
};

export function ApplyStepTwoForm({ product, name, phone }: ApplyStepTwoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      name,
      phone,
      product,
      area: String(formData.get("area") ?? ""),
      date: String(formData.get("date") ?? ""),
      memo: String(formData.get("memo") ?? ""),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/mock/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("신청 접수에 실패했습니다.");
      }

      const searchParams = new URLSearchParams({
        name,
        phone,
        product,
        area: payload.area,
      });

      router.push(`/funnel/complete?${searchParams.toString()}`);
    } catch (error) {
      console.error(error);
      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <label className="block text-sm">
        <span className="mb-1 block text-xs text-black/60">희망 설치 지역</span>
        <input
          name="area"
          required
          className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
          placeholder="서울 강남구"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-xs text-black/60">희망 설치일</span>
        <input
          name="date"
          className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
          placeholder="예: 다음 주 화요일"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-xs text-black/60">문의 내용</span>
        <textarea
          name="memo"
          rows={4}
          className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
          placeholder="원하는 모델 / 설치 희망 시간"
        />
      </label>

      <button
        disabled={isSubmitting}
        className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? "신청 중..." : "상담 신청 완료"}
      </button>
    </form>
  );
}
