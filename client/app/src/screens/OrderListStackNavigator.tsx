import { FC } from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderListTabNavigator } from "./OrderListScreen";

const Stack = createStackNavigator();

export type OrderListStackNavigatorProps = {
  theme: Theme;
};

export const OrderListStackNavigator: FC<OrderListStackNavigatorProps> = ({
  theme,
}) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="OrderList">
        <Stack.Screen
          name="OrderList"
          options={{
            title: "Pedidos",
          }}
          component={OrderListTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
