import { Category } from "../api/types";

export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeNavigatorScreen: undefined;
};

export type RootBottomTabParamList = {
  HomeNavigator: undefined;
  CategoryNavigator: undefined;
  LikedScreen: undefined;
  CartScreen: undefined;
  ProfileScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ProductScreen: { itemId: string };
  CategoryScreen: { category: Category };
};

export type CategoryParamList = {
  CategoriesScreen: undefined;
  CategoryScreen: { category: Category };
  ProductScreen: { itemId: string };
};
