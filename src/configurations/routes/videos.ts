import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/videos/:id',
    name: 'videos-id',
    component: () => import('@/pages/videos/[id].vue'),
  },
];

export default routes;
