import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Home from "../screens/Home";
import Product from "../screens/Product";
import { HomeParamList } from "./types";
import Search from "../screens/Search";

const Stack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen
        name="ProductScreen"
        component={Product}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, // TODO: replace with a custom animation
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
