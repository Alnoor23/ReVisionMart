import { StyleSheet, View } from "react-native";
import React from "react";
import { Heading, Text } from "../components/basic";

const Buy: React.FC = () => {
  return (
    <View>
      <Heading size={18} bold color="primaryTheme" topSpace={10} align="center">
        Order Confirmed
      </Heading>

      <Text align="center" topSpace={50}>
        make orders table.. duhhh
      </Text>
    </View>
  );
};

export default Buy;

const styles = StyleSheet.create({});
