import { FC } from "react";
import { Navigation } from "../adapter";
import { FlatList, View } from "react-native";

export type OrderListScreenProps = {
  navigation: any;
};

export const OrderListScreen: FC<OrderListScreenProps> = (props) => {
  const navigation = new Navigation(props.navigation);

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={[]} renderItem={({ item, index }) => <View />} />
    </View>
  );
};
