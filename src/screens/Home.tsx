import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";
import colors from "../config/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading color="white" align="center" topSpace={5} bottomSpace={5} bold>
          ReVision
        </Heading>
        <View style={{ backgroundColor: "white", height: 240 }}>
          <Heading color="white" align="center" bold>
            Carousel
          </Heading>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: colors.primaryTheme,
    paddingBottom: 5,
  },
});

export default Home;
