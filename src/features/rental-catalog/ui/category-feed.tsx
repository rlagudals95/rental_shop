"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { type RentalProduct } from "@/entities/rental-product";
import { ProductListCard } from "@/entities/rental-product/ui/product-list-card";

type SortKey = "popular" | "low" | "high" | "reviews";

const sortKeys: SortKey[] = ["popular", "low", "high", "reviews"];

const sortLabel: Record<SortKey, string> = {
  popular: "인기순",
  low: "낮은 가격순",
  high: "높은 가격순",
  reviews: "리뷰 많은순",
};

export function CategoryFeed() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "전체";
  const selectedSort = (searchParams.get("sort") as SortKey) ?? "popular";

  const [categories, setCategories] = useState<string[]>(["전체"]);
  const [products, setProducts] = useState<RentalProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch("/api/mock/categories", { cache: "no-store" }),
          fetch(
            `/api/mock/products?category=${encodeURIComponent(selectedCategory)}&sort=${selectedSort}`,
            {
              cache: "no-store",
            },
          ),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("목록 로딩 실패");
        }

        const categoryJson = (await categoryResponse.json()) as { items: string[] };
        const productJson = (await productResponse.json()) as { items: RentalProduct[] };

        if (!isMounted) return;

        setCategories(categoryJson.items);
        setProducts(productJson.items);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, selectedSort]);

  const go = (nextCategory: string, nextSort: SortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", nextCategory);
    params.set("sort", nextSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className="px-4 pt-3">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {categories.map((filter) => {
              const active = filter === selectedCategory;

              return (
                <button
                  key={filter}
                  onClick={() => go(filter, selectedSort)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    active ? "bg-black text-white" : "border border-black/10 bg-white text-black/65"
                  }`}
                >
                  {filter}
                </button>
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
                <button
                  key={key}
                  onClick={() => go(selectedCategory, key)}
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    active ? "bg-black text-white" : "border border-black/10 bg-white text-black/60"
                  }`}
                >
                  {sortLabel[key]}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="space-y-2.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-[100px] animate-pulse rounded-xl bg-white/70" />
            ))}
          </div>
        ) : (
          <div className="space-y-2.5">
            {products.map((product) => (
              <ProductListCard key={product.slug} product={product} />
            ))}
          </div>
        )}
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
    </>
  );
}
