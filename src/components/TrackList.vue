<script setup lang="ts">
  import { addSong } from '@/hooks/Player';
  import { usePlayStore } from '@/stores/modules/playStore';

  import TrackListItem from '@/components/TrackItem.vue';

  const playStore = usePlayStore();

  const props = defineProps(['playlist']);

  const play = (id: number, index: number) => {
    playStore.songList = props.playlist;
    addSong(id, index, true);
  };
</script>

<template>
  <TrackListItem
    v-for="(item, index) in playlist"
    :key="item.id"
    :playlist="item"
    @dblclick="play(item.id, index)"
  >
  </TrackListItem>
</template>
