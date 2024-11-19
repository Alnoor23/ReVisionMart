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

interface AddWishlistPayload {
  userId: string;
  products: string[];
}

interface Wishlist {
  _id: string;
  userId: string;
  products: string[] | [];
  createdAt: string;
}

interface WishlistWithProduct {
  _id: string;
  userId: string;
  products: Product[];
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

interface CartProduct {
  _id?: string;
  product: string;
  quantity: number;
}

interface Cart {
  _id: string;
  userId: string;
  products: CartProduct[];
  createdAt: Date;
}

interface CartWithProduct {
  _id: string;
  userId: string;
  products: { _id: string; product: Product; quantity: number }[];
  createdAt: string;
}

interface OrderProduct {
  product: Product;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  userId: string;
  orderId: string;
  products: OrderProduct[];
  total: number;
  address: string;
  createdAt: Date;
}

interface OrderWithProduct {
  _id: string;
  userId: string;
  orderId: string;
  products: { _id: string; product: Product; quantity: number }[];
  total: number;
  address: string;
  createdAt: Date;
}

type Orders = Order[];

export {
  User,
  Cart,
  Order,
  Orders,
  Product,
  Category,
  Wishlist,
  CartProduct,
  CartWithProduct,
  OrderWithProduct,
  LoginResponseBody,
  AddWishlistPayload,
  WishlistWithProduct,
  ProductwithCategory,
  RegisterResponseBody,
};
