import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../components/basic";

const Liked = () => {
  return (
    <View style={styles.container}>
      <Heading size={18} color="primaryTheme" topSpace={10} align="center">
        Liked Screen
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Liked;
