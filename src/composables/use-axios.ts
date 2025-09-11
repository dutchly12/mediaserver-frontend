import axios, { isAxiosError, type AxiosInstance } from 'axios';
import { useUserStore } from '@/stores/user';

let instance: AxiosInstance;

let refresh: null | Promise<void> = null;

export const useAxios = (): AxiosInstance => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    instance.interceptors.request.use((config) => {
      if (userStore.tokens.access_token)
        config.headers.set('Authorization', `Bearer ${userStore.tokens.access_token}`);

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);

        if (
          isAxiosError(error) &&
          !error.config?.__noRefresh &&
          !error.config?.__refreshed &&
          error.response?.status === 401
        ) {
          if (!refresh) {
            refresh = userStore
              .refresh()
              .catch(() => console.error('Tokens refresh failed'))
              .finally(() => (refresh = null));
          }

          await refresh;

          if (userStore.isAuthorized) {
            const { config } = error;
            if (!config) return Promise.reject(error);

            config.__refreshed = true;
            config.headers.set('Authorization', `Bearer ${userStore.tokens.access_token}`);
            return axios(config);
          } else {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
};
