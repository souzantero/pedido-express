import { CreateOrder, FindProductCategories, FindProducts } from "@pedido-express/core";

export interface Service {
  order: OrderService
  product: ProductService
  productCategory: ProductCategoryService
}

export type OrderService = CreateOrder
export type ProductService = FindProducts
export type ProductCategoryService = FindProductCategories