import { apiClient } from "./config";
import {
  Product,
  Category,
  ProductwithCategory,
  Wishlist,
  AddWishlistPayload,
  WishlistWithProduct,
} from "./types";

const prefix = "products";

const getProducts = () => apiClient.get<Product[]>(`${prefix}/`);

const getProductbyId = (productId: string) =>
  apiClient.get<ProductwithCategory>(`${prefix}/${productId}`);

const getProductsByCategory = (catId: string) =>
  apiClient.get<Product[]>(`${prefix}/category/${catId}`);

const getCategories = () => apiClient.get<Category[]>(`/categories`);

const getWishlist = () => apiClient.get<Wishlist>(`/wishlist`);

const getPopulatedWishlist = () =>
  apiClient.get<WishlistWithProduct>(`/wishlist/populated`);

const updateWishlist = (wishlist: AddWishlistPayload) =>
  apiClient.post<Wishlist>(`/wishlist`, wishlist);

const search = (query: string) =>
  apiClient.get<Product[]>(`${prefix}/search/${query}`);

const addProductToWishlist = (productId: string) =>
  apiClient.put<Wishlist>(`/wishlist/addproduct`, { id: productId });

const removeProductToWishlist = (productId: string) =>
  apiClient.put<Wishlist>(`/wishlist/removeproduct`, { id: productId });

export {
  search,
  getProducts,
  getWishlist,
  getCategories,
  updateWishlist,
  getProductbyId,
  getPopulatedWishlist,
  addProductToWishlist,
  getProductsByCategory,
  removeProductToWishlist,
};
