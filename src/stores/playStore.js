import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayStore = defineStore('playStore', () => {
    const Howl = ref(null)
    const playing = ref(false) //是否正在播放
    const playMode = ref(0) //播放模式
    const volume = ref(0.7)   //音量
    const volumeBefore = ref(1)   //保存音量
    const progress = ref(null)  //进度条
    const songId = ref(null)  //歌曲ID
    const songList = ref([])  //播放列表
    const currentIndex = ref(0)  //当前索引
    const shuffleIndex = ref(null)  //随机索引
    const time = ref(null)  //歌曲总时长

    return { Howl, playing, playMode, volume, volumeBefore, progress, songId, songList, currentIndex, shuffleIndex, time }
})
