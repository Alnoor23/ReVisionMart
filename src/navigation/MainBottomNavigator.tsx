import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Liked from "../screens/Liked";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import colors from "../config/colors";
import HomeNavigator from "./HomeNavigator";
import CategoryNavigator from "./CategoryNavigator";
import { RootBottomTabParamList } from "./types";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

function MainBottomNavigator() {
  const navigation = useNavigation<NavigationProp<RootBottomTabParamList>>();

  const loadAllTabs = () => {
    // navigation.navigate("LikedScreen");
    // navigation.navigate("CartScreen");
    // navigation.navigate("ProfileScreen");
    navigation.navigate("CategoryNavigator");
    navigation.navigate("HomeNavigator");
  };

  useEffect(() => {
    loadAllTabs();
    console.log("fuct");
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          height: 60,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="CategoryNavigator"
        component={CategoryNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={size}
              color={focused ? colors.primaryTheme : colors.iconGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LikedScreen"
        component={Liked}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="heart"
              size={size}
              color={focused ? colors.primaryTheme : colors.iconGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={size}
              color={focused ? colors.primaryTheme : colors.iconGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={Cart}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="cart"
              size={size}
              color={focused ? colors.primaryTheme : colors.iconGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={focused ? colors.primaryTheme : colors.iconGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomNavigator;
