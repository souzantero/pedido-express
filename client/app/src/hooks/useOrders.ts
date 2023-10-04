import { useEffect, useState } from "react"
import { Order } from "@pedido-express/core"
import { useService } from "../context"

export const usePendingOrders = () => {
  const service = useService()
  const [orders, setOrders] = useState<Order[]>()
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  useEffect(() => {
    setIsLoadingOrders(true)
    service
      .order
      .findAllPendingOrders()
      .then(setOrders)
      .finally(() => setIsLoadingOrders(false))
  }, [])

  return {
    orders,
    isLoadingOrders
  }
}