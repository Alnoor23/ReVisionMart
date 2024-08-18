import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface InputProps extends TextInputProps {
  password?: boolean;
  placeholder?: string;
  color?: keyof typeof colors;
  iconColor?: keyof typeof colors;
  backgroundColor?: keyof typeof colors;
  borderRadius?: number;
  shadow?: boolean;
  inputRef?: RefObject<TextInput>;
  Inputstyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}

const Input: React.FC<InputProps> = ({
  password,
  placeholder,
  color = "primaryText",
  iconColor = "lightGray",
  backgroundColor = "white",
  borderRadius,
  shadow,
  inputRef,
  Inputstyle,
  inputContainerStyle,
  onChangeText,
  onSubmit,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const shadowEnabled = shadow
    ? {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }
    : null;

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: colors[backgroundColor],
          borderRadius,
        },
        shadowEnabled,
        inputContainerStyle,
      ]}
    >
      <TextInput
        style={[styles.input, { color: colors[color] }, Inputstyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.mediumGrayText}
        allowFontScaling={false}
        secureTextEntry={password ? !showPassword : false}
        ref={inputRef}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        {...props}
      />
      {password && (
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <MaterialCommunityIcons
            color={colors[iconColor]}
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    textAlign: "left",
    fontSize: scale(12),
    fontFamily: "PoppinsBold",
  },
});

export default Input;
