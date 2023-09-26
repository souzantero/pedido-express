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
import { Repository } from "@pedido-express/domain";
import { OrderBagProvider, RepositoryContext } from "./src/context";
import {
  OrderBagScreen,
  OrderCustomerNameScreen,
  OrderTakeoutScreen,
  ProductCatalogScreen,
  ProductOrderScreen,
} from "./src/screens";
import { CleanOrderBagButton } from "./src/components";
import { RepositoryProvider } from "./src/provider";
import { Client } from "@pedido-express/sdk";

const client = new Client("http://192.168.100.4:3000/api");
const repository: Repository = new RepositoryProvider(client);
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
                options={({ navigation }) => ({
                  title: "Sacola",
                  headerRight: () => (
                    <CleanOrderBagButton navigation={navigation} />
                  ),
                })}
                component={OrderBagScreen}
              />
              <Stack.Screen
                name="OrderTakeout"
                options={({ navigation }) => ({
                  title: "Retirada",
                  headerRight: () => (
                    <CleanOrderBagButton navigation={navigation} />
                  ),
                })}
                component={OrderTakeoutScreen}
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
      </RepositoryContext.Provider>
    </PaperProvider>
  );
}
