<script setup>
import TrackList from '@/components/Body/TrackList.vue';
import ListCover from '@/components/Body/ListCover.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import { getArtistSublist, getAlbumSublist } from '@/apis/artist.js';
import { getMvSublist } from '@/apis/mvlist.js';
import { getUserFollow } from '@/apis/user.js';
import { getAccount, getRecord } from '@/apis/user.js';
import { useUserStore } from '@/stores/userStore.js';
import { useRoute, useRouter } from 'vue-router';
import { FormatDate } from '@/utils/common.js'
import { getPlaylist } from '@/apis/user.js';
import { getLogout } from '@/apis/login.js'
import { ref, computed, watch } from 'vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const id = localStorage.getItem('userId')

const trackActive = ref(null)
const changeActive = ref(1)
const playlist = ref([{}])
const account = ref([{}])
const list = ref([{}])
const record = ref([{}])
const show = ref(false)
const active = ref(1)

getPlaylist(id).then((Playlist) => {
    playlist.value = Playlist.playlist
})

getAccount().then((Account) => {
    account.value = Account.profile
})

const loadData = (type = 1) => {
    if (type == 0) {
        getRecord(id, type).then((Data) => {
            record.value = Data.allData.map(song => song.song);
        })
    } else {
        getRecord(id, type).then((Data) => {
            record.value = Data.weekData.map(song => song.song);
        })
    }
}

loadData()

const userlist = computed(() => {
    return playlist.value.filter(list => list.userId == userStore.userId)
})

const sublist = computed(() => {
    return playlist.value.filter(list => list.userId != userStore.userId)
})

const change = (type) => {
    changeActive.value = type
    loadData(type)
}

const go = (id) => {
    show.value = true
    trackActive.value = id
    router.push({ name: 'likelist', query: { id: id } })
}

const toggle = (type) => {
    active.value = type
    if (type === 3) {
        getAlbumSublist().then((data) => {
            list.value = data.data
        })
    }
    if (type === 4) {
        getArtistSublist().then((data) => {
            list.value = data.data
        })
    }
    if (type === 5) {
        getUserFollow(id).then((follow) => {
            list.value = follow.follow
        })
    }
    if (type === 6) {
        getMvSublist().then((data) => {
            list.value = data.data
        })
    }
}

const logout = () => {
    getLogout().then((result) => {
        if (result.code == 200) {
            localStorage.clear()
            userStore.login = false
            userStore.cookie = null
            userStore.userDetail = null
            router.push('/')
        }
    })
}

watch(route, () => {
    if (route.path !== '/library/likelist') {
        show.value = false
        trackActive.value = null
    }
});
</script>

<template>
    <div class="library">
        <div class="library-row">
            <div class="track" v-for="item in userlist" @click="go(item.id)" :class="{ active: item.id === trackActive }">
                <img :src="item.coverImgUrl">
                <div class="title">{{ item.name }}</div>
            </div>
        </div>
        <div class="user-page" v-if="!show">
            <div class="user-info">
                <div class="left">
                    <img :src="account.avatarUrl">
                </div>
                <div class="right">
                    <div class="user">
                        <div class="name">{{ account.nickname }}</div>
                        <div class="logout" @click="logout">
                            <SvgIcon icon-class="logout"></SvgIcon>
                        </div>
                    </div>
                    <div class="artist">等级：{{ userStore.userDetail.level }} 级</div>
                    <div class="artist">听歌：{{ userStore.userDetail.listenSongs }} 首</div>
                    <div class="artist">关注：{{ userStore.userDetail.profile?.follows }} 粉丝：{{
                        userStore.userDetail.profile?.followeds }}</div>
                    <div class="data-and-count">注册于 {{ FormatDate(account.createTime) }}</div>
                    <div class="description">{{ account.description }}</div>
                </div>
            </div>
            <div class="Tracks">
                <div class="buttons">
                    <div class="button" @click="toggle(1)" :class="{ active: active === 1 }">听歌排行</div>
                    <div class="button" @click="toggle(2)" :class="{ active: active === 2 }">收藏歌单</div>
                    <div class="button" @click="toggle(3)" :class="{ active: active === 3 }">收藏专辑</div>
                    <div class="button" @click="toggle(4)" :class="{ active: active === 4 }">关注歌手</div>
                    <div class="button" @click="toggle(5)" :class="{ active: active === 5 }">关注用户</div>
                    <div class="button" @click="toggle(6)" :class="{ active: active === 6 }">收藏MV</div>
                </div>
                <div class="lists" v-if="active === 1">
                    <div class="links">
                        <div @click="change(1)" :class="{ active: changeActive == 1 }">最近一周</div>
                        <div @click="change(0)" :class="{ active: changeActive == 0 }">所有时间</div>
                    </div>
                    <TrackList :playlist="record"></TrackList>
                </div>
                <div class="lists" v-if="active === 2">
                    <ListCover class="play-row" :list="sublist" :type="'playlists'"></ListCover>
                </div>
                <div class="lists" v-if="active === 3">
                    <ListCover class="play-row" :list="list" :type="'albums'"></ListCover>
                </div>
                <div class="lists" v-if="active === 4">
                    <ListCover class="play-row" :list="list" :type="'artists'"></ListCover>
                </div>
                <div class="lists" v-if="active === 5">
                    <ListCover class="play-row" :list="list" :type="'userprofiles'"></ListCover>
                </div>
                <div class="lists" v-if="active === 6">
                    <ListCover class="mv-row" :list="list" :type="'submv'"></ListCover>
                </div>
            </div>
        </div>
        <div class="library-view" v-if="show">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang='less' scoped>
.library {
    margin: 64px 10vw 96px 10vw;
    display: flex;

    .library-row {
        flex: 2;
        position: fixed;
        left: 10vw;
        top: 64px;
        bottom: 96px;

        .track {
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 5px 14px;
            margin: 5px 0;
            color: var(--color-text);
            transition: 0.2s;
            user-select: none;
            cursor: pointer;

            &:hover {
                background: var(--color-primary-bg-for-transparent);
            }

            &:active {
                transform: scale(0.99);
            }

            img {
                width: 45px;
                height: 45px;
                border-radius: 8px;
                margin-right: 20px;
                cursor: pointer;
            }

            .title {
                font-size: 16px;
                font-weight: 600;
                color: var(--color-text);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                word-break: break-all;
            }

            &.active {
                background: var(--color-primary-bg-for-transparent);
            }
        }
    }

    .user-page {
        flex: 7;
        margin-left: 250px;

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
                padding-left: 24px;

                .user {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .name {
                        font-size: 36px;
                        font-weight: 700;
                    }

                    .logout {
                        .svg-icon {
                            width: 24px;
                            height: 24px;
                            vertical-align: middle;
                            user-select: none;
                            cursor: pointer;
                        }
                    }
                }

                .artist {
                    margin: 12px 0;
                    font-size: 15px;
                    opacity: 0.88;
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
                    margin: 12px 0;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
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

    .library-view {
        flex: 7;
        margin-left: 250px;
    }
}
</style>