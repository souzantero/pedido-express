import { useMemo, useState } from "react"
import { Product } from "@self/domain"
import { OrderBag, OrderProductBag } from "../context"

export function useNewOrderBag(): OrderBag {
  const [orderProducts, setOrderProducts] = useState<OrderProductBag[]>([])
  const totalPrice = useMemo(() => orderProducts.reduce((acc, orderProduct) => {
    const { product, quantity } = orderProduct
    return acc + product.price * quantity
  }, 0), [orderProducts])

  const addProduct = (product: Product, quantity: number, observation?: string) => {
    const orderProductBag: OrderProductBag = {
      product,
      quantity,
      observation,
    }

    setOrderProducts([...orderProducts, orderProductBag])
  }

  const removeProduct = (product: Product) => {
    setOrderProducts(orderProducts.filter((p) => p.product.id !== product.id))
  }

  return {
    orderProducts,
    addProduct,
    removeProduct,
    totalPrice
  }
}
