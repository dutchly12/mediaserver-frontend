import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import App from '@/app.vue';

import pinia from '@/configurations/pinia';
import router from '@/configurations/router';
import i18n from '@/configurations/i18n.ts';
import unhead from '@/configurations/unhead.ts';

import { useUserStore } from '@/stores/user.ts';

const app = createApp(App).use(pinia);

const userStore = useUserStore();

userStore.loadUser().finally(() => {
  app.use(router).use(i18n).use(unhead).mount('#app');
});
