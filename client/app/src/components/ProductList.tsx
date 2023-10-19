import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Product } from "@pedido-express/core";
import { numberToCurrency } from "../utilities";
import { ListItem } from "./ListItem";

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
          return (
            <ListItem index={index} length={products.length}>
              <ProductItem
                product={item}
                onPress={() => {
                  if (onProductPress) onProductPress(item);
                }}
              />
            </ListItem>
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
        source={{ uri: product.imageSource }}
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
