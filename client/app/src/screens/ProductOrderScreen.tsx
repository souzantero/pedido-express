import { FC } from "react";
import { Text } from "react-native-paper";
import { Centralized, Loading, ProductOrder } from "../components";
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

  if (isLoadingProduct)
    return (
      <Centralized>
        <Loading />
      </Centralized>
    );

  if (!product)
    return (
      <Centralized>
        <Text>Produto não encontrado</Text>
      </Centralized>
    );

  return (
    <ProductOrder
      product={product}
      onProductAddedToOrderBag={onProductAddedToOrderBag}
    />
  );
};
