import { Product } from "../entities";

export interface ProductRepository extends FindProductsRepository { }

export interface FindProductsRepository {
  findAll(): Promise<Product[]>;
}