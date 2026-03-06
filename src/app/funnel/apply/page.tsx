import Link from "next/link";

import { rentalProducts } from "@/features/rental/mock";

type ApplyPageProps = {
  searchParams: Promise<{ product?: string; step?: string; name?: string; phone?: string }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const { product, step = "1", name = "", phone = "" } = await searchParams;
  const selected = rentalProducts.find((item) => item.slug === product) ?? rentalProducts[0];

  const currentStep = step === "2" ? 2 : 1;

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-4 py-6 text-[#111]">
      <div className="mx-auto w-full max-w-[460px] rounded-3xl bg-white p-5">
        <p className="text-xs font-semibold text-black/45">렌탈 상담 퍼널</p>
        <h1 className="mt-1 text-xl font-extrabold">상담 신청 정보 입력</h1>

        <div className="mt-3 flex gap-2 text-[11px] font-semibold">
          <span
            className={`rounded-full px-2 py-1 ${
              currentStep === 1 ? "bg-black text-white" : "bg-[#eceef2] text-black/60"
            }`}
          >
            1) 고객 정보
          </span>
          <span
            className={`rounded-full px-2 py-1 ${
              currentStep === 2 ? "bg-black text-white" : "bg-[#eceef2] text-black/60"
            }`}
          >
            2) 설치 정보
          </span>
        </div>

        <div className="mt-4 rounded-2xl bg-[#f6f7f9] p-4">
          <p className="text-xs text-black/50">선택 상품</p>
          <p className="mt-1 text-sm font-bold">{selected.name}</p>
        </div>

        {currentStep === 1 ? (
          <form className="mt-4 space-y-3" action="/funnel/apply">
            <label className="block text-sm">
              <span className="mb-1 block text-xs text-black/60">이름</span>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
                placeholder="홍길동"
                defaultValue={name}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-xs text-black/60">연락처</span>
              <input
                name="phone"
                required
                className="w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-black"
                placeholder="010-1234-5678"
                defaultValue={phone}
              />
            </label>

            <input type="hidden" name="product" value={selected.slug} />
            <input type="hidden" name="step" value="2" />

            <button className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white">
              다음 단계
            </button>
          </form>
        ) : (
          <form className="mt-4 space-y-3" action="/funnel/complete">
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

            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="product" value={selected.slug} />

            <button className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white">
              상담 신청 완료
            </button>

            <Link
              href={`/funnel/apply?product=${selected.slug}&step=1&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`}
              className="block text-center text-xs font-semibold text-black/50 underline"
            >
              이전 단계
            </Link>
          </form>
        )}

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
