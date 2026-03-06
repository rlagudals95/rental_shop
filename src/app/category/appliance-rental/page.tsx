import Image from "next/image";
import Link from "next/link";

const tabs = ["전체", "정수기", "공기청정기", "비데", "안마의자", "주방가전"];
const sortOptions = ["인기순", "낮은 가격순", "높은 가격순", "리뷰 많은순"];

const items = [
  {
    id: 1,
    brand: "코웨이",
    name: "아이콘 얼음정수기",
    monthly: "월 31,900원",
    original: "월 36,900원",
    tag: "BEST",
    review: "리뷰 1,293",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    brand: "LG 퓨리케어",
    name: "360 공기청정기 플러스",
    monthly: "월 24,900원",
    original: "월 29,900원",
    tag: "특가",
    review: "리뷰 824",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    brand: "세라젬",
    name: "마스터 V7 척추 의료가전",
    monthly: "월 49,000원",
    original: "월 55,000원",
    tag: "인기",
    review: "리뷰 407",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    brand: "삼성 비스포크",
    name: "큐브 에어 공기청정기",
    monthly: "월 19,900원",
    original: "월 23,900원",
    review: "리뷰 612",
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    brand: "쿠쿠",
    name: "인앤아웃 직수 정수기",
    monthly: "월 21,900원",
    original: "월 26,900원",
    review: "리뷰 935",
    image:
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    brand: "SK매직",
    name: "올인원 식기세척기",
    monthly: "월 29,900원",
    original: "월 34,900원",
    tag: "혜택",
    review: "리뷰 357",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ApplianceRentalPage() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            WISELY RENTAL
          </Link>
          <div className="hidden text-sm text-black/60 md:block">고품질 초저가 쇼핑몰</div>
          <button className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
            파트너 문의
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="text-xs text-black/50">홈 &gt; 카테고리 &gt; 가전렌탈</div>
        <section className="mt-3 rounded-3xl bg-gradient-to-r from-[#0f172a] to-[#1e293b] p-6 text-white md:p-10">
          <p className="text-sm font-semibold text-white/80">Appliance Rental</p>
          <h1 className="mt-2 text-2xl font-extrabold md:text-4xl">가전 렌탈</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
            검증된 인기 가전을 월 렌탈로 부담 없이. 설치부터 관리, A/S까지 한 번에 해결하세요.
          </p>
        </section>

        <section className="mt-5 flex flex-wrap gap-2 md:mt-7">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                index === 0
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white text-black/70 hover:border-black/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        <section className="mt-5 flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3 md:mt-6">
          <p className="text-sm text-black/70">
            총 <strong className="text-black">{items.length}개</strong> 상품
          </p>
          <div className="flex gap-2 overflow-x-auto">
            {sortOptions.map((sort, idx) => (
              <button
                key={sort}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  idx === 0 ? "bg-black text-white" : "bg-[#f3f4f6] text-black/65"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-3 md:gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] bg-[#eef0f3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
                {item.tag ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-xs font-semibold text-white">
                    {item.tag}
                  </span>
                ) : null}
              </div>

              <div className="space-y-1.5 p-3 md:p-4">
                <p className="text-xs font-semibold text-black/45">{item.brand}</p>
                <h2 className="min-h-10 overflow-hidden text-sm font-bold leading-snug md:text-base">
                  {item.name}
                </h2>
                <div className="pt-1">
                  <p className="text-[11px] text-black/35 line-through md:text-xs">
                    {item.original}
                  </p>
                  <p className="text-base font-extrabold md:text-lg">{item.monthly}</p>
                </div>
                <p className="text-xs text-black/55 md:text-sm">{item.review}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
