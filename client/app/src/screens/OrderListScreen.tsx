import { FC, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { useDayOrders } from "../hooks";
import { Centralized, Loading } from "../components";

export type OrderListScreenProps = {
  route: RouteProp<any, any>;
  navigation: any;
};

export const OrderListScreen: FC<OrderListScreenProps> = (props) => {
  const orderStatus = props.route.params?.orderStatus;
  const { orders, isLoadingOrders } = useDayOrders();
  const ordersByStatus = useMemo(
    () => orders?.filter((order) => order.status === orderStatus),
    [orders, orderStatus]
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
        renderItem={({ item }) => <Text>{item.code}</Text>}
      />
    </View>
  );
};
