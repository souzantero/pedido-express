import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderListTabNavigator } from "./OrderListScreen";

const Stack = createStackNavigator();

export const OrderListStackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="OrderList">
      <Stack.Screen
        name="OrderList"
        options={{
          title: "Pedidos",
        }}
        component={OrderListTabNavigator}
      />
    </Stack.Navigator>
  );
};
