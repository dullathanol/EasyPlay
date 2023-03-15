<script setup>
import ListCover from '@/components/Body/ListCover.vue';
import TrackList from '@/components/Body/TrackList.vue';
import { getSearch } from '@/apis/other.js'
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute()

const active = ref(1)
const songs = ref([{}])
const albums = ref([{}])
const artists = ref([{}])
const playlists = ref([{}])
const userprofiles = ref([{}])
const mvs = ref([{}])

const loadData = (type = 1) => {
    getSearch(route.query.keywords, type).then((Result) => {
        if (type === 1) {
            if (Result.result?.songs) {
                songs.value = Result.result.songs
            } else {
                songs.value = false
            }
        }
        if (type === 10) {
            if (Result.result?.albums) {
                albums.value = Result.result.albums
            } else {
                albums.value = false
            }
        }
        if (type === 100) {
            if (Result.result?.artists) {
                artists.value = Result.result.artists
            } else {
                artists.value = false
            }
        }
        if (type === 1000) {
            if (Result.result?.playlists) {
                playlists.value = Result.result.playlists
            } else {
                playlists.value = false
            }
        }
        if (type === 1002) {
            if (Result.result?.userprofiles) {
                userprofiles.value = Result.result.userprofiles
            } else {
                userprofiles.value = false
            }
        }
        if (type === 1004) {
            if (Result.result?.mvs) {
                mvs.value = Result.result.mvs
            } else {
                mvs.value = false
            }
        }
    })
}

loadData()

watch(() => route.query.keywords, () => {
    loadData()
})

const toggle = (type) => {
    active.value = type
    loadData(type)
}
</script>

<template>
    <div class="search">
        <div class="buttons">
            <div class="button" @click="toggle(1)" :class="{ active: active === 1 }">单曲</div>
            <div class="button" @click="toggle(10)" :class="{ active: active === 10 }">专辑</div>
            <div class="button" @click="toggle(100)" :class="{ active: active === 100 }"> 歌手</div>
            <div class="button" @click="toggle(1000)" :class="{ active: active === 1000 }">歌单</div>
            <div class="button" @click="toggle(1002)" :class="{ active: active === 1002 }">用户</div>
            <div class="button" @click="toggle(1004)" :class="{ active: active === 1004 }">MV</div>
        </div>
        <div class="lists" v-if="active === 1">
            <TrackList :playlist="songs"></TrackList>
        </div>
        <div class="lists" v-if="active === 10">
            <ListCover class="play-row" :list="albums" :type="'albums'"></ListCover>
        </div>
        <div class="lists" v-if="active === 100">
            <ListCover class="play-row" :list="artists" :type="'artists'"></ListCover>
        </div>
        <div class="lists" v-if="active === 1000">
            <ListCover class="play-row" :list="playlists" :type="'playlists'"></ListCover>
        </div>
        <div class="lists" v-if="active === 1002">
            <ListCover class="play-row" :list="userprofiles" :type="'userprofiles'"></ListCover>
        </div>
        <div class="lists" v-if="active === 1004">
            <ListCover class="mv-row" :list="mvs" :type="'mvs'"></ListCover>
        </div>
    </div>
</template>

<style lang='less' scoped>
.search {
    margin: 64px 10vw 96px 10vw;

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
        margin-top: 24px;

        .play-row {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 30px 25px;
        }

        .mv-row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 30px 25px;
        }
    }
}
</style>