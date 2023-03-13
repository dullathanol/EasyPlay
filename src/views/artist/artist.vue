<script setup>
import Detail from '@/components/Body/Detail.vue';
import TrackList from '@/components/Body/TrackList.vue';
import { getArtistDetail, getArtistFollow, getArtistSong, getArtistSub } from '@/apis/artist.js';
import { useDetailStore } from '@/stores/detailStore.js'
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const detailStore = useDetailStore()

const detail = ref([{}])
const follow = ref([{}])
const song = ref([{}])

const lodaData = () => {
    getArtistDetail(route.query.id).then((Detail) => {
        detail.value = Detail.data
    })

    getArtistFollow(route.query.id).then((Follow) => {
        follow.value = Follow.data
    })

    getArtistSong(route.query.id).then((Song) => {
        song.value = Song.songs
    })
}

lodaData()

const artist = computed(() => {
    return detail.value.artist
})

const identify = computed(() => {
    return detail.value.identify
})

watch(() => route.query.id, () => {
    lodaData()
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
                <div class="artist">{{ identify?.imageDesc }}</div>
                <div class="description" @click="detailStore.showFullDescription = true">{{ artist?.description }}</div>
                <div class="buttons">
                    <button>关注</button>
                </div>
            </div>
        </div>
        <div class="popularTracks">
            <div class="section-title">热门歌曲</div>
            <TrackList :playlist="song"></TrackList>
        </div>
        <Detail v-if="detailStore.showFullDescription" :detail="'歌手介绍'">{{ artist?.description }}</Detail>
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
                font-size: 36px;
                font-weight: 700;

                .alias {
                    display: inline-block;
                    font-weight: normal;
                    font-size: 16px;
                    opacity: 0.88;

                    span {
                        margin-right: 12px;
                    }
                }
            }

            .artist {
                font-size: 16px;
                opacity: 0.88;
                margin: 12px 0;
            }

            .description {
                font-size: 14px;
                opacity: 0.88;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }

            .buttons {
                display: flex;
                margin: 12px 0;

                button {
                    font-size: 15px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    color: var(--color-text);
                    background-color: var(--color-secondary-bg-for-transparent);
                    user-select: none;
                    transition: 0.2s;

                    &:hover {
                        transform: scale(1.06);
                    }

                    &:active {
                        transform: scale(0.94);
                    }
                }
            }
        }
    }

    .popularTracks {
        .section-title {
            font-size: 24px;
            font-weight: 600;
            opacity: 0.88;
            margin-bottom: 16px;
            color: var(--color-text);
        }
    }
}
</style>