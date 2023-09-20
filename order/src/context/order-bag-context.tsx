import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Product } from "@self/domain";

export class OrderProductBag {
  constructor(
    public readonly product: Product,
    public readonly quantity: number,
    public readonly observation?: string
  ) {}

  get totalPrice() {
    return this.product.price * this.quantity;
  }

  get key() {
    return `${this.product.id}-${this.quantity}-${this.observation}`;
  }
}

export type OrderBag = {
  orderProducts: OrderProductBag[];
  addProduct: (orderProduct: OrderProductBag) => void;
  removeProduct: (orderPRoduct: OrderProductBag) => void;
  totalPrice: number;
};

const OrderBagContext = createContext<OrderBag>({
  orderProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
  totalPrice: 0,
});

export const OrderBagProvider: FC<PropsWithChildren> = ({ children }) => {
  const [orderProducts, setOrderProducts] = useState<OrderProductBag[]>([]);
  const totalPrice = useMemo(
    () =>
      orderProducts.reduce((acc, orderProduct) => {
        return acc + orderProduct.totalPrice;
      }, 0),
    [orderProducts]
  );

  const addProduct = (orderProduct: OrderProductBag) => {
    setOrderProducts([...orderProducts, orderProduct]);
  };

  const removeProduct = (orderProduct: OrderProductBag) => {
    setOrderProducts(orderProducts.filter((op) => op.key !== orderProduct.key));
  };

  return (
    <OrderBagContext.Provider
      value={{
        orderProducts,
        addProduct,
        removeProduct,
        totalPrice,
      }}
    >
      {children}
    </OrderBagContext.Provider>
  );
};

export function useOrderBag(): OrderBag {
  return useContext<OrderBag>(OrderBagContext);
}
