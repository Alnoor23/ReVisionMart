import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.1.87:5000/api/",
});

const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.setHeader("x-auth-token", token);
  } else {
    apiClient.deleteHeader("x-auth-token");
  }
};

export { apiClient, setAuthToken };
