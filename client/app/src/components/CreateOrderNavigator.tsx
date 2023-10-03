import { FC } from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderBagProvider } from "../context";
import {
  CreateOrderScreen,
  OrderBagScreen,
  OrderCustomerNameScreen,
  OrderTakeAwayScreen,
  ProductCatalogScreen,
  ProductOrderScreen,
} from "../screens";
import { CleanOrderBagButton } from "./CleanOrderBagButton";
import { Navigation } from "../adapter";

const Stack = createStackNavigator();

export type CreateOrderNavigatorProps = {
  theme: Theme;
};

export const CreateOrderNavigator: FC<CreateOrderNavigatorProps> = ({
  theme,
}) => {
  return (
    <OrderBagProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="ProductCatalog">
          <Stack.Screen
            name="ProductCatalog"
            options={{
              title: "Bob's",
            }}
            component={ProductCatalogScreen}
          />
          <Stack.Screen
            name="ProductOrder"
            options={{
              title: "Pedido do Produto",
            }}
            component={ProductOrderScreen}
          />
          <Stack.Screen
            name="OrderBag"
            options={({ navigation }) => ({
              title: "Sacola",
              headerRight: () => (
                <CleanOrderBagButton navigation={new Navigation(navigation)} />
              ),
            })}
            component={OrderBagScreen}
          />
          <Stack.Screen
            name="OrderTakeAway"
            options={({ navigation }) => ({
              title: "Retirada",
              headerRight: () => (
                <CleanOrderBagButton navigation={new Navigation(navigation)} />
              ),
            })}
            component={OrderTakeAwayScreen}
          />
          <Stack.Screen
            name="OrderCustomerName"
            options={({ navigation }) => ({
              title: "Nome do Cliente",
              headerRight: () => (
                <CleanOrderBagButton navigation={new Navigation(navigation)} />
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
      </NavigationContainer>
    </OrderBagProvider>
  );
};
