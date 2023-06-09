<script setup lang="ts">
  import TrackList from '@/components/TrackList.vue';
  import { usePlaylistStore } from '@/stores/modules/playlistStore';
  import { getRecommend } from '@/hooks/playlist';

  const playlistStore = usePlaylistStore();

  getRecommend();
</script>

<template>
  <div>
    <div class="playlist">
      <div class="title">每日歌曲推荐</div>
      <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
    </div>
    <div class="tracklist">
      <TrackList :playlist="playlistStore.recommendSong"></TrackList>
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

  .tracklist {
    margin: 64px 10vw 96px 10vw;
  }
</style>
