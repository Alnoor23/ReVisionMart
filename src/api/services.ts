import { apiClient } from "./config";
import {
  Product,
  Category,
  ProductwithCategory,
  Wishlist,
  AddWishlistPayload,
  WishlistWithProduct,
  Cart,
  CartWithProduct,
  User,
  Orders,
  Order,
  CartProduct,
  SingleProductOrder,
} from "./types";

const prefix = "products";

const getUser = () => apiClient.get<User>(`/user`);

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

const removeProductFromWishlist = (productId: string) =>
  apiClient.put<Wishlist>(`/wishlist/removeproduct`, { id: productId });

const getCart = () => apiClient.get<Cart>(`/cart`);

const clearCart = () => apiClient.delete<Cart>(`/cart/clearcart`);

const getPopulatedCart = () =>
  apiClient.get<CartWithProduct>(`/cart/populated`);

const addProductToCart = (productId: string) =>
  apiClient.put<CartWithProduct>(`/cart/addproduct`, { product: productId });

const removeProductFromCart = (productId: string) =>
  apiClient.put<CartWithProduct>(`/cart/removeproduct`, { product: productId });

const updateCartProduct = (productId: string, quantity: number) =>
  apiClient.put<CartWithProduct>(`/cart/updateproduct`, {
    product: productId,
    quantity,
  });

const getOrders = () => apiClient.get<Orders>(`/order`);

const putOrder = (cartId: string, total: number, address: string) =>
  apiClient.post<Order>(`/order`, { cartId, total, address });

const putSingleOrder = (order: SingleProductOrder) =>
  apiClient.post<Order>(`/order/single`, order);

export {
  // User
  getUser,

  // Products
  getProducts,
  getProductbyId,
  getProductsByCategory,
  search,

  // Wishlist
  getWishlist,
  getPopulatedWishlist,
  updateWishlist,
  addProductToWishlist,
  removeProductFromWishlist,

  // Cart
  getCart,
  getPopulatedCart,
  addProductToCart,
  updateCartProduct,
  removeProductFromCart,
  clearCart,

  // Orders
  getOrders,
  putOrder,
  putSingleOrder,

  // Categories
  getCategories,
};
