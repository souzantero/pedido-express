import { FC } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const Loading: FC = () => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      animating={true}
      size="large"
      color={theme.colors.primary}
    />
  );
};
