import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { customDefaultTheme } from "./src/navigation/navigationTheme";
import Screen from "./src/components/basic/Screen";
import MainBottomNavigator from "./src/navigation/MainBottomNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AuthContext from "./src/context/AuthContext";
import { getAuthToken } from "./src/storage/authStorage";
import { getWishlist, updateWishlist } from "./src/api/services";
import { getUser } from "./src/api/user";
import { setAuthToken as setApiAuthToken } from "./src/api/config";
import { User, Wishlist } from "./src/api/types";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);
  const [userWishlist, setUserWishlist] = useState<Wishlist | null>(null);

  // populating the user on app load
  useEffect(() => {
    if (!authToken) return;

    setApiAuthToken(authToken);

    const getUserData = async () => {
      const { data, status } = await getUser();

      if (data && status === 200) {
        setUser({ _id: data._id, email: data.email, name: data.name });
      }
    };

    const getUserWishlist = async () => {
      const { data, status } = await getWishlist();

      if (data && status === 200) {
        setUserWishlist(data);
      }
    };

    getUserData();
    getUserWishlist();
  }, [authToken]);

  useEffect(() => {
    const updateUserWishlist = async () => {
      if (!userWishlist) return;

      console.log("Update userWishlist");
      // const { data, status } = await updateWishlist({
      //   userId: userWishlist.userId,
      //   products: userWishlist.products,
      // });

      // TODO: delete from wishlist working but optimize it

      // if (data && status === 200) {
      //   // setUserWishlist(data);
      // } else {
      //   console.log(`Error updating wishlist ${status}:`, data);
      // }
    };

    updateUserWishlist();
  }, [setUserWishlist]);

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
      <AuthContext.Provider
        value={{
          user,
          setUser,
          userWishlist,
          setUserWishlist,
          authToken,
          setAuthToken,
        }}
      >
        <NavigationContainer theme={customDefaultTheme}>
          {authToken ? <MainBottomNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Screen>
  );
}
