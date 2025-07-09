import { useAuthStore } from "@/app/store/auth-store";
import { CookieName } from "@/types/cookie-enum";
import axios, { type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    config.headers["Authorization"] = `${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

//Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalConfig: AxiosRequestConfig = error.config;
    if (error.response && error.response.data.status === 401) {
      if (!isRefreshing) {
        try {
          const response = await axiosInstance({
            method: "POST",
            url: "http://localhost:8000/api/v1/auth/refresh-token",
          });
          const { accessToken } = response.data;
          Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
          error.config.header["Authorization"] = `${accessToken}`;
          return await axiosInstance(originalConfig);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response && error.response.data) {
            // make logout api or remove token

            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
    }
    if (error.response && error.response.status === 401) {
      // make logout api logical
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
