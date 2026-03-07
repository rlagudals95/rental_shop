import { type RentalProduct, rentalProducts } from "@/entities/rental-product";

export interface ProductRepository {
  listActive(): Promise<RentalProduct[]>;
}

export class InMemoryProductRepository implements ProductRepository {
  async listActive(): Promise<RentalProduct[]> {
    return rentalProducts.filter((product) => product.stockStatus === "active");
  }
}
