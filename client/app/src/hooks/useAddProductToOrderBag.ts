import { useMemo, useState } from "react";
import { Product } from "@pedido-express/core";
import { useOrderBag } from "../context";

export function useAddProductToOrderBag(product: Product) {
  const orderBag = useOrderBag();
  const [description, setDescription] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  const totalPrice = useMemo(() => product.price * quantity, [product, quantity])

  const addProductToOrderBag = () => {
    orderBag.addProduct(product, quantity, description);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return {
    description,
    setDescription,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addProductToOrderBag,
    totalPrice,
  }
}