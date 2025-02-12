import { createRouter, createWebHistory } from 'vue-router';

import main from '@/configurations/routes/main.ts';
import authentication from '@/configurations/routes/authentication.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...main, ...authentication],
});

export default router;
