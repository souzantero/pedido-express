import { FC, useEffect } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { Navigation } from "../adapter";
import { Centralized } from "../components";
import { useCreateOrder } from "../hooks";
import { View } from "react-native";

export type CreateOrderScreenProps = {
  navigation: any;
};

export const CreateOrderScreen: FC<CreateOrderScreenProps> = (props) => {
  const theme = useTheme();
  const navigation = new Navigation(props.navigation);
  const { createdOrder, isCreating, createOrder } = useCreateOrder();

  useEffect(() => {
    createOrder();
  }, []);

  if (isCreating) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Centralized>
          <Text variant="titleMedium">Estamos criando o seu pedido...</Text>
        </Centralized>
      </View>
    );
  }

  if (!createdOrder && !isCreating) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Centralized>
          <Text style={{ textAlign: "center" }} variant="titleMedium">
            Ocorreu um erro ao criar o seu pedido. Por favor, tente novamente.
          </Text>
          <View style={{ height: 32 }} />
          <Button
            style={{ minWidth: 200 }}
            mode="contained"
            onPress={() => {
              createOrder();
            }}
          >
            Tentar novamente
          </Button>
          <View style={{ height: 16 }} />
          <Button
            style={{ minWidth: 200 }}
            mode="outlined"
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </Centralized>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Centralized>
        <Text variant="titleMedium">Seu pedido foi criado com sucesso!</Text>
        <Text variant="titleMedium">O código do seu pedido é</Text>
        <View style={{ height: 32 }} />
        <Text
          style={{
            color: theme.colors.primary,
          }}
          variant="titleLarge"
        >
          {createdOrder?.code}
        </Text>
        <View style={{ height: 32 }} />
        <Button mode="contained" onPress={() => navigation.reset()}>
          Voltar para a tela inicial
        </Button>
      </Centralized>
    </View>
  );
};
