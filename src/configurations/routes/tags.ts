import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/pages/tags/index.vue'),
  },
];

export default routes;
