import { FC } from "react";
import { Text } from "react-native-paper";
import { ProductDetail } from "../components";
import { useProductById } from "../hooks";

interface ProductDetailScreenProps {
  route: any;
  navigation: any;
}

export const ProductDetailScreen: FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const { product, isLoadingProduct } = useProductById(productId);

  const onProductAddedToOrderBag = () => {
    navigation.goBack();
  };

  if (isLoadingProduct) return <Text>Loading...</Text>;
  if (!product) return <Text>Product not found</Text>;
  return (
    <ProductDetail
      product={product}
      onProductAddedToOrderBag={onProductAddedToOrderBag}
    />
  );
};
