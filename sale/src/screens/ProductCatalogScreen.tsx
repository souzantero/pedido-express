import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Product } from "@self/domain";
import { useProductCategories } from "../hooks";
import { ProductList } from "../components/ProductList";

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
          initialParams={{ products: productCategory.products }}
          component={ProductListScreen}
        />
      ))}
    </Tab.Navigator>
  );
};

type ProductListScreenProps = {
  route: RouteProp<
    {
      products?: Product[];
    },
    any
  >;
};

const ProductListScreen = ({ route }: ProductListScreenProps) => {
  const products = route.params?.products ?? [];
  return <ProductList products={products} />;
};
