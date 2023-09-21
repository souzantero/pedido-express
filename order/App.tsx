import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
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
  return (
    <PaperProvider theme={MD3LightTheme}>
      <RepositoryContext.Provider value={repository}>
        <OrderBagProvider>
          <NavigationContainer>
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
