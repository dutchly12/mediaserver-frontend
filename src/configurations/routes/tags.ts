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
    path: '/tags/new',
    name: 'tags-new',
    component: () => import('@/pages/tags/new.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/tags/:id',
    name: 'tags-id',
    component: () => import('@/pages/tags/[id]/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/tags/:id/edit',
    name: 'tags-id-edit',
    component: () => import('@/pages/tags/[id]/edit.vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
