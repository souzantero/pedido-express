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
    return `${this.product.id}-${this.observation}`;
  }
}

export type OrderBag = {
  orderProducts: OrderProductBag[];
  addProduct: (orderProduct: OrderProductBag) => void;
  removeProduct: (orderProduct: OrderProductBag) => void;
  increaseQuantity: (orderProduct: OrderProductBag) => void;
  decreaseQuantity: (orderProduct: OrderProductBag) => void;
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
  const [orderProducts, setOrderProducts] = useState<OrderProductBag[]>([]);
  const totalPrice = useMemo(
    () =>
      orderProducts.reduce((acc, orderProduct) => {
        return acc + orderProduct.totalPrice;
      }, 0),
    [orderProducts]
  );

  const fixOrderProducts = (newOrderProducts: OrderProductBag[]) => {
    const newOrderProductsMap = new Map<string, OrderProductBag>();

    newOrderProducts.forEach((orderProduct) => {
      const key = orderProduct.key;
      const oldOrderProduct = newOrderProductsMap.get(key);

      if (oldOrderProduct) {
        newOrderProductsMap.set(
          key,
          new OrderProductBag(
            oldOrderProduct.product,
            oldOrderProduct.quantity + orderProduct.quantity,
            oldOrderProduct.observation
          )
        );
      } else {
        newOrderProductsMap.set(key, orderProduct);
      }
    });

    return Array.from(newOrderProductsMap.values());
  };

  const changeOrderProducts = (newOrderProducts: OrderProductBag[]) => {
    setOrderProducts(fixOrderProducts(newOrderProducts));
  };

  const addProduct = (orderProduct: OrderProductBag) => {
    changeOrderProducts([...orderProducts, orderProduct]);
  };

  const removeProduct = (orderProduct: OrderProductBag) => {
    changeOrderProducts(
      orderProducts.filter((op) => op.key !== orderProduct.key)
    );
  };

  const increaseQuantity = (orderProduct: OrderProductBag) => {
    const newOrderProducts = orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProductBag(op.product, op.quantity + 1, op.observation);
      }
      return op;
    });

    changeOrderProducts(newOrderProducts);
  };

  const decreaseQuantity = (orderProduct: OrderProductBag) => {
    if (orderProduct.quantity === 1) {
      removeProduct(orderProduct);
      return;
    }

    const newOrderProducts = orderProducts.map((op) => {
      if (op.key === orderProduct.key) {
        return new OrderProductBag(op.product, op.quantity - 1, op.observation);
      }
      return op;
    });

    changeOrderProducts(newOrderProducts);
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
