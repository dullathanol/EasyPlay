<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/modules/userStore';
  import { getNewSong, getRecommendSong } from '@/apis/modules/resource';

  import TrackList from '@/components/TrackList.vue';

  const userStore = useUserStore();

  const recommendSong = ref<any[]>([]);

  onMounted(async () => {
    if (userStore.login) {
      getRecommendSong().then((RecommendSongs) => {
        recommendSong.value = RecommendSongs.data.dailySongs;
      });
    } else {
      getNewSong().then((Newsong) => {
        recommendSong.value = Newsong.result;
      });
    }
  });
</script>

<template>
  <div>
    <div class="playlist">
      <div class="title">每日歌曲推荐</div>
      <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
    </div>
    <div class="tracklist">
      <TrackList :playlist="recommendSong"></TrackList>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .playlist {
    margin: 128px 0;
    text-align: center;

    .title {
      font-size: 84px;
      line-height: 1.05;
      font-weight: 700;
      letter-spacing: 4px;
      color: var(--color-primary);
    }

    .subtitle {
      font-size: 18px;
      letter-spacing: 1px;
      margin: 28px 0 54px 0;
      color: var(--color-text);
    }
  }
</style>
