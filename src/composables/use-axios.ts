import axios, { isAxiosError, type AxiosInstance } from 'axios';
import { useUserStore } from '@/stores/user.ts';

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
            console.log(2);

            refresh = userStore
              .refresh()
              .catch(() => console.error('Tokens refresh failed'))
              .finally(() => (refresh = null));
          }

          await refresh;

          if (userStore.isAuthorized) {
            const { request } = error;
            request.__refreshed = true;
            request.headers.set('Authorization', `Bearer ${userStore.tokens.access_token}`);
            return axios(request);
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
