import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Product } from "@self/domain";
import { numberToCurrency } from "../utilities";

export type ProductListProps = {
  products: Product[];
  onProductPress?: (product: Product) => void;
};

export const ProductList = ({ products, onProductPress }: ProductListProps) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          const margin = 12;
          const marginBottom = index === products.length - 1 ? margin : 0;
          return (
            <View
              style={{
                marginBottom,
                marginTop: margin,
                marginLeft: margin,
                marginRight: margin,
              }}
            >
              <ProductItem
                product={item}
                onPress={() => {
                  if (onProductPress) onProductPress(item);
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export type ProductItemProps = {
  product: Product;
  onPress?: () => void;
};

export const ProductItem = ({ product, onPress }: ProductItemProps) => {
  return (
    <Card onPress={onPress}>
      <Card.Cover
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        source={{ uri: product.displayImageSource }}
      />
      <Card.Title title={product.name} subtitle={product.description} />
      <Card.Content>
        <View>
          <Text style={{ fontWeight: "bold" }} variant="titleLarge">
            {numberToCurrency(product.price)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
