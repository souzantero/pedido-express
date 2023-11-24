import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OrderStatus } from "@pedido-express/core";
import { OrderListScreen } from "./OrderListScreen";
import { DayOrdersProvider } from "../context";
import { RefreshDayOrdersButton } from "../components";
import { OrderScreen } from "./OrderScreen";
import { getOrderStatusDisplay } from "../utilities";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const OrderBoardStackNavigator: FC = () => {
  return (
    <DayOrdersProvider>
      <Stack.Navigator initialRouteName="OrderBoard">
        <Stack.Screen
          name="OrderBoard"
          options={{
            title: "Pedidos do dia",
            headerRight: () => <RefreshDayOrdersButton />,
          }}
          component={OrderBoard}
        />
        <Stack.Screen
          name="Order"
          options={{
            title: "Pedido",
          }}
          component={OrderScreen}
        />
      </Stack.Navigator>
    </DayOrdersProvider>
  );
};

export const OrderBoard: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
    >
      {Object.values(OrderStatus).map((orderStatus) => (
        <Tab.Screen
          name={getOrderStatusDisplay(orderStatus)}
          key={orderStatus}
          initialParams={{ orderStatus }}
          component={OrderListScreen}
        />
      ))}
    </Tab.Navigator>
  );
};
