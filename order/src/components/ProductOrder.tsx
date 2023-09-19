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
import { numberToCurrency } from "../utilities";
import { useAddProductToOrderBag } from "../hooks/useAddProductToOrderBag";

export type ProductOrderProps = {
  product: Product;
  onProductAddedToOrderBag?: () => void;
};

export const ProductOrder = ({
  product,
  onProductAddedToOrderBag,
}: ProductOrderProps) => {
  const theme = useTheme();
  const {
    description,
    setDescription,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addProductToOrderBag,
    totalPrice,
  } = useAddProductToOrderBag(product);

  const handleAddProductToOrderBag = () => {
    addProductToOrderBag();
    if (onProductAddedToOrderBag) onProductAddedToOrderBag();
  };

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
          {numberToCurrency(product.price)}
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
        <Text>{quantity}</Text>
        <IconButton icon="plus" onPress={increaseQuantity} />
        <Button
          style={{ flex: 1 }}
          mode="contained"
          onPress={handleAddProductToOrderBag}
        >
          Adicionar - {numberToCurrency(totalPrice)}
        </Button>
      </View>
    </ScrollView>
  );
};
