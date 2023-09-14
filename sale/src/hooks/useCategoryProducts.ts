import { useMemo } from "react";
import { useProducts } from "./useProducts";

export const useCategoryProducts = (productCategoryId: string) => {
  const { products, isLoadingProducts } = useProducts();
  const categoryProducts = useMemo(
    () =>
      products?.filter((product) => product.categoryId === productCategoryId),
    [products, productCategoryId]
  );

  return { categoryProducts, isLoadingProducts };
};