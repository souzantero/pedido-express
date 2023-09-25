import { Repository, ProductRepository, ProductCategoryRepository } from "@pedido-express/domain";
import { InMemoryProductCategoryDatabase } from "./in-memory-product-category-database";
import { InMemoryProductDatabase } from "./in-memory-product-database";

export class InMemoryDatabase implements Repository {
  readonly product: ProductRepository;
  readonly productCategory: ProductCategoryRepository;

  constructor() {
    this.product = new InMemoryProductDatabase();
    this.productCategory = new InMemoryProductCategoryDatabase();
  }
}