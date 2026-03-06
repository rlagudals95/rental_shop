import Image from "next/image";
import Link from "next/link";

const categoryTabs = ["전체", "가전 렌탈", "정수기", "공기청정기", "안마의자", "주방가전"];

type Product = {
  id: number;
  slug: string;
  category: "정수기" | "공기청정기" | "안마의자" | "주방가전";
  brand: string;
  name: string;
  monthlyPrice: string;
  period: string;
  badge?: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    slug: "coway-icon-ice",
    category: "정수기",
    brand: "코웨이",
    name: "아이콘 얼음정수기",
    monthlyPrice: "월 31,900원",
    period: "60개월 · 방문관리",
    badge: "인기",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    slug: "lg-360-air",
    category: "공기청정기",
    brand: "LG 오브제",
    name: "퓨리케어 360 공기청정기",
    monthlyPrice: "월 24,900원",
    period: "48개월 · 셀프관리",
    badge: "오늘특가",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    slug: "ceragem-master-v7",
    category: "안마의자",
    brand: "세라젬",
    name: "마스터 V7 안마의자",
    monthlyPrice: "월 49,000원",
    period: "60개월 · 방문관리",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    slug: "samsung-cube-air",
    category: "공기청정기",
    brand: "삼성 비스포크",
    name: "비스포크 큐브 에어",
    monthlyPrice: "월 19,900원",
    period: "36개월 · 셀프관리",
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    slug: "cuckoo-inout",
    category: "정수기",
    brand: "쿠쿠",
    name: "인앤아웃 직수 정수기",
    monthlyPrice: "월 21,900원",
    period: "36개월 · 방문관리",
    badge: "혜택가",
    image:
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    slug: "cuckoo-inout",
    category: "주방가전",
    brand: "SK매직",
    name: "올인원 식기세척기",
    monthlyPrice: "월 29,900원",
    period: "48개월 · 방문관리",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#141414]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="text-lg font-extrabold tracking-tight">Rental Shop</div>
          <nav className="hidden items-center gap-6 text-sm text-black/70 md:flex">
            <a href="#">카테고리</a>
            <a href="#">인기상품</a>
            <a href="#">이벤트</a>
            <a href="#">고객센터</a>
          </nav>
          <button className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
            파트너 상담
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#111] via-[#1f2937] to-[#334155] p-6 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            Appliance Rental
          </p>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight md:text-4xl">
            고품질 가전을
            <br className="hidden md:block" />
            합리적인 월 렌탈료로
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
            정수기 · 공기청정기 · 안마의자까지.
            <br className="hidden md:block" />
            설치/관리/AS까지 포함된 올인원 렌탈 서비스를 만나보세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/category/appliance-rental"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              전체 상품 보기
            </Link>
            <Link
              href="/funnel/apply"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white"
            >
              상담 신청
            </Link>
          </div>
        </section>

        <section className="mt-6 md:mt-8">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {categoryTabs.map((tab, index) => (
              <Link
                key={tab}
                href={`/category/appliance-rental?category=${encodeURIComponent(tab === "가전 렌탈" ? "전체" : tab)}&sort=popular`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  index === 1
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white text-black/70 hover:border-black/20"
                }`}
              >
                {tab}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3 md:gap-5">
          {products.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f3f5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {product.badge ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="space-y-1.5 p-3 md:p-4">
                <p className="text-xs font-semibold text-black/45">{product.brand}</p>
                <h2 className="min-h-10 overflow-hidden text-sm font-bold leading-snug md:text-base">
                  {product.name}
                </h2>
                <p className="pt-1 text-base font-extrabold md:text-lg">{product.monthlyPrice}</p>
                <p className="text-xs text-black/55 md:text-sm">{product.period}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
