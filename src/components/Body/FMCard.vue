<script setup>
import { ref, computed } from 'vue';
import { getFM } from '@/apis/playlist.js';
import { usePlayStore } from '@/stores/playStore.js';
import { useRouter } from 'vue-router';
import ArtistsName from '@/components/Body/ArtistsName.vue'
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';

const router = useRouter()
const playStore = usePlayStore()

const fm = ref([{}])
const artists = ref([{}])

const loadData = async () => {
    const FM = await getFM()
    fm.value = FM.data
    artists.value = FM.data[0].artists
}

loadData()

const cover = computed(() => {
    return fm.value[0].album?.picUrl ? fm.value[0].album.picUrl : ''
})

const isPlaying = computed(() => {
    return false
})


const goAlbum = () => {
    if (!fm.value[0].album?.id) return
    router.push({ name: 'album', query: { id: fm.value[0].album.id } })
}

const moveToFM = () => {
    playStore.moveToFM()
}

const play = () => {
    playStore.play()
}

const next = () => {
    playStore.next()
}
</script>

<template>
    <div class="fm">
        <img class="cover" :src="cover" @click="goAlbum">
        <div class="right-part">
            <div class="info">
                <div class="title">{{ fm[0].name }}</div>
                <div class="artist">
                    <ArtistsName :artists="artists"></ArtistsName>
                </div>
            </div>
            <div class="controls">
                <div class="buttons">
                    <ButtonIcon title="不喜欢" @click.native="moveToFM">
                        <SvgIcon icon-class="thumbs-down"></SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon :title="isPlaying ? '暂停' : '播放'" @click.native="play">
                        <SvgIcon :icon-class="isPlaying ? 'pause' : 'play'"></SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon title="下一首" @click.native="next">
                        <SvgIcon icon-class="next"></SvgIcon>
                    </ButtonIcon>
                </div>
                <div class="card-name">
                    <SvgIcon icon-class="fm"></SvgIcon>
                    私人FM
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.fm {
    height: 200px;
    padding: 1rem;
    background: var(--color-secondary-bg);
    border-radius: 1rem;
    display: flex;
    box-sizing: border-box;

    .cover {
        height: 100%;
        //裁剪
        clip-path: border-box;
        border-radius: 0.75rem;
        margin-right: 1.2rem;
        user-select: none;
        cursor: pointer;
    }

    .right-part {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: var(--color-text);

        .title {
            font-size: 1.6rem;
            font-weight: 600;
            //弹性伸缩盒子模型
            display: -webkit-box;
            //伸缩盒子对象的子元素的排列方式
            -webkit-box-orient: vertical;
            //块元素包含的文本行数
            -webkit-line-clamp: 2;
            overflow: hidden;
            //任意字符间断行
            word-break: break-all;
        }

        .artist {
            margin-top: 10px;
        }

        .controls {
            display: flex;
            justify-content: space-between;
            align-items: baseline;

            .buttons {
                display: flex;

                .button-icon {
                    margin: 0 8px 0 0;

                    .svg-icon {
                        width: 24px;
                        height: 24px;
                    }
                }
            }

            .card-name {
                font-size: 1rem;
                opacity: 0.18;
                display: flex;
                align-items: center;
                font-weight: 600;
                user-select: none;

                .svg-icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>