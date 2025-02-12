import '@unocss/reset/normalize.css';
import 'virtual:uno.css';

import { createApp } from 'vue';

import App from '@/app.vue';

import pinia from '@/configurations/pinia';
import router from '@/configurations/router';
import i18n from '@/configurations/i18n.ts';
import unhead from '@/configurations/unhead.ts';

createApp(App).use(pinia).use(router).use(i18n).use(unhead).mount('#app');
