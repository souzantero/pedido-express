import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OrderStatus } from "@pedido-express/core";
import { OrderListScreen } from "./OrderListScreen";
import { DayOrdersProvider } from "../context";
import { RefreshDayOrdersButton } from "../components";

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
      </Stack.Navigator>
    </DayOrdersProvider>
  );
};

export const OrderBoard: FC = () => {
  const orderStatusDisplay = {
    [OrderStatus.Pending]: "Pendentes",
    [OrderStatus.Preparing]: "Preparando",
    [OrderStatus.Ready]: "Prontos",
    [OrderStatus.Delivered]: "Entregues",
    [OrderStatus.Canceled]: "Cancelados",
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
    >
      {Object.values(OrderStatus).map((orderStatus) => (
        <Tab.Screen
          name={orderStatusDisplay[orderStatus]}
          key={orderStatus}
          initialParams={{ orderStatus }}
          component={OrderListScreen}
        />
      ))}
    </Tab.Navigator>
  );
};
