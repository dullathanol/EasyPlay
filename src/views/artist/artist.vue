<script setup>
import Detail from '@/components/Body/Detail.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import TrackList from '@/components/Body/TrackList.vue';
import ListCover from '@/components/Body/ListCover.vue';
import { getArtistDetail, getArtistFollow, getArtistSub, getArtistSong, getArtistMv, getArtistAlbum } from '@/apis/artist.js';
import { useDetailStore } from '@/stores/detailStore.js'
import { useUserStore } from '@/stores/userStore.js';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const userStore = useUserStore()
const detailStore = useDetailStore()

const active = ref(1)
const detail = ref([{}])
const follow = ref([{}])
const list = ref([{}])

const like = (value) => {
    follow.value.follow = !follow.value.follow
    getArtistSub(route.query.id, value)
}

const lodaData = () => {
    getArtistDetail(route.query.id).then((Detail) => {
        detail.value = Detail.data
    })

    getArtistFollow(route.query.id).then((Follow) => {
        follow.value = Follow.data
    })

    getArtistSong(route.query.id).then((Song) => {
        list.value = Song.songs
    })
}

lodaData()

const toggle = (type) => {
    active.value = type
    if (type === 1) {
        getArtistSong(route.query.id).then((Song) => {
            list.value = Song.songs
        })
    }
    if (type === 2) {
        getArtistAlbum(route.query.id).then((data) => {
            list.value = data.hotAlbums
        })
    }
    if (type === 3) {
        getArtistMv(route.query.id).then((data) => {
            list.value = data.mvs
        })
    }
}

const artist = computed(() => {
    return detail.value.artist
})

const identify = computed(() => {
    return detail.value.identify
})

const isLike = computed(() => {
    return follow.value.follow
})

watch(() => route.query.id, () => {
    if (route.name == 'artist') {
        lodaData()
    }
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
                <div class="artist">关注：{{ follow.followCnt }} 粉丝：{{ follow.fansCnt }}</div>
                <div class="description" @click="detailStore.showFullDescription = true">{{ artist?.briefDesc }}</div>
                <div class="buttons" v-if="userStore.login">
                    <button v-show="!isLike" @click="like(1)">
                        <SvgIcon icon-class="heart"></SvgIcon>
                        关注
                    </button>
                    <button v-show="isLike" @click="like(0)">
                        <SvgIcon icon-class="heart-solid"></SvgIcon>
                        {{ follow.followDay }}
                    </button>
                </div>
            </div>
        </div>
        <div class="Tracks">
            <div class="buttons">
                <div class="button" @click="toggle(1)" :class="{ active: active === 1 }">歌曲</div>
                <div class="button" @click="toggle(2)" :class="{ active: active === 2 }">专辑</div>
                <div class="button" @click="toggle(3)" :class="{ active: active === 3 }">MV</div>
            </div>
            <div class="lists" v-if="active === 1">
                <TrackList :playlist="list"></TrackList>
            </div>
            <div class="lists" v-if="active === 2">
                <ListCover class="play-row" :list="list" :type="'albums'"></ListCover>
            </div>
            <div class="lists" v-if="active === 3">
                <ListCover class="mv-row" :list="list" :type="'artistmv'"></ListCover>
            </div>
        </div>
        <Detail v-if="detailStore.showFullDescription" :detail="'歌手介绍'">{{ artist?.briefDesc }}</Detail>
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
                font-size: 15px;
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
                margin: 12px 0;

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

    .Tracks {
        .buttons {
            display: flex;
            flex-wrap: wrap;

            .button {
                padding: 8px 16px;
                margin: 10px 16px 6px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: 600;
                border-radius: 8px;
                color: var(--color-text);
                user-select: none;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    background: var(--color-secondary-bg);
                }

                &.active {
                    color: var(--color-primary);

                    .svg-icon {
                        color: var(--color-primary);
                    }
                }
            }
        }

        .lists {
            .links {
                display: flex;
                justify-content: flex-end;
                user-select: none;

                div {
                    font-size: 12px;
                    border-radius: 6px;
                    padding: 6px 10px;
                    margin: 0 5px;
                    color: var(--color-text);
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        background: var(--color-secondary-bg-for-transparent);
                    }

                    &:active {
                        transform: scale(0.92);
                        transition: 0.2s;
                    }

                    &.active {
                        background: var(--color-secondary-bg-for-transparent);
                    }
                }
            }
        }

        .play-row {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 30px 25px;
            margin-top: 20px;
        }

        .mv-row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 30px 25px;
            margin-top: 20px;
        }
    }
}
</style>