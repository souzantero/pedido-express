import { FC } from "react";
import { ScrollView } from "react-native";
import {
  Button,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { useOrderBag } from "../context";

export const OrderCustomerNameScreen: FC = () => {
  const theme = useTheme();
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
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Digite o seu nome
      </Title>
      <Paragraph
        style={{
          textAlign: "center",
          color: theme.colors.secondary,
        }}
      >
        Para que possamos identificar o seu pedido, digite o seu nome abaixo.
      </Paragraph>
      <TextInput
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
