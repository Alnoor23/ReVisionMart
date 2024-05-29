import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Categories from "../screens/Categories";
import Liked from "../screens/Liked";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

function MainBottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          height: 60,
          width: width,
          marginLeft: -25,
        },
      }}
    >
      <Tab.Screen
        name="CategoriesScreen"
        component={Categories}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={focused ? size + 10 : size}
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
        name="HomeScreen"
        component={Home}
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
