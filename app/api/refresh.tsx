import apiClient from './axios';
import { getToken, saveToken } from '../store/token'; // adjust path if needed


// Request interceptor to add Authorization header
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getToken('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to handle 401 + refresh flow
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getToken('refreshToken');
        if (!refreshToken) throw new Error('No refresh token found');

        const refreshResponse = await apiClient.post('/auth/refresh', {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = refreshResponse.data;
        // Save the new tokens
        await saveToken('accessToken', access_token);
        await saveToken('refreshToken', refresh_token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
