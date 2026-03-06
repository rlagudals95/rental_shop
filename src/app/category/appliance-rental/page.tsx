import Link from "next/link";

import { ProductListCard } from "@/components/rental/product-list-card";
import { type RentalCategory, rentalProducts } from "@/features/rental/mock";

const quickFilters = ["전체", "정수기", "공기청정기", "안마의자", "주방가전"] as const;
const sortKeys = ["popular", "low", "high", "reviews"] as const;

type SortKey = (typeof sortKeys)[number];

type CategoryPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

function sortProducts(items: typeof rentalProducts, sort: SortKey) {
  if (sort === "low") return [...items].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  if (sort === "high") return [...items].sort((a, b) => b.monthlyPrice - a.monthlyPrice);
  if (sort === "reviews") return [...items].sort((a, b) => b.reviewCount - a.reviewCount);
  return [...items].sort(
    (a, b) => b.reviewCount + b.monthlyPrice - (a.reviewCount + a.monthlyPrice),
  );
}

const sortLabel: Record<SortKey, string> = {
  popular: "인기순",
  low: "낮은 가격순",
  high: "높은 가격순",
  reviews: "리뷰 많은순",
};

export default async function ApplianceRentalPage({ searchParams }: CategoryPageProps) {
  const { category = "전체", sort = "popular" } = await searchParams;

  const selectedCategory = quickFilters.includes(category as (typeof quickFilters)[number])
    ? category
    : "전체";

  const selectedSort = sortKeys.includes(sort as SortKey) ? (sort as SortKey) : "popular";

  const filtered =
    selectedCategory === "전체"
      ? rentalProducts
      : rentalProducts.filter((item) => item.category === (selectedCategory as RentalCategory));

  const products = sortProducts(filtered, selectedSort);

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
              {quickFilters.map((filter) => {
                const active = filter === selectedCategory;

                return (
                  <Link
                    key={filter}
                    href={`/category/appliance-rental?category=${encodeURIComponent(filter)}&sort=${selectedSort}`}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      active
                        ? "bg-black text-white"
                        : "border border-black/10 bg-white text-black/65"
                    }`}
                  >
                    {filter}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pt-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-black/55">총 {products.length}개 상품</p>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {sortKeys.map((key) => {
                const active = key === selectedSort;

                return (
                  <Link
                    key={key}
                    href={`/category/appliance-rental?category=${encodeURIComponent(selectedCategory)}&sort=${key}`}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      active
                        ? "bg-black text-white"
                        : "border border-black/10 bg-white text-black/60"
                    }`}
                  >
                    {sortLabel[key]}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5">
            {products.map((product) => (
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
