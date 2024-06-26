import { apiClient, setAuthToken } from "./config";
import { CarouselResponseBody, Product } from "./types";
const prefix = "products/";

const getCarouselItems = (token: string) => {
  setAuthToken(token);
  return apiClient.get<CarouselResponseBody>(`${prefix}/promobanner`);
};

const getProducts = (token: string) => {
  setAuthToken(token);
  return apiClient.get<Product[]>(`${prefix}`);
};

export { getCarouselItems, getProducts };
