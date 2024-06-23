import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { customDefaultTheme } from "./src/navigation/navigationTheme";
import Screen from "./src/components/basic/Screen";
import MainBottomNavigator from "./src/navigation/MainBottomNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AuthContext, { User } from "./src/context/AuthContext";
import { getAuthToken } from "./src/storage/authStorage";

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
        const token = await getAuthToken();
        if (token) {
          setAuthToken(token);
        }
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
          {authToken ? <MainBottomNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Screen>
  );
}
