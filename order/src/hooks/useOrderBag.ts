import { useState } from "react"
import { Product } from "@self/domain"
import { OrderBag, OrderProductBag } from "../context"

export function useOrderBag(): OrderBag {
  const [orderProducts, setOrderProducts] = useState<OrderProductBag[]>([
    {
      productId: "1",
      quantity: 1,
      observation: "No onions",
    },
  ])

  const addProduct = (product: Product, quantity: number, observation: string) => {
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
