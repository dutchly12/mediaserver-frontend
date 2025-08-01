import { createApp } from 'vue';

import App from '@/app.vue';

import pinia from '@/configurations/pinia';
import router from '@/configurations/router';
import i18n from '@/configurations/i18n.ts';
import unhead from '@/configurations/unhead.ts';

import { useUserStore } from '@/stores/user.ts';

const app = createApp(App).use(pinia);

const init = async () => {
  const userStore = useUserStore();

  await userStore.loadUser();

  app.use(router).use(i18n).use(unhead);

  await router.isReady();

  app.mount('#app');
};

init();
