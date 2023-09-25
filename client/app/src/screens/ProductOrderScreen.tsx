import { FC } from "react";
import { Text } from "react-native-paper";
import { ProductOrder } from "../components";
import { useProductById } from "../hooks";

interface ProductOrderScreenProps {
  route: any;
  navigation: any;
}

export const ProductOrderScreen: FC<ProductOrderScreenProps> = ({
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
    <ProductOrder
      product={product}
      onProductAddedToOrderBag={onProductAddedToOrderBag}
    />
  );
};
