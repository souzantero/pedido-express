import { FC } from "react";
import { ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useOrderBag } from "../context";

export const OrderCustomerNameScreen: FC = () => {
  const orderBag = useOrderBag();

  const onOrderCustomerNameConfirmed = () => {
    // navigation.navigate("OrderTakeout");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <TextInput
        placeholder="Digite o seu nome"
        mode="outlined"
        style={{
          width: "100%",
        }}
        autoFocus
        value={orderBag.order.customerName}
        onChangeText={(text) => orderBag.setCustomerName(text)}
      />
      <Button
        mode="contained"
        style={{
          marginTop: 16,
        }}
        onPress={onOrderCustomerNameConfirmed}
      >
        Confirmar
      </Button>
    </ScrollView>
  );
};
