import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderBagProvider } from "../context";
import {
  CreateOrderScreen,
  OrderBagScreen,
  OrderCustomerNameScreen,
  OrderTakeAwayScreen,
  ProductCatalogScreen,
  ProductOrderScreen,
  StartOrderScreen,
} from ".";
import { CancelOrderButton } from "../components";
import { Navigation } from "../adapter";

const Stack = createStackNavigator();

export const OrderFlowStackNavigator: FC = () => {
  return (
    <OrderBagProvider>
      <Stack.Navigator initialRouteName="StartOrder">
        <Stack.Screen
          name="StartOrder"
          options={{
            title: "Iniciar Pedido",
          }}
          component={StartOrderScreen}
        />
        <Stack.Screen
          name="ProductCatalog"
          options={({ navigation }) => ({
            title: "Produtos",
            headerLeft: () => null,
            headerRight: () => (
              <CancelOrderButton navigation={new Navigation(navigation)} />
            ),
          })}
          component={ProductCatalogScreen}
        />
        <Stack.Screen
          name="ProductOrder"
          options={({ navigation }) => ({
            title: "Pedir Produto",
            headerRight: () => (
              <CancelOrderButton navigation={new Navigation(navigation)} />
            ),
          })}
          component={ProductOrderScreen}
        />
        <Stack.Screen
          name="OrderBag"
          options={({ navigation }) => ({
            title: "Sacola",
            headerRight: () => (
              <CancelOrderButton navigation={new Navigation(navigation)} />
            ),
          })}
          component={OrderBagScreen}
        />
        <Stack.Screen
          name="OrderTakeAway"
          options={({ navigation }) => ({
            title: "Retirada",
            headerRight: () => (
              <CancelOrderButton navigation={new Navigation(navigation)} />
            ),
          })}
          component={OrderTakeAwayScreen}
        />
        <Stack.Screen
          name="OrderCustomerName"
          options={({ navigation }) => ({
            title: "Nome do Cliente",
            headerRight: () => (
              <CancelOrderButton navigation={new Navigation(navigation)} />
            ),
          })}
          component={OrderCustomerNameScreen}
        />
        <Stack.Screen
          name="CreateOrder"
          options={{
            title: "Pedido",
            headerLeft: () => null,
          }}
          component={CreateOrderScreen}
        />
      </Stack.Navigator>
    </OrderBagProvider>
  );
};
