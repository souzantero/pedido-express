import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { OrderProduct, OrderProducts, Product } from "@pedido-express/core";

export type OrderBag = {
  orderProducts: OrderProducts;
  addProduct: (
    product: Product,
    quantity: number,
    observation?: string
  ) => void;
  removeProduct: (orderProduct: OrderProduct) => void;
  increaseQuantity: (orderProduct: OrderProduct) => void;
  decreaseQuantity: (orderProduct: OrderProduct) => void;
  isTakeAway: boolean;
  setIsTakeAway: (isTakeAway: boolean) => void;
  customerName?: string;
  setCustomerName: (customerName: string) => void;
  clear: () => void;
};

const OrderBagContext = createContext<OrderBag>({
  orderProducts: new OrderProducts([]),
  isTakeAway: false,
  customerName: undefined,
  addProduct: () => {},
  removeProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  setIsTakeAway: () => {},
  setCustomerName: () => {},
  clear: () => {},
});

export const OrderBagProvider: FC<PropsWithChildren> = ({ children }) => {
  const [customerName, setCustomerName] = useState<string>();
  const [isTakeAway, setIsTakeAway] = useState<boolean>(false);
  const [orderProducts, setOrderProducts] = useState<OrderProducts>(
    new OrderProducts([])
  );

  const addProduct = (
    product: Product,
    quantity: number,
    observation?: string
  ) => {
    const orderProduct = new OrderProduct(product, quantity, observation);

    const existingOrderProduct = orderProducts.find(
      (op) => op.key === orderProduct.key
    );

    if (existingOrderProduct) {
      increaseQuantity(existingOrderProduct, orderProduct.quantity);
      return;
    }

    setOrderProducts(new OrderProducts([...orderProducts, orderProduct]));
  };

  const removeProduct = (orderProduct: OrderProduct) => {
    setOrderProducts(
      new OrderProducts(
        orderProducts.filter((op) => op.key !== orderProduct.key)
      )
    );
  };

  const increaseQuantity = (
    orderProduct: OrderProduct,
    quantity: number = 1
  ) => {
    const newOrderProducts = orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProduct(
          op.product,
          op.quantity + quantity,
          op.observation
        );
      }
      return op;
    });

    setOrderProducts(new OrderProducts(newOrderProducts));
  };

  const decreaseQuantity = (orderProduct: OrderProduct) => {
    if (orderProduct.quantity === 1) {
      removeProduct(orderProduct);
      return;
    }

    const newOrderProducts = orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProduct(op.product, op.quantity - 1, op.observation);
      }
      return op;
    });

    setOrderProducts(new OrderProducts(newOrderProducts));
  };

  const clear = () => {
    setOrderProducts(new OrderProducts([]));
    setIsTakeAway(false);
    setCustomerName(undefined);
  };

  const orderBag = useMemo<OrderBag>(
    () => ({
      orderProducts,
      isTakeAway,
      customerName,
      addProduct,
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
      setIsTakeAway,
      setCustomerName,
      clear,
    }),
    [orderProducts, isTakeAway, customerName]
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
