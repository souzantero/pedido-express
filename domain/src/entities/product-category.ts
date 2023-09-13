import { Product } from "./product";

export interface ProductCategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  name: string;

  products?: Product[];
}