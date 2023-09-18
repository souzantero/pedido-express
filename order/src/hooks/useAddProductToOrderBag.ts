import { useState } from "react";
import { Product } from "@self/domain";
import { useOrderBag } from "./useOrderBag";

export function useAddProductToOrderBag(product: Product) {
  const orderBag = useOrderBag();
  const [description, setDescription] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

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
  }
}