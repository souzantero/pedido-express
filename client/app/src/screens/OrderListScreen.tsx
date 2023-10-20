import { FC } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { Order } from "@pedido-express/core";
import { useDayOrders } from "../context";
import { Centralized, ListItem, Loading } from "../components";
import { Navigation } from "../adapter";

export type OrderListScreenProps = {
  route: RouteProp<any, any>;
  navigation: any;
};

export const OrderListScreen: FC<OrderListScreenProps> = (props) => {
  const navigation = new Navigation(props.navigation);
  const orderStatus = props.route.params?.orderStatus;
  const { orders, isLoadingOrders } = useDayOrders();
  const ordersByStatus = orders?.filter(
    (order) => order.status === orderStatus
  );

  const onOrderPress = (order: Order) => {
    navigation.navigate("Order", { orderId: order.id });
  };

  if (isLoadingOrders)
    return (
      <Centralized>
        <Loading />
      </Centralized>
    );

  if (!orders)
    return (
      <Centralized>
        <Text variant="titleMedium">Pedidos não encontrados</Text>
      </Centralized>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ordersByStatus ?? []}
        renderItem={({ item }) => (
          <ListItem index={0} length={ordersByStatus?.length ?? 0}>
            <Card onPress={() => onOrderPress(item)}>
              <Card.Title
                title={item.code}
                subtitle={item.orderProducts
                  .map((orderProduct) => orderProduct.product.name)
                  .join(", ")}
              />
            </Card>
          </ListItem>
        )}
      />
    </View>
  );
};
