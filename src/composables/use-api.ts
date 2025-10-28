import { isAxiosError } from 'axios';
import { useAxios } from '@/composables/use-axios';
import type { Api } from '@/types/composables/use-api';

let instance: Api;

export const useApi = (): Api => {
  if (!instance) {
    const axios = useAxios();

    instance = {
      authentications: {
        list: () => axios('/v1/authentications', { method: 'get' }),
        create: (data) => axios('/v1/authentications', { method: 'post', data, __noRefresh: true }),
        refresh: (data) =>
          axios('/v1/authentications/refresh', { method: 'post', data, __noRefresh: true }),
        destroy: () => axios('/v1/authentications/sign-out', { method: 'delete' }),
      },
      people: {
        list: () => axios('/v1/people', { method: 'get' }),
        one: (id) => axios(`/v1/people/${id}`, { method: 'get' }),
        create: (data) => axios('/v1/people', { method: 'post', data }),
        update: (id, data) => axios(`/v1/people/${id}`, { method: 'patch', data }),
      },
      tags: {
        list: () => axios('/v1/tags', { method: 'get' }),
        one: (id) => axios(`/v1/tags/${id}`, { method: 'get' }),
        create: (data) => axios('/v1/tags', { method: 'post', data }),
        update: (id, data) => axios(`/v1/tags/${id}`, { method: 'patch', data }),
      },
      user: {
        info: () => axios('/v1/user', { method: 'get' }),
      },
      videos: {
        list: (params) => axios(`/v1/videos`, { method: 'get', params }),
        one: (id) => axios(`/v1/videos/${id}`, { method: 'get' }),
        random: () => axios('/v1/videos/random_id', { method: 'get' }),
        update: (id, data) => axios(`/v1/videos/${id}`, { method: 'patch', data }),
        update_preview: (id, data) => axios(`/v1/videos/${id}/preview`, { method: 'put', data }),
        update_progress: (id, data) => axios(`/v1/videos/${id}/progress`, { method: 'put', data }),
        screenshots: (id) => axios(`/v1/videos/${id}/screenshots`, { method: 'get' }),
        create: (data) => axios(`/v1/videos`, { method: 'post', data }),
      },
      isAxiosError,
    };
  }

  return instance;
};
