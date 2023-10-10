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
import { OrderBoardStackNavigator } from "./src/screens/OrderBoardStackNavigator";
import { OrderFlowStackNavigator } from "./src/screens/OrderFlowStackNavigator";

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
            initialRouteName="OrderFlowStackNavigator"
          >
            <Drawer.Screen
              name="OrderFlowStackNavigator"
              options={{ title: "Atendimento" }}
              component={OrderFlowStackNavigator}
            />
            <Drawer.Screen
              name="OrderBoardStackNavigator"
              options={{ title: "Cozinha" }}
              component={OrderBoardStackNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ServiceContextProvider>
    </PaperProvider>
  );
}
