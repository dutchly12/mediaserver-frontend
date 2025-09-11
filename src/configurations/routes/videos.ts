import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/videos/random',
    name: 'videos-random',
    component: () => import('@/pages/videos/random.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/videos/:id',
    name: 'videos-id',
    component: () => import('@/pages/videos/[id]/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/videos/:id/edit',
    name: 'videos-id-edit',
    component: () => import('@/pages/videos/[id]/edit.vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
