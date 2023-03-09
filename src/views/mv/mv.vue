<script setup>
import ArtistsName from '@/components/Body/ArtistsName.vue'
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import MvListCover from '@/components/Body/MvListCover.vue';
import { useVideoStore } from '@/stores/videoStore.js'
import { play, getVideo } from '@/hooks/Video.js'
import { FormatPlayCount } from '@/utils/common.js'
import { useRoute } from 'vue-router';
import { watch, onMounted } from 'vue';
import 'plyr/dist/plyr.css';

const route = useRoute()
const videoStore = useVideoStore()

getVideo(route.query.id)

watch(() => route.query.id, () => {
    if (route.query.id) {
        getVideo(route.query.id)
    }
});

onMounted(() => {
    play()
})
</script>

<template>
    <div class="mv-page">
        <div class="current-video">
            <div class="video">
                <video id="player" class="plyr" playsinline controls></video>
            </div>
            <div class="video-info">
                <div class="title">
                    {{ videoStore.detail.name }}
                    <div class="buttons">
                        <ButtonIcon>
                            <SvgIcon icon-class="heart"></SvgIcon>
                        </ButtonIcon>
                    </div>
                </div>
                <div class="artists">
                    <ArtistsName :artists="videoStore.detail.artists"></ArtistsName>
                </div>
                <div class="info">
                    <div class="time">
                        <SvgIcon icon-class="time"></SvgIcon>
                        {{ videoStore.detail.publishTime }}
                    </div>
                    <div class="play-count">
                        <SvgIcon icon-class="play-circle"></SvgIcon>
                        {{ FormatPlayCount(videoStore.detail.playCount) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="more-video">
            <div class="section-title">更多推荐</div>
            <MvListCover class="mv-row" :mvlist="videoStore.simi"></MvListCover>
        </div>
    </div>
</template>

<style lang='less' scoped>
.mv-page {
    margin: 64px 10vw 96px 10vw;

    .current-video {
        width: 65%;
        position: fixed;

        .video {
            border-radius: 16px;
            overflow: hidden;
            max-height: 100vh;
            margin: 0 auto;
            background: transparent;
            --plyr-color-main: var(--color-primary);
            --plyr-control-radius: 8px;
        }

        .video-info {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            color: var(--color-text);

            .title {
                font-size: 20px;
                font-weight: 600;

                .buttons {
                    display: inline-block;

                    .svg-icon {
                        height: 18px;
                        width: 18px;
                        color: var(--color-primary);
                    }
                }
            }

            .artists {
                font-size: 14px;
                opacity: 0.88;
                margin: 12px 0;
                font-weight: 600;
            }

            .info {
                font-size: 12px;
                opacity: 0.88;
                display: flex;
                align-items: center;

                .time {
                    display: flex;
                    align-items: center;
                    margin-right: 12px;
                }

                .play-count {
                    display: flex;
                    align-items: center;
                }

                .svg-icon {
                    height: 15px;
                    width: 15px;
                    margin-right: 3px;
                }
            }
        }
    }

    .more-video {
        margin-left: 85%;

        .section-title {
            font-size: 24px;
            font-weight: 600;
            color: var(--color-text);
            margin-bottom: 12px;
        }

        .mv-row {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>