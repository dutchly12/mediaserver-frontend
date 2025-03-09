import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/collections/new',
    name: 'collections-new',
    component: () => import('@/pages/collections/new.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/collections/:id',
    name: 'collections-id',
    component: () => import('@/pages/collections/[id]/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/collections/:id/edit',
    name: 'collections-id-edit',
    component: () => import('@/pages/collections/[id]/edit.vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
