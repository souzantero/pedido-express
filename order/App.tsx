import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Repository } from "@self/domain";
import { InMemoryDatabase } from "./src/database";
import { OrderBagProvider, RepositoryContext } from "./src/context";
import { ProductCatalogScreen, ProductOrderScreen } from "./src/screens";
import { useNewOrderBag } from "./src/hooks";

const repository: Repository = new InMemoryDatabase();
const Stack = createStackNavigator();

export default function App() {
  const orderBag = useNewOrderBag();

  return (
    <PaperProvider theme={MD3LightTheme}>
      <RepositoryContext.Provider value={repository}>
        <OrderBagProvider value={orderBag}>
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
            </Stack.Navigator>
          </NavigationContainer>
        </OrderBagProvider>
      </RepositoryContext.Provider>
    </PaperProvider>
  );
}
