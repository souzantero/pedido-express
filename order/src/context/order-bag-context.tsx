import { createContext } from "react";
import { Product } from "@self/domain";

export type OrderProductBag = {
  product: Product;
  quantity: number;
  observation?: string;
}

export type OrderBag = {
  orderProducts: OrderProductBag[];
  addProduct: (
    product: Product,
    quantity: number,
    observation?: string
  ) => void;
  removeProduct: (product: Product) => void;
  totalPrice: number;
};

export const OrderBagContext = createContext<OrderBag>({
  orderProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
  totalPrice: 0,
});

export const OrderBagProvider = OrderBagContext.Provider;
