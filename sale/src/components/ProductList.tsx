import { FlatList, Text, View } from "react-native";
import { Product } from "@self/domain";

export type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};
