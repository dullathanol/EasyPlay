<script setup>
import ArtistsName from '@/components/Body/ArtistsName.vue'
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import MvListCover from '@/components/Body/MvListCover.vue';
import { getDetail, getMvUrl, getSimi } from '@/apis/mvlist.js'
import { FormatPlayCount } from '@/utils/common.js'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import Plyr from 'plyr'
import 'plyr/dist/plyr.css';

const route = useRoute()

const detail = ref([{}])
// const simi = ref([{}])

const id = route.query.id

// const loadSimi = async () => {
//     const Simi = await getSimi(id)
//     simi.value = Simi.mvs
// }

// loadSimi()

onMounted(() => {

    const loadData = async () => {
        const Detail = await getDetail(id)
        detail.value = Detail.data

        let config = {
            settings: ['captions', 'quality', 'speed', 'loop'],
            autoplay: false,
            quality: {
                default: 1080,
                options: [1080, 720, 480, 240],
            },
        };

        const player = new Plyr('#player', config)

        let sources = []
        let brs = detail.value.brs

        for (let i = 0; i < brs.length; i++) {
            const MvUrl = await getMvUrl(id, brs[i].br)
            sources.push({
                src: MvUrl.data.url,
                type: "video/mp4",
                size: MvUrl.data.r
            })
        }

        player.source = {
            type: 'video',
            title: detail.value.name,
            sources: sources,
            poster: detail.value.cover
        }
    }

    loadData()
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
                    {{ detail.name }}
                    <div class="buttons">
                        <ButtonIcon>
                            <SvgIcon icon-class="heart"></SvgIcon>
                        </ButtonIcon>
                    </div>
                </div>
                <div class="artists">
                    <ArtistsName :artists="detail.artists"></ArtistsName>
                </div>
                <div class="info">
                    <div class="time">
                        <SvgIcon icon-class="time"></SvgIcon>
                        {{ detail.publishTime }}
                    </div>
                    <div class="play-count">
                        <SvgIcon icon-class="play-circle"></SvgIcon>
                        {{ FormatPlayCount(detail.playCount) }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="more-video">
                <div class="section-title">更多推荐</div>
                <MvListCover :mvlist="simi"></MvListCover>
            </div> -->
    </div>
</template>

<style lang='less' scoped>
.mv-page {
    margin: 64px 10vw 96px 10vw;

    .current-video {
        .video {
            border-radius: 16px;
            overflow: hidden;
            width: 70vw;
            max-height: 100vh;
            margin: 0 auto;
            background: transparent;
            --plyr-color-main: var(--color-primary);
            --plyr-control-radius: 8px;
        }

        .video-info {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            color: var(--color-text);
            padding: 0 5vw;

            .title {
                font-size: 24px;
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

    // .more-video {
    //     margin-top: 48px;

    //     .section-title {
    //         font-size: 24px;
    //         font-weight: 600;
    //         color: var(--color-text);
    //         margin-bottom: 12px;
    //     }
    // }
}
</style>