import { OrderStatus } from "@pedido-express/core";

export const getOrderStatusDisplay = (orderStatus: OrderStatus) => ({
  [OrderStatus.Pending]: "Pendente",
  [OrderStatus.Preparing]: "Preparando",
  [OrderStatus.Ready]: "Pronto",
  [OrderStatus.Delivered]: "Entregue",
  [OrderStatus.Canceled]: "Cancelado",
})[orderStatus]