import 'virtual:uno.css'

import { createApp } from 'vue'

import App from '@/app.vue'

import pinia from '@/configurations/pinia'
import router from '@/configurations/router'

createApp(App).use(pinia).use(router).mount('#app')
