import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Categories from "../screens/Categories";
import Liked from "../screens/Liked";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import colors from "../config/colors";
import HomeNavigator from "./HomeNavigator";
import { RootBottomTabParamList } from "../screens/types";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

function MainBottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
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
        name="CategoriesScreen"
        component={Categories}
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
