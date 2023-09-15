import axios, { InternalAxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";
const { VITE_API_URL } = getEnvVariables();

export const RegisterApi = axios.create({
  baseURL: VITE_API_URL,
});

RegisterApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers["x-token"] = localStorage.getItem("token");
  return config;
});
