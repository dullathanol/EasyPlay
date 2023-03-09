<script setup>
import TrackListItem from '@/components/Body/TrackListItem.vue';
import { addSong } from '@/hooks/Player.js';
import { usePlayStore } from '@/stores/playStore.js';

const props = defineProps(['playlist'])
const playStore = usePlayStore()

const play = (id, index) => {
    playStore.songList = props.playlist
    console.log(props.playlist);
    addSong(id, index, true)
}

</script>

<template>
    <div class="track-list">
        <TrackListItem v-for="(item, index) in playlist" :key="item.id" :playlist="item"
            @dblclick.native="play(item.id, index)">
        </TrackListItem>
    </div>
</template>

<style lang='less' scoped></style>