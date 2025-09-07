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
    path: '/people/new',
    name: 'people-new',
    component: () => import('@/pages/people/new.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/people/:id',
    name: 'people-id',
    component: () => import('@/pages/people/[id]/index.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/people/:id/edit',
    name: 'people-id-edit',
    component: () => import('@/pages/people/[id]/edit.vue'),
    meta: {
      protected: true,
    },
  },
];

export default routes;
