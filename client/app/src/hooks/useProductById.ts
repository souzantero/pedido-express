import { useMemo } from "react"
import { useProducts } from "./useProducts"

export const useProductById = (productId: string) => {
  const { products, isLoadingProducts } = useProducts()
  const product = useMemo(() => products?.find((product) => product.id === productId), [
    productId,
    products
  ])

  return { product, isLoadingProduct: isLoadingProducts }
}