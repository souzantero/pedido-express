import { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Navigation } from "../adapter";

export type StartOrderScreenProps = {
  navigation: any;
};
export const StartOrderScreen: FC<StartOrderScreenProps> = (props) => {
  const navigation = new Navigation(props.navigation);

  const onOrderStartPress = () => {
    navigation.navigate("ProductCatalog");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Button
        style={{
          minWidth: 200,
        }}
        mode="contained"
        onPress={onOrderStartPress}
      >
        Iniciar pedido
      </Button>
    </View>
  );
};
