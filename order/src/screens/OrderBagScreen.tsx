import { FC } from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import { useOrderBag } from "../context";
import { numberToCurrency } from "../utilities";

export const OrderBagScreen: FC = () => {
  const theme = useTheme();
  const orderBag = useOrderBag();

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 16 }}>
        {orderBag.orderProducts.map((orderProductBag) => (
          <View
            key={orderProductBag.key}
            style={{
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                }}
                source={{ uri: orderProductBag.product.displayImageSource }}
              />
              <View
                style={{
                  marginLeft: 16,
                  flex: 2,
                }}
              >
                <Text>{orderProductBag.product.name}</Text>
                {orderProductBag.observation && (
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: theme.fonts.bodySmall.fontSize,
                    }}
                  >
                    Obs: {orderProductBag.observation}
                  </Text>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {numberToCurrency(orderProductBag.totalPrice)}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon={orderProductBag.quantity > 1 ? "minus" : "delete"}
                  onPress={() => orderBag.decreaseQuantity(orderProductBag)}
                />
                <Text>{orderProductBag.quantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => orderBag.increaseQuantity(orderProductBag)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      <Divider />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Total</Text>
        <Text>{numberToCurrency(orderBag.totalPrice)}</Text>
      </View>
      <View
        style={{
          padding: 16,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {}}
          disabled={orderBag.orderProducts.length === 0}
        >
          Finalizar pedido
        </Button>
      </View>
    </ScrollView>
  );
};
