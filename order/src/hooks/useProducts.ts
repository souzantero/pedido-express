import { useEffect, useState } from "react"
import { Product } from "@self/domain"
import { useRepository } from "../context"

export const useProducts = () => {
  const repository = useRepository()
  const [products, setProducts] = useState<Product[]>()
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  useEffect(() => {
    setIsLoadingProducts(true)
    repository
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