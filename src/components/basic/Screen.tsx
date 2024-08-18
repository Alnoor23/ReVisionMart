import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar as TopBar,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import colors from "../../config/colors";

interface ScreenProps {
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  async function loadFonts() {
    await Font.loadAsync({
      Poppins: require("../../../assets/fonts/13.otf"),
      PoppinsBold: require("../../../assets/fonts/15.otf"),
      PoppinsXBold: require("../../../assets/fonts/18.otf"),
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

  if (!fontLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={48} color={colors.primaryTheme} />
      </View>
    );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="light" backgroundColor={colors.primaryTheme} animated />
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
    // paddingHorizontal: scale(20),
  },
});

export default Screen;
