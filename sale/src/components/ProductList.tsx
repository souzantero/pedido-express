import { FlatList, View } from "react-native";
import { Card } from "react-native-paper";
import { Product } from "@self/domain";

export type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginBottom: index === 0 ? 0 : 16,
                marginTop: 16,
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <ProductItem product={item} />
            </View>
          );
        }}
      />
    </View>
  );
};

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card>
      <Card.Title title={product.name} subtitle={product.description} />
    </Card>
  );
};
