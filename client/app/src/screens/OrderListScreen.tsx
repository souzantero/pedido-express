import { FC } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { Navigation } from "../adapter";
import { usePendingOrders } from "../hooks";
import { Centralized, Loading } from "../components";

export type OrderListScreenProps = {
  navigation: any;
};

export const OrderListScreen: FC<OrderListScreenProps> = (props) => {
  const navigation = new Navigation(props.navigation);
  const { orders, isLoadingOrders } = usePendingOrders();

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
        data={orders}
        renderItem={({ item, index }) => <Text>{item.code}</Text>}
      />
    </View>
  );
};
