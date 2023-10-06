import "react-native-gesture-handler";
import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ServiceContextProvider } from "./src/context";
import { CreateOrderStackNavigator } from "./src/screens/CreateOrderStackNavigator";
import { OrderListStackNavigator } from "./src/screens/OrderListStackNavigator";

const Drawer = createDrawerNavigator();

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
        <NavigationContainer theme={theme}>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="CreateOrderStackNavigator"
          >
            <Drawer.Screen
              name="CreateOrderStackNavigator"
              options={{ title: "Criar Pedido" }}
              component={CreateOrderStackNavigator}
            />
            <Drawer.Screen
              name="OrderListStackNavigator"
              options={{ title: "Lista de Pedidos" }}
              component={OrderListStackNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ServiceContextProvider>
    </PaperProvider>
  );
}
