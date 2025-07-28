import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/pages/tags/index.vue'),
  },
  {
    path: '/tags/:id',
    name: 'tags-id',
    component: () => import('@/pages/tags/[id].vue'),
  },
];

export default routes;
