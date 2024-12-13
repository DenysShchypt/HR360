import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
export const instance = axios.create({
  //   baseURL: 'https://newstudypetproject-1.onrender.com/api',
  baseURL: 'http://localhost:8833/api/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set('Authorization', token);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await instance.get('/auth/refresh-tokens', {
            withCredentials: true,
          });
          localStorage.setItem('token', newAccessToken.data.token.token);
          onRefreshed(newAccessToken.data.token.token);
        } catch (e) {
          refreshSubscribers = [];
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          if (!originalRequest.headers) {
            originalRequest.headers = new AxiosHeaders();
          }
          originalRequest.headers.set('Authorization', token);
          resolve(instance(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}
