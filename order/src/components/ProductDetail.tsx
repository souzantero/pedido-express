import React from "react";
import { View, ScrollView, Image } from "react-native";
import {
  Button,
  Title,
  Text,
  Paragraph,
  useTheme,
  Divider,
  TextInput,
  IconButton,
} from "react-native-paper";
import { Product } from "@self/domain";
import { numberToMoney } from "../utilities";
import { useAddProductToOrderBag } from "../hooks/useAddProductToOrderBag";

export type ProductDetailProps = {
  product: Product;
};
export const ProductDetail = ({ product }: ProductDetailProps) => {
  const theme = useTheme();
  const {
    description,
    setDescription,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addProductToOrderBag,
  } = useAddProductToOrderBag(product);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 200,
        }}
        source={{ uri: product.displayImageSource }}
      />
      <View
        style={{
          padding: 16,
        }}
      >
        <Title
          style={{
            fontWeight: "bold",
          }}
        >
          {product.name}
        </Title>
        <Text style={{ color: theme.colors.secondary }}>
          {product.description}
        </Text>
        <Paragraph
          style={{
            marginTop: 16,
            color: theme.colors.secondary,
          }}
        >
          {numberToMoney(product.price)}
        </Paragraph>
      </View>
      <Divider />
      <View
        style={{
          padding: 16,
        }}
      >
        <Text style={{ fontWeight: "bold", color: theme.colors.secondary }}>
          Alguma observação?
        </Text>
        <TextInput
          style={{
            marginTop: 8,
          }}
          mode="outlined"
          maxLength={140}
          placeholder="Ex. Tirar a cebola, maionese à parte, etc."
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Divider />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: 16,
        }}
      >
        <IconButton icon="minus" onPress={decreaseQuantity} />
        <Text style={{ marginHorizontal: 16 }}>{quantity}</Text>
        <IconButton icon="plus" onPress={increaseQuantity} />
        <Button
          style={{
            flex: 1,
          }}
          mode="contained"
          onPress={() => addProductToOrderBag()}
        >
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
};
