import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/pages/tags/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/tags/:id',
    name: 'tags-id',
    component: () => import('@/pages/tags/[id].vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
