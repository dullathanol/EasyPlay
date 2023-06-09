import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDetailStore = defineStore('detailStore', () => {
  const showFullDescription = ref(false);

  return { showFullDescription };
});
