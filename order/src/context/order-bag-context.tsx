import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Order, OrderProduct, OrderStatus, Product } from "../domain";

export type OrderBag = {
  orderProducts: OrderProduct[];
  addProduct: (
    product: Product,
    quantity: number,
    observation?: string
  ) => void;
  removeProduct: (orderProduct: OrderProduct) => void;
  increaseQuantity: (orderProduct: OrderProduct) => void;
  decreaseQuantity: (orderProduct: OrderProduct) => void;
  totalPrice: number;
};

const OrderBagContext = createContext<OrderBag>({
  orderProducts: [],
  addProduct: () => {},
  removeProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  totalPrice: 0,
});

export const OrderBagProvider: FC<PropsWithChildren> = ({ children }) => {
  const order: Order = {
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    status: OrderStatus.Pending,
    isTakeout: false,
    customerName: "",
  };

  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const totalPrice = useMemo(
    () =>
      orderProducts.reduce((acc, orderProduct) => {
        return acc + orderProduct.totalPrice;
      }, 0),
    [orderProducts]
  );

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

    const existingOrderProduct = orderProducts.find(
      (op) => op.key === orderProduct.key
    );

    if (existingOrderProduct) {
      increaseQuantity(existingOrderProduct, orderProduct.quantity);
      return;
    }

    setOrderProducts([...orderProducts, orderProduct]);
  };

  const removeProduct = (orderProduct: OrderProduct) => {
    setOrderProducts(orderProducts.filter((op) => op.key !== orderProduct.key));
  };

  const increaseQuantity = (
    orderProduct: OrderProduct,
    quantity: number = 1
  ) => {
    const newOrderProducts = orderProducts.map((op) => {
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

    setOrderProducts(newOrderProducts);
  };

  const decreaseQuantity = (orderProduct: OrderProduct) => {
    if (orderProduct.quantity === 1) {
      removeProduct(orderProduct);
      return;
    }

    const newOrderProducts = orderProducts.map((op) => {
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

    setOrderProducts(newOrderProducts);
  };

  return (
    <OrderBagContext.Provider
      value={{
        orderProducts,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
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
