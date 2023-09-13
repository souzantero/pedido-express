import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Product } from "@self/domain";
import { numberToMoney } from "../utilities";

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
                marginBottom: index === products.length - 1 ? 12 : 0,
                marginTop: 12,
                marginLeft: 12,
                marginRight: 12,
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
    <Card style={{ backgroundColor: "white", borderRadius: 0 }}>
      <Card.Cover
        style={{ borderRadius: 0 }}
        source={{ uri: product.displayImageSource }}
      />
      <Card.Title title={product.name} subtitle={product.description} />
      <Card.Content>
        <View>
          <Text style={{ fontWeight: "bold" }} variant="titleLarge">
            {numberToMoney(product.price)}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button>Adicionar</Button>
      </Card.Actions>
    </Card>
  );
};
