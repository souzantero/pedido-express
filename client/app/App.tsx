import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { OrderBagProvider, ServiceContextProvider } from "./src/context";
import {
  OrderBagScreen,
  OrderCustomerNameScreen,
  OrderTakeAwayScreen,
  ProductCatalogScreen,
  ProductOrderScreen,
} from "./src/screens";
import { CleanOrderBagButton } from "./src/components";

const Stack = createStackNavigator();

export default function App() {
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
  });

  const theme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      primary: "#f44336",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ServiceContextProvider>
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
                    <CleanOrderBagButton navigation={navigation} />
                  ),
                })}
                component={OrderBagScreen}
              />
              <Stack.Screen
                name="OrderTakeAway"
                options={({ navigation }) => ({
                  title: "Retirada",
                  headerRight: () => (
                    <CleanOrderBagButton navigation={navigation} />
                  ),
                })}
                component={OrderTakeAwayScreen}
              />
              <Stack.Screen
                name="OrderCustomerName"
                options={({ navigation }) => ({
                  title: "Nome do Cliente",
                  headerRight: () => (
                    <CleanOrderBagButton navigation={navigation} />
                  ),
                })}
                component={OrderCustomerNameScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderBagProvider>
      </ServiceContextProvider>
    </PaperProvider>
  );
}
