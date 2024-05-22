import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  buttonColor?: keyof typeof colors;
  textColor?: keyof typeof colors;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconColor?: keyof typeof colors;
  width?: DimensionValue;
  fontSize?: number;
  bold?: boolean;
  borderRadius?: number;
  loading?: boolean;
  error?: string;
  before?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonColor = "primaryTheme",
  textColor = "white",
  icon,
  iconColor = "white",
  width = "100%",
  fontSize = 20,
  bold = false,
  borderRadius = 10,
  loading = false,
  before = false,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors[buttonColor], width, borderRadius },
        ]}
        onPress={onPress}
      >
        {icon && before ? (
          <MaterialCommunityIcons
            style={styles.icon}
            color={colors[iconColor]}
            name={icon}
            size={22}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator
            animating={loading}
            size={scale(fontSize)}
            color={colors[textColor]}
          />
        ) : (
          <Text
            style={[
              styles.text,
              {
                color: colors[textColor],
                fontSize: scale(fontSize) - scale(5),
                fontFamily: bold ? "PoppinsBold" : "Poppins",
              },
            ]}
          >
            {title}
          </Text>
        )}
        {icon && !before ? (
          <MaterialCommunityIcons
            style={styles.icon}
            color={colors[iconColor]}
            name={icon}
            size={22}
          />
        ) : null}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginVertical: 5,
    flexDirection: "row",
  },
  text: { fontSize: scale(20), padding: 3 },
  icon: { paddingHorizontal: 3 },
});

export default Button;
