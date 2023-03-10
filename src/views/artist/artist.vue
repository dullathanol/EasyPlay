<script setup>
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import TrackList from '@/components/Body/TrackList.vue';
import { getArtistDetail, getArtistFollow, getArtistSong } from '@/apis/artist.js';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute()

const showMorePopTracks = ref(false)
const detail = ref([{}])
const follow = ref([{}])
const song = ref([{}])

getArtistDetail(route.query.id).then((Detail) => {
    detail.value = Detail.data
})

getArtistFollow(route.query.id).then((Follow) => {
    follow.value = Follow.data
})

getArtistSong(route.query.id).then((Song) => {
    song.value = Song.songs
})

const artist = computed(() => {
    return detail.value.artist
})

</script>

<template>
    <div class="artist-page">
        <div class="artist-info">
            <div class="left">
                <img :src="artist?.cover">
            </div>
            <div class="right">
                <div class="name">{{ artist?.name }}</div>
                <div class="artist" v-for="item in artist?.identifyTag">{{ item }}</div>
                <div class="statistics">
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>
                <div class="description">{{ artist.briefDesc }}</div>
                <div class="buttons">
                    <ButtonIcon>关注</ButtonIcon>
                </div>
            </div>
        </div>
        <div class="popularTracks">
            <div class="section-title"></div>
            <TrackList></TrackList>
            <div class="show-more">
                <button @click="showMorePopTracks = !showMorePopTracks">
                    <span v-show="!showMorePopTracks">更多</span>
                    <span v-show="showMorePopTracks">收起</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.artist-page {
    margin: 64px 10vw 96px 10vw;

    .artist-info {
        display: flex;
        align-items: center;
        margin-bottom: 26px;
        color: var(--color-text);

        .left {
            img {
                height: 250px;
                width: 250px;
                border-radius: 10px;
                margin-right: 56px;
            }
        }

        .right {
            .name {
                font-size: 56px;
                font-weight: 700;
            }

            .artist {
                font-size: 18px;
                opacity: 0.88;
                margin: 12px 0;
            }

            .statistics {
                font-size: 16px;
                font-weight: 700;
            }

            .description {
                font-size: 14px;
                opacity: 0.88;
                margin: 12px 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .buttons {
                
            }
        }
    }
}</style>