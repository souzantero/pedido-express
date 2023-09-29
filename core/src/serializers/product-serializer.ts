import { Product } from "../entities";
import { Serializer } from ".";

export class ProductSerializer implements Serializer<Product> {
  constructor(
    private readonly data: any
  ) { }

  public serialize(): Product {
    return new Product(
      this.data.id,
      new Date(this.data.createdAt),
      new Date(this.data.updatedAt),
      this.data.name,
      this.data.description,
      parseFloat(this.data.price),
      this.data.categoryId,
      this.data.imageSource
    )
  }
}