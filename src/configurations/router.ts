import { createRouter, createWebHistory } from 'vue-router';

import authentication from '@/configurations/routes/authentication.ts';
import main from '@/configurations/routes/main.ts';
import people from '@/configurations/routes/people.ts';
import tags from '@/configurations/routes/tags.ts';
import videos from '@/configurations/routes/videos.ts';

import { useUserStore } from '@/stores/user.ts';

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
