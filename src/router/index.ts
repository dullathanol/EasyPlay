import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/userStore';

import routes from './modules/routes';

const userStore = useUserStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.name === 'library' && !userStore.login) {
    return { name: 'login' };
  }
});

export default router;
