import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Repository } from "@self/domain";
import { InMemoryDatabase } from "./src/database";
import { RepositoryContext } from "./src/contexts";
import { ProductCatalogScreen } from "./src/screens";

const repository: Repository = new InMemoryDatabase();
const Stack = createStackNavigator();

export default function App() {
  return (
    <RepositoryContext.Provider value={repository}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductCatalog"
            options={{
              title: "Produtos",
            }}
            component={ProductCatalogScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RepositoryContext.Provider>
  );
}