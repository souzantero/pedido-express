import { CreateOrder, FindProductCategories, FindProducts } from "@pedido-express/core";

export interface Service {
  // order: CreateOrder
  product: ProductService
  productCategory: ProductCategoryService
}

export type ProductService = FindProducts
export type ProductCategoryService = FindProductCategories