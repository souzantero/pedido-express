import { Product } from "../entities";

export interface FindProducts {
  findAll(): Promise<Product[]>
}
