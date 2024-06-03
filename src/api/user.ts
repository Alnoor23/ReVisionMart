import { FormikValues } from "formik";
import apiClient from "./config";
import { LoginResponseBody, RegisterResponseBody } from "./types";

const prefix = "user/";

const signUp = (data: FormikValues) =>
  apiClient.post<RegisterResponseBody>(`${prefix}register/`, data);

const login = (data: FormikValues) =>
  apiClient.post<LoginResponseBody>(`${prefix}login/`, data);

export { login, signUp };
