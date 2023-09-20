import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Repository } from "@self/domain";
import { InMemoryDatabase } from "./src/database";
import { OrderBagProvider, RepositoryContext } from "./src/context";
import {
  OrderBagScreen,
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
            </Stack.Navigator>
          </NavigationContainer>
        </OrderBagProvider>
      </RepositoryContext.Provider>
    </PaperProvider>
  );
}
