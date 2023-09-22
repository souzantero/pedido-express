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
import { Repository } from "./src/domain";
import { InMemoryDatabase } from "./src/database";
import { OrderBagProvider, RepositoryContext } from "./src/context";
import {
  OrderBagScreen,
  OrderCustomerNameScreen,
  OrderTakeoutScreen,
  ProductCatalogScreen,
  ProductOrderScreen,
} from "./src/screens";

const repository: Repository = new InMemoryDatabase();
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
      <RepositoryContext.Provider value={repository}>
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
                options={{
                  title: "Sacola",
                }}
                component={OrderBagScreen}
              />
              <Stack.Screen
                name="OrderTakeout"
                options={{
                  title: "Retirada",
                }}
                component={OrderTakeoutScreen}
              />
              <Stack.Screen
                name="OrderCustomerName"
                options={{
                  title: "Nome do Cliente",
                }}
                component={OrderCustomerNameScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderBagProvider>
      </RepositoryContext.Provider>
    </PaperProvider>
  );
}
