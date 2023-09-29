import { Product } from "./product";

export class ProductCategory {
  products?: Product[];

  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly name: string
  ) { }
}