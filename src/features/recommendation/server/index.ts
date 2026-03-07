import { InMemoryProductRepository } from "./product-repository";
import { RecommendationService } from "./recommendation-service";

const productRepository = new InMemoryProductRepository();

export const recommendationService = new RecommendationService(productRepository);
