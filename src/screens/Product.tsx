import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "./types";

export interface ProductScreenProps {
  navigation: StackNavigationProp<HomeParamList, "ProductScreen">;
  route: RouteProp<HomeParamList, "ProductScreen">;
}

const Product: React.FC<ProductScreenProps> = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Product id: {itemId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Product;
