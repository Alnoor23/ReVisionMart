import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Screen from "./src/components/basic/Screen";
import ForgotPassword from "./src/screens/ForgotPassword";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  // load stuff
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec timout for splash-screen
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // hide splash-screen
  useEffect(() => {
    async function hideSplashSreen() {
      if (appIsReady) {
        return await SplashScreen.hideAsync();
      }
    }

    hideSplashSreen();
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Screen>
      <ForgotPassword />
    </Screen>
  );
}
