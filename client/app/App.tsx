import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { ServiceContextProvider } from "./src/context";
import { CreateOrderStackNavigator } from "./src/screens/CreateOrderStackNavigator";
import { OrderListStackNavigator } from "./src/screens/OrderListStackNavigator";

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
        <CreateOrderStackNavigator theme={theme} />
        <OrderListStackNavigator theme={theme} />
      </ServiceContextProvider>
    </PaperProvider>
  );
}
