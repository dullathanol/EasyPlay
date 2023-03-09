import Plyr from 'plyr'
import pinia from '@/utils/pinia.js'
import { useVideoStore } from "@/stores/videoStore.js";
import { getDetail, getMvUrl, getSimi } from '@/apis/mvlist.js'

const videoStore = useVideoStore(pinia)

export const play = () => {
    let config = {
        settings: ['captions', 'quality', 'speed', 'loop'],
        autoplay: false,
        quality: {
            default: 1080,
            options: [1080, 720, 480, 240],
        },
    };

    videoStore.Plyr = new Plyr('#player', config)
}

export const getVideo = (id) => {
    getDetail(id).then(async (Detail) => {
        videoStore.detail = Detail.data

        let brs = videoStore.detail.brs
        let sources = []

        for (let i = 0; i < brs.length; i++) {
            await getMvUrl(id, brs[i].br).then(res => {
                sources.push({
                    src: res.data.url,
                    type: "video/mp4",
                    size: res.data.r
                })
            })
        }

        videoStore.Plyr.source = {
            type: 'video',
            title: videoStore.detail.name,
            sources: sources,
            poster: videoStore.detail.cover
        }

        const Simi = await getSimi(id)
        videoStore.simi = Simi.mvs
    })
}