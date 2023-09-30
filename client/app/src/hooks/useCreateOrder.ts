import { useState } from "react";
import { useOrderBag, useService } from "../context";
import { Order } from "@pedido-express/core";

export function useCreateOrder() {
  const service = useService();
  const orderBag = useOrderBag();
  const [createdOrder, serCreatedOrder] = useState<Order>();
  const [isCreating, setIsCreating] = useState(false);

  const createOrder = () => {
    setIsCreating(true);
    service
      .order
      .create({
        isTakeAway: orderBag.isTakeAway,
        customerName: orderBag.customerName!,
        orderProducts: orderBag.orderProducts.map(orderProduct => ({
          productId: orderProduct.product.id,
          quantity: orderProduct.quantity,
          observation: orderProduct.observation
        }))
      })
      .then((order) => {
        orderBag.clear();
        serCreatedOrder(order);
      })
      .finally(() => setIsCreating(false));
  }

  return {
    createdOrder,
    isCreating,
    createOrder
  }
}