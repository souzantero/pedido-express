import { FC, useMemo } from "react";
import { Image, ScrollView, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import { useDayOrders } from "../context";

export type OrderScreenProps = {
  route: any;
};

export const OrderScreen: FC<OrderScreenProps> = ({ route }) => {
  const theme = useTheme();
  const { orderId } = route.params;
  const { orders } = useDayOrders();
  const order = useMemo(() => {
    return orders?.find((order) => order.id === orderId);
  }, [orders, orderId]);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 16 }}>
        {order?.orderProducts.map((orderProduct) => (
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
                source={{ uri: orderProduct.product.imageSource }}
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
                  {orderProduct.quantity} x{" "}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Divider />
    </ScrollView>
  );
};
