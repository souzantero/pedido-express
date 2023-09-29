import { ProductCategory } from "../entities";

export interface FindProductCategories {
  findAll(): Promise<ProductCategory[]>
}
