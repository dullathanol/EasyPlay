import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
  const login = ref(false);
  const userId = ref();
  const cookie = ref();
  const userDetail = ref();

  const avatarUrl = computed(() => {
    return userDetail.value.profile.avatarUrl;
  });

  return { login, userId, cookie, userDetail, avatarUrl };
});
