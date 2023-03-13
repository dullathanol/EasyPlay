<script setup>
import TrackList from '@/components/Body/TrackList.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import { getAccount, getRecord } from '@/apis/user.js';
import { useUserStore } from '@/stores/userStore.js';
import { useRoute, useRouter } from 'vue-router';
import { FormatDate } from '@/utils/common.js'
import { getPlaylist } from '@/apis/user.js';
import { getLogout } from '@/apis/login.js'
import { ref, watch } from 'vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const show = ref(false)
const trackActive = ref(null)
const changeActive = ref(1)
const playlist = ref([{}])
const account = ref([{}])
const record = ref([])

const id = localStorage.getItem('userId')

getPlaylist(id).then((Playlist) => {
    playlist.value = Playlist.playlist
})

getAccount().then((Account) => {
    account.value = Account.profile
})

const loadData = (type = 1) => {
    if (type == 0) {
        getRecord(id, type).then((Data) => {
            Data.allData.forEach(song => {
                record.value.push(song.song)
            });
        })
    } else {
        getRecord(id, type).then((Data) => {
            Data.weekData.forEach(song => {
                record.value.push(song.song)
            });
        })
    }
}

loadData()

const change = (type) => {
    record.value = []
    changeActive.value = type
    loadData(type)
}

const go = (id) => {
    show.value = true
    trackActive.value = id
    router.push({ name: 'likelist', query: { id: id } })
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
            <div class="track" v-for="item in playlist" @click="go(item.id)" :class="{ active: item.id === trackActive }">
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
                    <div class="data-and-count">注册于 {{ FormatDate(account.createTime) }}</div>
                    <div class="description">{{ account.description }}</div>
                </div>
            </div>
            <div class="Tracks">
                <div class="section-title">
                    <div class="title">听歌排行</div>
                    <div class="links">
                        <div @click="change(1)" :class="{ active: changeActive == 1 }">最近一周</div>
                        <div @click="change(0)" :class="{ active: changeActive == 0 }">所有时间</div>
                    </div>
                </div>
                <TrackList :playlist="record"></TrackList>
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
                img {
                    height: 200px;
                    width: 200px;
                    border-radius: 10px;
                    margin-right: 56px;
                }
            }

            .right {
                width: 100%;

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

                .data-and-count {
                    margin: 12px 0;
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
            .section-title {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {

                    font-size: 24px;
                    font-weight: 600;
                    opacity: 0.88;
                    margin-bottom: 16px;
                    color: var(--color-text);
                }

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
        }
    }

    .library-view {
        flex: 7;
        margin-left: 250px;
    }
}
</style>