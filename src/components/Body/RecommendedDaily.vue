<script setup>
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
import { usePlayStore } from '@/stores/playStore.js';
import { getRecommendSongs } from '@/apis/user.js';

const router = useRouter()
const userStore = useUserStore()
const playStore = usePlayStore()

const songs = ref([{}])

const loadData = async () => {
    const RecommendSongs = await getRecommendSongs()
    songs.value = RecommendSongs.data.dailySongs
}

loadData()

const goToDailyTracks = () => {
    if (userStore.login) {
        router.push({ name: 'dailySongs' })
    } else {
        userStore.loginTip = true
    }
}

const coverUrl = computed(() => {
    let index = Math.floor((Math.random() * songs.value.length));
    return songs.value[index]?.al?.picUrl
})

const playDailyTracks = () => {
    if (userStore.login) {
        playStore.playlist = songs[0].value
    } else {
        userStore.loginTip = true
    }
}
</script>

<template>
    <div class="recommended-daily" @click="goToDailyTracks">
        <img :src="coverUrl">
        <div class="container">
            <div class="title-box">
                <div class="title">
                    <span>每</span>
                    <span>日</span>
                    <span>推</span>
                    <span>荐</span>
                </div>
            </div>
        </div>
        <button class="play-button" @click.stop="playDailyTracks">
            <SvgIcon icon-class="play"></SvgIcon>
        </button>
    </div>
</template>

<style lang='less' scoped>
.recommended-daily {
    height: 200px;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        animation: move 30s alternate infinite;
        z-index: -1;
    }

    .container {
        width: 50%;
        height: 200px;
        display: flex;
        align-items: center;

        .title-box {
            height: 150px;
            width: 150px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 25px;
            user-select: none;

            .title {
                height: 100%;
                width: 100%;
                font-weight: 600;
                font-size: 64px;
                line-height: 50px;
                opacity: 0.96;
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-items: center;
                place-items: center;
            }
        }
    }

    .play-button {
        // 图形效果  // 高斯模糊
        backdrop-filter: blur(8px);
        color: white;
        position: absolute;
        right: 1.6rem;
        bottom: 1.4rem;
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        width: 45px;
        transition: 0.2s;

        .svg-icon {
            height: 16px;
            width: 16px;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.44);
        }

        &:active {
            transform: scale(0.94);
        }
    }
}

@keyframes move {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
}
</style>