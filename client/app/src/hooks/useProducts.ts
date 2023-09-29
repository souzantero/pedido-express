import { useEffect, useState } from "react"
import { Product } from "@pedido-express/core"
import { useService } from "../context"

export const useProducts = () => {
  const service = useService()
  const [products, setProducts] = useState<Product[]>()
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  useEffect(() => {
    setIsLoadingProducts(true)
    service
      .product
      .findAll()
      .then(setProducts)
      .finally(() => setIsLoadingProducts(false))
  }, [])

  return {
    products,
    isLoadingProducts
  }
}