import Link from "next/link";

type CompletePageProps = {
  searchParams: Promise<{ name?: string; phone?: string; product?: string; area?: string }>;
};

export default async function CompletePage({ searchParams }: CompletePageProps) {
  const { name, phone, product, area } = await searchParams;

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-4 py-10 text-[#111]">
      <div className="mx-auto w-full max-w-[460px] rounded-3xl bg-white p-6 text-center">
        <p className="text-xs font-semibold text-black/45">상담 접수 완료</p>
        <h1 className="mt-2 text-2xl font-extrabold">신청이 접수되었어요</h1>
        <p className="mt-3 text-sm text-black/60">
          {name ? `${name}님, ` : ""}
          영업시간 내 순차적으로 연락드릴게요.
        </p>

        {product || phone || area ? (
          <div className="mt-3 rounded-xl bg-[#f6f7f9] p-3 text-left text-xs text-black/55">
            {product ? <p>선택 상품: {product}</p> : null}
            {phone ? <p className="mt-1">연락처: {phone}</p> : null}
            {area ? <p className="mt-1">설치 지역: {area}</p> : null}
          </div>
        ) : null}

        <div className="mt-6 space-y-2">
          <Link
            href="/category/appliance-rental"
            className="block w-full rounded-xl bg-black py-3 text-sm font-semibold text-white"
          >
            다른 상품 더 보기
          </Link>
          <Link
            href="/"
            className="block w-full rounded-xl border border-black/10 py-3 text-sm font-semibold"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
