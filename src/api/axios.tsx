// api/axios.tsx
import { BASE_API_URL } from "api/constants/endpoints.constants";
import axios from "axios";

let useAuthStore: any;

const createAxiosInstance = async () => {
  if (!useAuthStore) {
    useAuthStore = (await import("../setup/store/auth/authStore")).useAuthStore;
  }

  const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });

  const getAccessTokenSilently = useAuthStore.getState().getAccessTokenSilently;

  // Keep track of the refresh token promise to prevent multiple refreshes
  const refreshTokenPromise: Promise<string> | null = null;

  api.interceptors.request.use(
    async (config) => {
      try {
        const accessToken = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      } catch (error) {
        // If token refresh failed, let the request proceed without a token
        // The response interceptor will handle the 401 error
        return config;
      }
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error is 401 and we haven't tried to refresh the token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const accessToken = await getAccessTokenSilently();

          // Update the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, redirect to login
          useAuthStore.getState().setAuthSection("login");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
};

const axiosInstancePromise = createAxiosInstance();

export const getAxiosInstance = async () => {
  return axiosInstancePromise;
};
