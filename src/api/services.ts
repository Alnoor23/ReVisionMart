import apiClient from "./config";

const prefix = "products/";

const getCarouselItems = () => apiClient.get(`${prefix}/promotions`);
export { getCarouselItems };
