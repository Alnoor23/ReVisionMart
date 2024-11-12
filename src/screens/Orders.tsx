import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";

const Orders = () => {
  return (
    <View style={styles.container}>
      <Heading size={18} bold color="primaryTheme" topSpace={10} align="center">
        Your Orders
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
  },
});

export default Orders;
