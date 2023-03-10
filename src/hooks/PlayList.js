import pinia from '@/utils/pinia.js'
import { getNewsong } from '@/apis/playlist.js';
import { getRecommendSongs } from '@/apis/user.js';
import { useUserStore } from '@/stores/userStore.js';
import { usePlaylistStore } from '@/stores/playlistStore.js';
import { getLike } from '@/apis/user.js'

const userStore = useUserStore(pinia)
const playlistStore = usePlaylistStore(pinia)

export const getRecommend = () => {
    if (userStore.login) {
        getRecommendSongs().then((RecommendSongs) => {
            playlistStore.recommendSong = RecommendSongs.data.dailySongs
        })
    }
    if (!userStore.login) {
        getNewsong().then((Newsong) => {
            playlistStore.recommendSong = Newsong.result
        })
    }
}

export const like = async (id, like) => {
    await getLike(id, like)
    if (like === 'true') {
        userStore.likelist.push(id)
    }
    if (like === 'false') {
        for (let i = 0; i < userStore.likelist.length; i++) {
            if (userStore.likelist[i] == id) {
                userStore.likelist.splice(i, 1);
            }
        }
    }
}