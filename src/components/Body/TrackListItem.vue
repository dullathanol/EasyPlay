<script setup>
import ArtistsName from '@/components/Body/ArtistsName.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import { getLike, getLikelist } from '@/apis/user.js'
import { FormatSongTime } from '@/utils/common.js';
import { useUserStore } from '@/stores/userStore.js';
import { usePlayStore } from '@/stores/playStore.js';
import { ref, computed } from 'vue';

const props = defineProps(['playlist'])
const userStore = useUserStore()
const playStore = usePlayStore()

const likelist = ref([{}])

const loadData = async () => {
    const Likelist = await getLikelist(userStore.userId)
    likelist.value = Likelist.ids
}

loadData()

const isLike = computed(() => {
    return likelist.value.includes(props.playlist.id)
})

const like = async (like) => {
    await getLike(props.playlist.id, like)
}
</script>

<template>
    <div class="track" :class="{ active: playStore.songId == playlist.id }">
        <img :src="playlist.al.picUrl">
        <div class="title-and-artist">
            <div class="container">
                <div class="title">
                    {{ playlist.name }}
                </div>
                <div class="artist">
                    <ArtistsName :artists="playlist.ar"></ArtistsName>
                </div>
            </div>
        </div>
        <div class="album">
            <router-link :to="{ name: 'album' }">{{ playlist.al.name }}</router-link>
        </div>
        <div class="actions">
            <button>
                <SvgIcon v-show="!isLike" @click="like('true')" icon-class="heart"></SvgIcon>
                <SvgIcon v-show="isLike" @click="like('false')" icon-class="heart-solid"></SvgIcon>
            </button>
        </div>
        <div class="time">
            {{ FormatSongTime(playlist.dt) }}
        </div>
    </div>
</template>

<style lang='less' scoped>
.track {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 5px 14px;
    margin: 5px 0;
    color: var(--color-text);
    transition: 0.2s;
    user-select: none;

    &:hover {
        background: var(--color-primary-bg-for-transparent);
    }

    &:active {
        transform: scale(0.99);
    }

    &.active {
        background: var(--color-primary-bg-for-transparent);
    }

    img {
        width: 45px;
        height: 45px;
        border-radius: 8px;
        margin-right: 20px;
        cursor: pointer;
    }

    .title-and-artist {
        flex: 1;
        display: flex;

        .container {
            display: flex;
            flex-direction: column;

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

            .artist {
                margin-top: 3px;
                font-size: 13px;
                color: var(--color-text);
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }
    }

    .album {
        flex: 1;
        font-size: 16px;
        opacity: 0.88;
        color: var(--color-text);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .actions {
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px;
            background: transparent;
            border-radius: 25%;
            transition: transform 0.2s;

            .svg-icon {
                height: 16px;
                width: 16px;
                color: var(--color-primary);
            }

            &:hover {
                transform: scale(1.12);
            }

            &:active {
                transform: scale(0.96);
            }
        }
    }

    .time {
        font-size: 16px;
        width: 50px;
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        opacity: 0.88;
        color: var(--color-text);

    }
}
</style>