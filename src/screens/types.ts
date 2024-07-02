export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeNavigatorScreen: undefined;
};

export type RootBottomTabParamList = {
  HomeScreen: undefined;
  CategoriesScreen: undefined;
  LikedScreen: undefined;
  CartScreen: undefined;
  ProfileScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ProductScreen: { itemId: string };
};
