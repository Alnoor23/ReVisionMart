import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { customDefaultTheme } from "./src/navigation/navigationTheme";
import Screen from "./src/components/basic/Screen";
import MainBottomNavigator from "./src/navigation/MainBottomNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AuthContext, { User } from "./src/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>("");

  useEffect(() => {
    console.log(`authToken changed :${authToken}`);
  }, [authToken]);

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
      <AuthContext.Provider value={{ user, setUser, authToken, setAuthToken }}>
        <NavigationContainer theme={customDefaultTheme}>
          <AuthNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </Screen>
  );
}
