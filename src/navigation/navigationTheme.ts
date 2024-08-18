import { Theme, DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export const customDefaultTheme: Theme = {
  ...DefaultTheme.colors,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
    primary: colors.white,
  },
  dark: false,
};
