import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile/index.vue'),
    redirect: { name: 'profile-main' },
    meta: {
      protected: true,
    },
    children: [
      {
        path: 'main',
        name: 'profile-main',
        component: () => import('@/pages/profile/main.vue'),
        meta: {
          protected: true,
        },
      },
      {
        path: 'password',
        name: 'profile-password',
        component: () => import('@/pages/profile/password.vue'),
        meta: {
          protected: true,
        },
      },
      {
        path: 'sessions',
        name: 'profile-sessions',
        component: () => import('@/pages/profile/sessions.vue'),
        meta: {
          protected: true,
        },
      },
    ],
  },
];

export default routes;
