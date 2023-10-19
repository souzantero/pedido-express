import { FC } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { useDayOrders } from "../context";
import { Centralized, ListItem, Loading } from "../components";

export type OrderListScreenProps = {
  route: RouteProp<any, any>;
  navigation: any;
};

export const OrderListScreen: FC<OrderListScreenProps> = (props) => {
  const orderStatus = props.route.params?.orderStatus;
  const { orders, isLoadingOrders } = useDayOrders();
  const ordersByStatus = orders?.filter(
    (order) => order.status === orderStatus
  );

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
            <Card>
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
