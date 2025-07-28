import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/people',
    name: 'people',
    component: () => import('@/pages/people/index.vue'),
  },
];

export default routes;
