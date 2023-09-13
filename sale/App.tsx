import { createContext, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Repository } from "@self/domain";
import { InMemoryDatabase } from "./src/database";
import { RepositoryContext } from "./src/contexts";
import { useProductCategories } from "./src/hooks/useProductCategories";

const repository: Repository = new InMemoryDatabase();

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

export const HomeTabs = () => {
  const { productCategories, isLoadingProductCategories } =
    useProductCategories();

  if (isLoadingProductCategories) return <Text>Loading...</Text>;
  if (!productCategories) return <Text>Product categories not found</Text>;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
    >
      {productCategories?.map((productCategory) => (
        <Tab.Screen
          name={productCategory.name}
          key={productCategory.id}
          component={HomeScreen}
        />
      ))}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <RepositoryContext.Provider value={repository}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Catalog" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </RepositoryContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
