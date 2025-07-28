import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/people',
    name: 'people',
    component: () => import('@/pages/people/index.vue'),
  },
  {
    path: '/people/:id',
    name: 'people-id',
    component: () => import('@/pages/people/[id].vue'),
  },
];

export default routes;
