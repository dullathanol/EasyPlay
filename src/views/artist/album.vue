<script setup>
import ArtistsName from '@/components/Body/ArtistsName.vue';
import TrackList from '@/components/Body/TrackList.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import Detail from '@/components/Body/Detail.vue';
import { useDetailStore } from '@/stores/detailStore.js'
import { getAlbum, getAlbumSub } from '@/apis/artist.js';
import { FormatDate } from '@/utils/common.js'
import { AlbumSublist } from '@/hooks/init.js';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const detailStore = useDetailStore()

const isLike = ref(false)
const album = ref([{}])
const songs = ref([{}])

AlbumSublist(route.query.id).then((value) => {
    console.log(value);
    isLike.value = value
})

const like = (value) => {
    isLike.value = !isLike.value
    getAlbumSub(route.query.id, value)
}

getAlbum(route.query.id).then((Album) => {
    album.value = Album.album
    songs.value = Album.songs
})

</script>

<template>
    <div class="album-page">
        <div class="album-info">
            <div class="left">
                <img :src="album.picUrl">
            </div>
            <div class="right">
                <div class="name">{{ album.name }}</div>
                <div class="artist">
                    <ArtistsName :artists="album.artists"></ArtistsName>
                </div>
                <div class="data-and-count">更新于 {{ FormatDate(album.publishTime) }} · {{ songs.length }} 首歌</div>
                <div class="description" @click="detailStore.showFullDescription = true">{{ album.description }}</div>
                <div class="buttons">
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
        <div class="Tracks">
            <div class="section-title">专辑列表</div>
            <TrackList :playlist="songs"></TrackList>
        </div>
        <Detail v-if="detailStore.showFullDescription" :detail="'专辑介绍'">{{ album.description }}</Detail>
    </div>
</template>

<style lang='less' scoped>
.album-page {
    margin: 64px 10vw 96px 10vw;

    .album-info {
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
            }

            .artist {
                font-size: 16px;
                opacity: 0.88;
                margin: 12px 0;
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

            .buttons {
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
        .section-title {
            font-size: 24px;
            font-weight: 600;
            opacity: 0.88;
            margin-bottom: 16px;
            color: var(--color-text);
        }
    }
}
</style>