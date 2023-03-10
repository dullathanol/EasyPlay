<script setup>
import { getPlaylist } from '@/apis/user.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute()
const router = useRouter()

const playlist = ref([{}])
const show = ref(false)
const active = ref(null)

getPlaylist(localStorage.getItem('userId')).then((Playlist)=>{
    playlist.value = Playlist.playlist
    show.value = true
})

const go = (id) => {
    active.value = id
    router.push({ path: '/library/likelist', query: { id: id } })
}

watch(route, () => {
    if (route.path !== '/library/likelist') {
        active.value = null
    }
});

</script>

<template>
    <div class="library" v-if="show">
        <div class="library-row">
            <div class="track" v-for="item in playlist" @click="go(item.id)" :class="{ active: item.id === active }">
                <img :src="item.coverImgUrl">
                <div class="title">{{ item.name }}</div>
            </div>
        </div>
        <div class="library-view">
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

    .library-view {
        flex: 7;
        margin-left: 250px;
    }
}
</style>