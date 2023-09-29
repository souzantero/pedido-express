import { useEffect, useState } from "react";
import { ProductCategory } from "@pedido-express/core";
import { useService } from "../context";

export const useProductCategories = () => {
  const service = useService();
  const [productCategories, setProductCategories] = useState<ProductCategory[]>();
  const [isLoadingProductCategories, setIsLoadingProductCategories] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingProductCategories(true);
    service.productCategory.findAll()
      .then(productCategories => setProductCategories(productCategories))
      .finally(() => setIsLoadingProductCategories(false));
  }, []);

  return {
    productCategories,
    isLoadingProductCategories
  }
}