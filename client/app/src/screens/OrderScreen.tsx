import { FC } from "react";
import { Image, ScrollView, View } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { OrderStatus } from "@pedido-express/core";
import { getOrderStatusDisplay } from "../utilities";
import { useOrder } from "../hooks";

export type OrderScreenProps = {
  route: any;
};

export const OrderScreen: FC<OrderScreenProps> = ({ route }) => {
  const theme = useTheme();
  const { orderId } = route.params;
  const { order, changeOrderStatus, isChangingOrderStatus } = useOrder(orderId);

  if (!order) {
    return null;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 16,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {order.code}
          </Text>
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: theme.fonts.bodySmall.fontSize,
            }}
          >
            {getOrderStatusDisplay(order.status)}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ padding: 16 }}>
        {order.orderProducts.map((orderProduct) => (
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
      <View
        style={{
          padding: 16,
        }}
      >
        <Button mode="contained" onPress={() => {}}>
          Iniciar preparo
        </Button>
        <View style={{ height: 16 }} />
        {order.canBeCanceled && (
          <Button
            onPress={() => changeOrderStatus(OrderStatus.Canceled)}
            loading={isChangingOrderStatus}
            disabled={!order.canBeCanceled}
          >
            Cancelar pedido
          </Button>
        )}
      </View>
    </ScrollView>
  );
};
