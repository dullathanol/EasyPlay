<script setup>
import TrackList from '@/components/Body/TrackList.vue';
import { usePlaylistStore } from '@/stores/playlistStore.js';

const playlistStore = usePlaylistStore()

console.log(playlistStore.recommendSong);
</script>

<template>
    <div>
        <div class="playlist">
            <div class="title">每日歌曲推荐</div>
            <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
        </div>
        <!-- <TrackList :playlist="playlistStore.recommendSong"></TrackList> -->
    </div>
</template>

<style lang='less' scoped>
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