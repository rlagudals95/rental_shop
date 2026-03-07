import { formatManagement, formatWon, type RentalProduct } from "@/entities/rental-product";

type ProductListCardProps = {
  product: RentalProduct;
};

export function ProductListCard({ product }: ProductListCardProps) {
  return (
    <article className="rounded-xl border border-black/10 bg-white p-3">
      <p className="text-xs text-black/50">{product.brand}</p>
      <h3 className="font-semibold">{product.modelName}</h3>
      <p className="text-sm text-black/70">월 {formatWon(product.promoFee)}</p>
      <p className="text-xs text-black/60">
        의무 {product.mandatoryUseMonth}개월 / 계약 {product.contractTotalMonth}개월 ·
        {formatManagement(product.managementType)}
      </p>
    </article>
  );
}
