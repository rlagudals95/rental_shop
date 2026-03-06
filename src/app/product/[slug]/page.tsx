import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatWon, rentalProducts } from "@/entities/rental-product";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = rentalProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#111]">
      <div className="mx-auto w-full max-w-[460px] pb-24">
        <div className="relative aspect-[4/3] bg-[#e8ebef]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="460px"
            className="object-cover"
          />
        </div>

        <section className="rounded-t-3xl bg-white px-4 py-5">
          <p className="text-xs font-semibold text-black/45">{product.brand}</p>
          <h1 className="mt-1 text-xl font-extrabold leading-tight">{product.name}</h1>
          <p className="mt-1 text-sm text-black/60">{product.summary}</p>

          <div className="mt-4 rounded-2xl bg-[#f6f7f9] p-4">
            <p className="text-xs text-black/45 line-through">
              정가 월 {formatWon(product.originalPrice)}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#f36f00]">
              월 {formatWon(product.monthlyPrice)}
            </p>
            <p className="mt-2 text-xs text-black/60">
              {product.contract} · {product.management} · 리뷰{" "}
              {product.reviewCount.toLocaleString("ko-KR")}개
            </p>
          </div>

          <div className="mt-4 space-y-2 rounded-2xl border border-black/10 p-4 text-sm">
            <p className="font-semibold">렌탈 안내</p>
            <p className="text-black/65">- 설치비 0원(프로모션 적용 시)</p>
            <p className="text-black/65">- 약정 기간 내 무상 A/S 지원</p>
            <p className="text-black/65">- 약정/관리 조건은 상담 시 최종 확정</p>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
            <div className="bg-[#f6f7f9] px-4 py-3 text-sm font-semibold">상품 스펙</div>
            <div className="divide-y divide-black/5 text-sm">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-4 py-3">
                  <p className="text-black/45">{spec.label}</p>
                  <p className="font-medium text-black/80">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/95 p-3 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[460px] gap-2">
            <Link
              href="/category/appliance-rental"
              className="flex-1 rounded-xl border border-black/10 py-3 text-center text-sm font-semibold"
            >
              목록으로
            </Link>
            <Link
              href={`/funnel/apply?product=${product.slug}&step=1`}
              className="flex-[1.4] rounded-xl bg-black py-3 text-center text-sm font-semibold text-white"
            >
              상담 시작하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
