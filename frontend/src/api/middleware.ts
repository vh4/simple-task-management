import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            console.log(`[AxiosInterceptor] 401 detected for ${originalRequest.url}`);

            // If the failure happened on login or refresh, don't try to refresh again
            if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh-token')) {
                console.log("[AxiosInterceptor] Unauthorized on auth routes, giving up.");
                return Promise.reject(error);
            }

            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    console.log("[AxiosInterceptor] Attempting token refresh...");
                    await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh-token`, {}, { withCredentials: true });
                    console.log("[AxiosInterceptor] Token refreshed, retrying original request");

                    // After refresh, retry the original request
                    // The new accessToken cookie will be automatically sent
                    return axiosInstance(originalRequest);

                } catch (refreshError: any) {
                    console.error('[AxiosInterceptor] Token refresh failed:', refreshError.response?.data || refreshError.message);
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);

    }
)

export default axiosInstance;
