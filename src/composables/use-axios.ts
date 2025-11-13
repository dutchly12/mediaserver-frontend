import axios, { isAxiosError, type AxiosInstance } from 'axios';
import { useUserStore } from '@/stores/user';

let instance: AxiosInstance;

export const useAxios = (): AxiosInstance => {
  if (!instance) {
    const userStore = useUserStore();

    instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    instance.interceptors.request.use((config) => {
      if (userStore.accessToken)
        config.headers.set('Authorization', `Bearer ${userStore.accessToken}`);

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
          if (userStore.refreshing) {
            await new Promise<void>((resolve) => {
              if (!userStore.refreshing) return resolve();

              const unsubscribe = userStore.$subscribe((_, state) => {
                if (state.refreshing) return;

                unsubscribe();
                resolve();
              });
            });
          } else {
            await userStore.refresh();
          }

          if (userStore.isAuthorized) {
            const { config } = error;
            if (!config) return Promise.reject(error);

            config.__refreshed = true;
            config.headers.set('Authorization', `Bearer ${userStore.accessToken}`);

            return axios(config);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
};
