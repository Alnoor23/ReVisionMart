import { apiClient, setAuthToken } from "./config";
import {
  CarouselResponseBody,
  Product,
  Category,
  ProductwithCategory,
  Wishlist,
  WishlistProductDetails,
  AddWishlistPayload,
} from "./types";

const prefix = "products";

const getCarouselItems = (token: string) => {
  setAuthToken(token);
  return apiClient.get<CarouselResponseBody>(`${prefix}/promobanner`);
};

const getProducts = (token: string) => {
  setAuthToken(token);
  return apiClient.get<Product[]>(`${prefix}/`);
};

const getProductbyId = (productId: string, token: string) => {
  setAuthToken(token);
  return apiClient.get<ProductwithCategory>(`${prefix}/${productId}`);
};

const getProductsByCategory = (token: string, catId: string) => {
  setAuthToken(token);
  return apiClient.get<Product[]>(`${prefix}/category/${catId}`);
};

const getCategories = (token: string) => {
  setAuthToken(token);
  return apiClient.get<Category[]>(`/categories`);
};

const getWishlist = (authToken: string) => {
  setAuthToken(authToken);

  return apiClient.get<Wishlist>(`/wishlist`);
};

const updateWishlist = (authToken: string, wishlist: AddWishlistPayload) => {
  setAuthToken(authToken);

  return apiClient.post<Wishlist>(`/wishlist`, wishlist);
};

export {
  getProducts,
  getWishlist,
  getCategories,
  updateWishlist,
  getProductbyId,
  getCarouselItems,
  getProductsByCategory,
};
