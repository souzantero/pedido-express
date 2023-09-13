import { Repository, ProductCategoryRepository } from "@self/domain";
import { InMemoryProductCategoryDatabase } from "./in-memory-product-category-database";

export class InMemoryDatabase implements Repository {
  readonly productCategory: ProductCategoryRepository;

  constructor() {
    this.productCategory = new InMemoryProductCategoryDatabase();
  }
}