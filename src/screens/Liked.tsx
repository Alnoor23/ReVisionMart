import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";

const Liked = () => {
  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" align="center">
        Liked Screen
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Liked;
