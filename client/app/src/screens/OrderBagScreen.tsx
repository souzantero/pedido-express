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

export type OrderBagScreenProps = {
  navigation: any;
};

export const OrderBagScreen: FC<OrderBagScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const orderBag = useOrderBag();

  const onContinuePress = () => {
    navigation.navigate("OrderTakeout");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 16 }}>
        {orderBag.order.orderProducts.map((orderProduct) => (
          <View
            key={orderProduct.key}
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
                source={{ uri: orderProduct.product.displayImageSource }}
              />
              <View
                style={{
                  marginLeft: 16,
                  flex: 2,
                }}
              >
                <Text>{orderProduct.product.name}</Text>
                {orderProduct.observation && (
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: theme.fonts.bodySmall.fontSize,
                    }}
                  >
                    Obs: {orderProduct.observation}
                  </Text>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {numberToCurrency(orderProduct.totalPrice)}
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
                  icon={orderProduct.quantity > 1 ? "minus" : "delete"}
                  onPress={() => orderBag.decreaseQuantity(orderProduct)}
                />
                <Text>{orderProduct.quantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => orderBag.increaseQuantity(orderProduct)}
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
        <Text>{numberToCurrency(orderBag.order.totalPrice)}</Text>
      </View>
      <View
        style={{
          padding: 16,
        }}
      >
        <Button
          mode="contained"
          onPress={onContinuePress}
          disabled={orderBag.order.orderProducts.length === 0}
        >
          Continuar
        </Button>
      </View>
    </ScrollView>
  );
};
