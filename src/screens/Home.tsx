import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Heading } from "../components/basic";
import colors from "../config/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading color="white" align="center" bold>
          ReVision
        </Heading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryTheme },
  header: {
    paddingVertical: 5,
  },
});

export default Home;
