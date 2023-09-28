import { ProductRepository } from "./product-repository";
import { ProductCategoryRepository } from "./product-category-repository";
import { OrderRepository } from "./order-repository";

export interface Repository {
  order: OrderRepository
  product: ProductRepository;
  productCategory: ProductCategoryRepository;
}