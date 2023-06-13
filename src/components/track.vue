<script setup lang="ts">
  import TrackList from '@/components/TrackList.vue';
  import { usePlayStore } from '@/stores/modules/playStore';

  const playStore = usePlayStore();
</script>

<template>
  <div class="track">
    <h1>播放列表</h1>
    <TrackList :playlist="playStore.songList"></TrackList>
  </div>
</template>

<style lang="less" scoped>
  .track {
    h1 {
      margin: 24px;
      color: var(--color-text);
    }
  }
</style>
