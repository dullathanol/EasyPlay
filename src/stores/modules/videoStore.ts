import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useVideoStore = defineStore('videoStore', () => {
  const Plyr = ref(null);
  const detail = ref([{}]); //视频详情
  const simi = ref([{}]); //相关视频

  return { Plyr, detail, simi };
});
