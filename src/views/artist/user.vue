<script setup>
import Detail from '@/components/Body/Detail.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import ListCover from '@/components/Body/ListCover.vue';
import { useDetailStore } from '@/stores/detailStore.js'
import { useUserStore } from '@/stores/userStore.js';
import { getUserDetail, getFollow, getPlaylist } from '@/apis/user.js';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute()
const userStore = useUserStore()
const detailStore = useDetailStore()

const active = ref(1)
const detail = ref([{}])
const playlist = ref([{}])

getUserDetail(route.query.id).then((Detail) => {
    detail.value = Detail
})

getPlaylist(route.query.id).then((Playlist) => {
    playlist.value = Playlist.playlist
})

const userlist = computed(() => {
    return playlist.value.filter(list => list.userId == route.query.id)
})

const sublist = computed(() => {
    return playlist.value.filter(list => list.userId != route.query.id)
})

const profile = computed(() => {
    return detail.value.profile
})

const isLike = computed(() => {
    return detail.value.profile?.followed
})

const like = (value) => {
    detail.value.profile.followed = !detail.value.profile.followed
    getFollow(route.query.id, value)
}
</script>

<template>
    <div class="user-page">
        <div class="user-info">
            <div class="left">
                <img :src="profile?.avatarUrl">
            </div>
            <div class="right">
                <div class="name">{{ profile?.nickname }}</div>
                <div class="artist" v-if="profile?.artistName">歌手：{{ profile?.artistName }}</div>
                <div class="artist">等级：{{ detail.level }} 级</div>
                <div class="artist">听歌：{{ detail.listenSongs }} 首</div>
                <div class="artist">关注：{{ profile?.follows }} 粉丝：{{ profile?.followeds }}</div>
                <div class="description" @click="detailStore.showFullDescription = true">{{ profile?.signature }}</div>
                <div class="buttons" v-if="userStore.login">
                    <button v-show="!isLike" @click="like(1)">
                        <SvgIcon icon-class="heart"></SvgIcon>
                        关注
                    </button>
                    <button v-show="isLike" @click="like(0)">
                        <SvgIcon icon-class="heart-solid"></SvgIcon>
                        以关注
                    </button>
                </div>
            </div>
        </div>
        <div class="Tracks">
            <div class="buttons">
                <div class="button" @click="active = 1" :class="{ active: active === 1 }">用户歌单</div>
                <div class="button" @click="active = 2" :class="{ active: active === 2 }">收藏歌单</div>
            </div>
            <div class="lists" v-if="active === 1">
                <ListCover class="play-row" :list="userlist" :type="'playlists'"></ListCover>
            </div>
            <div class="lists" v-if="active === 2">
                <ListCover class="play-row" :list="sublist" :type="'playlists'"></ListCover>
            </div>
        </div>
        <Detail v-if="detailStore.showFullDescription" :detail="'个性签名'">{{ profile?.signature }}</Detail>
    </div>
</template>

<style lang='less' scoped>
.user-page {
    margin: 64px 10vw 96px 10vw;

    .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 26px;
        color: var(--color-text);

        .left {
            flex: 2;

            img {
                width: 100%;
                border-radius: 10px;
            }
        }

        .right {
            flex: 7;
            margin-left: 56px;

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
                    background-color: var(--color-panel-bg);
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
            .play-row {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 30px 25px;
                margin-top: 20px;
            }
        }
    }
}
</style>