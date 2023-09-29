import { ProductCategory } from "../entities";
import { ProductSerializer, Serializer } from ".";

export class ProductCategorySerializer implements Serializer<ProductCategory> {
  constructor(
    private readonly data: any
  ) { }

  serialize(): ProductCategory {
    const productCategory = new ProductCategory(
      this.data.id,
      new Date(this.data.createdAt),
      new Date(this.data.updatedAt),
      this.data.name
    )

    if (this.data.products) {
      productCategory.products = this.data.products.map((product: any) => new ProductSerializer(product).serialize());
    }

    return productCategory;
  }
}