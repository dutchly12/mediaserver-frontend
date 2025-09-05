import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
