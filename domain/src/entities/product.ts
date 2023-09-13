import { ProductCategory } from "./product-category";

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  name: string;
  description: string;
  price: number;

  categoryId: string;
  category?: ProductCategory;
}