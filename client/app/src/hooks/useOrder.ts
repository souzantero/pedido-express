import { useMemo, useState } from "react";
import { useDayOrders, useService } from "../context";
import { OrderStatus } from "@pedido-express/core";

export function useOrder(orderId: string) {
  const service = useService();
  const { orders } = useDayOrders();
  const order = useMemo(() => {
    return orders?.find((order) => order.id === orderId);
  }, [orders, orderId]);

  const [isChangingOrderStatus, setIsChangingOrderStatus] = useState(false);

  const changeOrderStatus = (orderStatus: OrderStatus) => {
    setIsChangingOrderStatus(true);
    service
      .order
      .changeStatus(orderId, orderStatus)
      .finally(() => {
        setIsChangingOrderStatus(false);
      });
  }

  return { order, changeOrderStatus, isChangingOrderStatus };
}