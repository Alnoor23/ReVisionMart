import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../basic/Text";

interface ErrorMessageProps {
  error: string;
  visible: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <View style={styles.errorContainer}>
      <Text align="center" size={12} color="danger">
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: "100%",
    padding: 4,
  },
});

export default ErrorMessage;
