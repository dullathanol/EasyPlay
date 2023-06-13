import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePlayStore = defineStore('playStore', () => {
  const Howl = ref();
  const playing = ref(false); //是否正在播放
  const playMode = ref(0); //播放模式
  const volume = ref(0.7); //音量
  const volumeBefore = ref(); //保存音量
  const progress = ref(); //进度条
  const songId = ref(); //歌曲ID
  const songList = ref(); //播放列表
  const currentIndex = ref(); //当前索引
  const shuffleIndex = ref(); //随机索引
  const time = ref(); //歌曲总时长

  const title = computed(() => {
    if (playMode.value == 0) {
      return '顺序播放';
    }
    if (playMode.value == 1) {
      return '单曲循环';
    }
    if (playMode.value == 2) {
      return '随机播放';
    }
    return '顺序播放';
  });

  const src = computed(() => {
    if (songList.value[currentIndex.value]?.picUrl) {
      return songList.value[currentIndex.value].picUrl;
    }
    if (songList.value[currentIndex.value]?.al) {
      return songList.value[currentIndex.value].al.picUrl;
    }
    if (songList.value[currentIndex.value]?.album) {
      return songList.value[currentIndex.value].album.picUrl;
    }
    return '';
  });

  const name = computed(() => {
    if (songList.value[currentIndex.value]?.name) {
      return songList.value[currentIndex.value].name;
    }
    return '';
  });

  const artists = computed(() => {
    if (songList.value[currentIndex.value]?.ar) {
      return songList.value[currentIndex.value].ar;
    }
    if (songList.value[currentIndex.value]?.artists) {
      return songList.value[currentIndex.value].artists;
    }
    if (songList.value[currentIndex.value]?.song.artists) {
      return songList.value[currentIndex.value].song.artists;
    }
    return [];
  });

  return {
    Howl,
    playing,
    playMode,
    volume,
    volumeBefore,
    progress,
    songId,
    songList,
    currentIndex,
    shuffleIndex,
    time,
    title,
    src,
    name,
    artists,
  };
});
