import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Product from "../screens/Product";
import { HomeParamList } from "../screens/types";

const Stack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="ProductScreen" component={Product} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
