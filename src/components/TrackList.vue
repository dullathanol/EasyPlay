<script setup lang="ts">
  import { addSong } from '@/hooks/Player';
  import { usePlayStore } from '@/stores/modules/playStore';

  import TrackListItem from '@/components/TrackListItem.vue';

  const props = defineProps(['playlist']);
  const playStore = usePlayStore();

  const play = (id: number, index: number) => {
    playStore.songList = props.playlist;
    addSong(id, index, true);
  };
</script>

<template>
  <div class="track-list">
    <TrackListItem
      v-for="(item, index) in playlist"
      :key="item.id"
      :playlist="item"
      @dblclick="play(item.id, index)"
    >
    </TrackListItem>
  </div>
</template>

<style lang="less" scoped></style>
