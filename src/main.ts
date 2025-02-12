import { createApp } from 'vue'

import App from './App.vue'

import pinia from '@/configurations/pinia'
import router from '@/configurations/router'

createApp(App).use(pinia).use(router).mount('#app')
