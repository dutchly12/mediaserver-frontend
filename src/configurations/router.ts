import { createRouter, createWebHistory } from 'vue-router';

import authentication from '@/configurations/routes/authentication';
import main from '@/configurations/routes/main';
import people from '@/configurations/routes/people';
import tags from '@/configurations/routes/tags';
import videos from '@/configurations/routes/videos';

import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authentication, ...main, ...people, ...tags, ...videos],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.protected && !userStore.isAuthorized) return { name: 'authentication-sign-in' };

  if (to.meta.authentication && userStore.isAuthorized) return { name: 'index' };
});

export default router;
