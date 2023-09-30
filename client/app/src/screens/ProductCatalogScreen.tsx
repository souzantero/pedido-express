import { FC } from "react";
import { Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Product } from "@pedido-express/core";
import { useCategoryProducts, useProductCategories } from "../hooks";
import {
  Centralized,
  Loading,
  OrderBagBanner,
  ProductList,
} from "../components";

const Tab = createMaterialTopTabNavigator();

export type ProductCatalogScreenProps = {
  navigation: any;
};

export const ProductCatalogScreen: FC<ProductCatalogScreenProps> = ({
  navigation,
}) => {
  const { productCategories, isLoadingProductCategories } =
    useProductCategories();

  const onOrderBagPress = () => {
    navigation.navigate("OrderBag");
  };

  if (isLoadingProductCategories)
    return (
      <Centralized>
        <Loading />
      </Centralized>
    );

  if (!productCategories)
    return (
      <Centralized>
        <Text variant="titleLarge">Produtos não encontrados</Text>
      </Centralized>
    );

  return (
    <OrderBagBanner onOrderBagPress={onOrderBagPress}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
        }}
      >
        {productCategories?.map((productCategory) => (
          <Tab.Screen
            name={productCategory.name}
            key={productCategory.id}
            initialParams={{ productCategoryId: productCategory.id }}
            component={ProductListScreen}
          />
        ))}
      </Tab.Navigator>
    </OrderBagBanner>
  );
};

type ProductListScreenProps = {
  route: RouteProp<any, any>;
  navigation: any;
};

const ProductListScreen = ({ route, navigation }: ProductListScreenProps) => {
  const productCategoryId = route.params?.productCategoryId as string;
  const { categoryProducts } = useCategoryProducts(productCategoryId);

  const onProductPress = (product: Product) => {
    navigation.navigate("ProductOrder", { productId: product.id });
  };

  return (
    <ProductList
      products={categoryProducts ?? []}
      onProductPress={onProductPress}
    />
  );
};
