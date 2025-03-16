import { isAxiosError } from 'axios';
import { useAxios } from '@/composables/use-axios.ts';
import type { Api } from '@/types/composables/use-api.ts';

let instance: Api;

export const useApi = (): Api => {
  if (!instance) {
    const axios = useAxios();

    instance = {
      authentications: {
        create: (data) => axios('/v1/authentications', { method: 'post', data, __noRefresh: true }),
        refresh: (data) =>
          axios('/v1/authentications/refresh', { method: 'post', data, __noRefresh: true }),
        destroy: () => axios('/v1/authentications/sign-out', { method: 'delete' }),
      },
      user: {
        info: () => axios('/v1/user', { method: 'get' }),
      },
      collections: {
        list: () => axios('/v1/collections', { method: 'get' }),
        one: (id) => axios(`/v1/collections/${id}`, { method: 'get' }),
        create: (data) => axios('/v1/collections', { method: 'post', data }),
      },
      videos: {
        list: (params) => axios(`/v1/videos`, { method: 'get', params }),
        one: (id) => axios(`/v1/videos/${id}`, { method: 'get' }),
        screenshots: (id) => axios(`/v1/videos/${id}/screenshots`, { method: 'get' }),
        create: (data) => axios(`/v1/videos`, { method: 'post', data }),
      },
      isAxiosError,
    };
  }

  return instance;
};
