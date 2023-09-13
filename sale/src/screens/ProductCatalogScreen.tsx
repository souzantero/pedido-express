import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useProductCategories, useProducts } from "../hooks";
import { ProductList } from "../components";
import { useMemo } from "react";

const Tab = createMaterialTopTabNavigator();

export const ProductCatalogScreen = () => {
  const { productCategories, isLoadingProductCategories } =
    useProductCategories();

  if (isLoadingProductCategories) return <Text>Loading...</Text>;
  if (!productCategories) return <Text>Product categories not found</Text>;
  return (
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
  );
};

type ProductListScreenProps = {
  route: RouteProp<any, any>;
};

const ProductListScreen = ({ route }: ProductListScreenProps) => {
  const productCategoryId = route.params?.productCategoryId as string;
  const { products } = useProducts();
  const categoryProducts = useMemo(
    () =>
      products?.filter((product) => product.categoryId === productCategoryId),
    [products, productCategoryId]
  );

  return <ProductList products={categoryProducts ?? []} />;
};
