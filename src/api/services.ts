import { apiClient, setAuthToken } from "./config";
import { CarouselResponseBody } from "./types";
const prefix = "products/";

const getCarouselItems = (token: string) => {
  setAuthToken(token);
  return apiClient.get<CarouselResponseBody>(`${prefix}/promobanner`);
};
export { getCarouselItems };
