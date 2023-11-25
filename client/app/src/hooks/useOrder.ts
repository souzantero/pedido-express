import { useEffect, useMemo, useState } from "react";
import { useDayOrders, useService } from "../context";
import { Order, OrderStatus } from "@pedido-express/core";

export function useOrder(orderId: string) {
  const service = useService();
  const [order, setOrder] = useState<Order>();

  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [isChangingOrderStatus, setIsChangingOrderStatus] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [orderId])

  const loadOrder = () => {
    setIsLoadingOrder(true);
    service
      .order
      .findById(orderId)
      .then(setOrder)
      .finally(() => {
        setIsLoadingOrder(false);
      });
  }

  const changeOrderStatus = (orderStatus: OrderStatus) => {
    setIsChangingOrderStatus(true);
    service
      .order
      .changeStatus(orderId, orderStatus)
      .then(() => loadOrder())
      .finally(() => {
        setIsChangingOrderStatus(false);
      });
  }

  return { order, isLoadingOrder, changeOrderStatus, isChangingOrderStatus };
}