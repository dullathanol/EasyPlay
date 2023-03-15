<script setup>
import Detail from '@/components/Body/Detail.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import TrackList from '@/components/Body/TrackList.vue';
import { useDetailStore } from '@/stores/detailStore.js'
import { useUserStore } from '@/stores/userStore.js';
import { useRoute, useRouter } from 'vue-router';
import { getDetail, getSubscribe } from '@/apis/playlist.js'
import { FormatPlayCount, FormatDate } from '@/utils/common.js'
import { ref, computed, watch } from 'vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const detailStore = useDetailStore()

const playlist = ref([{}])

const loadData = async (id) => {
    const Detail = await getDetail(id)
    playlist.value = Detail.playlist
    console.log(playlist.value);
}

loadData(route.query.id)

const creator = computed(() => {
    return playlist.value?.creator?.nickname
})

const isLike = computed(() => {
    return playlist.value.subscribed
})

const like = (value) => {
    playlist.value.subscribed = !playlist.value.subscribed
    getSubscribe(route.query.id, value)
}

watch(router.currentRoute, () => {
    loadData(route.query.id)
});
</script>

<template>
    <div class="playlist" :class="{ active: !route.path.indexOf('/library') }">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverImgUrl">
            </div>
            <div class="info">
                <div class="title">{{ playlist.name }}</div>
                <div class="artist">{{ creator }}</div>
                <div class="data-and-count">更新于 {{ FormatDate(playlist.updateTime) }} · {{ playlist.trackCount }} 首歌</div>
                <div class="count">播放 {{ FormatPlayCount(playlist.playCount) }} 收藏
                    {{ FormatPlayCount(playlist.subscribedCount) }} 分享 {{ FormatPlayCount(playlist.shareCount) }}</div>
                <div class="description" @click="detailStore.showFullDescription = true">
                    {{ playlist.description }}
                </div>
                <div class="buttons" v-if="userStore.login && playlist.userId != userStore.userId">
                    <button v-show="!isLike" @click="like(1)">
                        <SvgIcon icon-class="heart"></SvgIcon>
                        收藏
                    </button>
                    <button v-show="isLike" @click="like(0)">
                        <SvgIcon icon-class="heart-solid"></SvgIcon>
                        以收藏
                    </button>
                </div>
            </div>
        </div>
        <TrackList :playlist="playlist.tracks"></TrackList>
        <Detail v-if="detailStore.showFullDescription" :detail="'歌单介绍'">{{ playlist.description }}</Detail>
    </div>
</template>

<style lang='less' scoped>
.playlist {
    margin: 64px 10vw 96px 10vw;

    .playlist-info {
        display: flex;
        margin-bottom: 72px;
        position: relative;

        .cover {
            flex: 1;

            img {
                width: 100%;
                border-radius: 0.75rem;
                user-select: none;
            }
        }

        .info {
            flex: 3;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 56px;

            .title {
                font-size: 36px;
                font-weight: 700;
                color: var(--color-text);
            }

            .artist {
                font-size: 18px;
                opacity: 0.88;
                color: var(--color-text);
                margin: 12px 0;
            }

            .data-and-count {
                font-size: 14px;
                opacity: 0.88;
                color: var(--color-text);
            }

            .count {
                font-size: 14px;
                opacity: 0.88;
                margin: 12px 0;
                color: var(--color-text);
            }

            .description {
                font-size: 14px;
                opacity: 0.88;
                color: var(--color-text);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }

            .buttons {
                margin: 12px 0 0;

                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
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

                    .svg-icon {
                        margin-right: 6px;
                        color: var(--color-primary);
                    }
                }
            }
        }
    }

    &.active {
        margin: 0;
    }
}
</style>