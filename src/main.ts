import 'virtual:svg-icons-register';
import 'ant-design-vue/dist/antd.css';
import '@/styles/index.less';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import pinia from './stores';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');