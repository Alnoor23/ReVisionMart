import { FormikValues } from "formik";
import { apiClient, setAuthToken } from "./config";
import { LoginResponseBody, RegisterResponseBody, User } from "./types";

const prefix = "user/";

const signUp = (data: FormikValues) =>
  apiClient.post<RegisterResponseBody>(`${prefix}register/`, data);

const login = (data: FormikValues) =>
  apiClient.post<LoginResponseBody>(`${prefix}login/`, data);

const getUser = () => apiClient.get<User>(`${prefix}`);

export { login, signUp, getUser };
