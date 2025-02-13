import { createRouter, createWebHistory } from 'vue-router';

import main from '@/configurations/routes/main.ts';
import authentication from '@/configurations/routes/authentication.ts';
import { useUserStore } from '@/stores/user.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...main, ...authentication],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.protected && !userStore.isAuthorized) return { name: 'authentication-sign-in' };

  if (to.meta.authentication && userStore.isAuthorized) return { name: 'index' };
});

export default router;
