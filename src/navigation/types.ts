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
  WishListScreen: undefined;
  CartScreen: undefined;
  ProfileScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ProductScreen: { itemId: string };
  CategoryScreen: { category: Category };
  SearchScreen: undefined;
};

export type CategoryParamList = {
  CategoriesScreen: undefined;
  CategoryScreen: { category: Category };
  ProductScreen: { itemId: string };
};

export type WishlistParamList = {
  WishListScreen: undefined;
  ProductScreen: { itemId: string };
};
