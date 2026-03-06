import { Suspense } from "react";

import { CategoryFeed } from "@/features/rental-catalog/ui/category-feed";

export default function ApplianceRentalPage() {
  return (
    <div className="min-h-screen bg-[#f2f3f5] text-[#131313]">
      <div className="mx-auto w-full max-w-[460px] bg-[#f2f3f5] pb-12">
        <header className="sticky top-0 z-10 border-b border-black/5 bg-white/95 px-4 py-3 backdrop-blur">
          <p className="text-[11px] text-black/45">가전렌탈 · 와이즐리 스타일</p>
          <h1 className="text-base font-extrabold">합리적인 가전 렌탈</h1>
        </header>

        <section className="px-4 pt-3">
          <div className="rounded-2xl bg-[#e9edf3] p-4">
            <p className="text-lg font-extrabold leading-tight">월 렌탈료로</p>
            <p className="text-lg font-extrabold leading-tight">필요한 가전 시작하기</p>
            <p className="mt-1.5 text-xs text-black/55">설치/관리/AS 포함 · 오늘 신청 가능</p>
          </div>
        </section>

        <Suspense
          fallback={
            <div className="px-4 pt-4 text-xs font-medium text-black/45">목록 불러오는 중...</div>
          }
        >
          <CategoryFeed />
        </Suspense>
      </div>
    </div>
  );
}
