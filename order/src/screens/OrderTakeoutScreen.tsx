import { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useOrderBag } from "../context";

export type OrderTakeoutScreenProps = {
  navigation: any;
};

export const OrderTakeoutScreen: FC<OrderTakeoutScreenProps> = ({
  navigation,
}) => {
  const orderBag = useOrderBag();

  const onEatHerePress = () => {
    orderBag.setIsTakeout(false);
    goToOrderCustomerName();
  };

  const onTakeoutPress = () => {
    orderBag.setIsTakeout(true);
    goToOrderCustomerName();
  };

  const goToOrderCustomerName = () => {
    navigation.navigate("OrderCustomerName");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Button
        style={{
          minWidth: 200,
        }}
        icon="food-fork-drink"
        mode="contained"
        onPress={onEatHerePress}
      >
        Comer Aqui
      </Button>
      <View style={{ height: 16 }} />
      <Button
        style={{
          minWidth: 200,
        }}
        icon="car"
        mode="contained"
        onPress={onTakeoutPress}
      >
        Para Viagem
      </Button>
    </View>
  );
};
