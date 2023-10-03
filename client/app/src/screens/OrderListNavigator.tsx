import { FC } from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderListScreen } from "./OrderListScreen";

const Stack = createStackNavigator();

export type OrderListNavigatorProps = {
  theme: Theme;
};

export const OrderListNavigator: FC<OrderListNavigatorProps> = ({ theme }) => {
  
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="OrderList">
        <Stack.Screen
          name="OrderList"
          options={{
            title: "Pedidos",
          }}
          component={OrderListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
