import { ProductCategory } from "../entities";

export interface ProductCategoryRepository extends FindProductCategoriesRepository { }

export interface FindProductCategoriesRepository {
  findAll(): Promise<ProductCategory[]>;
}