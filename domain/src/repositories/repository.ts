import { ProductRepository } from "./product-repository";
import { ProductCategoryRepository } from "./product-category-repository";

export interface Repository {
  product: ProductRepository;
  productCategory: ProductCategoryRepository;
}