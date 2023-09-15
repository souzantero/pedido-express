import React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { Button, Title, Card, Paragraph } from "react-native-paper";
import { Product } from "@self/domain";
import { numberToMoney } from "../utilities";

export type ProductDetailProps = {
  product: Product;
};
export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.displayImageSource }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Title>{product.name}</Title>
        <Paragraph>{numberToMoney(product.price)}</Paragraph>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Descrição</Title>
          <Paragraph>{product.description}</Paragraph>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => console.log("Order Pressed")}
        style={styles.orderButton}
      >
        Adicionar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  card: {
    margin: 16,
  },
  orderButton: {
    margin: 16,
  },
});
