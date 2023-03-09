<script setup>
import Cover from '@/components/Body/Cover.vue';
import TrackList from '@/components/Body/TrackList.vue';
import Detail from '@/components/Body/Detail.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import { getDetail } from '@/apis/playlist.js'
import { FormatDate } from '@/utils/common.js'
import { useDetailStore } from '@/stores/detailStore.js'
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';

const route = useRoute()
const router = useRouter()
const detailStore = useDetailStore()

const playlist = ref([{}])

const loadData = async (id) => {
    const Detail = await getDetail(id)
    playlist.value = Detail.playlist
}

loadData(route.query.id)

watch(router.currentRoute, () => {
    loadData(route.query.id)
});

const creator = computed(() => {
    return playlist.value?.creator?.nickname
})

const play = () => {

}

const heart = () => {

}
</script>

<template>
    <div class="playlist" :class="{ active: !route.path.indexOf('/library') }">
        <div class="playlist-info">
            <div class="cover">
                <Cover :item="playlist" :type="'coverImgUrl'"></Cover>
            </div>
            <div class="info">
                <div class="title">{{ playlist.name }}</div>
                <div class="artist">{{ creator }}</div>
                <div class="data-and-count">更新于 {{ FormatDate(playlist.updateTime) }} · {{ playlist.trackCount }} 首歌</div>
                <div class="description" @click="detailStore.showFullDescription = true">
                    {{ playlist.description }}
                </div>
                <div class="buttons">
                    <button>
                        <SvgIcon icon-class="play" @click="play"></SvgIcon>
                    </button>
                    <button>
                        <SvgIcon :icon-class="detailStore.subscribed ? 'heart-solid' : 'heart'" @click="heart"></SvgIcon>
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
                margin: 24px 0;
                color: var(--color-text);
            }

            .data-and-count {
                font-size: 14px;
                opacity: 0.88;
                color: var(--color-text);
            }

            .description {
                font-size: 14px;
                opacity: 0.88;
                margin: 24px 0;
                color: var(--color-text);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }

            .buttons {
                display: flex;

                button {
                    height: 40px;
                    min-width: 40px;
                    margin-right: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 18px;
                    line-height: 18px;
                    font-weight: 600;
                    border-radius: 8px;
                    background-color: var(--color-secondary-bg-for-transparent);
                    user-select: none;
                    transition: 0.2s;

                    .svg-icon {
                        width: 16px;
                        height: 16px;

                    }

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

    &.active {
        margin: 0;
    }
}
</style>