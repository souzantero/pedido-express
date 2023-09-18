import { useContext } from "react"
import { OrderBag, OrderBagContext } from "../context"

export function useOrderBag(): OrderBag {
  return useContext<OrderBag>(OrderBagContext)
}
