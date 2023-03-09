<script setup>
import { ref, computed } from 'vue';
import { getLikelist } from '@/apis/user.js'
import { usePlayStore } from '@/stores/playStore.js';
import { useUserStore } from '@/stores/userStore.js';
import { FormatTrackTime } from '@/utils/common.js';
import { startMusic, pauseMusic, playLast, playNext, changePlayMode, mute } from '@/hooks/Player.js';
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import ArtistsName from '@/components/Body/ArtistsName.vue';
import VueSlider from 'vue-slider-component';
import '@/assets/css/slider.css'

const playStore = usePlayStore()
const userStore = useUserStore()

const likelist = ref([{}])

const loadData = async () => {
    const Likelist = await getLikelist(userStore.userId)
    likelist.value = Likelist.ids
}

loadData()

const isLike = computed(() => {
    return likelist.value.includes(playStore.songId)
})

const title = computed(() => {
    if (playStore.playMode == 0) {
        return '顺序播放'
    }
    if (playStore.playMode == 1) {
        return '单曲循环'
    }
    if (playStore.playMode == 2) {
        return '随机播放'
    }
})

const progress = computed({
    get() {
        return playStore.progress;
    },
    set(value) {
        playStore.Howl.seek(value)
    }
})

const volume = computed({
    get() {
        return playStore.volume;
    },
    set(value) {
        playStore.volume = value
        playStore.Howl.volume(value)
    }
})
</script>

<template>
    <div class="player">
        <div class="progress-bar">
            <VueSlider v-model="progress" :min="0" :max="playStore.time" :interval="1" :drag-on-click="true" :duration="0"
                :dot-size="12" :height="2" :tooltip-formatter="FormatTrackTime" :silent="true"></VueSlider>
        </div>
        <div class="controls">
            <div class="playing">
                <div class="container">
                    <img :src="playStore.songList[playStore.currentIndex]?.al.picUrl">
                    <div class="track-info">
                        <div class="name">{{ playStore.songList[playStore.currentIndex]?.name }}</div>
                        <div class="artist">
                            <ArtistsName :artists="playStore.songList[playStore.currentIndex]?.ar"></ArtistsName>
                        </div>
                    </div>
                    <div class="like-button">
                        <ButtonIcon v-show="playStore.songList[playStore.currentIndex]">
                            <SvgIcon v-show="!isLike" icon-class="heart"></SvgIcon>
                            <SvgIcon v-show="isLike" icon-class="heart-solid"></SvgIcon>
                        </ButtonIcon>
                    </div>
                </div>
            </div>
            <div class="middle-control-buttons">
                <div class="container">
                    <ButtonIcon title="上一首" @click="playLast">
                        <SvgIcon icon-class="previous"></SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon :title="playStore.playing ? '暂停' : '播放'" class="play">
                        <SvgIcon v-show="!playStore.playing" icon-class="play" @click="startMusic"></SvgIcon>
                        <SvgIcon v-show="playStore.playing" icon-class="pause" @click="pauseMusic"></SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon title="下一首" @click="playNext">
                        <SvgIcon icon-class="next"></SvgIcon>
                    </ButtonIcon>
                </div>
            </div>
            <div class="right-control-buttons">
                <div class="container">
                    <ButtonIcon title="播放列表">
                        <SvgIcon icon-class="list"></SvgIcon>
                    </ButtonIcon>
                    <ButtonIcon :title="title" @click="changePlayMode">
                        <SvgIcon v-show="playStore.playMode == 0" icon-class="repeat"></SvgIcon>
                        <SvgIcon v-show="playStore.playMode == 1" icon-class="repeat-1"></SvgIcon>
                        <SvgIcon v-show="playStore.playMode == 2" icon-class="shuffle"></SvgIcon>
                    </ButtonIcon>
                    <div class="volume-control">
                        <ButtonIcon title="静音" @click="mute">
                            <SvgIcon v-show="playStore.volume > 0.5" icon-class="volume"></SvgIcon>
                            <SvgIcon v-show="playStore.volume == 0" icon-class="volume-mute"></SvgIcon>
                            <SvgIcon v-show="playStore.volume <= 0.5 && playStore.volume != 0" icon-class="volume-half">
                            </SvgIcon>
                        </ButtonIcon>
                        <div class="volume-bar">
                            <VueSlider v-model="volume" :min="0" :max="1" :interval="0.01" :drag-on-click="true"
                                :duration="0" tooltip="none" :dot-size="12" :silent="true"></VueSlider>
                        </div>
                    </div>
                    <ButtonIcon title="歌词">
                        <SvgIcon icon-class="arrow-up"></SvgIcon>
                    </ButtonIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    backdrop-filter: saturate(180%) blur(30px);
    background: var(--color-navbar-bg);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .progress-bar {
        margin-top: -6px;
        margin-bottom: -6px;
        width: 100%;
        cursor: pointer;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0 10vw;

        .playing {
            flex: 2;

            .container {
                display: flex;
                align-items: center;

                img {
                    width: 45px;
                    border-radius: 5px;
                    cursor: pointer;
                    user-select: none;
                }

                .track-info {
                    height: 45px;
                    margin-left: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .name {
                        font-weight: 600;
                        font-size: 16px;
                        opacity: 0.88;
                        color: var(--color-text);
                        margin-bottom: 4px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        word-break: break-all;
                    }

                    .artist {
                        font-size: 12px;
                        opacity: 0.58;
                        color: var(--color-text);
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        word-break: break-all;

                    }
                }

                .like-button {
                    margin-left: 16px;

                    .svg-icon {
                        color: var(--color-primary);
                    }
                }
            }
        }

        .middle-control-buttons {
            flex: 1;

            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 8px;

                .button-icon {
                    margin: 0 8px;
                }

                .play {
                    height: 42px;
                    width: 42px;

                    .svg-icon {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }

        .right-control-buttons {
            flex: 2;

            .container {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                .button-icon {
                    margin-left: 12px;

                    .svg-icon .active {
                        color: var(--color-primary);
                    }
                }

                .volume-control {
                    margin-left: 4px;
                    display: flex;
                    align-items: center;

                    .volume-bar {
                        width: 84px;
                    }
                }
            }
        }
    }
}
</style>