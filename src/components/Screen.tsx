import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar as TopBar,
} from "react-native";
import * as Font from "expo-font";
import colors from "../config/colors";

interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  async function loadFonts() {
    await Font.loadAsync({
      Poppins: require("../../assets/fonts/13.otf"),
      PoppinsBold: require("../../assets/fonts/15.otf"),
      PoppinsXBold: require("../../assets/fonts/18.otf"),
    });
    setFontLoaded(true);
  }

  function initializeTextDefaultProps() {
    const TextComponent = Text as typeof Text & { defaultProps: any };
    if (TextComponent.defaultProps == null) {
      TextComponent.defaultProps = {};
    }
    TextComponent.defaultProps.maxFontSizeMultiplier = 1;
    TextComponent.defaultProps.allowFontScaling = true;
  }

  useEffect(() => {
    loadFonts();
    initializeTextDefaultProps();
  }, []);

  if (!fontLoaded) return <Text>Loading</Text>;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="auto" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? TopBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    overflow: "hidden",
  },
});

export default Screen;
