import { useEffect, useState } from "react"
import { Order } from "@pedido-express/core"
import { useService } from "../context"

export const useDayOrders = () => {
  const service = useService()
  const [orders, setOrders] = useState<Order[]>()
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  useEffect(() => {
    setIsLoadingOrders(true)
    service
      .order
      .findDayOrders()
      .then(setOrders)
      .finally(() => setIsLoadingOrders(false))
  }, [])

  return {
    orders,
    isLoadingOrders
  }
}