import { Category, OrderWithProduct } from "../api/types";

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
  CartNavigator: undefined;
  ProfileScreen: undefined;
  OrdersScreen: undefined;
  UserDetailScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ProductScreen: { itemId: string };
  CategoryScreen: { category: Category };
  SearchScreen: undefined;
  BuyScreen: { order: OrderWithProduct };
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

export type CartParamList = {
  HomeNavigator: undefined;
  CartScreen: undefined;
  ProductScreen: { itemId: string };
  OrdersScreen: undefined;
  BuyScreen: { order: OrderWithProduct };
};

export type OrderParamList = {
  OrdersScreen: undefined;
  ProductScreen: { itemId: string };
  CartScreen: undefined;
  // BuyScreen: { order: OrderWithProduct };
};
