import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";

const Home = () => {
  return (
    <View style={styles.container}>
      <Heading color="primaryTheme" align="center">
        Home Screen
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

export default Home;
