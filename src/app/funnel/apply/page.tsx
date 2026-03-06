import Link from "next/link";

import { rentalProducts } from "@/features/rental/mock";

type ApplyPageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const { product } = await searchParams;
  const selected = rentalProducts.find((item) => item.slug === product) ?? rentalProducts[0];

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-4 py-6 text-[#111]">
      <div className="mx-auto w-full max-w-[460px] rounded-3xl bg-white p-5">
        <p className="text-xs font-semibold text-black/45">렌탈 상담 퍼널</p>
        <h1 className="mt-1 text-xl font-extrabold">상담 신청 정보 입력</h1>

        <div className="mt-4 rounded-2xl bg-[#f6f7f9] p-4">
          <p className="text-xs text-black/50">선택 상품</p>
          <p className="mt-1 text-sm font-bold">{selected.name}</p>
        </div>

        <form className="mt-4 space-y-3" action="/funnel/complete">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-black/60">이름</span>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
              placeholder="홍길동"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-xs text-black/60">연락처</span>
            <input
              name="phone"
              required
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
              placeholder="010-1234-5678"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-xs text-black/60">희망 설치 지역</span>
            <input
              name="area"
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
              placeholder="서울 강남구"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-xs text-black/60">문의 내용</span>
            <textarea
              name="memo"
              rows={4}
              className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
              placeholder="원하는 모델 / 설치 희망일"
            />
          </label>

          <input type="hidden" name="product" value={selected.slug} />

          <button className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white">
            상담 신청 완료
          </button>
        </form>

        <Link
          href={`/product/${selected.slug}`}
          className="mt-3 block text-center text-xs font-semibold text-black/50 underline"
        >
          상품 상세로 돌아가기
        </Link>
      </div>
    </div>
  );
}
