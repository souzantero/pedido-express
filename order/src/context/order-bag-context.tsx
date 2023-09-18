import { createContext } from "react";
import { OrderProduct, Product } from "@self/domain";

export type OrderProductBag = Pick<
  OrderProduct,
  "productId" | "quantity" | "observation"
>;

export type OrderBag = {
  orderProducts: OrderProductBag[];
  addProduct: (product: Product, quantity: number, observation: string) => void;
  removeProduct: (product: Product) => void;
};

export const OrderBagContext = createContext<OrderBag>({
  orderProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
});

export const OrderBagProvider = OrderBagContext.Provider;
