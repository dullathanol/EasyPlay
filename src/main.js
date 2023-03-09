import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/utils/pinia.js'

import 'virtual:svg-icons-register'
import '@/assets/css/global.less'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
