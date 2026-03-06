import Link from "next/link";

import { ProductListCard } from "@/components/rental/product-list-card";
import { rentalProducts } from "@/features/rental/mock";

const quickFilters = ["전체", "정수기", "공기청정기", "비데", "안마의자"];

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

        <section className="px-4 pt-3">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {quickFilters.map((filter, idx) => (
                <button
                  key={filter}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    idx === 0
                      ? "bg-black text-white"
                      : "border border-black/10 bg-white text-black/65"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-black/55">총 {rentalProducts.length}개 상품</p>
            <button className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-black/60">
              인기순 ▾
            </button>
          </div>

          <div className="space-y-2.5">
            {rentalProducts.map((product) => (
              <ProductListCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-t-3xl border-t border-black/5 bg-white px-4 py-5 text-center">
          <p className="text-xs text-black/35">W I S E L Y</p>
          <p className="mt-1 text-[11px] text-black/35">고품질 초저가 쇼핑몰 · 가전 렌탈</p>
          <div className="mt-3 flex justify-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold"
            >
              홈으로
            </Link>
            <Link
              href="/funnel/apply"
              className="rounded-full bg-black px-3 py-1.5 text-[11px] font-semibold text-white"
            >
              상담 신청
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
