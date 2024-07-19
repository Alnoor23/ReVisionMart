import { MaterialCommunityIcons } from "@expo/vector-icons";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: number;
  images: string[];
  bannerPromo: boolean;
}

interface WishlistProduct {
  _id: string;
  product: Product;
  quantity: number;
}

interface AddWishlistPayload {
  userId: string;
  products: { product: string; quantity: number }[];
}

interface Wishlist {
  _id: string;
  userId: string;
  products: WishlistProduct[];
  createdAt: string;
}

interface ProductwithCategory {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  _id: string;
  name: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
}

interface RegisterResponseBody {
  _id: string;
  name: string;
  email: string;
  message?: string | null;
}

interface LoginResponseBody {
  token: string;
  message?: string | null;
}

type CarouselResponseBody = Product[];

export {
  User,
  Product,
  Category,
  Wishlist,
  WishlistProduct,
  LoginResponseBody,
  AddWishlistPayload,
  ProductwithCategory,
  RegisterResponseBody,
  CarouselResponseBody,
};
