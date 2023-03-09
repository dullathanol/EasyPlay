import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlistStore', () => {
    const recommendSong = ref([{}]) //每日推荐

    return { recommendSong }
})
