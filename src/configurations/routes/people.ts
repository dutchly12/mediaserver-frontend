import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/people',
    name: 'people',
    component: () => import('@/pages/people/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/people/:id',
    name: 'people-id',
    component: () => import('@/pages/people/[id].vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
