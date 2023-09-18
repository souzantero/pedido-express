import { FC } from "react";
import { Text } from "react-native-paper";
import { OrderBagBanner, ProductDetail } from "../components";
import { useProductById } from "../hooks";

interface ProductDetailScreenProps {
  route: any;
}

export const ProductDetailScreen: FC<ProductDetailScreenProps> = ({
  route,
}) => {
  const { productId } = route.params;
  const { product, isLoadingProduct } = useProductById(productId);

  if (isLoadingProduct) return <Text>Loading...</Text>;
  if (!product) return <Text>Product not found</Text>;
  return (
    <OrderBagBanner>
      <ProductDetail product={product} />
    </OrderBagBanner>
  );
};
