import Image from "next/image";
import Link from "next/link";

import { formatWon, type RentalProduct } from "@/entities/rental-product";

type ProductListCardProps = {
  product: RentalProduct;
};

export function ProductListCard({ product }: ProductListCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex gap-3 rounded-xl bg-white p-2.5 transition hover:bg-[#f7f7f7]"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f0f1f3]">
        <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {product.badge ? (
            <span className="rounded-full border border-black/15 bg-[#f5f5f5] px-1.5 py-0.5 text-[10px] font-bold text-black/70">
              {product.badge}
            </span>
          ) : null}
          <p className="truncate text-[11px] font-semibold text-black/45">{product.brand}</p>
        </div>

        <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-[1.35] text-black/90">
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <p className="text-[11px] text-black/30 line-through">
            {formatWon(product.originalPrice)}
          </p>
          <p className="text-sm font-extrabold text-[#f36f00]">
            월 {formatWon(product.monthlyPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}
