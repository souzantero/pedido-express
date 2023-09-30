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
import { Navigator } from "../adapter";

export type OrderCustomerNameScreenProps = {
  navigation: any;
};

export const OrderCustomerNameScreen: FC<OrderCustomerNameScreenProps> = ({
  navigation,
}) => {
  const navigator = new Navigator(navigation);
  const theme = useTheme();
  const orderBag = useOrderBag();

  const onOrderCustomerNameConfirmed = () => {
    navigator.goToCreateOrder();
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
        value={orderBag.customerName}
        onChangeText={(text) => orderBag.setCustomerName(text)}
      />
      <Button
        mode="contained"
        style={{
          marginTop: 16,
        }}
        onPress={onOrderCustomerNameConfirmed}
        disabled={!orderBag.customerName}
      >
        Confirmar
      </Button>
    </ScrollView>
  );
};
