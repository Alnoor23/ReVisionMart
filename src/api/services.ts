import { apiClient, setAuthToken } from "./config";
import { CarouselResponseBody, Product, Category } from "./types";
const prefix = "products/";

const getCarouselItems = (token: string) => {
  setAuthToken(token);
  return apiClient.get<CarouselResponseBody>(`${prefix}/promobanner`);
};

const getProducts = (token: string) => {
  setAuthToken(token);
  return apiClient.get<Product[]>(`${prefix}`);
};

const getProductsByCategory = (token: string, catId: string) => {
  setAuthToken(token);
  return apiClient.get<Product[]>(`${prefix}/category/${catId}`);
};

const getCategories = (token: string) => {
  setAuthToken(token);
  return apiClient.get<Category[]>(`/categories`);
};

export { getCarouselItems, getProducts, getCategories, getProductsByCategory };
