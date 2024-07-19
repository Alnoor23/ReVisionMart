import { apiClient, setAuthToken } from "./config";
import {
  CarouselResponseBody,
  Product,
  Category,
  ProductwithCategory,
  Wishlist,
  AddWishlistPayload,
} from "./types";

const prefix = "products";

const getProducts = () => apiClient.get<Product[]>(`${prefix}/`);

const getProductbyId = (productId: string) =>
  apiClient.get<ProductwithCategory>(`${prefix}/${productId}`);

const getProductsByCategory = (catId: string) =>
  apiClient.get<Product[]>(`${prefix}/category/${catId}`);

const getCategories = () => apiClient.get<Category[]>(`/categories`);

const getWishlist = () => apiClient.get<Wishlist>(`/wishlist`);

const updateWishlist = (wishlist: AddWishlistPayload) =>
  apiClient.post<Wishlist>(`/wishlist`, wishlist);

export {
  getProducts,
  getWishlist,
  getCategories,
  updateWishlist,
  getProductbyId,
  getProductsByCategory,
};
