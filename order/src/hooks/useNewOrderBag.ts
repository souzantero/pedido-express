import { useState } from "react"
import { Product } from "@self/domain"
import { OrderBag, OrderProductBag } from "../context"

export function useNewOrderBag(): OrderBag {
  const [orderProducts, setOrderProducts] = useState<OrderProductBag[]>([])

  const addProduct = (product: Product, quantity: number, observation?: string) => {
    const orderProductBag: OrderProductBag = {
      productId: product.id,
      quantity,
      observation,
    }

    setOrderProducts([...orderProducts, orderProductBag])
  }

  const removeProduct = (product: Product) => {
    setOrderProducts(orderProducts.filter((p) => p.productId !== product.id))
  }

  return {
    orderProducts,
    addProduct,
    removeProduct,
  }
}
