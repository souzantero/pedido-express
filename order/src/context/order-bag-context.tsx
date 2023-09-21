import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Order, OrderProduct, Product } from "../domain";

export type OrderBag = {
  order: Order;
  addProduct: (
    product: Product,
    quantity: number,
    observation?: string
  ) => void;
  removeProduct: (orderProduct: OrderProduct) => void;
  increaseQuantity: (orderProduct: OrderProduct) => void;
  decreaseQuantity: (orderProduct: OrderProduct) => void;
  setIsTakeout: (isTakeout: boolean) => void;
};

const OrderBagContext = createContext<OrderBag>({
  order: new Order(),
  addProduct: () => {},
  removeProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setIsTakeout: () => {},
});

export const OrderBagProvider: FC<PropsWithChildren> = ({ children }) => {
  const [order, setOrder] = useState<Order>(new Order());
  
  const addProduct = (
    product: Product,
    quantity: number,
    observation?: string
  ) => {
    const orderProduct = new OrderProduct(
      order,
      product,
      quantity,
      observation
    );

    const existingOrderProduct = order.orderProducts.find(
      (op) => op.key === orderProduct.key
    );

    if (existingOrderProduct) {
      increaseQuantity(existingOrderProduct, orderProduct.quantity);
      return;
    }

    setOrder(new Order([...order.orderProducts, orderProduct]));
  };

  const removeProduct = (orderProduct: OrderProduct) => {
    setOrder(
      new Order(order.orderProducts.filter((op) => op.key !== orderProduct.key))
    );
  };

  const increaseQuantity = (
    orderProduct: OrderProduct,
    quantity: number = 1
  ) => {
    const newOrderProducts = order.orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProduct(
          order,
          op.product,
          op.quantity + quantity,
          op.observation
        );
      }
      return op;
    });

    setOrder(new Order(newOrderProducts));
  };

  const decreaseQuantity = (orderProduct: OrderProduct) => {
    if (orderProduct.quantity === 1) {
      removeProduct(orderProduct);
      return;
    }

    const newOrderProducts = order.orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProduct(
          order,
          op.product,
          op.quantity - 1,
          op.observation
        );
      }
      return op;
    });

    setOrder(new Order(newOrderProducts));
  };

  const setIsTakeout = (isTakeout: boolean) => {
    setOrder(new Order(order.orderProducts, isTakeout));
  }

  const orderBag = useMemo<OrderBag>(
    () => ({
      order,
      addProduct,
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
      setIsTakeout,
    }),
    [order]
  );
  
  return (
    <OrderBagContext.Provider value={orderBag}>
      {children}
    </OrderBagContext.Provider>
  );
};

export function useOrderBag(): OrderBag {
  return useContext<OrderBag>(OrderBagContext);
}
